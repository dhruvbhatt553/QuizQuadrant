import React, {useContext, useEffect, useState} from 'react';
import examContext from '../../context/exam/examContext';

export default function QuestionDiv() {

    const {
        examData,
        examStart,
        currQuestionData,
        currQuestionIndex,
        handleOptionSelection,
        fetchQuestionData,
        handlePrevBtn,
        handleNextBtn,
        handleClearSelectionBtn,
        handleSaveBtn
    } = useContext(examContext);
    const [optionsMarked, setOptionsMarked] = useState([false, false, false, false]);   // only for display purpose ...
    const [isSaving, setIsSaving] = useState(false);
    const [isImageEnlarged, setIsImageEnlarged] = useState(false);

    const closeImageEnlarged = () => {
        setIsImageEnlarged((isImageEnlarged) => {
            return false;
        });
    }

    const enlargeImage = (e) => {
        setIsImageEnlarged((isImageEnlarged) => {
            return true;
        });
        document.getElementById("imageEnlarged").src = e.target.src;
    }

    useEffect(() => {
        const getQuestionData = async () => {
            const data = await fetchQuestionData();
            setOptionsMarked(
                [
                    data.options[0].isMarked,
                    data.options[1].isMarked,
                    data.options[2].isMarked,
                    data.options[3].isMarked
                ]
            );
        }
        getQuestionData();
    }, [currQuestionIndex]);

    return (
        <>
            <div className="w-full h-full absolute start-0 top-0 backdrop-blur"
                 hidden={!isImageEnlarged}>
                <button className="px-3 py-2 m-5 bg-blue-700 text-xl text-white font-bold rounded-full"
                        onClick={closeImageEnlarged}>Close
                </button>
                <img id="imageEnlarged" src=""/>
            </div>
            <div className={`w - full h-[calc(100%-6rem)] ${isImageEnlarged ? "hidden" : ""}`}>
                {
                    currQuestionData ?
                        (
                            <>
                                <div id='questionDiv'
                                     className='w-full h-full px-5 py-3 overflow-auto text-left'>
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
                                                        <span className='mx-2 bg-green-300 px-3 py-1 rounded-full'>
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
                                                    <img
                                                        className='w-1/3 justify-self-center cursor-zoom-in'
                                                        onClick={(e) => {
                                                            enlargeImage(e);
                                                        }}
                                                        src={currQuestionData.imageURL}
                                                        draggable={false}
                                                    />
                                                </div>
                                                <div id='optionDiv' className='b-purple-200 my-2 mt-10'>
                                                    {
                                                        currQuestionData.options.map((option, index) => {
                                                            console.log("ddf");
                                                            return (
                                                                <div key={option.id} id={`optionDiv${index}`}
                                                                     className={`flex p-2 my-2 border-gray-400 border-2 rounded-md cursor-pointer`}
                                                                     onClick={(e) => {
                                                                         let arr = handleOptionSelection(index);
                                                                         setOptionsMarked(arr);
                                                                     }}
                                                                >
                                                                    <div className='grid items-center m-3'>
                                                                        <input
                                                                            type={currQuestionData.type === "mcq" ? "radio" : "checkbox"}
                                                                            id={`option${index}`}
                                                                            name='option'
                                                                            value={index}
                                                                            checked={optionsMarked[index]}
                                                                        />
                                                                    </div>
                                                                    <div className='grid items-center'>
                                                                        <label htmlFor={`option${index}`}>
                                                                            <p>{option.statement}</p>
                                                                            <img
                                                                                className='w-1/3 justify-self-center cursor-zoom-in'
                                                                                onClick={(e) => {
                                                                                    enlargeImage(e);
                                                                                }}
                                                                                src={option.imageURL}
                                                                                draggable={false}/>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </>) :
                                            (<></>)
                                    }
                                </div>
                                <div id='navigationDiv'
                                     className='w-full h-52 lg:h-12 flex items-center px-3 bg-gray-400'>
                                    <div className='w-full'>
                                        <button
                                            className='bg-blue-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mx-2 my-1 font-bold text-white lg:justify-self-start disabled:cursor-not-allowed disabled:bg-gray-600'
                                            onClick={handlePrevBtn}
                                            disabled={currQuestionIndex === 0}
                                        >
                                            Prev
                                        </button>
                                        <button
                                            className='bg-blue-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mx-2 my-1 font-bold text-white lg:justify-self-center'
                                            onClick={
                                                () => {
                                                    handleClearSelectionBtn();
                                                    setOptionsMarked([false, false, false, false]);
                                                }
                                            }
                                        >
                                            Clear
                                        </button>
                                        {
                                            !examData.isMockTest &&
                                            (
                                                <button
                                                    className={`bg-blue-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mx-2 my-1 font-bold text-white lg:justify-self-center disabled:pointer-events-none`}
                                                    disabled={isSaving}
                                                    onClick={
                                                        async () => {
                                                            setIsSaving((isSaving) => {
                                                                return true;
                                                            });
                                                            await handleSaveBtn();
                                                            setIsSaving((isSaving) => {
                                                                return false;
                                                            });
                                                        }
                                                    }
                                                >
                                                    {isSaving ? "Saving..." : "Save"}
                                                </button>
                                            )
                                        }
                                        <button
                                            className='bg-blue-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mx-2 my-1 font-bold text-white lg:justify-self-end disabled:cursor-not-allowed disabled:bg-gray-600'
                                            onClick={handleNextBtn}
                                            disabled={currQuestionIndex === examData.questionIds.length - 1}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) :
                        (
                            <div
                                className='w-full h-[calc(100%-16rem)] lg:h-[calc(100%-6rem)] flex items-center grid justify-items-stretch'>
                                <img src={'images/loading.gif'} className='justify-self-center' draggable={false}
                                     alt={"loading..."}/>
                                <h1 className='text-xl'>Fetching question data ...</h1>
                            </div>
                        )
                }
            </div>
        </>
    );
}