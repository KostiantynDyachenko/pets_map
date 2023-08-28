import React from 'react';

interface IModalProps {
    isOpen: boolean,
    onSubmit: () => void
}

export const Modal = ({isOpen, onSubmit}: IModalProps) => {

    if (!isOpen) return null

    return (
        <div className='absolute flex justify-center w-full top-32'>
            <div className='flex flex-col items-center p-8 bg-white w-72 rounded-xl'>
                <h2 className="mb-3 text-2xl font-semibold">Brrr...</h2>
                <p className='mb-6 text-sm font-normal text-center text-customGray'>We didn’t find anything for your
                    request. Please try to changing the specification.</p>
                <button onClick={onSubmit} className='w-full py-2 text-white bg-orange-500 rounded-xl'>Try again
                </button>
            </div>
        </div>
    );
};


