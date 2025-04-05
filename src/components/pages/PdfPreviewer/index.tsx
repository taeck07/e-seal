import { useEffect, useRef } from "react";
import { useStore } from "@/stores/fileStore";
import * as fabric from "fabric";
import { CanvasContainer, DownloadButton, Wrapper } from "./styles";

const FABRIC_CANVAS_WIDTH = 500;
const FABRIC_CANVAS_HEIGHT = parseFloat(
  (FABRIC_CANVAS_WIDTH * Math.sqrt(2)).toFixed(2)
);

type PropTypes = {
  selectedImage: string | null;
}

// pdf upload, stamp upload, stamp to pdf
const PdfPreviewer = ({ selectedImage }: PropTypes) => {
  const { file } = useStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  const handlePDFDownload = async () => {
    try {

      if (!file) return;
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${file.name.replace(".pdf", "")}_stamp.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert("PDF 다운로드 중 오류가 발생했습니다.");
      console.error(error);
    }

  };

  useEffect(() => {

    if (!file || !canvasRef.current) return;
    // set canvas size
    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: FABRIC_CANVAS_WIDTH,
      height: FABRIC_CANVAS_HEIGHT,
      selection: false,
    });


    return () => {
      // unmount
      fabricCanvasRef.current?.dispose();
    }
  }, [file]);

  useEffect(() => {

    (async () => {
      try {
        if (!selectedImage || !fabricCanvasRef.current) return;
        // view selected pdf page
        const img = await fabric.FabricImage.fromURL(selectedImage);
        img.set({
          objectCaching: false,
          // set filled image size to canvas size
          scaleX: FABRIC_CANVAS_WIDTH / img.width!,
          scaleY: FABRIC_CANVAS_HEIGHT / img.height!,
          left: 0,
          top: 0,
          selectable: false,
        });
        fabricCanvasRef.current!.backgroundImage = img;
        fabricCanvasRef.current?.requestRenderAll();

      } catch (err) {
        alert("PDF 이미지 로딩에 실패했습니다.");
        console.error("PDF 렌더링 오류:", err);
      }
    })();
  }, [selectedImage]);

  return (
    <Wrapper>
      <CanvasContainer>
        <canvas ref={canvasRef} />
        <DownloadButton type="button" onClick={handlePDFDownload}>
          PDF 다운로드
        </DownloadButton>
      </CanvasContainer>
    </Wrapper>
  );
};

export default PdfPreviewer;

