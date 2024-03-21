import React from 'react';
import { useLocation } from 'react-router-dom';

export default function NavBar() {
    let path = useLocation().pathname;
    return (
        <div className={`bg-slate-300 h-16 flex  font-semibold text items-center justify-between px-4 fixed w-full top-0 ${path === "/exam" ? "hidden" : ""}`}>
            <p className='text-2xl'>Quiz Quadrant</p>
            <div className='flex align-middle gap-x-3'>
                <button className='border border-blue-800 p-2'>
                    Make Test/ Mock test
                </button>
                <button>

                    <img src="/images/log-in.png"
                        width={ "40px" }
                    />
                </button>
            </div>
        </div>
    );
};