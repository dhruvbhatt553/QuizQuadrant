import React from 'react';

export default function NavBar() {
    return (
        <div className='bg-slate-300 h-16 flex  font-semibold text items-center justify-between px-4'>
            <p className='text-2xl'>Quiz Quadrant</p>
            <div className='flex align-middle gap-x-3'>
                <button className='border border-blue-800 p-2'>
                    Make Test/ Mock test
                </button>
                <button >

                    <img src="/images/log-in.png"
                        width={ "40px" }
                    />
                </button>
            </div>
        </div>
    );
};