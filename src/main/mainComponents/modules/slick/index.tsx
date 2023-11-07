import { Slider } from "mcm-js-dev";

export default function SliderExamplePage() {
  return (
    <Slider useAnimation={true} useCurrentPage={true || { hideMobile: false }}>
      <p> Hello World </p>
      <p> 😃🧑😀 </p>
      <img src="이미지 주소" />
    </Slider>
  );
}
