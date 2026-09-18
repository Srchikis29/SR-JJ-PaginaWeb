import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout() {
    return (
    <div className="flex min-h-screen flex-col bg-brand-ivory font-body text-brand-charcoal">
        <Navbar />
        <main className="min-w-0 flex-1">
        <Outlet />
        </main>
        <Footer />
    </div>
    );
}

export default Layout;
