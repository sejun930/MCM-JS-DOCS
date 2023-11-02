import styled from "@emotion/styled";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { moduleState, versState } from "src/commons/store";

import { moduleRemarksList } from "./data";
import { getModuleIndexList } from "src/commons/data/index/index.commons.data";
import { _PTextWithHtml, _Title, _Image } from "mcm-js-commons";

import IndexRenderPage from "../../../index/index.render";
import { breakPoints } from "mcm-js-commons/dist/responsive";

export default function _MainTitleTemplate() {
  const [module] = useRecoilState(moduleState);
  const [vers] = useRecoilState(versState);

  const [list, setList] = useState<Array<{ id: string; title: string }>>([]);

  // 리스트 가져오기
  useEffect(() => {
    window.setTimeout(() => {
      setList(getModuleIndexList({ module, vers }));
    }, 50);
  }, [module, vers]);

  return (
    <Wrapper className="main-title-wrapper" id="main-title-form">
      <Items>
        <_Title className="main-title">📖 {module}</_Title>
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

  .main-title {
    display: flex;
    align-items: center;
  }

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
