import { Link } from "react-router-dom";

export default function Forgot2() {
    return (
        <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Forgot your password?</h2>
            <p className="text-sm text-gray-600 mb-4 text-center">
                No worries, we’ll send you reset instructions.
            </p>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email address</label>
                    <input type="email" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500" />
                </div>
                <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">Send Reset Link</button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                <Link to="/auth/login2" className="text-green-600 hover:underline">Back to login</Link>
            </p>
        </>
    );
}
