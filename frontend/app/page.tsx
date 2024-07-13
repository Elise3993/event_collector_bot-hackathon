import type { NextPage } from "next";
import Table from "../components/table";

const Home: NextPage = () => {
  return (
    <>
      <Table />
      <p className="p size_test">ボタンからCASるのHPに行けます！</p>
      <a href="https://cas-ru.com/" className="btn btn-flat">
        <span>PUSH！</span>
      </a>
    </>
  );
};

export default Home;
