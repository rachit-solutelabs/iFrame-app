import type { NextPage } from "next";
import HomeLayout from "../src/components/HomeLayout";

const Home: NextPage = () => {
  return (
    <main>
      <div className="intro-gradient" />
      <HomeLayout />
    </main>
  );
};

export default Home;
