import styled from "@emotion/styled";

import { useEffect, useState } from "react";
import { db, getServerTime, FieldValue } from "src/commons/libraries/firebase";

import {
  _PText,
  _Title,
  _Checkbox,
  _PTextWithHtml,
  _Button,
} from "mcm-js-commons";
import { getUuid, getDateForm } from "src/main/commonsComponents/functional";
import { BlockInfoType } from "./block.types";
import { breakPoints } from "mcm-js-commons/dist/responsive";

let waiting = false;
export default function AdminBlockPage() {
  // 차단된 유저 리스트
  const [blockList, setBlockList] = useState<Array<BlockInfoType>>([]);

  // 페이지네이션용 페이지 state
  //   const [page, setPage] = useState(1);

  // 차단 리스트 가져오기
  const getBlockList = () => {
    db.collection("block")
      .orderBy("createdAt")
      .get()
      .then((result) => {
        if (!result.empty) {
          const dataList: Array<BlockInfoType> = [];

          result.forEach((info) => {
            const _info = info.data() as BlockInfoType;

            const inputId = getUuid();
            _info.id = info.id;
            // checkbox의 inputId 값 추가
            _info.inputId = inputId;
            // 체크 여부 검증
            _info.checked = false;

            dataList.push(_info);
          });
          setBlockList(dataList);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("차단 유저 조회 실패");
      });
  };

  useEffect(() => {
    getBlockList();
  }, []);

  // checkbox 선택하기
  const checkBlockInfo = (idx: number) => {
    const _blockList = [...blockList];
    _blockList[idx].checked = !_blockList[idx].checked;

    setBlockList(_blockList);
  };

  // 차단 해제하기
  const cancelBlock = async () => {
    if (waiting) return alert("이벤트가 작동중입니다. 잠시만 기다려주세요.");
    // 선택된 항목 가져오기
    const checkList = blockList.filter((el: BlockInfoType) => el.checked);

    if (!checkList.length) {
      // 선택된 항목이 하나도 없는 경우
      alert("선택된 항목이 없습니다.");
    } else {
      const _db = db.collection("block");

      // 선택된 유저 차단 해제하기
      await Promise.all(
        checkList.map((el) =>
          // 최종 데이터 저장
          _db.doc(el.id).update({
            ...el,
            ["canceledAt"]: getServerTime(), // 차단해제 시간 입력 (= 차단 해제)
          })
        )
      ).then(() => {
        alert("차단 해제가 완료되었습니다.");

        // 새 데이터로 렌더하기
        getBlockList();
      });
    }
  };

  return (
    <Wrapper>
      {!blockList.length ? (
        <_Title className="empty-block-list-title">
          차단된 유저가 없습니다.
        </_Title>
      ) : (
        <BlockListWrapper>
          <OptionalWrapper>
            <_PText>- {blockList.length}명의 차단된 유저가 있습니다.</_PText>
            <_Button onClickEvent={cancelBlock}>선택 차단 해제</_Button>
          </OptionalWrapper>
          <BlockListItems>
            <thead>
              <tr>
                <td className="block-select"></td>
                <td className="block-ip">아이피</td>
                <td className="block-contents">차단 사유</td>
                <td className="block-date">차단일</td>
                <td className="block-cancel">취소일</td>
              </tr>
            </thead>

            <tbody>
              {blockList.map((info, idx) => {
                const isChecked = info.checked || false;

                return (
                  <tr
                    key={getUuid()}
                    style={{ border: (idx === 0 && "none") || "" }}
                    onClick={() => checkBlockInfo(idx)}
                    className={(isChecked && "checked") || undefined}
                  >
                    <td className="block-select">
                      <_Checkbox
                        inputId={info.inputId}
                        onChangeEvent={() => checkBlockInfo(idx)}
                        isChecked={isChecked}
                      />
                    </td>
                    <td className="block-ip">
                      <b>{info.ip}</b>
                    </td>
                    <td className="block-contents">
                      <_PTextWithHtml
                        className="block-contents-info"
                        dangerouslySetInnerHTML={info.contents}
                      />
                    </td>
                    <td className="block-date">
                      {info.createdAt &&
                        getDateForm({
                          firebaseTimer: info.createdAt,
                          getDate: true,
                        })}{" "}
                      <span>(차단일)</span>
                    </td>
                    <td className="block-cancel">
                      {info.canceledAt
                        ? getDateForm({
                            firebaseTimer: info.canceledAt,
                            getDate: true,
                          })
                        : "-"}{" "}
                      {(info.canceledAt && <span>(취소일)</span>) || ""}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </BlockListItems>
        </BlockListWrapper>
      )}
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .empty-block-list-title {
    font-size: 24px;
    letter-spacing: -0.05rem;
    color: gray;
  }
`;

export const BlockListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px 0px;
`;

export const OptionalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    font-size: 14px;
  }

  @media ${breakPoints.mobileLarge} {
    button {
      position: fixed;
      top: 170px;
      right: 20px;
      padding: 10px;
      background-color: white;
      border: solid 2px black;
      border-radius: 10px;
      font-size: 12px;
    }
  }
`;

export const BlockListItems = styled.table`
  width: 100%;
  border: solid 1px black;

  .checked {
    background-color: #efefef;
  }

  thead {
    border-bottom: double 2px black;

    td {
      font-weight: 700;
      font-size: 14px;
    }
  }

  tbody {
    display: flex;
    flex-direction: column;

    tr {
      padding: 16px 10px;
      border-top: dotted;
      align-items: center;
      cursor: pointer;

      td {
        font-size: 12px;
      }

      .block-contents {
        padding-right: 20px;
      }
    }
  }

  tr {
    padding: 10px;
    display: flex;

    td {
      text-align: center;
    }
  }

  .block-select {
    min-width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    .mcm-checkbox-unit-label {
      min-width: 20px;
    }
  }

  .block-ip {
    min-width: 160px;
  }

  .block-contents {
    width: 100%;
    max-width: 100%;

    .block-contents-info {
      overflow: auto;
      max-height: 30px;
      text-align: center;
    }
  }

  .block-date,
  .block-cancel {
    min-width: 140px;

    span {
      display: none;
    }
  }

  .block-ip {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media ${breakPoints.mobileLarge} {
    thead {
      display: none;
    }

    tbody {
      tr {
        flex-direction: column;
        gap: 16px 0px;

        .block-contents {
          padding: 0;
        }

        .block-date,
        .block-cancel {
          span {
            display: inline-block;
          }
        }
      }
    }
  }
`;
