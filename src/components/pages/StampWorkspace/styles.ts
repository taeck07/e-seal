import Button from "@/components/common/Button";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 12px;
`;

export const PdfUpload = styled.div`
  min-height: 48px;
`;

export const PdfFile = styled.div`
  min-height: 48px;
`;

export const PdfFileRemove = styled(Button)`
  padding: 4px 8px;
  background-color: transparent;
  color: #5e5e5e;
  font-size: 16px;
`;

export const StampUploadBox = styled.div`
  min-height: 48px;
`;

export const StampWrap = styled.div`
  display: flex;
  gap: 8px;
  min-height: 54px;
  flex-wrap: wrap;
`;
export const Stamp = styled.div<{selected: boolean}>`
  width: 48px;
  height: 48px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
    border-radius: 4px;
    border: ${({ selected }) => (selected ? "3px solid #0070f3" : "none")};
  }
  button {
    position: absolute;
    color: black;
    right: 2px;
    top: 2px;
  }
`;


export const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 12px;
`;
