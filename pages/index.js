import Head from "next/head";

import Signal from "../components/signal";
import axios from "axios";
export const getStaticProps = async () => {
  const res = await axios(process.env.URL);
  if (!res) {
    return {
      noFound: null, // will be passed to the page component as props
    };
  }
  return {
    props: { status: res.data.status }, // will be passed to the page component as props
  };
};
export default function Home({ status }) {
  return (
    <>
      <Head>
        <title>Signal</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Signal status={status} />
    </>
  );
}
