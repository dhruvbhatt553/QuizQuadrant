import React, {useState} from 'react'


export default function QuestionContainer({question, number, shift, responses, resHandler, attempted, setAttempted}) {
    const handleImageError = (event) => {
        event.target.src = 'images/error.png';
    };

    const handleResponseChange = (index, event) => {
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
    };


    const handelCheckAnswers = (event) => {
        let attemptedArray = [...attempted];
        attemptedArray[number - 1] = true;
        setAttempted(attemptedArray);
    }

    const checkAnswers = () => {
        let res = true;

        res = res && (responses[number - 1][0] == question.options[(0 + shift) % 4].isCorrect);
        if (!res)
            return false;

        res = res && (responses[number - 1][1] == question.options[(1 + shift) % 4].isCorrect);
        if (!res)
            return false;

        res = res && (responses[number - 1][2] == question.options[(2 + shift) % 4].isCorrect);
        if (!res)
            return false;

        res = res && (responses[number - 1][3] == question.options[(3 + shift) % 4].isCorrect);
        if (!res)
            return false;

        return true;

    }

    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa: " + question.hasImage)

    return (
        <>
            {
                question &&
                (
                    <div>
                        <div className='border border-blue-300 mx-4 text-start'>
                            <div className='flex justify-between border-b-blue-300 border-b items-center px-4'>
                                <div className='py-3   font-semibold'>
                                    Question {number}
                                </div>
                                <div className='flex gap-x-2'>
                                    <div className='bg-yellow-400 p-1 rounded'>
                                        +{question.positiveMark}
                                    </div>

                                    <div className='bg-red-400 p-1 rounded'>
                                        {question.negativeMark}
                                    </div>
                                </div>
                            </div>
                            <div className='py-3 px-4 flex justify-between'>
                                <div>

                                    <div className='text-[14px] w-4/5 '>
                                        {question.statement}
                                    </div>

                                    <div>
                                        {
                                            question.imageURL !== "" &&
                                            <img src={question.imageURL}
                                                 className='w-full'
                                                 alt="loading"
                                                 onError={handleImageError}
                                                 draggable={false}
                                            />
                                        }
                                    </div>
                                </div>

                                <div className='font-serif font-bold'>
                                    {question.type.toUpperCase()}
                                </div>


                            </div>

                            <div className='px-4 mb-3 cursor-pointer'>
                                <div
                                    className={`border  ps-2 py-1  rounded flex items-center gap-x-3  ${responses[number - 1][0] ? "border-blue-500 font-bold border-2" : "border-black border-0.5"} `}
                                    onClick={(event) => handleResponseChange(0, event)}>
                                    <div
                                        className={`text-[15px] border border-black w-fit px-3 py-1.5 ${question.type === 'mcq' ? 'rounded-full' : 'rounded'}`}>
                                        A
                                    </div>
                                    <div>
                                        {question.options[(0 + shift) % 4].statement}
                                        <div>
                                            {
                                                question.options[(0 + shift) % 4].imageURL !== "" &&
                                                <img src={question.options[(0 + shift) % 4].imageURL}
                                                     className='w-full'
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
                                    className={`border  ps-2 py-1  rounded flex items-center gap-x-3  ${responses[number - 1][1] ? "border-blue-500 font-bold border-2" : "border-black border-0.5"} `}
                                    onClick={(event) => handleResponseChange(1, event)}>
                                    <div
                                        className={`text-[15px] border border-black w-fit px-3 py-1.5 ${question.type === 'mcq' ? 'rounded-full' : 'rounded'}`}>
                                        B
                                    </div>
                                    <div>
                                        {question.options[(1 + shift) % 4].statement}
                                        <div>
                                            {question.options[(1 + shift) % 4].imageURL !== "" &&
                                                <img src={question.options[(1 + shift) % 4].imageURL}
                                                     className='w-full'
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
                                    className={`border  ps-2 py-1  rounded flex items-center gap-x-3  ${responses[number - 1][2] ? "border-blue-500 font-bold border-2" : "border-black border-0.5"} `}
                                    onClick={(event) => handleResponseChange(2, event)}>
                                    <div
                                        className={`text-[15px] border border-black w-fit px-3 py-1.5 ${question.type === 'mcq' ? 'rounded-full' : 'rounded'}`}>
                                        C
                                    </div>
                                    <div>
                                        {question.options[(2 + shift) % 4].statement}
                                        <div>
                                            {question.options[(2 + shift) % 4].imageURL !== "" &&
                                                <img src={question.options[(2 + shift) % 4].imageURL}
                                                     className='w-full'
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
                                    className={`border  ps-2 py-1  rounded flex items-center gap-x-3  ${responses[number - 1][3] ? "border-blue-500 font-bold border-2" : "border-black border-0.5"} `}
                                    onClick={(event) => handleResponseChange(3, event)}>
                                    <div
                                        className={`text-[15px] border border-black w-fit px-3 py-1.5 ${question.type === 'mcq' ? 'rounded-full' : 'rounded'}`}>
                                        D
                                    </div>
                                    <div>
                                        {question.options[(3 + shift) % 4].statement}
                                        <div>
                                            {question.options[(3 + shift) % 4].imageURL !== "" &&
                                                <img src={question.options[(3 + shift) % 4].imageURL}
                                                     className='w-full'
                                                     alt="Image is loading "
                                                     onError={handleImageError}
                                                     draggable={false}
                                                />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`float-end  px-2 ${((responses[number - 1][0] || responses[number - 1][1] || responses[number - 1][2] || responses[number - 1][3]) && !attempted[number - 1]) ? "bg-gray-500 cursor-pointer" : " bg-gray-300 pointer-events-none"}`}
                                onClick={() => handelCheckAnswers()}>
                                Check Answer
                            </div>
                        </div>
                        {/* Solution */}
                        {attempted[number - 1] && <div>
                            <div className='font-bold'>
                                SOLUTION : {question.options[(shift + 0) % 4].isCorrect ? "A " : ""}
                                {question.options[(shift + 1) % 4].isCorrect ? "B " : ""}
                                {question.options[(shift + 2) % 4].isCorrect ? "C " : ""}
                                {question.options[(shift + 3) % 4].isCorrect ? "D " : ""}
                            </div>
                            <div>
                                {question.solution.statement}
                                <div>
                                    {question.solution.imageURL !== "" &&
                                        <img src={question.solution.imageURL}
                                             className='w-full'
                                             alt="Image is loading "
                                             onError={handleImageError}
                                             draggable={false}
                                        />}
                                </div>
                            </div>
                        </div>}
                    </div>
                )
            }
        </>
    );
};