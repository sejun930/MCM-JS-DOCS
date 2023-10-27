import styled from "@emotion/styled";

export default function Toggle({ isOn }: { isOn?: boolean }) {
  return (
    <Wrapper className="mcm-toggle-wrapper">
      <Items className={`mcm-toggle-off ${(!isOn && "toggle-on") || ""}`}>
        OFF
      </Items>
      <Items className={`mcm-toggle-on ${(isOn && "toggle-on") || ""}`}>
        ON
      </Items>
    </Wrapper>
  );
}

export interface StylesTypes {
  isOn?: boolean;
}

export const Wrapper = styled.div`
  width: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  overflow: hidden;
  position: relative;
`;

export const Items = styled.div`
  position: absolute;
  transition: all 0.25s;
  font-size: 10px;
  bottom: 0;
  right: 0;
  opacity: 0.3;

  &.toggle-on {
    font-size: 16px;
    font-weight: 600;
    opacity: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.mcm-toggle-on {
    &.toggle-on {
      color: #aa5656;
      right: 6px;
    }
  }
`;
