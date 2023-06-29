import { _CloseButton } from "mcm-js-commons";
import { getUuid } from "src/main/commonsComponents/functional";

import {
  Select,
  SelectItems,
  SelectListWrapper,
  SelectWrapper,
} from "./select.styles";

import CommonsHooksComponents from "src/main/commonsComponents/hooks/commonsHooks";
import { SelectProps, IProps } from "./select.render";

export default function _SelectFormUIPage({
  className,
  styles,
  _wrapperRef,
  _listRef,
  children,
  closeSelect,
  render,
}: SelectProps & IProps) {
  const { getAllComponentsClassName } = CommonsHooksComponents();

  return (
    (render && (
      <SelectWrapper
        className={getAllComponentsClassName("mcm-unit-select", className)}
        style={styles}
        ref={_wrapperRef}
      >
        <_CloseButton
          className="mcm-unit-select-close-button"
          onClickEvent={closeSelect}
        />
        <SelectItems className="mcm-unit-select-items">
          {children && (
            <SelectListWrapper
              ref={_listRef}
              className="mcm-unit-select-list-wrapper"
            >
              {(Array.isArray(children) &&
                Array.from(children).map((el) => (
                  <Select key={getUuid()} className="mcm-unit-select-list">
                    {el}
                  </Select>
                ))) ||
                children}
            </SelectListWrapper>
          )}
        </SelectItems>
      </SelectWrapper>
    )) || <></>
  );
}
