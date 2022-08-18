import { NextPage } from 'next';
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

const Document: NextPage = () => {
    return (
        <Html>
            <Head />
            <body>
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-N6DG2D1VYH" strategy="beforeInteractive" />
                <Script
                    id="gtag"
                    dangerouslySetInnerHTML={{
                        __html: " window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-N6DG2D1VYH');",
                    }}
                    strategy="beforeInteractive"
                />
                <Script
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9732665435466396"
                    crossOrigin="anonymous"
                    strategy="beforeInteractive"
                />

                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
