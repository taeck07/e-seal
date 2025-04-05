import { useEffect, useState } from "react";
import { useStore } from "@/stores/fileStore";
import { getImageByFile } from "@/utils/pdfUtils";
import { ImageBox, ImageIndex, PreviewContainer, Top, Wrapper } from "./styles";

const PdfPages = () => {
  const { file, selectedPage, setSelectedPage } = useStore();
  const [fileImages, setFileImages] = useState<string[] | null>(null);

  const handlePageClick = (index: number) => {
    setSelectedPage(index);
  }

  useEffect(() => {
    if (!file) {
      setFileImages([]);
      return;
    }

    (async () => {
      setFileImages((await getImageByFile(file)) ?? []);
    })();
  }, [file]);

  return (
    <Wrapper>
      <Top>
        {fileImages && (
          <PreviewContainer>
            {fileImages.map((fileImage, index) => <div key={`pdf_preview_${index}`} onClick={() => handlePageClick(index)}>
              <ImageBox selected={index === selectedPage}>
                <img src={fileImage} alt="PDF preview" />
              </ImageBox>
              <ImageIndex selected={(index + 1) === selectedPage}>{index + 1}</ImageIndex>
            </div>)}
          </PreviewContainer>
        )}
      </Top>
    </Wrapper>
  );
};

export default PdfPages;