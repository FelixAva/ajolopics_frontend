import { type ReactNode, useMemo } from 'react';

// Interfaz para el elemento, requerimos la altura para poder calcular
export interface MasonryElement {
  id: string | number; // Identificador único para el key de React
  content: ReactNode;  // El componente visual (tu Card, imagen, etc.)
  height: number;      // La altura estimada o real del elemento
}

export interface MasonryGridProps {
  columns_number: number;
  containerStyle?: string;
  columnStyle?: string;
  elements: MasonryElement[];
  threshold?: number; // Tolerancia en pixeles para la diferencia de alturas
}

const MasonryGrid = ({
  columns_number,
  containerStyle = 'gap-4', // Gap por defecto entre columnas
  columnStyle = 'gap-4',    // Gap por defecto entre elementos de una columna
  elements,
  threshold = 15, // Un umbral de 15px suele ser un buen punto de partida
}: MasonryGridProps) => {

  // useMemo garantiza que el algoritmo solo corra si los elementos o las columnas cambian
  const columns = useMemo(() => {
    // 1. Inicialización: Arreglo de N columnas vacías y arreglo de alturas en 0
    const cols: MasonryElement[][] = Array.from({ length: columns_number }, () => []);
    const columnHeights: number[] = new Array(columns_number).fill(0);

    // 2. Iteración única (Greedy Algorithm)
    elements.forEach((element) => {
      // Encontrar la altura mínima actual entre todas las columnas
      const minHeight = Math.min(...columnHeights);

      let targetColumnIndex = 0;

      // 3 y 4. Evaluación de umbral y desempate por orden (izq -> der)
      for (let i = 0; i < columns_number; i++) {
        // ¿La columna actual está dentro del umbral aceptable?
        if (columnHeights[i] - minHeight <= threshold) {
          targetColumnIndex = i;
          break; // ¡Clave! Al usar break, nos quedamos con la primera que cumpla (la más a la izq)
        }
      }

      // 5. Inserción y actualización de la altura de la columna afectada
      cols[targetColumnIndex].push(element);
      columnHeights[targetColumnIndex] += element.height;
    });

    return cols;
  }, [elements, columns_number, threshold]);

  return (
    // Contenedor principal flex para alinear columnas horizontalmente
    <div className={`flex w-full items-start ${containerStyle}`}>
      {columns.map((col, colIndex) => (
        // Cada columna es un flex vertical independiente
        <div
          key={`masonry-col-${colIndex}`}
          className={`flex flex-col flex-1 ${columnStyle}`}
        >
          {col.map((item) => (
            // Renderizamos el contenido real
            <div key={item.id} className="w-full">
              {item.content}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
