import { type ReactNode, useMemo } from 'react';

export interface MasonryElement {
  id: string | number
  content: ReactNode;
  height: number;
}

export interface MasonryGridProps {
  columns_number: number;
  containerStyle?: string;
  columnStyle?: string;
  elements: MasonryElement[];
  threshold?: number
}

const MasonryGrid = ({
  columns_number,
  containerStyle = 'gap-4',
  columnStyle = 'gap-4',
  elements,
  threshold = 15,
}: MasonryGridProps) => {
  const columns = useMemo(() => {
    const cols: MasonryElement[][] = Array.from({ length: columns_number }, () => []);
    const columnHeights: number[] = new Array(columns_number).fill(0);

    elements.forEach((element) => {
      const minHeight = Math.min(...columnHeights);

      let targetColumnIndex = 0;

      for (let i = 0; i < columns_number; i++) {
        if (columnHeights[i] - minHeight <= threshold) {
          targetColumnIndex = i;
          break;
        }
      }

      cols[targetColumnIndex].push(element);
      columnHeights[targetColumnIndex] += element.height;
    });

    return cols;
  }, [elements, columns_number, threshold]);

  return (
    <div className={`flex w-full items-start ${containerStyle}`}>
      {columns.map((col, colIndex) => (
        <div
          key={`masonry-col-${colIndex}`}
          className={`flex flex-col flex-1 ${columnStyle}`}
        >
          {col.map((item) => (
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
