import { Slider } from "mcm-js-dev";
import { useState } from "react";

export default function SliderExamplePage() {
  // 현재 페이지의 인덱스 값을 저장합니다.
  const [idx, setIdx] = useState(0);

  // 페이지 전환 이벤트로 받아온 인덱스 값을 변경합니다.
  const changeEvent = (idx: number) => {
    setIdx(idx);
  };

  return (
    <div>
      <p> 현재 페이지의 인덱스 번호는? {idx} </p>
      <Slider
        useAnimation={true}
        pagination={{ showPageList: true }}
        useAutoPlay={{ delay: 3000 }}
        changePageEvent={changeEvent}
      >
        <p> Hello </p>
        <p> 😃🧑😀 </p>
        <img src="이미지 주소" />
      </Slider>
    </div>
  );
}
