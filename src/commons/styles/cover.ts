import styled from "@emotion/styled";
import { LayoutContentsWrapper } from "src/main/commonsComponents/layout/styles";

// 다크모드 전용 색상 리스트
const colorBook = {
  bg: "#222222", // 배경색
  fontColor: "#eeeeee",
  borderColor: "white",
  gray: "#777777",
};

// 다크모드 적용
export const LayoutContentsWrapperWithDarkMode = styled(LayoutContentsWrapper)`
  /* 전체 적용 */
  &.darkMode {
    .nav-list-items,
    .nav-list-wrapper,
    #main-template-wrapper {
      background-color: ${colorBook.bg};
      color: ${colorBook.fontColor};
    }

    // main 관련
    #main-template-wrapper {
      &.project-remarks-template {
        border-top-color: ${colorBook.borderColor};
      }

      // index 페이지 관련
      .mcm-index-wrapper {
        background-color: ${colorBook.bg};
        border-color: ${colorBook.borderColor};

        .mcm-index-option-wrapper {
          background-color: ${colorBook.bg};
          border-color: ${colorBook.borderColor};

          .mcm-index-close-button {
            ::after,
            ::before {
              background-color: ${colorBook.borderColor};
            }
          }

          .mcm-index-isMinimum-button {
            color: ${colorBook.borderColor};
          }
        }
      }

      // vers fixed 관련
      .howUse-vers-fixed-wrapper {
        .module-vers-tap {
          border-color: ${colorBook.gray};
        }

        .select-tap {
          border: solid 1px ${colorBook.borderColor};
          border-bottom: unset;
        }

        .fixed-mode {
          background-color: ${colorBook.bg};

          .select-tap {
            background-color: ${colorBook.borderColor};
            color: ${colorBook.bg};
          }

          ::after {
            background-color: ${colorBook.borderColor};
          }
        }
      }
    }

    /* Navigation */
    // navigation current 관련
    .nav-list-items {
      border-bottom-color: gray;
    }

    // navigation list 관련
    .nav-list-wrapper {
      .empty-search-result {
        color: #999999;
      }

      .module-favorite-btn {
        text-shadow: 0 0 0 rgba(255, 255, 255);
      }

      .setting {
        color: ${colorBook.fontColor};
      }
    }

    // code 관련
    .copy-wrapper {
      border: solid 1px white;
      ${colorBook.bg && {
        backgroundColor: `${colorBook.bg} !important`,
      }}

      .mcm-p-unit {
        color: ${colorBook.fontColor};
      }
    }

    /* 공통 컴포넌트 관련 */
    // input 관련
    .mcm-input-unit-items {
      border-color: white;
      .mcm-input-unit {
        background-color: ${colorBook.bg};
        color: ${colorBook.fontColor};
      }

      .mcm-input-submit-button-items {
        border-color: ${colorBook.borderColor};

        .mcm-close-button-unit {
          ::after,
          ::before {
            background-color: ${colorBook.borderColor};
          }
        }
      }
    }

    // subTitle 관련
    .subTitle-Template {
      .subTitle-line {
        background-color: ${colorBook.borderColor};
      }
    }

    // mainTitle 관련
    #main-title-form {
      .main-title-example-image {
        border-color: ${colorBook.borderColor};
      }
    }

    // Tooltip 관련
    .mcm-tooltip-wrapper {
      .mcm-span-unit {
        color: #222222;
      }
    }
  }
`;
