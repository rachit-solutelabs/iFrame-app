import type { NextPage } from "next";
import Head from "next/head";
import HomeLayout from "../src/components/HomeLayout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>iFrame App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Render webpages inside an iframe" />
      </Head>
      <main>
        <div className="intro-gradient" />
        <HomeLayout />
      </main>
    </>
  );
};

export default Home;
