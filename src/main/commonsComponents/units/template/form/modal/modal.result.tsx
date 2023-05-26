import styled from "@emotion/styled";
import { ReactNode } from "react";

export default function ModalResultForm({
  children, // children 렌더
}: {
  children: ReactNode;
}) {
  return <Wrapper>{children}</Wrapper>;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`;

export const ButtonWrapper = styled.div`
  display: flex;

  .cmm-button-unit {
    padding: 10px 16px;
    border-radius: 10px;
    font-size: 16px;
    color: #666666;
  }
`;
