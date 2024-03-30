import React from 'react';

export default function QuestionDiv(props) {

    const { examStart, currQuestionData, handleOptionSelection } = props;

    return (
        <div id='questionDiv' className='w-full h-[calc(100%-16rem)] lg:h-[calc(100%-6rem)] px-5 py-3 overflow-auto text-left'>
            {
                examStart === true ?
                    (<>
                        <div className='text-right font-bold'>
                            <p>
                                <span className='me-2 bg-green-500 px-3 py-1 rounded-full'>
                                    <span>Max Marks: </span>
                                    <span>{currQuestionData.positiveMarks}</span>
                                </span>
                                <span className='ms-2 bg-red-500 px-3 py-1 rounded-full'>
                                    <span>Negative Marks: </span>
                                    <span>{currQuestionData.negativeMarks}</span>
                                </span>
                            </p>
                        </div>
                        <div id='queTextDiv' className='my-2'>
                            <p>{currQuestionData.statement}</p>
                        </div>
                        <div id='queImageDiv' className='grid'>
                            <img src={currQuestionData.imageURL} className='justify-self-center' />
                        </div>
                        <div id='optionDiv' className='b-purple-200 my-2 mt-10'>
                            {
                                currQuestionData.options.map((option, index) => {
                                    return (
                                        <div key={index} id={`optionDiv${index}`} className='flex p-2 my-2 border-gray-400 border-2 rounded-md'>
                                            <div className='grid items-center m-3'>
                                                <input 
                                                    type={currQuestionData.type === "mcq" ? "radio" : "checkbox"} 
                                                    id={`option${index}`} 
                                                    name='option' 
                                                    value={option.id} 
                                                    className='' onClick={(e) => { handleOptionSelection(e) }} 
                                                />
                                            </div>
                                            <div className='grid items-center'>
                                                <label htmlFor={`option${index}`}>
                                                    <p>{option.statement}</p>
                                                    <img src={option.imageURL} />
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
    );
}