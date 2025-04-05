import { useEffect, useRef, useState } from "react";
import { useStore } from "@/stores/fileStore";
import Stamp1 from "@/files/stamp-1.jpg";
import { Bottom, PdfFile, PdfFileRemove, PdfUpload, Stamp, StampUploadBox, StampWrap, Top, Wrapper } from "./styles";
import Button from "@/components/common/Button";

const MAX_STAMP_IMAGES_COUNT = 5;

const StampWorkspace = () => {
  const { file, setFile } = useStore();
  const [stampImages, setStampImages] = useState<File[]>([]);
  const [selectedStamp, setSelectedStamp] = useState<number | null>(null);

  const stampInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file!);
    e.target.value = "";
  };

  const handleStampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const pngs = files.filter((file) => file.type === "image/png");
    const limited = [...stampImages, ...pngs].slice(0, MAX_STAMP_IMAGES_COUNT);
    setStampImages(limited);
    e.target.value = "";
  };

  const handleStampUpload = () => {
    stampInputRef.current?.click();
  };

  const handlePDFUpload = () => {
    pdfInputRef.current?.click();
  };

  const handlePDFRemove = () => {
    setFile(null);
  };

  const handleStampDraw = async () => { };

  const handleStampRemove = (e: React.MouseEvent<HTMLButtonElement>, stampIndex: number) => {
    e.stopPropagation();
    const removedStampImages = stampImages.filter((_, index) => index !== stampIndex);
    setStampImages(removedStampImages);
    if (selectedStamp === stampIndex || !removedStampImages.length) {
      setSelectedStamp(null);
    }
  }

  useEffect(() => {
    fetch(Stamp1)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], "stamp-1.jpg", { type: "image/jpeg" });
        setStampImages([file]);
      });
  }, []);

  return (
    <Wrapper>
      <Top>
        <div>
          <PdfUpload>
            <input
              ref={pdfInputRef}
              type="file"
              accept="application/pdf,image/png"
              onChange={handlePDFChange}
              style={{ display: "none" }}
            />
            <Button type="button" onClick={handlePDFUpload}>
              PDF 업로드
            </Button>
          </PdfUpload>

          <PdfFile>
            {!!file?.name && (
              <>
                📄 파일명: <strong>{file?.name}</strong>
                <PdfFileRemove type="button" onClick={handlePDFRemove}>
                  X
                </PdfFileRemove>
              </>
            )}
          </PdfFile>
        </div>

        <div>
          <StampUploadBox>
            <input
              ref={stampInputRef}
              type="file"
              accept=".png"
              onChange={handleStampChange}
              style={{ display: "none" }}
            />
            <Button type="button" onClick={handleStampUpload} disabled={stampImages.length >= 5}>
              도장 업로드
            </Button>
          </StampUploadBox>

          <StampWrap>
            {stampImages.map((file, index) => (
              <Stamp key={`${file.name}_${index}`} onClick={() => setSelectedStamp(index)} selected={index === selectedStamp}>
                <img src={URL.createObjectURL(file)} alt={`stamp-${index}`} />
                <button type="button" onClick={(e) => handleStampRemove(e, index)}>
                  X
                </button>
              </Stamp>
            ))}
          </StampWrap>
        </div>
      </Top>

      <Bottom>
        <Button type="button" onClick={handleStampDraw} disabled={!selectedStamp}>
          도장 찍기
        </Button>
      </Bottom>
    </Wrapper>
  );
};


export default StampWorkspace;
