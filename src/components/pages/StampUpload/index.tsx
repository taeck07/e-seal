import { useRef } from "react";
import { useStore } from "@/stores/fileStore";
import Stamp1 from "@/files/stamp-1.jpg";
import { Bottom, PdfFile, PdfFileRemove, PdfUpload, Stamps, StampUploadBox, Top, Wrapper } from "./styles";
import Button from "@/components/common/Button";

const StampUpload = () => {
  const { file, setFile } = useStore();

  const stampInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file!);
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

  return (
    <Wrapper>
      <Top>
        <div>
          <PdfUpload>
            <input
              ref={pdfInputRef}
              type="file"
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
              onChange={() => { }}
              style={{ display: "none" }}
            />
            <Button type="button" onClick={handleStampUpload}>
              도장 업로드
            </Button>
          </StampUploadBox>

          <Stamps>
            <img src={Stamp1} />
          </Stamps>
        </div>
      </Top>

      <Bottom>
        <Button type="button" onClick={handleStampDraw}>
          도장 찍기
        </Button>
      </Bottom>
    </Wrapper>
  );
};


export default StampUpload;
