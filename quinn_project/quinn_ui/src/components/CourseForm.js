import { useState } from 'react';
import Search from './AddCourse';

const ModalButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [courseList, setCourseList] = useState([]); // New state for maintaining the complete list

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    // Function to handle course selection
    const handleCourseSelect = (course) => {
        setSelectedCourses(prev => {
            // Check if course is already selected
            if (prev.some(c => c.id === course.id)) {
                // Remove if already selected
                return prev.filter(c => c.id !== course.id);
            } else {
                // Add if not selected
                return [...prev, course];
            }
        });
    };

    // Function to handle save
    const handleSave = () => {
        // Add the currently selected courses to the courseList
        setCourseList(prev => {
            // Filter out any courses that might already be in the list
            const newCourses = selectedCourses.filter(
                course => !prev.some(c => c.id === course.id)
            );
            return [...prev, ...newCourses];
        });

        // Log the complete list of courses
        console.log("Complete course list:", courseList);

        // Clear the current selection
        setSelectedCourses([]);

        // Close the modal
        toggleModal();
    };

    return (
        <div className="p-4">
            <button
                onClick={toggleModal}
                className="px-4 py-2 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600 transition duration-200"
            >
                Add Courses
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-bg-black-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-bg-light-black rounded-xl p-8 max-w-5xl w-[90%] mx-4">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-100">Add Courses</h3>
                            <button
                                onClick={toggleModal}
                                className="text-gray-400 hover:text-gray-200 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="py-4 text-gray-300">
                            {/* Pass the selection handler to the Search component */}
                            <Search onCourseSelect={handleCourseSelect} />

                            {/* Display selected courses */}
                            {selectedCourses.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-lg font-medium text-gray-100 mb-2">Selected Courses:</h4>
                                    <ul className="space-y-1">
                                        {selectedCourses.map(course => (
                                            <li key={course.id} className="flex items-center">
                                                <span className="text-gray-300">{course.name}</span>
                                                <button
                                                    onClick={() => handleCourseSelect(course)}
                                                    className="ml-2 text-red-400 hover:text-red-300"
                                                >
                                                    ×
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={toggleModal}
                                className="px-4 py-2 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-500"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalButton;