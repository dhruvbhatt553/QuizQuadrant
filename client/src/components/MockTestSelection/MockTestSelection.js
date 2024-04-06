//import data from "../HomePage/data";

import React, { useContext, useState, useEffect } from 'react';
import Topics from "./Topics";
import subjectContext from '../../context/subject/subjectContext';
import { Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import examContext from '../../context/exam/examContext';



export default function MockTestSelection() {

    const [allSelected, changeAllSelected] = useState(false);
    const [selection, changeSelection] = useState(null);
    const [isOpen, changeIsOpen] = useState(false);
    const [noq, setNoq] = useState(1);
    const [totalQuestions, setTotalQuestions] = useState(1);
    const [timePerQuestion, setTimePerQuestion] = useState(34);
    const { subjects } = useContext(subjectContext);
    const [ isTopicSelectionOver, setIsTopicSelectionOver ] = useState(false);
    const navigate = useNavigate();

    console.log("subjects in starting", subjects);
    useEffect(() => {
        console.log("in use effect", subjects);
        const arr = subjects.map(topic => {
            const subtopicsLength = topic.subtopics.length;
            return Array(subtopicsLength).fill(false);
        });
        console.log("arr 0 ", arr[0], subjects);
        changeSelection(() => { return arr; });
    }, [subjects]);

    function createMockTest() {
       
        let subtopicArr = [];
        for (let i = 0; i < selection.length; i++) {
            for (let j = 0; j < selection[i].length; j++) {
                if (selection[i][j])
                    subtopicArr.push(subjects[i].subtopics[j]);
            }
        }

        if (subtopicArr.length !== 0) {
            const mockExam = {
                title: "Mock Exam",
                duration: Math.round(noq*timePerQuestion/60),
                total: noq,
                subtopics: subtopicArr
            };

             navigate("/exam", { state: { examId: null, isMockTest: true, mockExam: mockExam } });
        } else {
            window.alert("Please select all fields to continue.")
        }
    }


    function SelectSubtopics() {
        let tempTotal = 0;
        let subtopicArr = [];
        for (let i = 0; i < selection.length; i++) {
            for (let j = 0; j < selection[i].length; j++) {
                if (selection[i][j])
                   { subtopicArr.push(subjects[i].subtopics[j]);
                    tempTotal+=subjects[i].subtopics[j].noq;
                }
            }
        }

        if (subtopicArr.length !== 0) {

            setIsTopicSelectionOver(true);
            
            console.log(""+tempTotal);
            setTotalQuestions(tempTotal);
            // navigate("/exam", { state: { examId: null, isMockTest: true, mockExam: mockExam } });
        } else {
            window.alert("Please select all fields to continue.")
        }
    }

    function handleAllSelection(e) {


        const arr1 = selection.map(row =>
            row.map(value => !allSelected)
        );

        changeSelection(arr1);
        changeAllSelected(!allSelected);


    }

    function checkChildren() {
        changeAllSelected(checkAll());
    }

    function checkAll() {
        let check = true;

        for (let i = 0; i < selection.length; i++) {
            for (let j = 0; j < selection[i].length; j++) {
                check = check && selection[i][j];
                if (!check)
                    return false;
            }
        }
        return check;
    }


    return (
        <div >
            <div className="text-center text-2xl font-bold text-gray-800 p-4" >
                { isTopicSelectionOver ? "SET DURATION AND NO OF QUESTIONS" : "SELECT TOPICS TO GENERATE MOCK TEST" }

            </div >
            { isTopicSelectionOver ?
                <div>
                    <div className='flex'>
                        <div className="w-64 mx-auto">
                            <label htmlFor="dropdown" className="block text-sm font-medium text-gray-700">Select No of questions:</label>
                            <Box sx={ { width: 300 } }>
                                <Slider
                                    id="dropdown"
                                    aria-label="Questions"
                                    defaultValue={ 0 }
                                    getAriaValueText={ (e) => { console.log("numberbdcjbfd", e); setNoq(e) } }
                                    valueLabelDisplay="auto"
                                    shiftStep={ 1 }
                                    on
                                    step={ 1 }
                                    marks
                                    min={ 0 }
                                    max={ totalQuestions }
                                />
                            </Box>
                            Number of questions : { noq }
                        </div>
                        <div className="w-64 mx-auto">
                            <label htmlFor="dropdown" className="block text-sm  font-medium text-gray-700">Select Average Time in seconds per question </label>
                            <select id="dropdown"
                                className="mt-1 mx-auto text-black border border-gray-900 block w-fit py-2  sm:text-sm rounded-md"
                                onChange={ (e) => setTimePerQuestion(e.target.value) }
                            >
                                <option value="60">30</option>
                                <option value="45">45</option>
                                <option value="60">60</option>
                                <option value="90">90</option>
                                <option value="100">100</option>
                                <option value="120">120</option>

                            </select>
                            Total duration : { Math.round(noq * timePerQuestion / 60) } Minutes
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <button
                            onClick={ (e) => { console.log(selection); setIsTopicSelectionOver(false);} }
                            className="cursor-pointer font-bold"
                        >
                            Prev
                        </button>
                        <button
                            onClick={ (e) => { console.log(selection); createMockTest(); } }
                            className="cursor-pointer font-bold"
                        // to={"/mock-exam"}
                        // state={{ mockExam : createMockTest() }}
                        >
                            Create Mock Test
                        </button>
                    </div>
                </div>
                :
                <div>
                <div className="my-8 mx-16 border border-gray-800 shadow-blue-800 bg-green-500">
                    <div className="bg-black text-start px-4 py-2 font-bold flex justify-between" >
                        <div className={ `cursor-pointer ${isOpen ? 'text-blue-500 ' : 'text-white'}` } onClick={ () => { console.log("nnn"); changeIsOpen(!isOpen) } }>
                            All Topics
                        </div>
                        <input
                            type="checkbox"
                            id="all"
                            className="mr-2 h-6 w-6"
                            checked={ allSelected }
                            onClick={ (e) => handleAllSelection(e) }
                        />

                    </div>
                    { console.log("selection in mcselction", selection) }
                    {

                        isOpen && subjects.map((topic, index) => <Topics topic={ topic } selection={ selection } changeSelection={ changeSelection } index1={ index } allSelected={ allSelected } checkAllSelected={ checkChildren } />)
                    }
                    
                </div>
                <button
                onClick={ (e) => { console.log(selection); SelectSubtopics(); } }
                className="cursor-pointer"
            // to={"/mock-exam"}
            // state={{ mockExam : createMockTest() }}
            >
                Next
            </button>
            </div>
            }
        </div>
    );
};