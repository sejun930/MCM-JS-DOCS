import Head from "next/head";
import { ModuleComponentsList } from "./module.list";
import ErrorPage from "../../404";

import { getCamelCase } from "src/main/commonsComponents/functional";
import { moduleRemarksList } from "src/main/commonsComponents/units/template/title/mainTitle/data";

export default function ModulesPage(props: { name: string }) {
  const { name } = props;
  const Components = ModuleComponentsList[name];

  return (
    <>
      <Head>
        <title>MCM-JS || {name}</title>
        <meta
          name="og:description"
          content={
            moduleRemarksList[name].split("<br />").join(" ") ||
            "내 취향대로 모듈을 만들어보세요. || My Custom Modlues"
          }
        ></meta>
        <meta
          name="og:image"
          content={`https://s3.ap-northeast-2.amazonaws.com/mcm-js.site/images/modules/${name}-example.gif`}
        />
        <meta
          name="og:url"
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
