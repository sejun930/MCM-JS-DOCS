import { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";

import "../styles/globals.css";
import LayoutPage from "src/main/commonsComponents/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>MCM-JS</title>
        <meta charSet="utf-8" />
        <meta property="og:type" content="website"></meta>
        <meta
          property="og:description"
          content="내 취향대로 모듈을 만들어보세요. || My Custom Modlues"
        ></meta>
        <meta name="og:subject" content="" />
        <meta name="og:rating" content="General" />
        <meta
          property="og:image"
          content="/images/commons/logo/MCM_white_logo.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="300px" />
        <meta property="og:image:height" content="300px" />
      </Head>
      <RecoilRoot>
        <LayoutPage>
          <Component {...pageProps} />
        </LayoutPage>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
