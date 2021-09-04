import Layout from "components/teacher/Layout";
import { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <div className="z-10 fixed top-0 w-full">
        <Head>
          <title>Home</title>
          <meta name="description" content="Welcome to AIC" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Layout />
        </main>
      </div>
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(61,216,220,1) 0%, rgba(29,148,190,1) 50%, rgba(7,57,152,1) 100%)",
        }}
        className="z-0 h-screen w-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
      >
        {/* <BackgroundImage /> */}
      </div>
    </>
  );
};

export default Home;
