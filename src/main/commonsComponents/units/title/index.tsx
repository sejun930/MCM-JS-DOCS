import { CSSProperties, MutableRefObject, useEffect, useRef } from "react";
import CommonsHooksComponents from "../../hooks";

interface IProps {
  title: string; // 화면에 출력되는 제목명
  styles?: CSSProperties; // 스타일 커스텀 지정
  className?: string; // class 이름 직접 지정
  titleLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"; // 태그 레벨 선택 (h1이 디폴트 값)
}

const filter = Array.from(new Array(5), (_, i) => `h${i + 2}`);
// h1 ~ h6로 표현되는 타이틀 컴포넌트
export default function _Title({
  title,
  styles,
  className,
  titleLevel,
}: IProps) {
  const renderRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { getAllComponentsClassName, getOriginTemplate } =
    CommonsHooksComponents();

  const _className = getAllComponentsClassName("_title_", className);

  useEffect(() => {
    if (titleLevel) {
      const divTarget = renderRef.current;

      // 새롭게 만든 타이틀 태그 추가하기
      const headering = document.createElement(
        filter.includes(titleLevel) ? titleLevel : "h1"
      ) as HTMLHeadingElement;

      // 클래스 네임 설정
      headering.className = _className;

      // 스타일 지정
      if (headering.style && styles) {
        const stylesStr = Object.entries(styles)
          .reduce((acc, cur) => {
            return (
              acc +
              `${getOriginTemplate(cur[0])}:${getOriginTemplate(cur[1])}; `
            );
          }, "")
          .trim();
        headering.setAttribute("style", stylesStr);
      }

      // 타이틀 메세지 추가
      headering.innerText = title;

      if (divTarget) {
        // 기존의 h1 태그 삭제
        if (divTarget.children[0]) divTarget.children[0].remove();

        // 새로운 태그 추가
        divTarget.appendChild(headering);
      }
    }
  }, [title]);

  return (
    <div ref={renderRef}>
      <h1 style={styles} className={_className}>
        {title}
      </h1>
    </div>
  );
}
