import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import "../styles/globals.css";
import LayoutPage from "src/main/commonsComponents/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <LayoutPage>
        <Component {...pageProps} />
      </LayoutPage>
    </RecoilRoot>
  );
}

export default MyApp;
