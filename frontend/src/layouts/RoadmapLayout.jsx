import { Outlet } from "react-router-dom"
import { useEffect } from "react";
import NavBar from "#components/Home/NavBar.jsx"

export default function RoadmapLayout(){
     useEffect(() => {
    // disable scroll khi vào trang này
    document.body.style.overflow = "hidden";

    return () => {
      // reset lại khi thoát khỏi layout này
      document.body.style.overflow = "auto";
    };
  }, []);
    return(
    <div className="d-flex flex-column min-vh-100" >
            <NavBar />
            <main className="flex-fill container-fluid px-0 " >
                <Outlet />
            </main>
    </div>
    )
}