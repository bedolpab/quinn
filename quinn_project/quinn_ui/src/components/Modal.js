import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

export default function MultiStepModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [Data, setData] = useState({
        firstName: '',
        lastName: '',
        institutionName: '',
        fieldOfStudy: '',
        enrollmentYear: ''
    });
    const [majorsSuggestions, setMajorsSuggestions] = useState([]);
    const [institutionSuggestions, setInstitutionSuggestions] = useState([]);
    const [showMajorsSuggestions, setShowMajorsSuggestions] = useState(false);
    const [showInstitutionSuggestions, setShowInstitutionSuggestions] = useState(false);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
    const majors = [
        "Accountancy",
        "Accountancy + Data Science",
        "Advertising",
        "Aerospace Engineering",
        "Agricultural & Biological Engineering",
        "Agricultural & Consumer Economics",
        "Agricultural Leadership, Education & Communications",
        "Agronomy",
        "Animal Sciences",
        "Architectural Studies",
        "Biochemistry",
        "Bioengineering",
        "Business + Data Science",
        "Chemical Engineering",
        "Chemical Engineering + Data Science",
        "Chemistry",
        "Civil Engineering",
        "Community Health",
        "Computer Engineering",
        "Computer Science + Advertising",
        "Computer Science + Animal Sciences",
        "Computer Science + Anthropology",
        "Computer Science + Astronomy",
        "Computer Science + Bioengineering",
        "Computer Science + Chemistry",
        "Computer Science + Crop Sciences",
        "Computer Science + Economics",
        "Computer Science + Education",
        "Computer Science + Linguistics",
        "Computer Science + Music",
        "Computer Science + Physics",
        "Crop Sciences",
        "Dietetics & Nutrition",
        "Electrical Engineering",
        "Elementary Education",
        "Engineering Mechanics",
        "Engineering Technology & Management for Agricultural Systems",
        "Environmental Engineering",
        "Finance",
        "Finance + Data Science",
        "Food Science",
        "Geology",
        "Hospitality Management",
        "Human Development & Family Studies",
        "Industrial Engineering",
        "Information Sciences",
        "Information Sciences + Data Science",
        "Information Systems",
        "Innovation, Leadership & Engineering Entrepreneurship",
        "Interdisciplinary Health Sciences",
        "Journalism",
        "Kinesiology",
        "Learning and Education Studies",
        "Management",
        "Marketing",
        "Materials Science and Engineering",
        "Mechanical Engineering",
        "Media & Cinema Studies",
        "Middle Grades Education",
        "Natural Resources & Environmental Sciences",
        "Neural Engineering",
        "Nuclear, Plasma, & Radiological Engineering",
        "Nutrition & Health",
        "Operations Management",
        "Physics",
        "Plant Biotechnology",
        "Recreation, Sport, & Tourism",
        "Secondary Education",
        "Special Education",
        "Speech & Hearing Science",
        "Strategy, Innovation, & Entrepreneurship",
        "Supply Chain Management",
        "Sustainability in Food & Environmental Systems",
        "Systems Engineering & Design",
        "Teaching Middle Grades Education"
    ];

    const institutions = [
        "University of Illinois Urbana-Champaign",
        "Harvard University",
        "Stanford University",
        "Massachusetts Institute of Technology",
        "California Institute of Technology",
        "University of California, Berkeley",
        "University of Oxford",
        "University of Cambridge",
        "Princeton University",
        "Yale University",
        "Columbia University",
        "University of Chicago",
        "University of Michigan, Ann Arbor",
        "Carnegie Mellon University",
        "University of California, Los Angeles"
    ];


    const majorsFuse = new Fuse(majors, {
        includeScore: true,
        threshold: 0.3
    });

    const institutionsFuse = new Fuse(institutions, {
        includeScore: true,
        threshold: 0.3
    });

    useEffect(() => {
        if (Data.fieldOfStudy.trim() === '') {
            setMajorsSuggestions([]);
            return;
        }
        const results = majorsFuse.search(Data.fieldOfStudy);
        setMajorsSuggestions(results.map(result => result.item));
    }, [Data.fieldOfStudy]);

    useEffect(() => {
        if (Data.institutionName.trim() === '') {
            setInstitutionSuggestions([]);
            return;
        }
        const results = institutionsFuse.search(Data.institutionName);
        setInstitutionSuggestions(results.map(result => result.item));
    }, [Data.institutionName]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleInstitutionSelect = (institution) => {
        setData(prev => ({
            ...prev,
            institutionName: institution
        }));
        setShowInstitutionSuggestions(false);
    };

    const handleMajorSelect = (major) => {
        setData(prev => ({
            ...prev,
            fieldOfStudy: major
        }));
        setShowMajorsSuggestions(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
            return;
        }

        const payload = {
            user: {
                username: `${Data.firstName.toLowerCase()}${Data.lastName.toLowerCase()}`,
                first_name: Data.firstName,
                last_name: Data.lastName,
                email: `${Data.firstName.toLowerCase()}.${Data.lastName.toLowerCase()}@example.com`,
                password: 'password' 
            },
            year_entering: Data.enrollmentYear,
            expected_grad_date: `${parseInt(Data.enrollmentYear) + 4}-05-15`,
            major: Data.fieldOfStudy
        };

        try {
            const res = await fetch('http://localhost:8000/api/signup/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await res.json();
            console.log('Server response:', result);

            if (res.ok) {
                alert('Signup successful!');
                setIsOpen(false);
                setStep(1);
                setData({
                    firstName: '',
                    lastName: '',
                    institutionName: '',
                    fieldOfStudy: '',
                    enrollmentYear: ''
                });
            } else {
                alert(`Signup failed: ${result?.detail || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('There was an error signing up.');
        }
    };

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
        } else {
            setIsOpen(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
                Sign Up
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-bg-black-black bg-opacity-60 flex items-center justify-center p-4 w-full">
                    <div className="bg-bg-black-black rounded-xl p-8 max-w-5xl w-[90%] mx-4">
                        <div className="text-5xl md:text-6xl font-serif mb-12 text-gray-300 text-center">
                            <h1>{step === 1 ? 'Tell us about yourself' : 'Education Information'}</h1>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="w-full px-8">
                                {step === 1 ? (
                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="flex-1">
                                            <label htmlFor="firstName" className="block text-xl font-medium text-gray-300 mb-4">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={Data.firstName}
                                                onChange={handleChange}
                                                className="w-full px-8 py-5 text-xl rounded-2xl bg-bg-light-black border border-gray-700 text-gray-100 focus:outline-none"
                                                placeholder="Enter first name"
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label htmlFor="lastName" className="block text-xl font-medium text-gray-300 mb-4">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={Data.lastName}
                                                onChange={handleChange}
                                                className="w-full px-8 py-5 text-xl rounded-2xl bg-bg-light-black border border-gray-700 text-gray-100 focus:outline-none"
                                                placeholder="Enter last name"
                                                required
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="relative">
                                            <label htmlFor="institutionName" className="block text-xl font-medium text-gray-300 mb-4">
                                                Institution Name
                                            </label>
                                            <input
                                                type="text"
                                                id="institutionName"
                                                name="institutionName"
                                                value={Data.institutionName}
                                                onChange={handleChange}
                                                onFocus={() => setShowInstitutionSuggestions(true)}
                                                className="w-full px-8 py-5 text-xl rounded-2xl bg-bg-light-black border border-gray-700 text-gray-100 focus:outline-none"
                                                placeholder="Enter Institution Name"
                                                required
                                            />
                                            {showInstitutionSuggestions && institutionSuggestions.length > 0 && (
                                                <div className="absolute z-10 w-full mt-1 max-h-60 overflow-auto rounded-2xl bg-bg-light-black border border-gray-700 shadow-lg">
                                                    {institutionSuggestions.map((institution, index) => (
                                                        <div
                                                            key={index}
                                                            className="px-8 py-4 text-gray-100 hover:bg-gray-700 cursor-pointer"
                                                            onMouseDown={() => handleInstitutionSelect(institution)}
                                                        >
                                                            {institution}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="fieldOfStudy" className="block text-xl font-medium text-gray-300 mb-4">
                                                Field of Study
                                            </label>
                                            <input
                                                type="text"
                                                id="fieldOfStudy"
                                                name="fieldOfStudy"
                                                value={Data.fieldOfStudy}
                                                onChange={handleChange}
                                                onFocus={() => setShowMajorsSuggestions(true)}
                                                className="w-full px-8 py-5 text-xl rounded-2xl bg-bg-light-black border border-gray-700 text-gray-100 focus:outline-none"
                                                placeholder="Enter Field Of Study"
                                                required
                                            />
                                            {showMajorsSuggestions && majorsSuggestions.length > 0 && (
                                                <div className="absolute z-10 w-full mt-1 max-h-60 overflow-auto rounded-2xl bg-bg-light-black border border-gray-700 shadow-lg">
                                                    {majorsSuggestions.map((major, index) => (
                                                        <div
                                                            key={index}
                                                            className="px-8 py-4 text-gray-100 hover:bg-gray-700 cursor-pointer"
                                                            onMouseDown={() => handleMajorSelect(major)}
                                                        >
                                                            {major}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="enrollmentYear" className="block text-xl font-medium text-gray-300 mb-4">
                                                Enrollment Year
                                            </label>
                                            <select
                                                id="enrollmentYear"
                                                name="enrollmentYear"
                                                value={Data.enrollmentYear}
                                                onChange={handleChange}
                                                className="w-full px-4 py-6 text-xl rounded-2xl bg-bg-light-black border border-gray-700 text-gray-300 focus:outline-none"
                                                required
                                            >
                                                <option value="">Select Year</option>
                                                {years.map(year => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between mt-16 px-4">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="h-12 w-[12%] px-4 text-md rounded-2xl bg-gray-700 hover:bg-gray-600 text-white font-medium transition duration-200"
                                    >
                                        {step === 1 ? 'Cancel' : 'Back'}
                                    </button>
                                    <button
                                        type="submit"
                                        className="h-12 w-[12%] px-4 text-lg rounded-2xl bg-gray-700 hover:bg-gray-600 text-white font-medium transition duration-200"
                                    >
                                        {step === 1 ? 'Next' : 'Submit'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}