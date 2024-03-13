import React, { useState } from 'react';

export default function CreateQuestion(props) {

    const { subjectwiseTopics } = props;

    const [topicList, setTopicList] = useState([]);
    const [questionType, setQuestionType] = useState("mcq");
    const [subject, setSubject] = useState("");
    const [subtopic, setSubtopic] = useState("");
    const [question, setQuestion] = useState("");
    const [questionImage, setQuestionImage] = useState("");
    const [optionA, setOptionA] = useState("");
    const [optionAImage, setOptionAImage] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionBImage, setOptionBImage] = useState("");
    const [optionC, setOptionC] = useState("");
    const [optionCImage, setOptionCImage] = useState("");
    const [optionD, setOptionD] = useState("");
    const [optionDImage, setOptionDImage] = useState("");
    const [solution, setSolution] = useState("");
    const [solutionImage, setSolutionImage] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState(new Set());

    const sleep = async (ms) => {
        await (new Promise(resolve => setTimeout(resolve, ms)));
    }

    const handleCancelBtn = () => {}

    const handleSaveBtn = () => {}

    const uploadImage = async () => {
        const url = "https://media.istockphoto.com/id/183412466/photo/eastern-bluebirds-male-and-female.jpg?s=612x612&w=0&k=20&c=6_EQHnGedwdjM9QTUF2c1ce7cC3XtlxvMPpU5HAouhc=";
        await sleep(2000);
        return url;
    }

    const deleteImage = async () => {
        await sleep(2000);
    }
    
    const handleAddImage = async (baseID) => {
        document.getElementById(baseID + "Add").classList.add("hidden");
        document.getElementById(baseID + "Preview").src = '/images/loading.gif';
        const url = await uploadImage();
        switch(baseID) {
            case "questionImage":
                setQuestionImage(url);
                break;
            case "optionAImage":
                setOptionAImage(url);
                break;
            case "optionBImage":
                setOptionBImage(url);
                break;
            case "optionCImage":
                setOptionCImage(url);
                break;
            case "optionDImage":
                setOptionDImage(url);
                break;
            case "solutionImage":
                setSolutionImage(url);
                break;
        }
        document.getElementById(baseID + "Remove").classList.remove("hidden");
    }

    const handleRemoveImage = async (baseID) => {
        document.getElementById(baseID + "Remove").classList.add("hidden");
        document.getElementById(baseID + "Preview").src = '/images/loading.gif';
        await deleteImage();
        switch(baseID) {
            case "questionImage":
                setQuestionImage("");
                break;
            case "optionAImage":
                setOptionAImage("");
                break;
            case "optionBImage":
                setOptionBImage("");
                break;
            case "optionCImage":
                setOptionCImage("");
                break;
            case "optionDImage":
                setOptionDImage("");
                break;
            case "solutionImage":
                setSolutionImage("");
                break;
        }
        document.getElementById(baseID + "Add").classList.remove("hidden");
    }

    const editQuestionType = (e) => {
        setQuestionType(e.target.value);
        setCorrectAnswer(new Set());
    }

    const editSubject = (e) => {
        setSubject(e.target.value);
        const arr = props.subjectwiseTopics.find((element) => {
            return (element.title === e.target.value);
        });
        if(arr) {
            setTopicList(arr.subtopics);
        } else {
            setTopicList([]);
        }
    }

    const editSubtopic = (e) => {
        setSubtopic(e.target.value);
    }

    const editText = (e) => {
        switch(e.target.name) {
            case "question":
                setQuestion(e.target.value);
                break;
            case "optionA":
                setOptionA(e.target.value);
                break;
            case "optionB":
                setOptionB(e.target.value);
                break;
            case "optionC":
                setOptionC(e.target.value);
                break;
            case "optionD":
                setOptionD(e.target.value);
                break;
            case "solution":
                setSolution(e.target.value);
                break;
        }
    }

    const editCorrectAnswer = (e) => {
        if(questionType === "mcq") {
            const temp = new Set();
            temp.add(e.target.value);
            setCorrectAnswer(temp);
        } else {
            const temp = new Set(correctAnswer);
            if(temp.has(e.target.value)) temp.delete(e.target.value);
            else temp.add(e.target.value);
            setCorrectAnswer(temp);
        }
    }

    return (
        <>
            <div className='w-full h-screen px-10 text-lg'>
                <div className='w-full my-5 grid grid-cols-3 items-center'>
                    <button id='cancel' onClick={handleCancelBtn} className='justify-self-start text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center'>Cancel</button>
                    <span className='font-bold text-xl text-center'>Create New Question</span>
                    <button id='save' onClick={handleSaveBtn} className='justify-self-end text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center'>Save</button>
                </div>
                <div className='w-full my-2 grid grid-cols-3 items-center'>
                    <div className='justify-self-start'>
                        <label htmlFor='questionTypeSelect' className='font-bold'>Select question type:</label>
                        <select onChange={(e) => editQuestionType(e)} className='mx-5 rounded-full px-3 py-1 bg-gray-200 cursor-pointer' id='questionTypeSelect'>
                            <option name='mcq' value={"mcq"} selected={questionType === "mcq"}>MCQ</option>
                            <option name='msq' value={"msq"} selected={questionType === "msq"}>MSQ</option>
                        </select>
                    </div>
                    <div className='justify-self-center'>
                        <label htmlFor='subjectSelect' className='font-bold'>Select subject:</label>
                        <select onChange={(e) => editSubject(e)} className='mx-5 rounded-full px-3 py-1 bg-gray-200 cursor-pointer' id='subjectSelect'>
                            <option selected={subject === ""} disabled={true}>Select a subject</option>
                            {subjectwiseTopics.map((element) => {
                                return (
                                    <option key={element.title} name={element.title} value={element.title} selected={subject === element.title}>{element.title}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className='justify-self-end'>
                        <label htmlFor='subtopicSelect' className='font-bold'>Select subtopic:</label>
                        <select onChange={(e) => editSubtopic(e)} className='mx-5 rounded-full px-3 py-1 bg-gray-200 cursor-pointer' id='subtopicSelect'>
                            <option selected={subtopic === ""} disabled={true}>Select a subtopic</option>
                            {topicList.map((element) => {
                                return (
                                    <option key={element} name={element} value={element} selected={subtopic === element}>{element}</option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className='w-full my-2 p-3 bg-gray-200 rounded-lg border-gray-500 border-2'>
                    <label htmlFor='question' className='float-left font-bold'>Question:</label>
                    <label htmlFor='questionImage' id='questionImageAdd' className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${questionImage === "" ? "" : "hidden"}`}>Add image</label>
                    <label id='questionImageRemove' onClick={() => handleRemoveImage("questionImage")} className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${questionImage === "" ? "hidden" : ""}`}>Remove image</label>
                    <input type='file' accept='image/*' name='questionImage' id='questionImage' onChange={() => handleAddImage("questionImage")} className='hidden' />
                    <br />
                    <textarea name='question' id='question' value={question} onChange={(e) => editText(e)} className='w-full border-gray-400 border-2 rounded-lg p-2 my-1 min-h-52 focus:shadow-xl'></textarea>
                    <div className='flex justify-center'>
                        <img id='questionImagePreview' src={questionImage} />
                    </div>
                </div>
                <div className='w-full my-2 p-3 bg-gray-200 rounded-lg border-gray-500 border-2'>
                    <label htmlFor='optionA' className='float-start font-bold'>Option - A:</label>
                    <label htmlFor='optionAImage' id='optionAImageAdd' className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${optionAImage === "" ? "" : "hidden"}`}>Add image</label>
                    <label id='optionAImageRemove' onClick={() => handleRemoveImage("optionAImage")} className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${optionAImage === "" ? "hidden" : ""}`}>Remove image</label>
                    <input type='file' accept='image/*' name='optionAImage' id='optionAImage' onChange={() => handleAddImage("optionAImage")} className='hidden' />
                    <br />
                    <textarea name='optionA' id='optionA' value={optionA} onChange={(e) => editText(e)} className='w-full border-gray-400 border-2 rounded-lg p-2 my-1 min-h-32 focus:shadow-xl'></textarea>
                    <div className='flex justify-center'>
                        <img id='optionAImagePreview' src={optionAImage} />
                    </div>
                </div>
                <div className='w-full my-2 p-3 bg-gray-200 rounded-lg border-gray-500 border-2'>
                    <label htmlFor='optionB' className='float-start font-bold'>Option - B:</label>
                    <label htmlFor='optionBImage' id='optionBImageAdd' className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${optionBImage === "" ? "" : "hidden"}`}>Add image</label>
                    <label id='optionBImageRemove' onClick={() => handleRemoveImage("optionBImage")} className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer hidden ${optionBImage === "" ? "hidden" : ""}`}>Remove image</label>
                    <input type='file' accept='image/*' name='optionBImage' id='optionBImage' onChange={() => handleAddImage("optionBImage")} className='hidden' />
                    <br />
                    <textarea name='optionB' id='optionB' value={optionB} onChange={(e) => editText(e)} className='w-full border-gray-400 border-2 rounded-lg p-2 my-1 min-h-32 focus:shadow-xl'></textarea>
                    <div className='flex justify-center'>
                        <img id='optionBImagePreview' src={optionBImage} />
                    </div>
                </div>
                <div className='w-full my-2 p-3 bg-gray-200 rounded-lg border-gray-500 border-2'>
                    <label htmlFor='optionC' className='float-start font-bold'>Option - C:</label>
                    <label htmlFor='optionCImage' id='optionCImageAdd' className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${optionCImage === "" ? "" : "hidden"}`}>Add image</label>
                    <label id='optionCImageRemove' onClick={() => handleRemoveImage("optionCImage")} className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${optionCImage === "" ? "hidden" : ""}`}>Remove image</label>
                    <input type='file' accept='image/*' name='optionCImage' id='optionCImage' onChange={() => handleAddImage("optionCImage")} className='hidden' />
                    <br />
                    <textarea name='optionC' id='optionC' value={optionC} onChange={(e) => editText(e)} className='w-full border-gray-400 border-2 rounded-lg p-2 my-1 min-h-32 focus:shadow-xl'></textarea>
                    <div className='flex justify-center'>
                        <img id='optionCImagePreview' src={optionCImage} />
                    </div>
                </div>
                <div className='w-full my-2 p-3 bg-gray-200 rounded-lg border-gray-500 border-2'>
                    <label htmlFor='optionD' className='float-start font-bold'>Option - D:</label>
                    <label htmlFor='optionDImage' id='optionDImageAdd' className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${optionDImage === "" ? "" : "hidden"}`}>Add image</label>
                    <label id='optionDImageRemove' onClick={() => handleRemoveImage("optionDImage")} className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${optionDImage === "" ? "hidden" : ""}`}>Remove image</label>
                    <input type='file' accept='image/*' name='optionDImage' id='optionDImage' onChange={() => handleAddImage("optionDImage")} className='hidden' />
                    <br />
                    <textarea name='optionD' id='optionD' value={optionD} onChange={(e) => editText(e)} className='w-full border-gray-400 border-2 rounded-lg p-2 my-1 min-h-32 focus:shadow-xl'></textarea>
                    <div className='flex justify-center'>
                        <img id='optionDImagePreview' src={optionDImage} />
                    </div>
                </div>
                <div className='w-full my-2 p-3 bg-gray-200 rounded-lg border-gray-500 border-2'>
                    <h1 className='font-bold'>Select the correct answer:</h1>
                    <div className={`${questionType === "mcq" ? "" : "hidden"}`}>
                        <div className='w-full'>
                            <input type='radio' value={"A"} name='correctAnswer' id='mcqCorrectOptionA' checked={correctAnswer.has("A")} onChange={(e) => editCorrectAnswer(e)} />
                            <label htmlFor='mcqCorrectOptionA' className='ms-2'>Option - A</label>
                        </div>
                        <div className='w-full'>
                            <input type='radio' value={"B"} name='correctAnswer' id='mcqCorrectOptionB' checked={correctAnswer.has("B")} onChange={(e) => editCorrectAnswer(e)} />
                            <label htmlFor='mcqCorrectOptionB' className='ms-2'>Option - B</label>
                        </div>
                        <div className='w-full'>
                            <input type='radio' value={"C"} name='correctAnswer' id='mcqCorrectOptionC' checked={correctAnswer.has("C")} onChange={(e) => editCorrectAnswer(e)} />
                            <label htmlFor='mcqCorrectOptionC' className='ms-2'>Option - C</label>
                        </div>
                        <div className='w-full'>
                            <input type='radio' value={"D"} name='correctAnswer' id='mcqCorrectOptionD' checked={correctAnswer.has("D")} onChange={(e) => editCorrectAnswer(e)} />
                            <label htmlFor='mcqCorrectOptionD' className='ms-2'>Option - D</label>
                        </div>
                    </div>
                    <div className={`${questionType === "msq" ? "" : "hidden"}`}>
                        <div className='w-full'>
                            <input type='checkbox' value={"A"} name='correctAnswer' id='msqCorrectOptionA' checked={correctAnswer.has("A")} onChange={(e) => editCorrectAnswer(e)} />
                            <label htmlFor='msqCorrectOptionA' className='ms-2'>Option - A</label>
                        </div>
                        <div className='w-full'>
                            <input type='checkbox' value={"B"} name='correctAnswer' id='msqCorrectOptionB' checked={correctAnswer.has("B")} onChange={(e) => editCorrectAnswer(e)} />
                            <label htmlFor='msqCorrectOptionB' className='ms-2'>Option - B</label>
                        </div>
                        <div className='w-full'>
                            <input type='checkbox' value={"C"} name='correctAnswer' id='msqCorrectOptionC' checked={correctAnswer.has("C")} onChange={(e) => editCorrectAnswer(e)} />
                            <label htmlFor='msqCorrectOptionC' className='ms-2'>Option - C</label>
                        </div>
                        <div className='w-full'>
                            <input type='checkbox' value={"D"} name='correctAnswer' id='msqCorrectOptionD' checked={correctAnswer.has("D")} onChange={(e) => editCorrectAnswer(e)} />
                            <label htmlFor='msqCorrectOptionD' className='ms-2'>Option - D</label>
                        </div>
                    </div>
                </div>
                <div className='w-full my-2 p-3 bg-gray-200 rounded-lg border-gray-500 border-2'>
                    <label htmlFor='solution' className='float-start font-bold'>Solution:</label>
                    <label htmlFor='solutionImage' id='solutionImageAdd' className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${solutionImage === "" ? "" : "hidden"}`}>Add image</label>
                    <label id='solutionImageRemove' onClick={() => handleRemoveImage("solutionImage")} className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${solutionImage === "" ? "hidden" : ""}`}>Remove image</label>
                    <input type='file' accept='image/*' name='solutionImage' id='solutionImage' onChange={() => handleAddImage("solutionImage")} className='hidden' />
                    <br />
                    <textarea name='solution' id='solution' value={solution} onChange={(e) => editText(e)} className='w-full border-gray-400 border-2 rounded-lg p-2 my-1 min-h-32 focus:shadow-xl'></textarea>
                    <div className='flex justify-center'>
                        <img id='solutionImagePreview' src={solutionImage} />
                    </div>
                </div>
            </div>
        </>
    );
}