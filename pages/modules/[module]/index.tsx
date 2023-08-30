import MyModal from "src/main/mainComponents/modules/modal";
import MyTooltip from "src/main/mainComponents/modules/tooltip";

import Head from "next/head";
import ErrorPage from "../../404";

import { getCamelCase } from "src/main/commonsComponents/functional";
import { moduleRemarksList } from "src/main/commonsComponents/units/template/title/mainTitle/data";

export default function ModulesPage(props: { name: string }) {
  const { name } = props;
  const Components = ModuleComponentsList[name];

  return (
    <>
      <Head>
        <title>MCM-JSㅤ||ㅤ{name}</title>
        <meta
          property="og:description"
          content={
            moduleRemarksList[name].split("<br />").join(" ") ||
            "내 취향대로 모듈을 만들어보세요. || My Custom Modlues"
          }
        />
        <meta
          property="og:image"
          content={`https://s3.ap-northeast-2.amazonaws.com/mcm-js.site/images/modules/${name}-example.gif`}
        />
        <meta property="og:image:type" content="image/gif" />
        <meta
          property="og:url"
          content={`https://mcm-js.site/modules/${name.toLowerCase()}`}
        />
      </Head>
      {!ModuleComponentsList[name] ? <ErrorPage /> : Components}
    </>
  );
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
};
