import Header from "../common/Header";
import Contents from "./Contents";
import Menu from "./Menu";
import { AdminProps } from "@pkg/types";
import { useState } from "react";
import Footer from "../common/Footer";

const Admin = ({ url, isSide, setIsSide }: AdminProps) => {
  const menu = ["담당자관리"];
  const [menuActive, setMenuActive] = useState({
    name: "담당자관리",
    icon: "ico01",
  });
  return (
    <div className="admin_page">
      <Header url={url} isSide={isSide} setIsSide={setIsSide} />
      <main>
        <Menu menu={menu} setMenuActive={setMenuActive} />
        <Contents url={url} menuActive={menuActive} />
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
