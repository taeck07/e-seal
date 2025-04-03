import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  gap: 12px;
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 12px;
`;

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageBox = styled.div`
  cursor: pointer;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  overflow: hidden;
  width: 160px;
  border-radius: 12px;
  background-color: aliceblue;

  img {
    width: 100%;
    height: auto;
  }
`;

export const ImageIndex = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px 0;
  font-size: 12px;
`;
