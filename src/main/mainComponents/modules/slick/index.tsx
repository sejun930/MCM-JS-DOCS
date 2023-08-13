import { Tooltip } from "mcm-js";
import { useState } from "react";

export default function TooltipExamplePage() {
  // 툴팁을 실행하거나 종료시키는 기준이 되는 state 값입니다.
  // true를 전달하면 실행시킬 수 있고, false를 전달하면 종료됩니다.
  const [isOpen, setIsOpen] = useState(false);

  // isOpen state 값을 true 또는 false로 변경합니다.
  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  // 툴팁이 종료되었을 때 state 값을 false로 변경하는 함수입니다.
  const closeAfterEvent = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={toggleIsOpen}>툴팁 실행 / 종료</button>
      <Tooltip
        tooltipText="툴팁이 실행되었습니다."
        useShowAnimation
        // isOpen 값이 true일 때 툴팁이 수동으로 실행됩니다.
        open={isOpen}
        // 툴팁이 종료되면 isOpen state 값을 false로 변경해주는 함수를 실행합니다.
        onCloseAfterEvent={closeAfterEvent}
      >
        <p> 버튼을 클릭하면 툴팁을 수동으로 실행하거나 종료할 수 있습니다. </p>
      </Tooltip>
    </div>
  );
}
