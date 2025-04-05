import { useEffect, useRef, useState } from "react";
import { useStore } from "@/stores/fileStore";
import * as fabric from "fabric";
import { getImageByFile } from "@/utils/pdfUtils";
import { CanvasContainer, DownloadButton, Wrapper } from "./styles";

const FABRIC_CANVAS_WIDTH = 500;
const FABRIC_CANVAS_HEIGHT = parseFloat(
  (FABRIC_CANVAS_WIDTH * Math.sqrt(2)).toFixed(2)
);

// pdf upload, stamp upload, stamp to pdf
const PdfPreviewer = () => {
  const { file, selectedPage } = useStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [images, setImages] = useState<string[] | null>(null);

  const handlePDFDownload = async () => { };

  useEffect(() => {
    // for pdf file change
    fabricCanvasRef.current?.dispose();
    if (!file || !canvasRef.current) return;
    // set canvas size
    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: FABRIC_CANVAS_WIDTH,
      height: FABRIC_CANVAS_HEIGHT,
      selection: false,
    });

    (async () => {
      const image = await getImageByFile(file);
      setImages(image || null);
    })();
  }, [file]);

  useEffect(() => {

    (async () => {
      if (!images || selectedPage === null) return;
      // view selected pdf page
      const img = await fabric.FabricImage.fromURL(images[selectedPage]);
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

    })();
  }, [images, selectedPage]);

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

