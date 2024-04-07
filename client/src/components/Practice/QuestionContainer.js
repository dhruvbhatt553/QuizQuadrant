import React, {useState} from 'react'


export default function QuestionContainer({question, number, shift, responses, resHandler, attempted, setAttempted, enlargeImage}) {
    const handleImageError = (event) => {
        event.target.src = 'images/error.png';
    };

    const handleResponseChange = (index, event) => {
        if (!attempted[number - 1]) {
            let updatedResponses = [...responses];
            updatedResponses[number - 1][index] = !updatedResponses[number - 1][index];
            if (question.type === "mcq") {
                for (let i = 0; i < 4; i++) {
                    if (i !== index) {
                        updatedResponses[number - 1][i] = false;
                    }
                }
            }
            resHandler([...updatedResponses]);
            event.preventDefault();
        }
    };


    const handelCheckAnswers = (event) => {
        let attemptedArray = [...attempted];
        attemptedArray[number - 1] = true;
        setAttempted(attemptedArray);
    }

    const checkAnswers = () => {
        let res = true;

        res = res && (responses[number - 1][0] === question.options[(0 + shift) % 4].isCorrect);
        if (!res)
            return false;

        res = res && (responses[number - 1][1] === question.options[(1 + shift) % 4].isCorrect);
        if (!res)
            return false;

        res = res && (responses[number - 1][2] === question.options[(2 + shift) % 4].isCorrect);
        if (!res)
            return false;

        res = res && (responses[number - 1][3] === question.options[(3 + shift) % 4].isCorrect);
        if (!res)
            return false;

        return true;

    }


    return (
        <>
            {
                question &&
                (
                    <div>
                        <div className='border-2 border-gray-700 rounded-lg mx-4 text-start'>
                            <div
                                className='flex justify-between border-gray-700 border-b-2 rounded-t-lg items-center px-4 bg-gray-200'>
                                <div className='py-3 font-semibold'>
                                    Question {number} - {question.subtopic}
                                </div>
                                <div className='flex gap-x-2'>
                                    {
                                        (!attempted[number - 1] || (attempted[number - 1] && checkAnswers())) &&
                                        (
                                            <div
                                                className='font-semibold bg-green-500 border-2 border-green-700 rounded px-2 py-1'>
                                                {question.positiveMarks}
                                            </div>
                                        )
                                    }
                                    {
                                        (!attempted[number - 1] || (attempted[number - 1] && !checkAnswers())) &&
                                        (
                                            <div
                                                className='font-semibold bg-red-500 border-2 border-red-700 rounded px-2 py-1'>
                                                {question.negativeMarks}
                                            </div>
                                        )
                                    }
                                    <div
                                        className='font-semibold bg-blue-400 border-2 border-blue-700 rounded px-2 py-1'>
                                        {question.type.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                            <div className='py-3 px-4 flex justify-between'>
                                <div>
                                    <div className='w-4/5 '>
                                        {question.statement}
                                    </div>
                                    <div>
                                        {
                                            question.imageURL !== "" &&
                                            <img src={question.imageURL}
                                                 className='w-1/3 cursor-zoom-in'
                                                 onClick={enlargeImage}
                                                 alt="loading"
                                                 onError={handleImageError}
                                                 draggable={false}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='px-4 mb-3 cursor-pointer'>
                                <div
                                    className={`ps-2 py-1  rounded flex items-center gap-x-3 border-2 ${responses[number - 1][0] ? "border-blue-900 font-bold bg-blue-100" : "border-black"} `}
                                    onClick={(event) => handleResponseChange(0, event)}>
                                    <div
                                        className={`${responses[number - 1][0] ? "bg-blue-300 border-blue-900" : "border-black"} border-2 w-fit px-3 py-1.5 ${question.type === 'mcq' ? 'rounded-full' : 'rounded'}`}
                                    >
                                        A
                                    </div>
                                    <div>
                                        {question.options[(0 + shift) % 4].statement}
                                        <div>
                                            {
                                                question.options[(0 + shift) % 4].imageURL !== "" &&
                                                <img src={question.options[(0 + shift) % 4].imageURL}
                                                     className='w-1/3 cursor-zoom-in'
                                                     onClick={enlargeImage}
                                                     alt="Image is loading "
                                                     onError={handleImageError}
                                                     draggable={false}
                                                />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='px-4 mb-3 cursor-pointer'>
                                <div
                                    className={`ps-2 py-1  rounded flex items-center gap-x-3 border-2 ${responses[number - 1][1] ? "border-blue-900 font-bold bg-blue-100" : "border-black"} `}
                                    onClick={(event) => handleResponseChange(1, event)}>
                                    <div
                                        className={`${responses[number - 1][1] ? "bg-blue-300 border-blue-900" : "border-black"} border-2 w-fit px-3 py-1.5 ${question.type === 'mcq' ? 'rounded-full' : 'rounded'}`}
                                    >
                                        B
                                    </div>
                                    <div>
                                        {question.options[(1 + shift) % 4].statement}
                                        <div>
                                            {question.options[(1 + shift) % 4].imageURL !== "" &&
                                                <img src={question.options[(1 + shift) % 4].imageURL}
                                                     className='w-1/3 cursor-zoom-in'
                                                     onClick={enlargeImage}
                                                     alt="Image is loading "
                                                     onError={handleImageError}
                                                     draggable={false}
                                                />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='px-4 mb-3 cursor-pointer'>
                                <div
                                    className={`ps-2 py-1  rounded flex items-center gap-x-3 border-2 ${responses[number - 1][2] ? "border-blue-900 font-bold bg-blue-100" : "border-black"} `}
                                    onClick={(event) => handleResponseChange(2, event)}>
                                    <div
                                        className={`${responses[number - 1][2] ? "bg-blue-300 border-blue-900" : "border-black"} border-2 w-fit px-3 py-1.5 ${question.type === 'mcq' ? 'rounded-full' : 'rounded'}`}
                                    >
                                        C
                                    </div>
                                    <div>
                                        {question.options[(2 + shift) % 4].statement}
                                        <div>
                                            {question.options[(2 + shift) % 4].imageURL !== "" &&
                                                <img src={question.options[(2 + shift) % 4].imageURL}
                                                     className='w-1/3 cursor-zoom-in'
                                                     onClick={enlargeImage}
                                                     alt="Image is loading "
                                                     onError={handleImageError}
                                                     draggable={false}
                                                />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='px-4 mb-3 cursor-pointer'>
                                <div
                                    className={`ps-2 py-1  rounded flex items-center gap-x-3 border-2 ${responses[number - 1][3] ? "border-blue-900 font-bold bg-blue-100" : "border-black"} `}
                                    onClick={(event) => handleResponseChange(3, event)}>
                                    <div
                                        className={`${responses[number - 1][3] ? "bg-blue-300 border-blue-900" : "border-black"} border-2 w-fit px-3 py-1.5 ${question.type === 'mcq' ? 'rounded-full' : 'rounded'}`}
                                    >
                                        D
                                    </div>
                                    <div>
                                        {question.options[(3 + shift) % 4].statement}
                                        <div>
                                            {question.options[(3 + shift) % 4].imageURL !== "" &&
                                                <img src={question.options[(3 + shift) % 4].imageURL}
                                                     className='w-1/3 cursor-zoom-in'
                                                     onClick={enlargeImage}
                                                     alt="Image is loading "
                                                     onError={handleImageError}
                                                     draggable={false}
                                                />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                className={`m-3 px-3 py-2 font-semibold rounded-full ${((responses[number - 1][0] || responses[number - 1][1] || responses[number - 1][2] || responses[number - 1][3]) && !attempted[number - 1]) ? "bg-blue-500 cursor-pointer" : " bg-gray-300 pointer-events-none"}`}
                                onClick={() => handelCheckAnswers()}
                            >
                                Check Answer
                            </button>
                            {/* Solution */}
                            {
                                attempted[number - 1] &&
                                (
                                    <div
                                        className={`m-4 p-4 border-2 rounded-lg ${((!attempted[number - 1] || (attempted[number - 1] && checkAnswers()))) ? "border-green-700 bg-green-200" : "border-red-700 bg-red-200"}`}>
                                        <div className='font-bold'>
                                            <h1 className="text-center">
                                                {
                                                    ((!attempted[number - 1] || (attempted[number - 1] && checkAnswers()))) ?
                                                        "CORRECT ANSWER" : "WRONG ANSWER"
                                                }
                                            </h1>
                                            SOLUTION : {question.options[(shift + 0) % 4].isCorrect ? "A " : ""}
                                            {question.options[(shift + 1) % 4].isCorrect ? "B " : ""}
                                            {question.options[(shift + 2) % 4].isCorrect ? "C " : ""}
                                            {question.options[(shift + 3) % 4].isCorrect ? "D " : ""}
                                        </div>
                                        <div>
                                            {question.solution.statement}
                                            <div className='flex justify-around'>
                                                {question.solution.imageURL !== "" &&
                                                    <img src={question.solution.imageURL}
                                                         className='w-1/3 cursor-zoom-in'
                                                         onClick={enlargeImage}
                                                         alt="Image is loading "
                                                         onError={handleImageError}
                                                         draggable={false}
                                                    />}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </>
    );
};