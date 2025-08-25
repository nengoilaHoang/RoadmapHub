import { Outlet } from "react-router-dom";
import NavBar from '#components/Home/NavBar.jsx';
import Footer from '#components/Home/Footer.jsx';
export default function HomeLayout(){
    return (
        <div className="d-flex flex-column min-vh-100">
            <NavBar />
            <main className="flex-fill container my-4">
            <Outlet />
            </main>
            <Footer />
        </div>
    );
}