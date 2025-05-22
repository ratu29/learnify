import { Outlet } from "react-router-dom";

export default function AuthLayout2() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc]">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 font-poppins">
                        <span className="text-green-500">Learnify</span>
                        <span className="text-gray-700"> Admin</span>
                    </h1>
                </div>

                <Outlet />

                <p className="text-center text-sm text-gray-400 mt-6">
                    © 2025 Learnify Dashboard. All rights reserved.
                </p>
            </div>
        </div>
    );
}
