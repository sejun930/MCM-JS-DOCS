import styled from "@emotion/styled";
import { CSSProperties } from "react";

interface IStyleProps {
  hasMultiple?: boolean;
  isSelected?: boolean;
  isShow?: boolean;
  isFixed?: boolean;
  itemsHeight?: number;
  allLength?: number;
  vers?: number;
}

export const CopyWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .copy-wrapper {
    border-radius: 0px 0px 5px 5px;
  }
`;

export const TapWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 50px;
  transition: all 0.6s ease;

  ${(props: IStyleProps) =>
    !props.hasMultiple && {
      height: "0px",
    }}

  .show {
    opacity: 1;
  }

  .widen {
    width: ${(props) => (props.allLength || 1) * 150 + "px"};
  }

  .fixed-mode {
    padding: 10px;
    overflow: hidden;

    .module-vers-tap {
      border-radius: 100px;
      height: 40px;
      width: 150px;
      border: unset;
    }

    .select-tap {
      background-color: unset;
    }

    :after {
      content: "";
      position: absolute;
      width: 136px;
      height: 40px;
      background-color: #aa5656;
      left: 10px;
      border-radius: 999px;
      z-index: -1;
      opacity: 0;
      transition: transform 0.3s ease;
      /* display: none; */

      ${(props) => {
        const styles: { [key: string]: string } & CSSProperties = {};
        if (props.vers !== undefined)
          styles.transform = `translateX(${
            (props.vers ? props.vers + 1 : 0) * 50
          }%)`;

        if (props.isFixed) {
          styles.opacity = 1;
        } else {
        }

        return styles;
      }}
    }
  }

  .select-tap {
    height: 40px;
    background-color: #aa5656;
    color: white;
    border: unset;
    font-weight: 700;
  }
`;

export const TapItems = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  transition: all 0.6s ease;
  transform: translateY(0px);

  ${(props: IStyleProps) =>
    props.isFixed &&
    props.itemsHeight && {
      transform: `translateY(${props.itemsHeight}px)`,
    }}
`;

export const FixedTap = styled.div`
  opacity: 0;
  position: fixed;
  width: 60px;
  height: 60px;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  top: 2%;
  background-color: white;
  z-index: 500;
  border: double 4px #617a55;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  transition: all 0.4s ease;
`;
