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

        console.log("current page:", current, " kasbfvdsfb");
        if (bySubject) {
            fetchPracticeQuestionsBySubject(subject.subId, current);
            const q2 = [...questions];
            console.log("first call: ", q2.length);
            if (current === 1) {
                fetchPracticeQuestionsBySubject(subject.subId, current - 1);
                const q1 = [...questions];
                initialFetch(q1,q2);
                console.log("second call: ", q1.length);
            }

        } else {
            fetchPracticeQuestionsBySubtopic(subtopic.subId, subtopic.subtopicId, current);
            const q1 = [...questions];
            if (current === 1) {
                fetchPracticeQuestionsBySubtopic(subtopic.subId, subtopic.subtopicId, current - 1);
                const q2 = [...questions];
                initialFetch(q1,q2);
            }

        }

        console.log("qqqq", questions.length);

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
            //console.log("gello");
            console.log(extra);
            extra4 = [...skips];
            for (let i = 0; i < extra2.length; i++) {
                extra.push([false, false, false, false]);
                extra4.push(Math.floor(Math.random() * 4));
            }
            let x = total / 5;
            if (total % 5 !== 0)
                x++;
            if (y === x) {
                extra3 = [];
            } else {
                extra3 = [...questions];
                for (let i = 0; i < questions.length; i++) {
                    extra3.push(questions[i]);
                    extra5.push(questions[i]);
                }
            }

            console.log("hhh" + responses.length);
            console.log(current);
            console.log(extra1);
            console.log(extra2);
            console.log(extra3);
            changeCurrent(y);
            changeResponses(extra);
            changeSkips(extra4);
            changeCachedQuestions(extra5);


        }
        changeCurr_Set(extra2);
        changePrev_Set(extra1);
        changeNext_Set(extra3);


    }

    let extra1 = [], extra2 = [], extra3 = [], extra = [], extra4 = [], extra5 = [];

    const initialFetch = (q1,q2) => {
        for (let i = 0; i < Math.min(total, 5); i++) {
            extra2.push(q1[i]);
            extra5.push(q1[i]);
            extra.push([false, false, false, false]);
            extra4.push(Math.floor(Math.random() * 4));
        }
        for (let i = 0; i < Math.min(total, 5); i++) {
            extra3.push(q2[i]);
            extra5.push(q2[i]);
        }
    }

    const [responses, changeResponses] = useState(extra);
    const [curr_set, changeCurr_Set] = useState(extra2);
    const [prev_set, changePrev_Set] = useState(extra1);
    const [next_set, changeNext_Set] = useState(extra3);
    const [skips, changeSkips] = useState(extra4);
    const [cachedQuestions, changeCachedQuestions] = useState(extra5);

    return (
        <div className='flex flex-col gap-y-6 pt-2 pb-6'>

            {
                curr_set && curr_set.length>0 &&
                curr_set.map((question, index) => (
                    <QuestionContainer key={index} question={question} number={5 * (current - 1) + (index + 1)}
                                                       shift={skips[5 * (current - 1) + (index)]} responses={responses}
                                                       resHandler={changeResponses}/>)
                )
            }
            <div className='flex mx-4 border border-black border-2'>
                <div
                    className={`w-1/3 border-e-2 border-black ${prev_set.length != 0 ? 'font-bold cursor-pointer pointer-events-auto' : 'font-thin cursor-none pointer-events-none'} `}
                    onClick={() => requestQuestionSet(true)}
                >
                    Previous set
                </div>
                <div className='w-1/3 border-e-2 border-black font-extrabold'>
                    {current}
                </div>
                <div
                    className={`w-1/3  ${next_set.length != 0 ? 'font-bold cursor-pointer pointer-events-auto' : 'font-thin cursor-none pointer-events-none'} `}
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
