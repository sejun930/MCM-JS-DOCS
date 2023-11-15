import { Slider } from "mcm-js-dev";

export default function SliderExamplePage() {
  return (
    <Slider useAnimation={true} useSwipeMode={true || { sideMovePercent: 50 }}>
      <p> Hello World </p>
      <p> 😃🧑😀 </p>
      <img src="이미지 주소" />
    </Slider>
  );
}
