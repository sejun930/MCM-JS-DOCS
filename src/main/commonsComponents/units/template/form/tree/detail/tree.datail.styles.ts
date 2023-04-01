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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .my-parents {
    height: 40px;
    display: flex;
    padding: 0.5rem;
    font-size: 14px;
    align-items: center;
    white-space: pre;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    background-color: gainsboro;
    border-radius: 0px 0px 10px 0px;

    code {
      margin-left: 6px;
    }
  }
`;

export const DetailInfoWrapper = styled.article`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-bottom: 0px;

  .detail-info-role {
    padding: 20px 0px;
    padding-bottom: 0px;
    text-align: center;
    line-height: 24px;
    color: #444444;
    height: 160px;
    overflow: auto;
    letter-spacing: -0.7px;

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

  .tree-title {
    width: 100%;
    font-size: 14px;
    word-spacing: 1px;
  }
`;

export const DetailTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  code {
    padding-left: 30px;
  }
`;
