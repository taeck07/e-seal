import { useEffect, useRef, useState } from "react";
import { useStore } from "@/stores/fileStore";
import Stamp1 from "@/files/stamp-1.jpg";
import { Bottom, PdfFile, PdfFileRemove, PdfUpload, Stamp, StampUploadBox, StampWrap, Top, Wrapper } from "./styles";
import Button from "@/components/common/Button";
import { applyStampToAllPages } from "@/utils/pdfUtils";

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
    // stamp accept only png
    const pngs = files.filter((file) => file.type === "image/png");

    if (pngs.length === 0) {
      alert("PNG 형식의 도장만 업로드할 수 있습니다.");
      return;
    }

    // maximum allowed stamp count
    const combined = [...stampImages, ...pngs];
    if (combined.length > MAX_STAMP_IMAGES_COUNT) {
      alert(`도장은 최대 ${MAX_STAMP_IMAGES_COUNT}개까지만 업로드할 수 있습니다.`);
    }

    const limited = combined.slice(0, MAX_STAMP_IMAGES_COUNT);
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
  // set stamp to pdf file
  const handleStampDraw = async () => {
    if (!file) {
      alert("PDF 파일을 먼저 업로드해주세요.");
      return;
    }
    if (selectedStamp === null) {
      alert("찍을 도장을 선택해주세요.");
      return;
    }
    const applyStampFile = await applyStampToAllPages(file, stampImages[selectedStamp]);
    // when apply stamp failed
    if (!applyStampFile) return;
    setFile(applyStampFile);
  };

  const handleStampRemove = (e: React.MouseEvent<HTMLButtonElement>, stampIndex: number) => {
    // for prevent stamp image click
    e.stopPropagation();

    // remove stamp
    const removedStampImages = stampImages.filter((_, index) => index !== stampIndex);
    setStampImages(removedStampImages);

    // remove select when selected stamp removed
    if (selectedStamp === stampIndex || !removedStampImages.length) {
      setSelectedStamp(null);
    }
  }

  useEffect(() => {
    //set default stamp
    fetch(Stamp1)
      .then((res) => res.blob())
      .then(async (blob) => {
        const file = new File([blob], "stamp-1.jpg", { type: "image/jpeg" });
        setStampImages([file]);
      })
      .catch((error) => {
        console.error("기본 도장 로딩 실패:", error);
        alert("기본 도장 이미지를 불러오는 데 실패했습니다.");
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
              accept="application/pdf"
              onChange={handlePDFChange}
              style={{ display: "none" }}
            />
            <Button type="button" onClick={handlePDFUpload}>
              PDF 업로드
            </Button>
          </PdfUpload>

          <PdfFile>
            {!!file && (
              <>
                📄 파일명: <strong>{file.name}</strong>
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
        <Button type="button" onClick={handleStampDraw} disabled={selectedStamp === null}>
          도장 찍기
        </Button>
      </Bottom>
    </Wrapper>
  );
};


export default StampWorkspace;
