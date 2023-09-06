import MyModal from "src/main/mainComponents/modules/modal";
import MyTooltip from "src/main/mainComponents/modules/tooltip";
import MySlider from "src/main/mainComponents/modules/slider";

import ErrorPage from "../../404";
import {
  getCamelCase,
  imagePreLoad,
} from "src/main/commonsComponents/functional";
import { useEffect } from "react";

export default function ModulesPage(props: { name: string }) {
  const Components = ModuleComponentsList[props.name];

  useEffect(() => {
    imagePreLoad([
      `https://s3.ap-northeast-2.amazonaws.com/mcm-js.site/images/modules/${props.name}-example.gif`,
    ]);
  }, []);

  return <>{!Components ? <ErrorPage /> : Components}</>;
}

export const getServerSideProps = (url: { query: { module: string } }) => {
  const { query } = url;
  const { module } = query; // 모듈 이름 가져오기

  return {
    props: {
      name: getCamelCase(module),
    },
  };
};

// 모듈 컴포넌트 모음
export const ModuleComponentsList: { [key: string]: JSX.Element } = {
  Modal: <MyModal />,
  Tooltip: <MyTooltip />,
  Slider: <MySlider />,
};
