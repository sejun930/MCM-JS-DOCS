import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

interface StyleTypes {
  offBoard?: boolean;
  isFull?: boolean;
}

export const ExampleTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .exmaple-subTitle {
    display: flex;
  }

  .subTitle-title-wrapper {
    align-items: flex-end;
    .toggle-all-code-btn {
      font-size: 16px;
    }
  }

  @media ${breakPoints.mobileLarge} {
    .subTitle-title-wrapper {
      .toggle-all-code-btn {
        font-size: 14px;
      }
    }
  }
`;

export const ExampleContentsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 40px;
  gap: 60px 0px;

  @media ${breakPoints.mobileLarge} {
    flex-direction: column;

    .example-list-wrapper {
      .example-list-items {
        display: flex;
        flex-direction: column;

        .example-list {
          width: 100% !important;
        }
      }
    }
  }
`;

export const ExampleContentsItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;

  h3 {
    font-size: 20px;
  }

  .error-form {
    display: flex;
    align-items: center;
    /* color: #7b2869; */
    font-weight: 700;
  }

  .example-block-remarks {
    margin-top: 12px;
    font-size: 16px;
    padding-left: 10px;
    color: #555555;
  }

  ${(props: StyleTypes) =>
    props.isFull && {
      width: "100%",
    }}

  @media ${breakPoints.mobileLarge} {
    width: 100%;

    h3 {
      font-size: 18px;
      text-align: center;
    }

    .example-block-remarks {
      text-align: center;
      padding-left: 0px;
    }
  }

  @media ${breakPoints.mobileSmall} {
    h3,
    .example-block-remarks {
      text-align: left;
    }
  }
`;

export const ExampleResultList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 15px;
  border-radius: 5px;

  ${(props: StyleTypes) =>
    props.offBoard && {
      border: "unset",
      height: "auto",
    }}
`;

export const ExampleListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  transition: all 0.35s;

  .example-remarks {
    font-size: 14px;
    margin-top: 30px;
    color: #666666;
    line-height: 22px;
    letter-spacing: -0.01rem;
  }

  :hover {
    background-color: antiquewhite;
  }

  @media ${breakPoints.mobileLarge} {
    .example-remarks {
      text-align: center;
      margin-top: 24px;
    }
  }
`;

export const ExampleListItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.3rem 1rem;
  border: solid 1px #dddddd;

  .mcm-error-unit {
    margin-top: 0px;
  }

  @media ${breakPoints.mobileLarge} {
    padding: 1.6rem 1rem;
    align-items: center;

    .mcm-error-unit {
      margin: 0;
    }
  }
`;
