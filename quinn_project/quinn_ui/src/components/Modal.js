import { useState } from 'react';

export default function MultiStepModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [Data, setData] = useState({
        firstName: '',
        lastName: '',
        InstitutionName: '',
        FieldOfStudy: ''
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
        if (step === 1) {
            setStep(2);
        } else {
            console.log('Submitted:', Data);
            setIsOpen(false);
            setStep(1);
            setData({
                firstName: '',
                lastName: '',
                InstitutionName: '',
                FieldOfStudy: ''
            });
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
                    <div className="bg-bg-black-black rounded-xl p-8 max-w-4xl w-full mx-4">
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
                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="flex-1">
                                            <label htmlFor="university" className="block text-xl font-medium text-gray-300 mb-4">
                                                University
                                            </label>
                                            <input
                                                type="text"
                                                id="university"
                                                name="university"
                                                value={Data.university}
                                                onChange={handleChange}
                                                className="w-full px-8 py-5 text-xl rounded-2xl bg-bg-light-black border border-gray-700 text-gray-100 focus:outline-none"
                                                placeholder="Enter university"
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label htmlFor="major" className="block text-xl font-medium text-gray-300 mb-4">
                                                Major
                                            </label>
                                            <input
                                                type="text"
                                                id="major"
                                                name="major"
                                                value={Data.major}
                                                onChange={handleChange}
                                                className="w-full px-8 py-5 text-xl rounded-2xl bg-bg-light-black border border-gray-700 text-gray-100 focus:outline-none"
                                                placeholder="Enter major"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between mt-16 px-4">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="px-8 py-5 text-xl rounded-2xl bg-gray-700 hover:bg-gray-600 text-white font-medium transition duration-200"
                                    >
                                        {step === 1 ? 'Cancel' : 'Back'}
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-5 text-xl rounded-2xl bg-gray-700 hover:bg-gray-600 text-white font-medium transition duration-200"
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