import {
  ExampleImage,
  Items,
  TitleItems,
  TitleWrapper,
  Wrapper,
  UpdateInfo,
} from "./mainTitle.styles";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { favoriteState, moduleState, versState } from "src/commons/store";

import { moduleRemarksList, moduleUpdateList } from "./data";
import { getModuleIndexList } from "src/commons/data/index/index.commons.data";
import { _PTextWithHtml, _Title, _Image } from "mcm-js-commons";

import IndexRenderPage from "../../../index/index.render";
import FavoritePage from "../../form/favorite";
import _IconForm from "../../form/icon";

import { checkedIsFavorite } from "src/main/commonsComponents/functional";
import { getDistanceDate } from "src/main/commonsComponents/functional/date";
import { getLibraries } from "src/main/commonsComponents/functional/modules";
const { Tooltip } = getLibraries();

export default function _MainTitleTemplate() {
  const [module] = useRecoilState(moduleState);
  const [vers] = useRecoilState(versState);
  const [favorite, setFavorite] = useRecoilState<string[]>(favoriteState);

  const [list, setList] = useState<Array<{ id: string; title: string }>>([]);

  // 즐겨찾기 토글
  const changeFavorite = (list: string[]) => {
    setFavorite(list);
  };

  // 리스트 가져오기
  useEffect(() => {
    window.setTimeout(() => {
      setList(getModuleIndexList({ module, vers }));
    }, 50);
  }, [module, vers]);

  // 현재 즐겨찾기 적용 여부
  const isCheckedFavorite = checkedIsFavorite(favorite, module);

  return (
    <Wrapper className="main-title-wrapper" id="main-title-form">
      <Items>
        <TitleWrapper>
          <TitleItems>
            <_Title className="main-title">📖 {module}</_Title>
            <Tooltip
              tooltipText={`즐겨찾기 ${
                (isCheckedFavorite && "삭제") || "추가"
              }`}
              useShowAnimation
            >
              <FavoritePage
                favorite={favorite}
                changeFavorite={changeFavorite}
                module={module}
              />
            </Tooltip>
          </TitleItems>
          <UpdateInfo className="update-info">
            Update | {moduleUpdateList[module]}
            {/* 14일 이하는 업데이트 표시 */}
            {(getDistanceDate(moduleUpdateList[module]) < 15 && (
              <_IconForm type="update" />
            )) ||
              ""}
          </UpdateInfo>
        </TitleWrapper>
        <_PTextWithHtml
          className="main-title-remarks"
          dangerouslySetInnerHTML={moduleRemarksList[module]}
        />
        {module && (
          <ExampleImage
            className="main-title-example-image"
            src={`/images/modules/example/${module}-example.gif`}
          />
        )}
      </Items>
      {(list.length && <IndexRenderPage indexList={list} />) || <></>}
    </Wrapper>
  );
}
