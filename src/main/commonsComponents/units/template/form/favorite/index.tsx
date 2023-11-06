import styled from "@emotion/styled";
import { _Button } from "mcm-js-commons";

import { checkedIsFavorite } from "src/main/commonsComponents/functional";
import { removeTag } from "src/main/commonsComponents/functional/code";

import { getLibraries } from "src/main/commonsComponents/functional/modules";
const { Alert } = getLibraries();

export default function FavoritePage({
  favorite,
  changeFavorite,
  module,
}: {
  favorite: string[];
  changeFavorite: (list: string[]) => void;
  module: string;
}) {
  // 즐겨찾기 추가 및 삭제
  const toggleFavorite = (name: string) => () => {
    const _favorite: string[] = [...favorite];

    let msg = ""; // 성공 메세지
    const idx = _favorite.indexOf(name);

    if (idx === -1) {
      // 모듈이 없을 경우 추가
      _favorite.push(name);
      msg = `즐겨찾기에 등록되었습니다.`;
    } else {
      // 모듈이 있을 경우 삭제
      _favorite.splice(idx, 1);
      msg = `즐겨찾기에서 삭제되었습니다.`;
    }

    Alert.openAlert({
      children: `${name} 모듈이 ${msg}`,
      alertConcept: {
        type: idx === -1 ? "success" : "info",
      },
      useCloseMode: {
        useSwipeMode: true,
      },
    });

    changeFavorite(_favorite);
    window.localStorage.setItem("mcm-favorite", JSON.stringify(_favorite));
  };

  // 현재 즐겨찾기가 적용되어 있는지 체크
  const isCheckedFavorite = checkedIsFavorite(favorite, module);

  return (
    <Favorite
      onClickEvent={toggleFavorite(removeTag(module))}
      className="module-favorite-btn"
      isCheckedFavorite={isCheckedFavorite || false}
    >
      ⭐
    </Favorite>
  );
}

export interface StyleTypes {
  isCheckedFavorite?: boolean;
}

export const Favorite = styled(_Button)`
  position: absolute;
  right: 0;
  opacity: 0;
  color: transparent;
  text-shadow: 0 0 0 rgba(120, 120, 120); /* 새 이모지 색상 부여 */
  font-size: 16px;
  transition: all 0.25s ease;

  ${(props: StyleTypes) =>
    props.isCheckedFavorite && {
      color: "white",
      opacity: 1,
    }}
`;
