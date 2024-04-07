import React, {useContext, useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import authContext from "../context/auth/authContext";

export default function NavBar() {
    let path = useLocation().pathname;
    const {isAuthenticated, user, logout} = useContext(authContext);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const handleMenuVisiblity = () => {
        setIsMenuVisible((isMenuVisible) => { return !isMenuVisible });
    }

    return (
        <div
            className={`bg-slate-300 h-16 flex  font-semibold text items-center justify-between px-4 fixed w-full top-0 ${path === "/exam" ? "hidden" : ""} shadow-lg`}
        >
            <p className='text-2xl'>
                <Link to={"/"}>
                    Quiz Quadrant
                </Link>
            </p>
            <div className="hidden xl:block">
                {
                    isAuthenticated ?
                        (
                            <div className='flex items-center gap-x-3'>
                                {
                                    user && user.type === "T" &&
                                    (
                                        <>
                                            <Link
                                                className="bg-blue-400 px-3 py-2 rounded-full"
                                                to={"/create-question"}
                                            >
                                                Create Question
                                            </Link>
                                            <Link
                                                className="bg-blue-400 px-3 py-2 rounded-full"
                                                to={"/create-exam"}
                                                state={{
                                                    localIndex: null
                                                }}
                                            >
                                                Create Exam
                                            </Link>
                                        </>
                                    )
                                }
                                {
                                    user && user.type === "S" &&
                                    <Link
                                        className="bg-blue-400 px-3 py-2 rounded-full"
                                        to={"/mock-test"}
                                    >
                                        Create Mock Test
                                    </Link>
                                }
                                <button
                                    className="bg-red-400 px-3 py-2 rounded-full"
                                    onClick={() => { logout() }}
                                >
                                    Logout
                                </button>
                                <Link
                                    to="/profile"
                                    state={{
                                        userId: user.userId
                                    }}
                                >
                                    <img
                                        className="rounded-full"
                                        src="/images/profile.jpg"
                                        width={"40px"}
                                        alt={"USER"}
                                    />
                                </Link>
                            </div>
                        ) :
                        (
                            <Link to="/auth">
                                <img src="/images/log-in.png"
                                     width={"40px"}
                                />
                            </Link>
                        )
                }
            </div>
            <div className="xl:hidden">
                <button type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 border-2 border-gray-500"
                        onClick={handleMenuVisiblity}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div
                    className="w-full"
                    id="navbar-default"
                    hidden={!isMenuVisible}
                >
                    <div className="absolute end-0 top-16 bg-gray-100 border-2 rounded-lg p-3 border-gray-700">
                        {
                            isAuthenticated ?
                                (
                                    <div className='justify-items-center'>
                                        {
                                            user && user.type === "T" &&
                                            (
                                                <>
                                                    <Link
                                                        className="mx-5 px-3 py-2 block"
                                                        to={"/create-question"}
                                                    >
                                                        Create Question
                                                    </Link>
                                                    <Link
                                                        className="mx-5 px-3 py-2 block"
                                                        to={"/create-exam"}
                                                        state={{
                                                            localIndex: null
                                                        }}
                                                    >
                                                        Create Exam
                                                    </Link>
                                                </>
                                            )
                                        }
                                        {
                                            user && user.type === "S" &&
                                            <Link
                                                className="mx-5 px-3 py-2 block"
                                                to={"/mock-test"}
                                            >
                                                Create Mock Test
                                            </Link>
                                        }
                                        <div
                                            className="mx-5 px-3 py-2 block"
                                            onClick={() => { logout() }}
                                        >
                                            Logout
                                        </div>
                                        <Link
                                            className="mx-5 px-3 py-2 block"
                                            to="/profile"
                                            state={{
                                                userId: user.userId
                                            }}
                                        >
                                            Profile
                                        </Link>
                                    </div>
                                ) :
                                (
                                    <Link to="/auth">
                                        Login
                                    </Link>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};