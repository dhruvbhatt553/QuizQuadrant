import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
    let path = useLocation().pathname;
    return (
        <div className={`bg-slate-300 h-16 flex  font-semibold text items-center justify-between px-4 fixed w-full top-0 ${path === "/exam" ? "hidden" : ""} shadow-lg`}>
            <p className='text-2xl'>
                <Link to={"/"}>
                    Quiz Quadrant
                </Link>
            </p>
            <div className='flex align-middle gap-x-3'>
                <button className='border border-blue-800 p-2'>
                    Make Test/ Mock test
                </button>
                <Link to={"/create-question"}>
                    Create Question
                </Link>
                <Link
                    to={"/create-exam"}
                    state={{
                        localIndex: null
                    }}
                >
                    Create Exam
                </Link>
                <Link
                    to="/profile"
                    state={{
                        userId: 1
                    }}
                >
                    Profile
                </Link>
                <Link to="/auth">
                    <img src="/images/log-in.png"
                        width={"40px"}
                    />
                </Link>
            </div>
        </div>
    );
};