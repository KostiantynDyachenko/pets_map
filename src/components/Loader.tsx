import React from 'react';

export const Loader = () => {
    return (
        <div className="flex justify-center w-16 h-10 px-3 py-1 mt-5 bg-white rounded-xl">
            <div className="flex items-center space-x-2 align-center">
                <div className="dot-pulse"></div>
            </div>
        </div>
    );
};
