import { useEffect, useState } from "react";
import { useStore } from "@/stores/fileStore";
import { getImageByFile } from "@/utils/pdfUtils";
import { ImageBox, ImageIndex, PreviewContainer, Top, Wrapper } from "./styles";

const StampPlacer = () => {
  const { file } = useStore();
  const [fileImage, setFileImage] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    (async () => {
      setFileImage((await getImageByFile(file)) ?? "");
    })();
  }, [file]);

  return (
    <Wrapper>
      <Top>
        {fileImage && (
          <PreviewContainer>
            <ImageBox>
              <img src={fileImage} alt="PDF preview" />
            </ImageBox>
            <ImageIndex>1</ImageIndex>
          </PreviewContainer>
        )}
      </Top>
    </Wrapper>
  );
};

export default StampPlacer;