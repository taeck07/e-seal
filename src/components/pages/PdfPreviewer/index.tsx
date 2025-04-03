import { useEffect, useRef } from "react";
import { useStore } from "@/stores/fileStore";
import * as fabric from "fabric";
import { getImageByFile } from "@/utils/pdfUtils";
import { CanvasContainer, DownloadButton, Wrapper } from "./styles";

const FABRIC_CANVAS_WIDTH = 500;
const FABRIC_CANVAS_HEIGHT = parseFloat(
  (FABRIC_CANVAS_WIDTH * Math.sqrt(2)).toFixed(2)
);

const PdfPreviewer = () => {
  const { file } = useStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  const handlePDFDownload = async () => { };

  useEffect(() => {
    if (!file || !canvasRef.current) return;

    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: FABRIC_CANVAS_WIDTH,
      height: FABRIC_CANVAS_HEIGHT,
      selection: false,
    });

    (async () => {
      const image = await getImageByFile(file);
      const img = await fabric.FabricImage.fromURL(image!);

      img.set({ objectCaching: false });
      fabricCanvasRef.current!.backgroundImage = img;
      fabricCanvasRef.current?.requestRenderAll();
    })();
  }, [file]);

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