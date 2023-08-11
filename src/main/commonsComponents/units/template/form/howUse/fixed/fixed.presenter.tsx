import { FixedTap, TapItems, TapWrapper } from "./fixed.styles";
import { MutableRefObject } from "react";

import TapListPage from "./tapList";
import { ExampleCodeListTypes } from "../index.types";

export default function ExampleFixedUIPage({
  fixed,
  tempVers,
  _wrapperRef,
  _fixedRef,
  changeTempVers,
  codeInfo,
  itemsHeight,
}: {
  fixed: boolean;
  tempVers: number;
  _wrapperRef: MutableRefObject<HTMLDivElement>;
  _fixedRef: MutableRefObject<HTMLDivElement>;
  changeTempVers: (i: number) => void;
  codeInfo: ExampleCodeListTypes;
  itemsHeight: number;
}) {
  const tapList = [...Array.from(codeInfo.title())] || [];

  return (
    <TapWrapper
      hasMultiple={codeInfo.title.length > 1}
      ref={_wrapperRef}
      allLength={codeInfo.title.length || 0}
      vers={tempVers}
      isFixed={fixed}
    >
      <TapItems isFixed={fixed} itemsHeight={itemsHeight}>
        <TapListPage tapList={tapList} />
      </TapItems>

      <FixedTap ref={_fixedRef}>
        {fixed && (
          <TapListPage
            tapList={tapList}
            changeTempVers={changeTempVers}
            isFixedMode={fixed}
            fixed={fixed}
          />
        )}
      </FixedTap>
    </TapWrapper>
  );
}
