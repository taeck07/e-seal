import Spinner from "@/components/common/Spinner";
import { ImageBox, ImageIndex, PreviewContainer, Top, Wrapper } from "./styles";

type PropTypes = {
  fileImages: string[] | null;
  selectedPage?: number | null;
  setSelectedPageNum?: (PdfPages: number) => void;
  isLoading: boolean;
}

const PdfPages = ({ fileImages, selectedPage = null, setSelectedPageNum = () => { }, isLoading }: PropTypes) => {

  const handlePageClick = (index: number) => {
    setSelectedPageNum(index);
  }

  return (
    <Wrapper>
      <Top>
        {
          isLoading ? <Spinner /> :
            fileImages && (
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