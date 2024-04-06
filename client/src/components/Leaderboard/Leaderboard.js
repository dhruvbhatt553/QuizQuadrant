import React, {useContext, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import resultContext from "../../context/result/resultContext";

export default function Leaderboard() {

    const location = useLocation();
    const navigate = useNavigate();
    const [leaderboard, setLeaderboard] = useState([]);
    const {fetchResult, fetchLeaderboard} = useContext(resultContext);
    const [isLeaderboard, setIsLeaderboard] = useState(false);
    const [examId, setExamId] = useState(-1);
    const [examName, setExamName] = useState("");
    const [totalMarks, setTotalMarks] = useState(0);
    const [obtainedMarks, setObtainedMarks] = useState(0);
    const [isPresent, setIsPresent] = useState(false);

    useEffect(() => {
        if (location.state) {

            console.log("LOCATIOOOOOOOOOOON STTTTTTTTTATE", location.state.totalMarks)

            setIsLeaderboard(location.state.isLeaderboard);
            setExamId(location.state.examId);
            setExamName(location.state.examName);
            setTotalMarks(location.state.totalMarks);
            setObtainedMarks(location.state.obtainedMarks);
            setIsPresent(location.state.isPresent);
            let data = [];
            const fetchData = async () => {
                if (isLeaderboard) {
                    data = await fetchLeaderboard(examId);
                } else {
                    data = await fetchResult(examId);
                }
                setLeaderboard(data);
            };
            fetchData();
            console.log(leaderboard);
            console.log(examId);
        } else {
            navigate("/");
        }
    }, [leaderboard])

    return (
        <div className='w-full px-10 pt-3 pb-3'>
            <div>
                {
                    isLeaderboard ?
                        (
                            <>
                                <h1 className='text-xl font-semibold mb-3'>Leaderboard: {examName}</h1>
                                <h1 className='font-semibold mb-3'>
                                    Your Score: {isPresent ? `${obtainedMarks} / ${totalMarks}` : "N/A"}
                                </h1>
                            </>
                        ) :
                        (<h1 className='text-xl font-semibold mb-3'>Result: {examName}</h1>)
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
                                            <Link to='/profile' state={{userId: student.userId}}>
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