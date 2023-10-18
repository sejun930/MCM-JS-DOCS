import { Slider } from "mcm-js-dev";

export default function SliderExamplePage() {
  return (
    <Slider
      useAnimation={true}
      pagination={{ showPageList: true }}
      useSwipeMode={{ sideMovePercent: 50 }}
      setArrow={{
        hide: false,
        showHover: false,
        hideMobile: false,
        contents: {
          left: "◀",
          right: "▶",
        },
      }}
    >
      <p> Hello World </p>
      <p> 😃🧑😀 </p>
      <img src="이미지 주소" />
    </Slider>
  );
}
