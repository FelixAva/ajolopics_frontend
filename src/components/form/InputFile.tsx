import React from "react";

export default function FileMultipleExample() {
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return;

    console.log("FileList completo:", files);
    console.log("Cantidad de archivos:", files.length);

    const fileArray = Array.from(files);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Selecciona múltiples archivos</h2>

      <input
        type="file"
        multiple
        onChange={handleFileChange}
      />
    </div>
  );
}
