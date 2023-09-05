import Head from "next/head";
import MainHomePage from "src/main/mainComponents";

export default function App() {
  return (
    <>
      <Head>
        <title>MCM-JS</title>
        <meta
          property="og:description"
          content="내 취향대로 모듈을 만들어보세요. || My Custom Modlues"
        />
        <meta property="og:title" content={`MCM-JS`} />
        <meta
          property="og:image"
          content="/images/commons/logo/MCM_white_logo.png"
        />
        <meta property="og:url" content={`https://mcm-js.site`} />
        <meta name="Keywords" content={`nextjs, react, modules`} />
      </Head>
      <MainHomePage />;
    </>
  );
}
