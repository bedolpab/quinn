import { useState } from 'react';
import NameModal from './Modal';


export default function SimpleInput() {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            console.log("Submitted:", message);
            setMessage('');
        }
    };

    return (
        //text box for user input --- After output from AI
        <div className="flex flex-col items-center justify-center h-screen bg-bg-black-black">
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
                </form>
            </div>
            <div className='pt-4'>
                <NameModal />
            </div>
            {/* <div className='pt-4'>
                <Search />

            </div> */}

        </div>
    );
}