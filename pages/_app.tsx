import { AppProps } from "next/app";
import "../styles/globals.css";

import LayoutPage from "src/main/commonsComponents/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <LayoutPage>
        <Component {...pageProps} />
      </LayoutPage>
    </>
  );
}

export default MyApp;
