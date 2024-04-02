import React, {useContext, useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import resultContext from "../../context/result/resultContext";

export default function Leaderboard() {

    const location = useLocation();
    const { isLeaderboard, examId, examName, totalMarks, obtainedMarks, isPresent } = location.state;
    const [leaderboard, setLeaderboard] = useState([]);
    const { fetchResult, fetchLeaderboard } = useContext(resultContext);


    useEffect(() => {
        let data = [];
        const fetchData = async () => {
            if(isLeaderboard) {
                data = await fetchLeaderboard(examId);
            } else {
                data = await fetchResult(examId);
            }
            setLeaderboard(data);
        };
        fetchData();
        console.log(leaderboard);
        console.log(examId);
    }, [])

    return (
        <div className='w-full px-10 pt-3 pb-3'>
            <div>
                {
                    isLeaderboard ?
                    (
                        <>
                            <h1 className='text-xl font-semibold mb-3'>Leaderboard: {examName}</h1>
                            <h1 className='font-semibold mb-3'>
                                Your Score: {isPresent ? obtainedMarks + " / " + totalMarks : "N/A"}
                            </h1>
                        </>
                    ) :
                    ( <h1 className='text-xl font-semibold mb-3'>Result: {examName}</h1> )
                }
            </div>
            <div>
                <div class="overflow-x-auto rounded-lg border-2">
                    <table class="w-full">
                        <thead class="uppercase bg-gray-200">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Rank
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Marks
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                leaderboard.map((student, index) => {
                                    return (
                                        <tr class="odd:bg-white even:bg-gray-50 border-b">
                                            <td class="px-6 py-3">
                                                {index + 1}
                                            </td>
                                            <td class="px-6 py-3">
                                                <Link to='/profile' state={{ userId: student.userId }}>
                                                    {student.name}
                                                </Link>
                                            </td>
                                            <td class="px-6 py-3">
                                                {student.isPresent ? student.marks + " / " + totalMarks : "AB"}
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}