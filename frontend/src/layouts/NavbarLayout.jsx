import { Outlet } from "react-router-dom"
import NavBar from "#components/Home/NavBar.jsx"
export default function NavbarLayout(){
    return(
    <div className="d-flex flex-column min-vh-100">
            <NavBar />
            <main className="flex-fill container my-4">
                <Outlet />
            </main>
    </div>
    )
}