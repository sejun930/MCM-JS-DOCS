import { useEffect } from "react";
import { useRouter } from "next/router";

import MyModal from "src/main/mainComponents/modules/modal";
import MyTooltip from "src/main/mainComponents/modules/tooltip";
import MySlider from "src/main/mainComponents/modules/slider";
import MyAlert from "src/main/mainComponents/modules/alert";
import MyPopular from "src/main/mainComponents/modules/popular";

import ErrorPage from "../../404";
import {
  getCamelCase,
  imagePreLoad,
} from "src/main/commonsComponents/functional";

export default function ModulesPage(props: { name: string }) {
  const Components = ModuleComponentsList[props.name];
  // const [render, setRender] = useState(false);

  const router = useRouter();

  useEffect(() => {
    imagePreLoad([`/images/modules/example/${props.name}-example.gif`]);

    // window.setTimeout(() => {
    //   // 페이지 렌더
    //   setRender(true);
    // }, 100);

    // return () => {
    //   // 페이지 이탈 시
    //   setRender(false);
    // };
  }, [router]);

  return Components || <ErrorPage />;
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
  Alert: <MyAlert />,
  Popular: <MyPopular />,
};
