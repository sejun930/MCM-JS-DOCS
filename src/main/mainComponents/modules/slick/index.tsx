import { Slider } from "mcm-js-dev";

export default function SliderExamplePage() {
  return (
    <Slider useAnimation={true} firstPage={3}>
      <p> Hello </p>
      <p> World </p>
      <img src="이미지 주소" />
    </Slider>
  );
}
