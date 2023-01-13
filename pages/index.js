import Head from "next/head";

import Signal from "../components/signal";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

export default function Home() {
  const [status, setStatus] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    window.onblur = function () {
      window.onfocus = function () {
        location.reload(true);
      };
    };
    const fetchData = async () => {
      try {
        const { data } = await axios("/api/fetch");

        setStatus(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Signal</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale = 1, shrink-to-fit = no"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#07070f"
        />
      </Head>

      {isLoading ? <Loading /> : <Signal status={status} />}
    </>
  );
}
