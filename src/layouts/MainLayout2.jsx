import { Outlet } from "react-router-dom";
import Sidebar2 from "../components/Sidebar2";
import Header2 from "../components/Header2";

export default function MainLayout2() {
    return (
        <div className="flex bg-[#f8f9fc] min-h-screen font-poppins">
            <Sidebar2 />
            <div className="flex flex-col flex-1">
                <Header2 />
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
