import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";
import { LayoutContentsWrapper } from "src/main/commonsComponents/layout/styles";

// 다크모드 전용 색상 리스트
const colorBook = {
  bg: "#222222", // 배경색
  fontColor: "#cccccc",
  borderColor: "#dddddd",
  gray: "#777777",
  white: "#eeeeee",
  mainColor: "#aa5656",
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
          border: unset;
          border-bottom: unset;
        }

        .fixed-mode {
          background-color: ${colorBook.bg};

          .select-tap {
            color: ${colorBook.bg};
          }

          ::after {
            background-color: ${colorBook.borderColor};
          }
        }
      }

      // example 관련
      #example-form {
        .example-list-wrapper {
          .example-block-remarks {
            color: ${colorBook.gray};
          }
        }

        .example-list-items {
          .example-block-remarks {
            color: red;
          }

          .example-list {
            .example-remarks {
              color: ${colorBook.fontColor};
            }

            :hover {
              .example-remarks {
                color: ${colorBook.bg};
              }

              /* .example-darkMode-button {
                color: ${colorBook.bg};
              } */

              .example-components {
                border-bottom-color: ${colorBook.bg};

                /* .example-darkMode-button {
                  border-color: ${colorBook.bg};

                  :hover {
                    background-color: ${colorBook.bg};
                    border-color: ${colorBook.borderColor};
                    color: ${colorBook.fontColor};
                  }
                } */
              }

              .example-code-icon-button {
                color: ${colorBook.bg};
              }
            }

            .example-components {
              .example-darkMode-button {
                border-color: ${colorBook.fontColor};
              }

              .mcm-error-unit {
                background-color: ${colorBook.bg} !important;
                border-color: ${colorBook.fontColor} !important;
              }
            }

            // Example 코드바 관련
            .example-code-toggle {
              .copy-wrapper {
                border: unset;
                border-top: solid 1px ${colorBook.borderColor};
              }
            }

            .example-code-icon-button {
              color: ${colorBook.fontColor};
            }

            .mcm-popular-wrapper {
              color: ${colorBook.bg};
            }

            .mcm-button-unit {
              border-color: ${colorBook.borderColor};
              color: ${colorBook.fontColor};
            }

            .mcm-slider-contents {
              p {
                color: ${colorBook.fontColor};
              }
            }
            .mcm-slider-page {
              background-color: darkgray;
            }

            :hover {
              .mcm-button-unit {
                border-color: ${colorBook.bg};
                color: ${colorBook.bg};
                transition: all 0.25s ease;

                :hover {
                  background-color: ${colorBook.bg};
                  color: ${colorBook.fontColor};
                  border-color: ${colorBook.borderColor};
                }
              }

              .mcm-tooltip-wrapper {
                p {
                  color: ${colorBook.gray};
                }
              }

              .mcm-slider-contents {
                p {
                  color: ${colorBook.bg};
                }
              }
            }
          }
        }
      }
    }

    // Functional 페이지 관련
    #functional-form {
      .functional-props-info-wrapper {
        border-color: darkgray;
      }
      .functional-name-wrappre {
        color: ${colorBook.bg};
      }

      .props-info-items {
        .mcm-p-unit {
          color: ${colorBook.white};
        }

        .move-props-list {
          color: cornflowerblue;
        }
      }

      .props-warning-info {
        color: ${colorBook.bg};
      }

      .mcm-button-unit {
        border-color: ${colorBook.borderColor};
        color: ${colorBook.fontColor};
      }
    }

    // Props 페이지 관련
    #props-form {
      .props-list-header-wrapper {
        td {
          border: unset;
          background-color: white;
          color: black;
        }
      }

      .isRequired-list {
        background-color: lightslategrey;
        color: black;

        b {
          color: ${colorBook.fontColor} !important;
        }
      }

      .props-notice {
        .bold {
          color: ${colorBook.mainColor} !important;
        }
      }

      .box-color {
        background-color: lightslategrey;
      }

      .focusing {
        .bold {
          color: black !important;
        }
        b {
          color: ${colorBook.fontColor};
        }
      }
    }

    #props-form,
    #functional-form {
      .mcm-tooltip-wrapper {
        .mcm-span-unit {
          color: #222222;
        }

        .mcm-tooltip-text-contents {
          ::after,
          ::before {
            border-color: white transparent;
          }
        }
      }
    }

    // Tree 관련
    #tree-form {
      .copy-wrapper {
        background-color: #333333 !important;
        border: unset;
      }

      .tree-list {
        border-right: solid 2px ${colorBook.borderColor};
      }

      .tree-detail-role-wrapper {
        .tree-detail-info-role {
          color: ${colorBook.fontColor};

          b {
            color: ${colorBook.mainColor};
          }
        }
      }

      .my-parents {
        color: ${colorBook.fontColor};
      }
      .tree-detail-button {
        border-color: ${colorBook.borderColor};
      }
    }

    // Comments 관련
    #comments-form {
      .comments-wrapper {
        .comments-items {
          .comments-write-wrapper {
            border-color: ${colorBook.borderColor};

            .comments-write-option-wrapper {
              border-color: ${colorBook.borderColor};

              .rating-wrapper,
              .comments-password-wrapper {
                border-color: ${colorBook.borderColor};
              }

              .rating-wrapper,
              p {
                color: ${colorBook.fontColor};
              }
            }
            select,
            .contents-input {
              background-color: ${colorBook.bg};
              color: ${colorBook.fontColor};
            }

            .mcm-input-unit-wrapper {
              .mcm-input-submit-button {
                color: transparent;
                text-shadow: 0 0 0 rgba(255, 255, 255);
              }
              .mcm-close-button-unit {
                border-color: ${colorBook.borderColor};
              }
            }
          }

          .comments-agree-privacy-wrapper {
            .comments-agree-privacy-items {
              #privacy-label {
                color: ${colorBook.fontColor};
              }
            }

            .privacy-notice-wrapper {
              .privacy-notice {
                color: ${colorBook.fontColor};
              }
            }
          }

          .write-comments-button {
            color: ${colorBook.fontColor};
          }
        }

        #comments-list-wrapper {
          .comments-list-category-wrapper {
            background-color: ${colorBook.bg};
            border-color: ${colorBook.borderColor};

            .selected-category {
              color: ${colorBook.white};
            }

            .filter-reset-button {
              ::after,
              ::before {
                background-color: ${colorBook.white};
              }
            }

            .category-list-shadow {
              opacity: 0.2;
            }
          }

          .filter-button {
            &.open {
              background-image: url("/images/commons/icons/filter-click-darkMode.png");
            }
          }

          .comments-list-items {
            .comments-list {
              border-color: ${colorBook.borderColor};

              :hover {
                background-color: ${colorBook.white};
                color: ${colorBook.bg};
              }

              .label-wrapper {
                p {
                  border: solid 1px ${colorBook.bg};
                }
              }
              .qna-contents {
                border: solid 1px ${colorBook.bg};
              }
            }
          }
        }
      }

      .loading-title {
        color: ${colorBook.bg};
      }
      .load-complete {
        color: ${colorBook.fontColor};
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

      .setting {
        color: ${colorBook.fontColor};
      }
    }

    .module-favorite-btn {
      text-shadow: 0 0 0 rgba(255, 255, 255);
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

    // error 페이지 관련
    .error-wrapper {
      .error-title,
      .error-move-home {
        color: ${colorBook.white};
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
      .toggle-all-code-btn {
        color: ${colorBook.fontColor};
      }
    }

    // mainTitle 관련
    #main-title-form {
      .main-title-example-image {
        border-color: ${colorBook.borderColor};
      }

      .update-info {
        color: #999999;
      }
    }

    // Tooltip 관련
    .mcm-tooltip-wrapper {
      .mcm-span-unit {
        color: #222222;
      }

      .mcm-tooltip-text-contents {
        ::after,
        ::before {
          /* border-color: white transparent; */
        }
      }
    }

    // Modal 관련
    .mcm-modal-wrapper {
      color: initial;
    }

    // 공통 적용되는 페이지들
    /* .example-darkMode-button {
      color: ${colorBook.fontColor};
      border-color: ${colorBook.borderColor};

      :hover {
        background-color: ${colorBook.white};
        color: ${colorBook.bg};
      }
    } */
  }

  // 반응형
  @media ${breakPoints.mobileLarge} {
    &.darkMode {
      // Props 관련
      .props-list-wrapper {
        border-color: ${colorBook.borderColor};

        tr {
          border-color: ${colorBook.borderColor};

          .props-name {
            border-color: ${colorBook.borderColor};
          }
        }

        .props-type {
          color: unset;
          opacity: 0.6;
        }
      }

      // Tree 관련
      #tree-form {
        .tree-list-wrapper {
          .tree-list {
            border-right: unset;
            border-bottom: solid 2px ${colorBook.borderColor};
          }
        }
      }

      // Comments 관련
      #comments-form {
        .write-comments-button {
          border-color: ${colorBook.borderColor};
        }

        .comments-wrapper {
          #comments-list-wrapper {
            .comments-list-items {
              .comments-list {
                :hover {
                  background-color: unset;
                  color: ${colorBook.fontColor};
                }
              }
            }
          }
        }
      }
    }
  }
`;
