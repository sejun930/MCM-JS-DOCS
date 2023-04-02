import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 40%;
  position: relative;
`;

export const EmptySelect = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const DetailWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const DetailRole = styled.div`
  padding: 1rem;
  overflow: auto;
  overflow-x: hidden;
  height: 100%;
`;

export const DetailInfoWrapper = styled.article`
  display: flex;
  flex-direction: column;
  height: 85%;

  .tree-detail-info-role {
    text-align: center;
    line-height: 24px;
    color: #444444;
    letter-spacing: -0.8px;
    b {
      color: black;
    }
  }
`;

export const DetailTitleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px 0px;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: solid 2px #666666;
  white-space: pre;
  overflow-x: auto;
  padding: 12px;
  padding-right: 0px;
  min-height: 80px;
  height: 90px;
  overflow-y: hidden;

  .tree-title {
    width: 100%;
    font-size: 14px;
    word-spacing: 1px;
  }
`;

export const DetailTitle = styled.div`
  width: 100%;
  display: flex;

  span {
    width: 30%;
  }

  code {
    padding-left: 30px;
    padding-right: 12px;
  }
`;

export const ParentsWrapper = styled.div`
  position: relative;
  height: 15%;
  width: 100%;

  .tree-detail-button {
    height: 100%;
    width: 100%;
    background-color: gainsboro;
    border-radius: 0px 0px 10px 0px;

    .my-parents {
      height: 100%;
      display: flex;
      padding: 0.5rem;
      font-size: 14px;
      align-items: center;
      white-space: pre;
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;

      code {
        margin-left: 6px;
      }
    }
  }
`;
