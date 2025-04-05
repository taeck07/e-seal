import { PDFDocument } from "pdf-lib";
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



export const applyStampToAllPages = async (
  pdfFile: File,
  stampImage: File
): Promise<File | null> => {
  if (!pdfFile || !stampImage) throw new Error("PDF 또는 도장 이미지가 없습니다.");
  try {
    const pdfBytes = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();

    if (stampImage.type !== "image/png") {
      alert("지원하지 않는 도장 이미지 형식입니다. PNG 또는 JPG만 업로드해주세요.");
      return null;
    }
    const stampImageBytes = await stampImage.arrayBuffer();
    const pngImage = await pdfDoc.embedPng(stampImageBytes);

    for (const page of pages) {
      const { width } = page.getSize();
      // apply stamp position to bottom right
      page.drawImage(pngImage, {
        x: width - 100,
        y: 50,
        width: 80,
        height: 80,
      });
    }

    const stampedPdfBytes = await pdfDoc.save();
    // from Uint8Array to File type
    return new File([stampedPdfBytes], "stamped.pdf", { type: "application/pdf" });
  } catch (error) {
    alert("PDF에 도장을 적용하는 중 오류가 발생했습니다. 파일을 다시 확인해주세요.");
    return null;
  }
};