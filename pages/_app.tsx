import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

// import script from "next/script";
import Head from "next/head";

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

        {/* 제니퍼 프론트 : 실시간 모니터링 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(j,ennifer) {
                j['dmndata']=[];j['jenniferFront']=function(args){window.dmndata.push(args)};
                j['dmnaid']=ennifer;j['dmnatime']=new Date();j['dmnanocookie']=false;j['dmnajennifer']='JENNIFER_FRONT@INTG';
            }(window, 'e2ce4c2e'));
              `,
          }}
        />
        <script
          async
          src="https://d-collect.jennifersoft.com/7868b4da/demian.js"
        />
        {/* //////////////////////// */}

        {/* Hotjar : 실시간 모니터링 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3713239,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
          }}
        />
        {/* //////////////////////// */}
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
