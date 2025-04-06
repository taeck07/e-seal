import Button from "@/components/common/Button";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const CanvasContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  canvas {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
  }
`;

export const DownloadButton = styled(Button)`
  position: absolute;
  right: 12px;
  top: 12px;
`;

export const SpinnerWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

`;