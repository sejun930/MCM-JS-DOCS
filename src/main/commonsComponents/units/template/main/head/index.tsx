import Head from "next/head";
import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

import { moduleRemarksList } from "src/main/commonsComponents/units/template/title/mainTitle/data";

export default function MainHead() {
  const [module] = useRecoilState(moduleState);

  return (
    <Head>
      <title>MCM-JS{(module && `::${module}`) || ""}</title>
      <meta
        property="og:description"
        content={
          moduleRemarksList[module]?.split("<br />").join("") ||
          "내 취향대로 모듈을 만들어보세요. || My Custom Modlues"
        }
      />
      <meta
        property="og:title"
        content={`MCM-JS${(module && `::${module}`) || ""}`}
      />
      <meta
        property="og:image"
        content={
          module
            ? `/images/modules/example/${module}-example.gif`
            : "/images/commons/logo/MCM_white_logo.png"
        }
      />
      <meta
        property="og:url"
        content={`https://mcm-js.site/${(module && `modules/${module}`) || ""}`}
      />
      <meta
        name="Keywords"
        content={`nextjs, react, ${
          module &&
          `${module}, ${module.toLowerCase()}, ${module.toUpperCase()}`
        } ${
          (moduleKeywords[module] && moduleKeywords[module].map((el) => el)) ||
          ""
        }`}
      />
    </Head>
  );
}

const moduleKeywords: { [key: string]: Array<string> } = {};
