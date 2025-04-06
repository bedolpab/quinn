import React, { useState } from "react";

export default function LoginPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [Data, setData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(Data);
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
                Log In
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-bg-black-blackblack bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-bg-light-black p-10 rounded-3xl w-full max-w-2xl">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-100">Log In</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-200 text-2xl"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mt-8">
                                <label htmlFor="email" className="block text-xl font-medium text-gray-300 mb-4">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={Data.email}
                                    onChange={handleChange}
                                    className="w-full px-8 py-5 text-xl rounded-2xl bg-bg-light-black border border-gray-700 text-gray-100 focus:outline-none"
                                    placeholder="Enter email address"
                                    required
                                />
                            </div>

                            <div className="mt-8">
                                <label htmlFor="password" className="block text-xl font-medium text-gray-300 mb-4">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={Data.password}
                                    onChange={handleChange}
                                    className="w-full px-8 py-5 text-xl rounded-2xl bg-bg-light-black border border-gray-700 text-gray-100 focus:outline-none"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-12 bg-gray-700 hover:bg-gray-600 text-white py-5 px-8 rounded-2xl text-xl font-medium"
                            >
                                Log In
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}