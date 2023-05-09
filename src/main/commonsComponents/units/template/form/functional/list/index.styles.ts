import styled from "@emotion/styled";

export const FunctionalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 30px;
`;

export const FunctionalInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* border-bottom: solid 4px #aa5656; */
`;

export const TitleWrapper = styled.div`
  /* align-items: center; */
  /* justify-content: space-between; */
  background-color: #eeeeee;
  padding: 20px 24px;

  .functional-name {
    font-size: 18px;
  }

  .function-remarks {
    font-size: 14px;
    margin-top: 10px;
    white-space: pre;
    overflow: auto;
  }
`;

export const PropsInfoWrapper = styled.div`
  /* max-height: 0px; */
  overflow: hidden;
`;

export const PropsInfoItems = styled.div`
  padding: 24px 24px;
  padding-right: 0px;
  border-left: solid 4px rgba(170, 86, 86, 0.4);
  /* border-bottom: double 2px #aa5656; */

  .props-title {
    font-weight: 500;
  }

  .functional-props-code-wrapper {
    margin-top: 16px;
  }
`;

export const PropsInfoList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  .same-props {
    color: gray;
    font-size: 14px;

    .move-props-list {
      color: blue;
      font-weight: 500;
    }
  }

  .props-list-wrapper {
    margin-top: 10px;
  }
`;

export const InfoListWrapper = styled.ul`
  padding: 16px;
  margin-top: 16px;
  background-color: #f9f9f9;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px 0px;
`;

export const Info = styled.li`
  font-size: 14px;
  list-style: inside;

  b {
    color: #aa5656;
    font-weight: 700;
  }
`;

export const ExampleCodeBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  /* justify-content: center; */
`;
