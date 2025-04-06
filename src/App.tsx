import { useEffect, useMemo, useState } from "react";

import StampWorkspace from "@/components/pages/StampWorkspace";
import PdfPreviewer from "./components/pages/PdfPreviewer";
import PdfPages from "./components/pages/PdfPages";
import { useStore } from "@/stores/fileStore";
import GlobalStyle from "./styles/GlobalStyle";
import styled from "styled-components";
import { getImageByFile } from "./utils/pdfUtils";

const AppLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    min-width: 1512px;
    max-width: 1512px;

    height: 100%;
    min-height: 752px;
    max-height: 752px;

    > div {
      overflow: hidden;
      height: 100%;
      background: #e9e9e9;
      border-radius: 8px;

      &:nth-child(1) {
        flex: 0 0 280px;
      }
      &:nth-child(2) {
        flex: 0 0 962px;
      }
      &:nth-child(3) {
        flex: 0 0 250px;
      }
    }
  }
`;

function App() {
  const { file } = useStore();
  const [selectedPdfPageNum, setSelectedPdfPageNum] = useState<number | null>(null);
  const [fileImages, setFileImages] = useState<string[] | null>(null);
  const [loadingFileToImage, setLoadingFileToImage] = useState(false);

  const selectedImage = useMemo(() => {
    if (selectedPdfPageNum === null || !fileImages) return null;
    return fileImages[selectedPdfPageNum];
  }, [selectedPdfPageNum, fileImages]);

  useEffect(() => {
    if (!file) {
      setFileImages([]);
      setSelectedPdfPageNum(null);
      return;
    }

    (async () => {
      setLoadingFileToImage(() => true);
      setFileImages((await getImageByFile(file)) ?? []);
      setSelectedPdfPageNum(0);
      setLoadingFileToImage(() => false);
    })();
  }, [file]);


  return (
    <>
      <GlobalStyle />
      <AppLayout>
        <div>
          <StampWorkspace />
          <PdfPreviewer selectedImage={selectedImage} isLoading={loadingFileToImage} />
          <PdfPages
            fileImages={fileImages}
            setSelectedPageNum={setSelectedPdfPageNum}
            selectedPage={selectedPdfPageNum}
            isLoading={loadingFileToImage}
          />
        </div>
      </AppLayout>
    </>
  );
}

export default App;
