import React from 'react';

export default function InstructionDiv(props) {

    const { duration, handleInstructionRead } = props;

    return (
        <div id='instructionDiv' className='w-full h-[calc(100%-16rem)] lg:h-[calc(100%-6rem)] px-5 py-3 overflow-auto text-left'>
            <h1 className='text-xl font-bold text-center mb-3'>INSTRUCTIONS</h1>
            <h1 className='font-bold'>Read the instructions carefully before starting the exam:</h1>
            <ul className='list-disc ml-5 my-3'>
                <li className='my-2'>The duration of the examination is <b>{duration}</b> minutes. The clock will be set on the server. The countdown timer at the top right-hand corner of your screen displays the time available for you to complete the examination.</li>
                <li className='my-2'>When the timer reaches zero, the examination will end automatically. If you want, you can press <b>FINISH EXAM</b> button to end the exam.</li>
                <li className='my-2'>To navigate to a question, click on the question number in the Question Palette. This does <b>NOT</b> save your answer to the current question.</li>
                <li className='my-2'>Each MCQ/MSQ has four options. Clicking on an option will select it and clicking on it again will unselect it. For MCQ, only one option can be selected at any time. For MSQ, more than one option can be selected. Clicking the <b>Clear</b> button will clear all selected options for that question.</li>
                <li className='my-2'>Click on <b>Save</b> to save your answer to the current question</li>
                <li className='my-2'>Each question carries certain marks, as specified. Questions that are not attempted will result in ZERO marks. Wrong answers may lead to Negative Marking as specified.</li>
                <li className='my-2'>Exam will start in full screen mode. If you exit from full screen mode, it will cause a violation count.</li>
                <li className='my-2'>If you try to switch between tabs, it will also cause violation count.</li>
                <li className='my-2'>If the violation count becomes more than <b>5</b>, your exam will automatically end and you will not be able to resume the exam again.</li>
            </ul>
            <input type='checkbox' id='instructionRead' className='col-start-1 justify-self-start' onClick={(e) => { handleInstructionRead(e) }} />
            <label htmlFor='instructionRead' className='col-start-2 mx-2 font-semibold justify-self-start'>I have read the instructions carefully and want to proceed to the examination.</label>
        </div>
    );
};