import { useState } from 'react';
import NameModal from './Modal';

import DragAndDropModal from './Upload';
import LoginPage from './Login';

export default function SimpleInput() {
    const [message, setMessage] = useState('');
    const [showUploadModal, setShowUploadModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            console.log("Submitted:", message);
            setMessage('');
        }
    };

    const openUploadModal = () => setShowUploadModal(true);
    const closeUploadModal = () => setShowUploadModal(false);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-bg-black-black">
            <div className="absolute top-4 right-4 z-10 space-x-4">
                <NameModal />
                <LoginPage />
            </div>
            <h1 className="h-1/6 text-5xl text-gray-50 font-serif">QUINN</h1>
            <div className="w-full max-w-2xl px-4">
                <form onSubmit={handleSubmit} className="relative">
                    <textarea
                        ref={(curser) => {
                            if (curser) {
                                curser.addEventListener('click', () => {
                                    curser.setSelectionRange(0, 0);
                                });
                            }
                        }}
                        placeholder='Type your message here...'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onClick={(e) => {
                            e.currentTarget.setSelectionRange(0, 0);
                        }}
                        onFocus={(e) => {
                            e.currentTarget.setSelectionRange(0, 0);
                        }}
                        className="h-36 w-full text-gray-100 bg-bg-light-black border border-gray-700 rounded-lg py-4 px-4 pr-12 focus:outline-none resize-none"
                    />
                    <button
                        type="button"
                        onClick={openUploadModal}
                        className="absolute right-6 bottom-4 text-gray-300 hover:text-gray-100 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                        </svg>
                    </button>
                </form>
            </div>

            {showUploadModal && (
                <DragAndDropModal
                    isOpen={showUploadModal}
                    onClose={closeUploadModal}
                />
            )}
        </div>
    );
}