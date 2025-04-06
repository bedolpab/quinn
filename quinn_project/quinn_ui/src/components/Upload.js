import { useState, useCallback } from 'react';

const DragAndDropModal = ({ isOpen, onClose }) => {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles(droppedFiles);
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
    };

    const removeFile = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-bg-black-black rounded-lg p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-gray-300 text-xl font-semibold">Upload Files</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            &times;
                        </button>
                    </div>

                    <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                            }`}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <svg
                                className="w-12 h-12 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                            <p className="text-gray-600">
                                {isDragging ? 'Drop files here' : 'Drag & drop files here or'}
                            </p>
                            <label className="cursor-pointer text-blue-500 hover:text-blue-700">
                                <span>Browse files</span>
                                <input
                                    type="file"
                                    className="hidden"
                                    multiple
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                    </div>

                    {files.length > 0 && (
                        <div className="mt-4 space-y-2">
                            <h3 className="font-medium">Selected Files:</h3>
                            <ul className="max-h-40 overflow-y-auto">
                                {files.map((file, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center p-2 bg-gray-100 rounded"
                                    >
                                        <span className="truncate">{file.name}</span>
                                        <button
                                            onClick={() => removeFile(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            &times;
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="text-gray-300 bg-gray-700 px-4 py-2 border border-gray-700 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                console.log('Uploading files:', files);
                                onClose();
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blu disabled:opacity-75"
                            disabled={files.length === 0}
                        >
                            Upload
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default DragAndDropModal;