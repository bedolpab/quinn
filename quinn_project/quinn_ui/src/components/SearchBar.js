import { useState } from 'react';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState(''); // New state for search


    course = [

    ]

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log("Searching for:", searchQuery);
        }
    };

    return (

        <div className="w-full max-w-2xl px-4 mb-8">
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-gray-100 bg-bg-light-black border border-gray-700 rounded-lg py-3 px-4 pr-12 focus:outline-none"
                />
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </form>
        </div>
    );
}