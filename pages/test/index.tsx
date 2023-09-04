import { Slider } from "mcm-js-dev";
import { useState } from "react";

export default function Test() {
  const [test, setTest] = useState(false);

  return (
    <>
      <button onClick={() => setTest(true)}>
        {test ? "changed" : "change"}
      </button>
      <Slider
        useAnimation
        useAutoPlay={{ delay: 3000 }}
        useDragMode={{ sideMovePercent: 30 }}
      >
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Slider>
    </>
  );
}
