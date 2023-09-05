import { Slider } from "mcm-js-dev";

export default function SliderExamplePage() {
  return (
    <Slider
      useAnimation={true}
      pagination={{ showPageList: true }}
      listMinHeight={{ web: "200px", mobile: "200px" }}
    >
      <p> Hello </p>
      <p> World </p>
      <img src="이미지 주소" />
    </Slider>
  );
}
