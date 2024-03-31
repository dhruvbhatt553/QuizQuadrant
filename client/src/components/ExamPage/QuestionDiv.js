import React, { useContext, useEffect, useState } from 'react';
import examContext from '../../context/exam/examContext';

export default function QuestionDiv() {

    const { examStart, currQuestionData, currQuestionIndex, handleOptionSelection } = useContext(examContext);

    useEffect(() => {
        console.log("hii");
    }, [currQuestionData]);

    return (
        <>
            {
                currQuestionData ?
                    (
                        <div id='questionDiv' className='w-full h-[calc(100%-16rem)] lg:h-[calc(100%-6rem)] px-5 py-3 overflow-auto text-left'>
                            {
                                examStart === true ?
                                    (<>
                                        <div className='text-right font-bold'>
                                            <p>
                                                <span className='float-start'>
                                                    <span>QUESTION - {currQuestionIndex + 1}</span>
                                                </span>
                                                <span className='me-2 bg-blue-300 px-3 py-1 rounded-full'>
                                                    <span>{currQuestionData.type.toUpperCase()}</span>
                                                </span>
                                                <span className='me-2 bg-green-300 px-3 py-1 rounded-full'>
                                                    <span>Max Marks: </span>
                                                    <span>{currQuestionData.positiveMarks}</span>
                                                </span>
                                                <span className='ms-2 bg-red-300 px-3 py-1 rounded-full'>
                                                    <span>Negative Marks: </span>
                                                    <span>{currQuestionData.negativeMarks}</span>
                                                </span>
                                            </p>
                                        </div>
                                        <div id='queTextDiv' className='my-2'>
                                            <p>{currQuestionData.statement}</p>
                                        </div>
                                        <div id='queImageDiv' className='grid'>
                                            <img src={currQuestionData.imageURL} className='justify-self-center' draggable={false} />
                                        </div>
                                        <div id='optionDiv' className='b-purple-200 my-2 mt-10'>
                                            {
                                                currQuestionData.options.map((option, index) => {
                                                    console.log("ddf");
                                                    return (
                                                        <div key={option.id} id={`optionDiv${index}`} className={`flex p-2 my-2 border-gray-400 border-2 rounded-md`}>
                                                            <div className='grid items-center m-3'>
                                                                <input
                                                                    type={currQuestionData.type === "mcq" ? "radio" : "checkbox"}
                                                                    id={`option${index}`}
                                                                    name='option'
                                                                    value={index}
                                                                    checked={option.isMarked}
                                                                    onClick={(e) => { handleOptionSelection(index); console.log("ckbsdvkhsf: ", option.isMarked); }}
                                                                />
                                                                {(option.isMarked).toString()}
                                                            </div>
                                                            <div className='grid items-center'>
                                                                <label htmlFor={`option${index}`}>
                                                                    <p>{option.statement}</p>
                                                                    <img src={option.imageURL} draggable={false} />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </>) :
                                    <></>
                            }
                        </div>
                    ) :
                    (
                        <div className='w-full h-full flex items-center grid justify-items-stretch'>
                            <img src='images/loading.gif' className='justify-self-center' draggable={false} />
                            <h1 className='text-xl'>Fetching question data ...</h1>
                        </div>
                    )
            }
        </>
    );
}