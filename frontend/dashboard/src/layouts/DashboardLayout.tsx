import { Component, JSX } from "solid-js";
import Sidebar from "../components/Sidebar";

const DashboardLayout: Component<{ children: JSX.Element }> = (props) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "1rem" }}>
        {props.children}
      </main>
    </div>
  );
};

export default DashboardLayout;