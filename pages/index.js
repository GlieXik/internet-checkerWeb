import Head from "next/head";

import Signal from "../components/signal";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

export default function Home() {
  const [status, setStatus] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios(process.env.URL);
      setStatus(data.data.resoult);
      setLoading(false);
    };

    fetchData().catch(console.error);
  }, []);
  console.log("====================================");
  console.log(status);
  console.log("====================================");
  return (
    <>
      <Head>
        <title>Signal</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {isLoading ? <Loading /> : <Signal status={status} />}
    </>
  );
}
