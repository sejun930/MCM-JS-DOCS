import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { favoriteState, moduleState, versState } from "src/commons/store";

import { moduleRemarksList } from "./data";
import { getModuleIndexList } from "src/commons/data/index/index.commons.data";
import { _PTextWithHtml, _Title, _Image } from "mcm-js-commons";

import IndexRenderPage from "../../../index/index.render";
import FavoritePage from "../../form/favorite";

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
  const isCheckedFavorite = favorite.some((el) => el === module);

  return (
    <Wrapper className="main-title-wrapper" id="main-title-form">
      <Items>
        <TitleWrapper>
          <_Title className="main-title">📖 {module}</_Title>
          <Tooltip
            tooltipText={`즐겨찾기 ${(isCheckedFavorite && "삭제") || "추가"}`}
            useShowAnimation
          >
            <FavoritePage
              favorite={favorite}
              changeFavorite={changeFavorite}
              module={module}
            />
          </Tooltip>
        </TitleWrapper>
        <_PTextWithHtml
          className="main-title-remarks"
          dangerouslySetInnerHTML={moduleRemarksList[module]}
        />
        {module && (
          <ExampleImage
            className="main-title-example-image"
            src={`https://s3.ap-northeast-2.amazonaws.com/mcm-js.site/images/modules/${module}-example.gif`}
          />
        )}
      </Items>
      {(list.length && <IndexRenderPage indexList={list} />) || <></>}
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
`;

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px 0px;
  width: 100%;

  .main-title-remarks {
    line-height: 28px;
    letter-spacing: -0.02rem;
  }

  @media ${breakPoints.mobileLarge} {
    padding-top: 0px;
    gap: 16px 0px;
    align-items: center;

    .main-title-remarks {
      text-align: center;
      font-size: 14px;
      line-height: 22px;
    }
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0px 16px;

  .module-favorite-btn {
    position: relative;
    opacity: 1;
    font-size: 24px;
  }

  .main-title {
    display: flex;
    align-items: center;
  }
`;

export const ExampleImage = styled(_Image)`
  margin-top: 30px;
  width: 500px;
  object-fit: fill;
  border: solid 1px gray;
  border-radius: 10px;

  @media ${breakPoints.mobileLarge} {
    max-width: 600px;
  }

  @media ${breakPoints.mobileSmall} {
    max-width: 100%;
    min-width: auto;
  }
`;
