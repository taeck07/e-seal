
import C from "./components/C";
import StampUpload from "@/components/pages/StampUpload";

import GlobalStyle from "./styles/GlobalStyle";
import styled from "styled-components";
import PdfPreviewer from "./components/pages/PdfPreviewer";

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
  return (
    <>
      <GlobalStyle />
      <AppLayout>
        <div>
          <StampUpload />
          <PdfPreviewer />
          <C />
        </div>
      </AppLayout>
    </>
  );
}

export default App;
