import React, {useContext, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import authContext from "../context/auth/authContext";

export default function NavBar() {
    let path = useLocation().pathname;
    const {isAuthenticated, user, logout} = useContext(authContext);

    return (
        <div
            className={`bg-slate-300 h-16 flex  font-semibold text items-center justify-between px-4 fixed w-full top-0 ${path === "/exam" ? "hidden" : ""} shadow-lg`}>
            <p className='text-2xl'>
                <Link to={"/"}>
                    Quiz Quadrant
                </Link>
            </p>
            {
                isAuthenticated ?
                    (
                        <div className='flex items-center gap-x-3'>
                            {
                                user && user.type === "T" &&
                                (
                                    <>
                                        <Link
                                            to={"/create-question"}
                                        >
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
                                    </>
                                )
                            }
                            {
                                user && user.type === "S" &&
                                <Link
                                    to={"/mock-test"}
                                >
                                    Create Mock Test
                                </Link>
                            }
                            <button onClick={() => { logout() }}>
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
    );
};