import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import data from '../../dummy-data/profile';

export default function Profile() {

    // const { userId } = props.location.state.userId;
    const [userProfile, setUserProfile] = useState(null);
    const location = useLocation();

    const fetchUser = (userId) => {
        // API call ...
        setUserProfile(data);
        console.log(userId);
    }

    useEffect(() => {
        // fetchUser(location.state.userId);
        fetchUser(0);
    }, []);

    return (
        <>
            {
                userProfile &&
                (
                    <div className='w-full px-10 pt-3 pb-10'>
                        <div>
                            <h1 className='text-xl font-bold text-start my-3'>Personal Information:</h1>
                            <div className='text-start text-lg px-3 border-gray-500 border-2 rounded-lg bg-gray-100'>
                                <div className='text-start grid grid-cols-4 my-3'>
                                    <h1 className='col-start-1 col-span-1 font-semibold'>Name</h1>
                                    <h1 className='col-start-2 col-span-3'>{userProfile.name}</h1>
                                </div>
                                <div className='text-start grid grid-cols-4 my-3'>
                                    <h1 className='col-start-1 col-span-1 font-semibold'>Email</h1>
                                    <h1 className='col-start-2 col-span-3'>{userProfile.email}</h1>
                                </div>
                                <div className='text-start grid grid-cols-4 my-3'>
                                    <h1 className='col-start-1 col-span-1 font-semibold'>Role</h1>
                                    <h1 className='col-start-2 col-span-3'>{userProfile.type === "S" ? "STUDENT" : "TEACHER"}</h1>
                                </div>
                            </div>
                        </div>
                        <div hidden={userProfile.type === "S"}>
                            <h1 className='text-xl font-bold text-start mt-10 mb-3'>Exams Created ({userProfile.examsCreated.length}):</h1>
                            <div className='grid lg:grid-cols-4 md:grid-cols-2'>
                                {
                                    userProfile.examsCreated.map((exam) => {
                                        return (
                                            <div className='p-3 m-1 border-gray-500 border-2 rounded-lg bg-gray-100'>
                                                <h1 className='font-semibold text-lg mb-3'>{exam.title}</h1>
                                                <div className=''>
                                                    <div className='grid grid-cols-2 px-5'>
                                                        <span className='text-start font-semibold'>Date:</span>
                                                        <span className='text-start'>{exam.startDate}</span>
                                                    </div>
                                                    <div className='grid grid-cols-2 px-5'>
                                                        <span className='text-start font-semibold'>Time:</span>
                                                        <span className='text-start'>{exam.startTime}</span>
                                                    </div>
                                                    <div className='grid grid-cols-2 px-5'>
                                                        <span className='text-start font-semibold'>Duration:</span>
                                                        <span className='text-start'>{exam.duration} mins</span>
                                                    </div>
                                                    <div className='grid grid-cols-2 px-5'>
                                                        <span className='text-start font-semibold'>Total Marks:</span>
                                                        <span className='text-start'>{exam.totalMarks}</span>
                                                    </div>
                                                    {
                                                        exam.isResultGenerated ?
                                                        (
                                                            <Link 
                                                                to="/result"
                                                                state={{ isLeaderboard: false, examId: exam.id, examName: exam.title, totalMarks: exam.totalMarks }}
                                                                value={exam.id} 
                                                                className='inline-block bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mt-3 font-bold text-white' 
                                                                onClick={(e) => { console.log(e.target.value) }}
                                                            >
                                                                Show Result
                                                            </Link>
                                                        ) : 
                                                        (
                                                            <button 
                                                                value={exam.id} 
                                                                className='bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mt-3 font-bold text-white' 
                                                                onClick={(e) => { console.log(e.target.value) }}
                                                            >
                                                                Generate Result
                                                            </button>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div hidden={userProfile.type === "T"}>
                            <h1 className='text-xl font-bold text-start mt-10 mb-3'>Past Exams ({userProfile.pastExams.length}):</h1>
                            <div className='grid lg:grid-cols-4 md:grid-cols-2'>
                                {
                                    userProfile.pastExams.map((exam) => {
                                        return (
                                            <div className='p-3 m-1 border-gray-500 border-2 rounded-lg bg-gray-100'>
                                                <h1 className='font-semibold text-lg mb-3'>{exam.title}</h1>
                                                <div className=''>
                                                    <div className='grid grid-cols-2 px-5'>
                                                        <span className='text-start font-semibold'>Date:</span>
                                                        <span className='text-start'>{exam.startDate}</span>
                                                    </div>
                                                    <div className='grid grid-cols-2 px-5'>
                                                        <span className='text-start font-semibold'>Time:</span>
                                                        <span className='text-start'>{exam.startTime}</span>
                                                    </div>
                                                    <div className='grid grid-cols-2 px-5'>
                                                        <span className='text-start font-semibold'>Duration:</span>
                                                        <span className='text-start'>{exam.duration} mins</span>
                                                    </div>
                                                    <div className='grid grid-cols-2 px-5'>
                                                        <span className='text-start font-semibold'>Total Marks:</span>
                                                        <span className='text-start'>{exam.totalMarks}</span>
                                                    </div>
                                                    {
                                                        exam.isResultGenerated &&
                                                        (
                                                            <>
                                                                <div className='grid grid-cols-2 px-5'>
                                                                    <span className='text-start font-semibold'>Score:</span>
                                                                    <span className='text-start'>{exam.isPresent ? exam.obtainedMarks : "AB"}</span>
                                                                </div>
                                                                <Link
                                                                    to="/leaderboard" 
                                                                    state={{ isLeaderboard: true, examId: exam.id, examName: exam.title, totalMarks: exam.totalMarks, obtainedMarks: exam.obtainedMarks, isPresent: exam.isPresent }}
                                                                    value={exam.id} 
                                                                    className='inline-block bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mt-3 font-bold text-white' 
                                                                    onClick={(e) => { console.log(e.target.value) }}
                                                                >
                                                                    Leaderboard
                                                                </Link>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div hidden={userProfile.type === "T"}>
                            <h1 className='text-xl font-bold text-start mt-10 mb-3'>Ongoing Exams ({userProfile.ongoingExams.length}):</h1>
                            <div className='grid lg:grid-cols-4 md:grid-cols-2'>
                                {
                                    userProfile.ongoingExams.map((exam) => {
                                        return (
                                            <div className='p-3 m-1 border-gray-500 border-2 rounded-lg bg-gray-100'>
                                                <h1 className='font-semibold text-lg mb-3'>{exam.title}</h1>
                                                <div className=''>
                                                    <div className='grid grid-cols-2 px-5'>
                                                        <span className='text-start font-semibold'>Date:</span>
                                                        <span className='text-start'>{exam.startDate}</span>
                                                    </div>
                                                    <div className='grid grid-cols-2 px-5'>
                                                        <span className='text-start font-semibold'>Time:</span>
                                                        <span className='text-start'>{exam.startTime}</span>
                                                    </div>
                                                    <div className='grid grid-cols-2 px-5'>
                                                        <span className='text-start font-semibold'>Duration:</span>
                                                        <span className='text-start'>{exam.duration} mins</span>
                                                    </div>
                                                    <div className='grid grid-cols-2 px-5'>
                                                        <span className='text-start font-semibold'>Total Marks:</span>
                                                        <span className='text-start'>{exam.totalMarks}</span>
                                                    </div>
                                                    <button value={exam.id} className='bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mt-3 font-bold text-white' onClick={(e) => { console.log(e.target.value) }}>Enter Exam</button>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div hidden={userProfile.type === "T"}>
                            <h1 className='text-xl font-bold text-start mt-10 mb-3'>Future Exams ({userProfile.futureExams.length}):</h1>
                            <div className='grid lg:grid-cols-4 md:grid-cols-2'>
                                {
                                    userProfile.futureExams.map((exam) => {
                                        return (
                                            <div className='p-3 m-1 border-gray-500 border-2 rounded-lg bg-gray-100'>
                                                <h1 className='font-semibold text-lg mb-3'>{exam.title}</h1>
                                                <div className=''>
                                                    <div className='grid grid-cols-2 px-5'>
                                                        <span className='text-start font-semibold'>Date:</span>
                                                        <span className='text-start'>{exam.startDate}</span>
                                                    </div>
                                                    <div className='grid grid-cols-2 px-5'>
                                                        <span className='text-start font-semibold'>Time:</span>
                                                        <span className='text-start'>{exam.startTime}</span>
                                                    </div>
                                                    <div className='grid grid-cols-2 px-5'>
                                                        <span className='text-start font-semibold'>Duration:</span>
                                                        <span className='text-start'>{exam.duration} mins</span>
                                                    </div>
                                                    <div className='grid grid-cols-2 px-5'>
                                                        <span className='text-start font-semibold'>Total Marks:</span>
                                                        <span className='text-start'>{exam.totalMarks}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}