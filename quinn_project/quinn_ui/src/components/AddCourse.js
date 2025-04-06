import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const courses = [
        "MATH 101 – College Algebra",
        "MATH 202 – Calculus II",
        "MATH 310 – Linear Algebra",
        "MATH 350 – Discrete Mathematics",
        "MATH 420 – Graph Theory & Applications",
        "STAT 101 – Introduction to Statistics",
        "STAT 250 – Probability & Statistics",
        "PHYS 101 – General Physics",
        "PHYS 201 – Classical Mechanics",
        "PHYS 310 – Quantum Mechanics",
        "CHEM 101 – Introductory Chemistry",
        "CHEM 150 – General Chemistry",
        "CHEM 310 – Organic Chemistry",
        "BIOL 101 – Introduction to Biology",
        "BIOL 210 – Genetics and Evolution",
        "BIOL 310 – Microbiology",
        "BIOL 450 – Neuroscience",
        "CPSC 101 – Introduction to Programming",
        "CPSC 200 – Object-Oriented Programming",
        "CPSC 210 – Data Structures",
        "CPSC 320 – Algorithms and Complexity",
        "CPSC 365 – Game Development with Unity",
        "CPSC 400 – Advanced Software Engineering",
        "CPSC 410 – Software Engineering Principles",
        "CPSC 420 – Computer Graphics",
        "CPSC 430 – Artificial Intelligence Fundamentals",
        "CPSC 440 – Neural Networks and Deep Learning",
        "CPSC 450 – Web Application Development",
        "CPSC 455 – Cloud Computing & DevOps",
        "CPSC 460 – Full Stack Development",
        "CPSC 470 – Machine Learning with Python",
        "CPSC 480 – Blockchain and Cryptography",
        "CPSC 490 – Cybersecurity & Ethical Hacking",
        "CPSC 499 – Capstone Project in Computer Science",
        "ECON 101 – Principles of Economics",
        "ECON 200 – Microeconomics",
        "ECON 210 – Macroeconomics",
        "ECON 305 – Game Theory in Economics",
        "PSYC 101 – Introduction to Psychology",
        "PSYC 210 – Cognitive Psychology",
        "PSYC 315 – Behavioral Neuroscience",
        "SOC 101 – Introduction to Sociology",
        "SOC 250 – Social Inequality and Justice",
        "ANTH 101 – Cultural Anthropology",
        "ANTH 250 – Human Evolution",
        "HIST 101 – Ancient Civilizations",
        "HIST 205 – Modern World History",
        "HIST 310 – History of Science and Technology",
        "PHIL 101 – Introduction to Philosophy",
        "PHIL 205 – Ethics and Moral Philosophy",
        "PHIL 320 – Logic and Critical Thinking",
        "ENG 101 – English Composition",
        "ENG 210 – Creative Writing",
        "ENG 310 – Shakespeare and His Works",
        "LING 101 – Introduction to Linguistics",
        "LING 250 – Sociolinguistics",
        "COM 101 – Public Speaking",
        "COM 250 – Digital Media and Communication",
        "BUS 101 – Introduction to Business",
        "BUS 210 – Marketing Strategies",
        "BUS 310 – Corporate Finance",
        "BUS 420 – Entrepreneurship and Startups",
        "ACC 101 – Financial Accounting",
        "ACC 250 – Managerial Accounting",
        "MIS 101 – Management Information Systems",
        "MIS 350 – Data Analytics for Business",
        "POLI 101 – Introduction to Political Science",
        "POLI 250 – International Relations",
        "POLI 310 – Public Policy and Governance",
        "LAW 101 – Introduction to Law",
        "LAW 210 – Criminal Law",
        "LAW 350 – Business Law",
        "ART 101 – Art History and Appreciation",
        "ART 250 – Digital Art and Design",
        "MUS 101 – Music Theory",
        "MUS 210 – History of Classical Music",
        "THEA 101 – Introduction to Theatre",
        "THEA 250 – Acting and Performance",
        "EDUC 101 – Foundations of Education",
        "EDUC 310 – Educational Psychology",
        "NURS 101 – Introduction to Nursing",
        "NURS 250 – Human Anatomy for Nurses",
        "MED 101 – Introduction to Medicine",
        "MED 310 – Human Physiology",
        "PHARM 101 – Introduction to Pharmacology",
        "PHARM 250 – Drug Interactions and Effects",
        "ENV 101 – Environmental Science",
        "ENV 210 – Sustainability and Climate Change",
        "GEO 101 – Physical Geography",
        "GEO 250 – Geospatial Analysis",
        "ASTRO 101 – Introduction to Astronomy",
        "ASTRO 250 – Cosmology and the Universe",
        "ENGR 101 – Introduction to Engineering",
        "ENGR 210 – Circuit Analysis",
        "ENGR 310 – Robotics and Automation",
        "DATA 101 – Introduction to Data Science",
        "DATA 250 – Big Data Analytics",
        "DATA 400 – Deep Learning and AI",
        "CYBER 101 – Introduction to Cybersecurity",
        "CYBER 250 – Ethical Hacking and Pen Testing",
        "AI 101 – Artificial Intelligence Basics",
        "AI 310 – Advanced AI and Reinforcement Learning"
    ];

    // Initialize Fuse.js with courses
    const coursesFuse = new Fuse(courses, {
        includeScore: true,
        threshold: 0.3,
    });

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const results = coursesFuse.search(searchQuery);
        setSuggestions(results.map(result => result.item));
        setShowSuggestions(true);
    }, [searchQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() && suggestions.length > 0) {
            setSelectedCourse(suggestions[0]);
            console.log("Selected course:", suggestions[0]);
            setSearchQuery('');
            setShowSuggestions(false);
        }
    };

    const handleCourseSelect = (course) => {
        setSelectedCourse(course);
        console.log("Selected course:", course);
        setSearchQuery('');
        setShowSuggestions(false);
    };

    return (
        <div className="w-full max-w-2xl px-4 mb-8 relative">
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-gray-100 bg-bg-light-black border border-gray-700 rounded-lg py-3 px-4 pr-12 focus:outline-none"
                    autoComplete="off"
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

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-bg-light-black border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((course, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                            onClick={() => handleCourseSelect(course)}
                        >
                            <div className="font-medium text-gray-100">{course}</div>
                        </div>
                    ))}
                </div>
            )}

            {selectedCourse && (
                <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-100">Selected Course:</h3>
                    <p className="text-gray-300">{selectedCourse}</p>
                </div>
            )}
        </div>
    );
}