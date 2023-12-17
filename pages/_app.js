import React from "react";
import "../styles/global.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Great Intuition</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/public/favicon_io/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/public/favicon_io/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/public/favicon_io/favicon-16x16.png"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
