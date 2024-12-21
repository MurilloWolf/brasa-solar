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
    <Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-V0Q4N0W9PB"
      ></Script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){
              window.dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-V0Q4N0W9PB');
          `,
        }}
      ></script>
    </Head>
  );
}
