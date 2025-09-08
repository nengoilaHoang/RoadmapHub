import { Outlet } from "react-router-dom"
import { useEffect } from "react";
import NavBar from "#components/Home/NavBar.jsx"

export default function RoadmapViewLayout(){
     useEffect(() => {

    return () => {
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