import React, {useContext, useEffect, useState} from 'react'
// import questions from '../../dummy-data/questions';
import QuestionContainer from './QuestionContainer';
import {useLocation} from "react-router-dom";
import practicequestionContext from "../../context/practiceQuestions/practicequestionContext";

export default function PracticePage() {

    const location = useLocation();

    const {bySubject, subject, subtopic, total} = location.state;

    const [current, changeCurrent] = useState(1);

    const {
        fetchPracticeQuestionsBySubject,
        fetchPracticeQuestionsBySubtopic,
        questions
    } = useContext(practicequestionContext);

    useEffect(() => {
        console.log("total questions: ", total)
        const fetchData = async () => {
            console.log("current page:", current, " kasbfvdsfb");
            if (bySubject) {
                const q2 = await fetchPracticeQuestionsBySubject(subject.subId, current);
                console.log("first call: ", q2.length);
                if (current === 1) {
                    const q1 = await fetchPracticeQuestionsBySubject(subject.subId, current - 1);
                    initialFetch(q1, q2);
                    console.log("second call: ", q1.length);
                }

            } else {
                const q2 = await fetchPracticeQuestionsBySubtopic(subtopic.subId, subtopic.subtopicId, current);
                if (current === 1) {
                    const q1 = await fetchPracticeQuestionsBySubtopic(subtopic.subId, subtopic.subtopicId, current - 1);
                    initialFetch(q1, q2);
                }

            }

            console.log("qqqq", questions.length);
        }

        fetchData();

    }, [current]);

    function requestQuestionSet(p) {
        if (p) {
            let y = current - 1;
            extra3 = [...curr_set];
            extra2 = [...prev_set];

            if (y === 1) {
                extra1 = [];
            } else {
                extra1 = [];
                for (let i = 5 * (y - 2); i < Math.min(total, 5 * (y - 1)); i++) {
                    extra1.push(cachedQuestions[i]);
                }
            }
            changeCurrent(y);

        } else {

            let y = current + 1;
            extra1 = [...curr_set];
            extra2 = [...next_set];
            extra = [...responses];
            extra5 = [...cachedQuestions];
            extra6 = [...attempted];
            //console.log("gello");
            console.log(extra);
            extra4 = [...skips];
            for (let i = 0; i < extra2.length; i++) {
                extra.push([false, false, false, false]);
                extra4.push(Math.floor(Math.random() * 4));
            }
            let x = parseInt("" + total / 5);
            if (total % 5 !== 0)
                x++;
            if (y === x) {
                extra3 = [];
            } else {
                extra3 = [];
                for (let i = 0; i < questions.length; i++) {
                    extra3.push(questions[i]);
                    extra5.push(questions[i]);
                    extra6.push(false);
                }
            }

            console.log("hhh" + responses.length +" "+x+" "+y+" "+total+" "+questions.length);
            console.log(current);
            console.log(extra1);
            console.log(extra2);
            console.log("aayush : " + extra3);
            changeCurrent(y);
            changeResponses(extra);
            changeSkips(extra4);
            changeCachedQuestions(extra5);
            setAttempted(extra6);


        }
        changeCurr_Set(extra2);
        changePrev_Set(extra1);
        changeNext_Set(extra3);


    }

    let extra1 = [], extra2 = [], extra3 = [], extra = [], extra4 = [], extra5 = [], extra6 = [];

    const initialFetch = (q1,q2) => {
        for (let i = 0; i < q1.length; i++) {
            extra2.push(q1[i]);
            extra5.push(q1[i]);
            extra6.push(false);
            extra.push([false, false, false, false]);
            extra4.push(Math.floor(Math.random() * 4));
        }
        for (let i = 0; i < q2.length; i++) {
            extra3.push(q2[i]);
            extra5.push(q2[i]);
            extra6.push(false);
        }
    }

    const [responses, changeResponses] = useState(extra);
    const [curr_set, changeCurr_Set] = useState(extra2);
    const [prev_set, changePrev_Set] = useState(extra1);
    const [next_set, changeNext_Set] = useState(extra3);
    const [skips, changeSkips] = useState(extra4);
    const [cachedQuestions, changeCachedQuestions] = useState(extra5);
    const [attempted, setAttempted] = useState(extra6);


    console.log("extra3 : "+next_set.length);
    return (
        <div className='flex flex-col gap-y-6 pt-2 pb-6'>

            {
                curr_set && curr_set.length>0 &&
                curr_set.map((question, index) => (
                        <QuestionContainer  key = {index}
                                            question = {question}
                                            number = {5 * (current - 1) + (index + 1)}
                                            shift = {skips[5 * (current - 1) + (index)]}
                                            responses = {responses}
                                            resHandler = {changeResponses}
                                            attempted = {attempted}
                                            setAttempted = {setAttempted}
                        />
                    )
                )
            }
            <div className='flex mx-4 border-black border-2'>
                <div
                    className={`w-1/3 border-e-2 border-black ${prev_set.length !== 0 ? 'font-bold cursor-pointer pointer-events-auto' : 'font-thin cursor-none pointer-events-none'} `}
                    onClick={() => requestQuestionSet(true)}
                >
                    Previous set
                </div>
                <div className='w-1/3 border-e-2 border-black font-extrabold'>
                    {current}
                </div>
                <div
                    className={`w-1/3  ${next_set.length !== 0 ? 'font-bold cursor-pointer pointer-events-auto' : 'font-thin cursor-none pointer-events-none'} `}
                    onClick={() => requestQuestionSet(false)}
                >
                    Next set
                </div>
            </div>
            <div onClick={() => console.log(responses)}>
                submit
            </div>
        </div>

    )
};
