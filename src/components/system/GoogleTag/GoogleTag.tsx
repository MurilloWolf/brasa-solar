import Head from "next/head";
import Script from "next/script";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

typeof window;

export default function GoogleTag() {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-V0Q4N0W9PB"
      ></Script>
      <Script id="google-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){
              window.dataLayer.push(arguments);
              }
              gtag('js', new Date());
              gtag('config', 'G-V0Q4N0W9PB');
              `}
      </Script>
    </>
  );
}
