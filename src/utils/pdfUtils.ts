import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export const pdfFileToImages = async (
  file: File
): Promise<{ images: string[]; error: string | null; fileName: string }> => {
  try {
    const pdfUrl = URL.createObjectURL(file);
    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

    const images: string[] = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas context is null");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;
      images.push(canvas.toDataURL("image/png"));
    }

    return {
      images,
      error: null,
      fileName: file.name,
    };
  } catch (error: any) {
    return {
      images: [],
      error: error.message || "PDF 렌더링 중 오류 발생",
      fileName: file.name,
    };
  }
};

export const getImageByFile = async (
  file: File
): Promise<string[] | undefined> => {
  const result = await pdfFileToImages(file);

  return result.images;
};
