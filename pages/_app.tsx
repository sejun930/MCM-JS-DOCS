import { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";

import "../styles/globals.css";
import LayoutPage from "src/main/commonsComponents/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta httpEquiv="Content-Script-Type" content="Text/javascript" />
        <meta httpEquiv="Subject" content="React" />
        <meta httpEquiv="Email" content="sejun3278@gmail.com" />
        <meta httpEquiv="Copyright" content="sejun3278@gmail.com" />
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
