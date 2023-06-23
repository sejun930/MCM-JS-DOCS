import styled from "@emotion/styled";

import { MouseEvent } from "react";
import { useRecoilState } from "recoil";
import { versState } from "src/commons/store";

import { getUuid } from "src/main/commonsComponents/functional";

export default function TapListPage({
  tapList,
  changeTempVers,
  isFixedMode,
  fixed,
}: //   vers,
{
  tapList: string[];
  changeTempVers?: (i: number) => void;
  isFixedMode?: boolean;
  fixed?: boolean;
  //   vers: number;
}) {
  const [vers, setVers] = useRecoilState(versState);
  // 버전 체인지 이벤트
  const changeVers = (e: MouseEvent<HTMLButtonElement>) => (i: number) => {
    if (fixed === false) return;

    const el = e.currentTarget;
    if (el) {
      Array.from(document.getElementsByClassName("select-tap")).forEach(
        (el) => {
          el.classList.remove("select-tap");
        }
      );
      el.classList.add("select-tap");
    }

    if (isFixedMode && changeTempVers) changeTempVers(i);
    setTimeout(() => {
      setVers(i);
    }, 200);
  };

  return (
    <>
      {tapList.length &&
        tapList.map((el, i) => (
          <Tap
            key={`${module}_vers_tap_${getUuid()}`}
            className={`module-vers-tap ${(vers === i && "select-tap") || ""}`}
            onClick={(e) => changeVers(e)(i)}
          >
            {el}
          </Tap>
        ))}
    </>
  );
}

interface StyleTypes {
  isSelected?: boolean;
}

const Tap = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: double 2px black;
  border-bottom: unset;
  width: 100%;
  height: 30px;
  border-radius: 15px 15px 0px 0px;
  transition: all 0.3s ease;
  color: gray;
  white-space: pre;

  -webkit-user-select: none; // 드래그 방지
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;

  ${(props: StyleTypes) =>
    props.isSelected && {
      height: "40px",
      color: "white",
      backgroundColor: "#aa5656",
      borderColor: "white",
      fontWeight: 700,
      cursor: "default",
      border: "unset",
    }}

  :hover {
    height: 40px;
  }
`;
