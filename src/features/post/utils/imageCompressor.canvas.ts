export const imageCompressor = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const MAX_SIZE = 250;
      let { width, height } = img;

      if (width> height) {
        if (width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve(objectUrl);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);

      URL.revokeObjectURL(objectUrl);
      resolve(compressedDataUrl);
    };

    img.onerror = (e) => {
      URL.revokeObjectURL(objectUrl);
      reject(e);
    };

    img.src = objectUrl;
  });
}
