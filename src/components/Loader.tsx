import React from 'react';

export const Loader = () => {
    return (
        <div className="bg-white px-3 py-1 rounded-xl mt-5 w-16 h-10 flex justify-center">
            <div className="flex space-x-2 items-center align-center">

                <div className="dot-pulse"></div>

            </div>
        </div>
    );
};
