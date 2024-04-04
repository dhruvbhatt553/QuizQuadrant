import React, {useContext, useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import profileContext from "../../context/profile/profileContext";
import localStorageContext from '../../context/local-storage/localStorageContext';

export default function Profile() {

    const location = useLocation();
    const {userId} = location.state;
    const [userProfile, setUserProfile] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [localSavedExams, setLocalSavedExams] = useState([]);
    const {fetchProfile, generateResult} = useContext(profileContext);
    const {setExams, getExams} = useContext(localStorageContext);

    const handleGenerateResult = async (index) => {
        setIsGenerating((isGenerating) => {
            return true;
        });
        let tempUser = new Object(userProfile);
        const response = await generateResult(userProfile.examsCreated[index].id);
        console.log("iskdhbvkhasbgkjasfbksbf: ", userProfile.examsCreated[index].id);
        console.log("response: " + response);
        tempUser.examsCreated[index].isResultGenerated = true;
        setUserProfile(tempUser);
        setIsGenerating((isGenerating) => {
            return false;
        });
    }

    const handleDeleteLocalSavedExam = (index) => {
        const allExams = getExams();
        const newExams = [];
        allExams.map((exam, i) => {
            if (i !== index) {
                newExams.push(exam);
            }
        });
        setExams(newExams);
        setLocalSavedExams(newExams);
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchProfile(userId);
            const allExams = getExams();
            setUserProfile(data);
            if (allExams) setLocalSavedExams(allExams);
            console.log(data);
            console.log(allExams);
        };
        fetchData();
    }, []);

    return (
        <>
            {
                userProfile ?
                    (
                        <div className='w-full px-10 pt-3 pb-10'>
                            <div>
                                <h1 className='text-xl font-bold text-start my-3'>Personal Information:</h1>
                                <div
                                    className='text-start text-lg px-3 border-gray-500 border-2 rounded-lg bg-gray-100'>
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
                            {
                                userProfile.type === "T" &&
                                (
                                    <>
                                        <div>
                                            <h1 className='text-xl font-bold text-start mt-10 mb-3'>Exams Created
                                                ({userProfile.examsCreated.length}):</h1>
                                            <div className='grid lg:grid-cols-4 md:grid-cols-2'>
                                                {
                                                    userProfile.examsCreated.map((exam, index) => {
                                                        return (
                                                            <div
                                                                className='p-3 m-1 border-gray-500 border-2 rounded-lg bg-gray-100'>
                                                                <h1 className='font-semibold text-lg mb-3'>{exam.title}</h1>
                                                                <div className=''>
                                                                    <div className='grid grid-cols-2 px-5'>
                                                                        <span
                                                                            className='text-start font-semibold'>Date:</span>
                                                                        <span
                                                                            className='text-start'>{exam.startDate}</span>
                                                                    </div>
                                                                    <div className='grid grid-cols-2 px-5'>
                                                                        <span
                                                                            className='text-start font-semibold'>Time:</span>
                                                                        <span
                                                                            className='text-start'>{exam.startTime}</span>
                                                                    </div>
                                                                    <div className='grid grid-cols-2 px-5'>
                                                                        <span
                                                                            className='text-start font-semibold'>Duration:</span>
                                                                        <span
                                                                            className='text-start'>{exam.duration} mins</span>
                                                                    </div>
                                                                    <div className='grid grid-cols-2 px-5'>
                                                                        <span
                                                                            className='text-start font-semibold'>Total Marks:</span>
                                                                        <span
                                                                            className='text-start'>{exam.totalMarks}</span>
                                                                    </div>
                                                                    {
                                                                        ((new Date(exam.startDate + " " + exam.startTime)) < (new Date(Date.now()) - (exam.duration * 60 * 1000))) &&
                                                                        (
                                                                            exam.isResultGenerated ?
                                                                                (
                                                                                    <Link
                                                                                        to="/result"
                                                                                        state={{
                                                                                            isLeaderboard: false,
                                                                                            examId: exam.id,
                                                                                            examName: exam.title,
                                                                                            totalMarks: exam.totalMarks
                                                                                        }}
                                                                                        value={exam.id}
                                                                                        className='inline-block bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mt-3 font-bold text-white'
                                                                                        onClick={(e) => {
                                                                                            console.log(e.target.value)
                                                                                        }}
                                                                                    >
                                                                                        Show Result
                                                                                    </Link>
                                                                                ) :
                                                                                (
                                                                                    <button
                                                                                        value={exam.id}
                                                                                        className={`bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mt-3 font-bold text-white disabled:pointer-events-none disabled:bg-red-600`}
                                                                                        disabled={isGenerating}
                                                                                        onClick={async (e) => {
                                                                                            await handleGenerateResult(index);
                                                                                        }}
                                                                                    >
                                                                                        {isGenerating ? "Generating Result ..." : "Generate Result"}
                                                                                    </button>
                                                                                )
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            <h1 className='text-xl font-bold text-start mt-10 mb-3'>
                                                Exams saved to Local ({localSavedExams.length}):
                                            </h1>
                                            <div className='grid lg:grid-cols-3 md:grid-cols-2'>
                                                {
                                                    localSavedExams.map((exam, index) => {
                                                        return (
                                                            <div
                                                                className='p-3 m-1 border-gray-500 border-2 rounded-lg bg-gray-100'
                                                            >
                                                                <h1 className='font-semibold text-lg mb-3'>Local Saved
                                                                    Exam - {index + 1}</h1>
                                                                <div className=''>
                                                                    <div className='grid grid-cols-2 px-5'>
                                                                        <span className='text-start font-semibold'>
                                                                            Last Modified Date:
                                                                        </span>
                                                                        <span className='text-start'>
                                                                            {exam.lastModifiedDate.substring(0, 10)}
                                                                        </span>
                                                                    </div>
                                                                    <div className='grid grid-cols-2 px-5'>
                                                                        <span className='text-start font-semibold'>
                                                                            Last Modified Time:
                                                                        </span>
                                                                        <span className='text-start'>
                                                                            {exam.lastModifiedDate.substring(11, 16)}
                                                                        </span>
                                                                    </div>
                                                                    <Link
                                                                        to="/create-exam"
                                                                        state={{
                                                                            localIndex: index
                                                                        }}
                                                                        value={exam.id}
                                                                        className='inline-block bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mt-3 mx-1 font-bold text-white'
                                                                    >
                                                                        Continue
                                                                    </Link>
                                                                    <button
                                                                        value={`localSavedExam-${index}`}
                                                                        onClick={() => {
                                                                            handleDeleteLocalSavedExam(index)
                                                                        }}
                                                                        className='inline-block bg-red-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mt-3 mx-1 font-bold text-white'
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            {
                                userProfile.type === "S" &&
                                (
                                    <>
                                        <div>
                                            <h1 className='text-xl font-bold text-start mt-10 mb-3'>Past Exams
                                                ({userProfile.pastExams.length}):</h1>
                                            <div className='grid lg:grid-cols-4 md:grid-cols-2'>
                                                {
                                                    userProfile.pastExams.map((exam) => {
                                                        return (
                                                            <div
                                                                className='p-3 m-1 border-gray-500 border-2 rounded-lg bg-gray-100'>
                                                                <h1 className='font-semibold text-lg mb-3'>{exam.title}</h1>
                                                                <div className=''>
                                                                    <div className='grid grid-cols-2 px-5'>
                                                                        <span
                                                                            className='text-start font-semibold'>Date:</span>
                                                                        <span
                                                                            className='text-start'>{exam.startDate}</span>
                                                                    </div>
                                                                    <div className='grid grid-cols-2 px-5'>
                                                                        <span
                                                                            className='text-start font-semibold'>Time:</span>
                                                                        <span
                                                                            className='text-start'>{exam.startTime}</span>
                                                                    </div>
                                                                    <div className='grid grid-cols-2 px-5'>
                                                                        <span
                                                                            className='text-start font-semibold'>Duration:</span>
                                                                        <span
                                                                            className='text-start'>{exam.duration} mins</span>
                                                                    </div>
                                                                    <div className='grid grid-cols-2 px-5'>
                                                                        <span
                                                                            className='text-start font-semibold'>Total Marks:</span>
                                                                        <span
                                                                            className='text-start'>{exam.totalMarks}</span>
                                                                    </div>
                                                                    {
                                                                        exam.isResultGenerated &&
                                                                        (
                                                                            <>
                                                                                <div className='grid grid-cols-2 px-5'>
                                                                                    <span
                                                                                        className='text-start font-semibold'>Score:</span>
                                                                                    <span
                                                                                        className='text-start'>{exam.isPresent ? exam.obtainedMarks : "AB"}</span>
                                                                                </div>
                                                                                <Link
                                                                                    to="/leaderboard"
                                                                                    state={{
                                                                                        isLeaderboard: true,
                                                                                        examId: exam.id,
                                                                                        examName: exam.title,
                                                                                        totalMarks: exam.totalMarks,
                                                                                        obtainedMarks: exam.obtainedMarks,
                                                                                        isPresent: exam.isPresent
                                                                                    }}
                                                                                    value={exam.id}
                                                                                    className='inline-block bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mt-3 font-bold text-white'
                                                                                    onClick={(e) => {
                                                                                        console.log(e.target.value)
                                                                                    }}
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
                                        {
                                            userProfile.ongoingExams &&
                                            (
                                                <div>
                                                    <h1 className='text-xl font-bold text-start mt-10 mb-3'>Ongoing
                                                        Exams
                                                        ({userProfile.ongoingExams.length}):</h1>
                                                    <div className='grid lg:grid-cols-4 md:grid-cols-2'>
                                                        {
                                                            userProfile.ongoingExams.map((exam) => {
                                                                return (
                                                                    <div
                                                                        className='p-3 m-1 border-gray-500 border-2 rounded-lg bg-gray-100'>
                                                                        <h1 className='font-semibold text-lg mb-3'>{exam.title}</h1>
                                                                        <div className=''>
                                                                            <div className='grid grid-cols-2 px-5'>
                                                                                <span
                                                                                    className='text-start font-semibold'>Date:</span>
                                                                                <span
                                                                                    className='text-start'>{exam.startDate}</span>
                                                                            </div>
                                                                            <div className='grid grid-cols-2 px-5'>
                                                                                <span
                                                                                    className='text-start font-semibold'>Time:</span>
                                                                                <span
                                                                                    className='text-start'>{exam.startTime}</span>
                                                                            </div>
                                                                            <div className='grid grid-cols-2 px-5'>
                                                                                <span
                                                                                    className='text-start font-semibold'>Duration:</span>
                                                                                <span
                                                                                    className='text-start'>{exam.duration} mins</span>
                                                                            </div>
                                                                            <div className='grid grid-cols-2 px-5'>
                                                                                <span
                                                                                    className='text-start font-semibold'>Total Marks:</span>
                                                                                <span
                                                                                    className='text-start'>{exam.totalMarks}</span>
                                                                            </div>
                                                                            {
                                                                                !exam.isFinished ?
                                                                                    (
                                                                                        <Link
                                                                                            to={"/exam"}
                                                                                            state={{examId: exam.id, isMockTest:false, mockExam: null}}
                                                                                            value={exam.id}
                                                                                            className='inline-block bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mt-3 font-bold text-white'
                                                                                        >
                                                                                            Enter Exam
                                                                                        </Link>
                                                                                    ) :
                                                                                    (
                                                                                        <span className='inline-block bg-green-700 rounded-lg px-3 py-2 mt-3 font-bold text-white'>
                                                                                            Exam Finished
                                                                                        </span>
                                                                                    )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        }
                                        {
                                            userProfile.futureExams &&
                                            (
                                                <div>
                                                    <h1 className='text-xl font-bold text-start mt-10 mb-3'>Future Exams
                                                        ({userProfile.futureExams.length}):</h1>
                                                    <div className='grid lg:grid-cols-4 md:grid-cols-2'>
                                                        {
                                                            userProfile.futureExams.map((exam) => {
                                                                return (
                                                                    <div
                                                                        className='p-3 m-1 border-gray-500 border-2 rounded-lg bg-gray-100'>
                                                                        <h1 className='font-semibold text-lg mb-3'>{exam.title}</h1>
                                                                        <div className=''>
                                                                            <div className='grid grid-cols-2 px-5'>
                                                                                <span
                                                                                    className='text-start font-semibold'>Date:</span>
                                                                                <span
                                                                                    className='text-start'>{exam.startDate}</span>
                                                                            </div>
                                                                            <div className='grid grid-cols-2 px-5'>
                                                                                <span
                                                                                    className='text-start font-semibold'>Time:</span>
                                                                                <span
                                                                                    className='text-start'>{exam.startTime}</span>
                                                                            </div>
                                                                            <div className='grid grid-cols-2 px-5'>
                                                                                <span
                                                                                    className='text-start font-semibold'>Duration:</span>
                                                                                <span
                                                                                    className='text-start'>{exam.duration} mins</span>
                                                                            </div>
                                                                            <div className='grid grid-cols-2 px-5'>
                                                                                <span
                                                                                    className='text-start font-semibold'>Total Marks:</span>
                                                                                <span
                                                                                    className='text-start'>{exam.totalMarks}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    ) :
                    (
                        <div className='w-full h-full flex items-center grid justify-items-stretch'>
                            <img src='images/loading.gif' className='justify-self-center'/>
                            <h1 className='text-xl'>Fetching user details ...</h1>
                        </div>
                    )
            }
        </>
    );
}