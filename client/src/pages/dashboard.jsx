import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Dashsidebar from "../components/dashsidebar";
import Dashprofile from "../components/Dashprofile";

export default function dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    // console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/*Sidebar */}
        <Dashsidebar />
      </div>
      {/* Profile */}
      {tab === "profile" && <Dashprofile />}
    </div>
  );
}
