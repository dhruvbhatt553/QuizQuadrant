import React, {useContext, useEffect, useState} from 'react';
import subjectContext from "../../../context/subject/subjectContext";
import createExamContext from '../../../context/create-exam/createExamContext';

export default function RightDiv() {

    const {examQuestions, setExamQuestions, questionIndex, setQuestionIndex, unsaved, setUnsaved} = useContext(createExamContext);
    const {subjects} = useContext(subjectContext);
    const [type, setType] = useState(examQuestions[questionIndex].type);
    const [subject, setSubject] = useState(examQuestions[questionIndex].subject);
    const [subtopic, setSubtopic] = useState(examQuestions[questionIndex].subtopic);
    const [positiveMarks, setPositiveMarks] = useState(examQuestions[questionIndex].positiveMarks);
    const [negativeMarks, setNegativeMarks] = useState(examQuestions[questionIndex].negativeMarks);
    const [question, setQuestion] = useState(examQuestions[questionIndex].question);
    const [questionImage, setQuestionImage] = useState(examQuestions[questionIndex].questionImage);
    const [optionA, setOptionA] = useState(examQuestions[questionIndex].optionA);
    const [optionAImage, setOptionAImage] = useState(examQuestions[questionIndex].optionAImage);
    const [optionB, setOptionB] = useState(examQuestions[questionIndex].optionB);
    const [optionBImage, setOptionBImage] = useState(examQuestions[questionIndex].optionBImage);
    const [optionC, setOptionC] = useState(examQuestions[questionIndex].optionC);
    const [optionCImage, setOptionCImage] = useState(examQuestions[questionIndex].optionCImage);
    const [optionD, setOptionD] = useState(examQuestions[questionIndex].optionD);
    const [optionDImage, setOptionDImage] = useState(examQuestions[questionIndex].optionDImage);
    const [solution, setSolution] = useState("");
    const [solutionImage, setSolutionImage] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState(new Set(examQuestions[questionIndex].correctAnswer));
    const [questionImagePreview, setQuestionImagePreview] = useState(null);
    const [optionAImagePreview, setOptionAImagePreview] = useState(null);
    const [optionBImagePreview, setOptionBImagePreview] = useState(null);
    const [optionCImagePreview, setOptionCImagePreview] = useState(null);
    const [optionDImagePreview, setOptionDImagePreview] = useState(null);
    const [solutionImagePreview, setSolutionImagePreview] = useState(null);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        setType(examQuestions[questionIndex].type);
        setSubject(examQuestions[questionIndex].subject);
        setSubtopic(examQuestions[questionIndex].subtopic);
        setPositiveMarks(examQuestions[questionIndex].positiveMarks);
        setNegativeMarks(examQuestions[questionIndex].negativeMarks);
        setQuestion(examQuestions[questionIndex].question);
        setQuestionImage(examQuestions[questionIndex].questionImage);
        setOptionA(examQuestions[questionIndex].optionA);
        setOptionAImage(examQuestions[questionIndex].optionAImage);
        setOptionB(examQuestions[questionIndex].optionB);
        setOptionBImage(examQuestions[questionIndex].optionBImage);
        setOptionC(examQuestions[questionIndex].optionC);
        setOptionCImage(examQuestions[questionIndex].optionCImage);
        setOptionD(examQuestions[questionIndex].optionD);
        setOptionDImage(examQuestions[questionIndex].optionDImage);
        setSolution(examQuestions[questionIndex].solution);
        setSolutionImage(examQuestions[questionIndex].solutionImage);
        setCorrectAnswer(new Set(examQuestions[questionIndex].correctAnswer));
        // updateImageStates(questionImage, "questionImage");
        // updateImageStates(optionAImage, "optionAImage");
        // updateImageStates(optionBImage, "optionBImage");
        // updateImageStates(optionCImage, "optionCImage");
        // updateImageStates(optionAImage, "optionDImage");
        // updateImageStates(solutionImage, "solutionImage");
    }, [questionIndex, examQuestions]);

    const updateImageStates = (file, baseID) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            switch (baseID) {
                case "questionImage":
                    setQuestionImagePreview(reader.result);
                    setQuestionImage(file);
                    break;
                case "optionAImage":
                    setOptionAImagePreview(reader.result);
                    setOptionAImage(file);
                    break;
                case "optionBImage":
                    setOptionBImagePreview(reader.result);
                    setOptionBImage(file);
                    break;
                case "optionCImage":
                    setOptionCImagePreview(reader.result);
                    setOptionCImage(file);
                    break;
                case "optionDImage":
                    setOptionDImagePreview(reader.result);
                    setOptionDImage(file);
                    break;
                case "solutionImage":
                    setSolutionImagePreview(reader.result);
                    setSolutionImage(file);
                    break;
            }
        }
    };

    const updateUnsavedState = () => {
        setUnsaved(true);
        document.removeEventListener("change", updateUnsavedState);
    }

    const deleteQuestion = () => {
        const arr = examQuestions.filter((question, index) => (questionIndex !== index));
        setExamQuestions(arr);
        if (arr.length === questionIndex) {
            setQuestionIndex((questionIndex) => (questionIndex - 1));
        }
    }

    const validateData = () => {
        let isValid = true;
        let errorMsg = [];

        if (subject === "") {
            isValid = false;
            errorMsg.push("Please select subject");
        }
        if (subtopic === "") {
            isValid = false;
            errorMsg.push("Please select subtopic");
        }
        if (positiveMarks <= 0) {
            isValid = false;
            errorMsg.push("Please enter appropriate value for positive marks (i.e. greater than 0)");
        }
        if (negativeMarks > 0) {
            isValid = false;
            errorMsg.push("Please enter appropriate value for negative marks (i.e. less than 0)");
        }
        if (question === "" && questionImage === null) {
            isValid = false;
            errorMsg.push("Please enter question");
        }
        if (optionA === "" && optionAImage === null) {
            isValid = false;
            errorMsg.push("Please enter option - A");
        }
        if (optionB === "" && optionBImage === null) {
            isValid = false;
            errorMsg.push("Please enter option - B");
        }
        if (optionC === "" && optionCImage === null) {
            isValid = false;
            errorMsg.push("Please enter option - C");
        }
        if (optionD === "" && optionDImage === null) {
            isValid = false;
            errorMsg.push("Please enter option - D");
        }
        if (solution === "" && solutionImage === null) {
            isValid = false;
            errorMsg.push("Please enter solution");
        }
        if (correctAnswer.size === 0) {
            isValid = false;
            errorMsg.push("Please select the correct answer");
        }

        return {
            isValid: isValid,
            errorMsg: errorMsg
        };
    }

    const saveQuestion = async () => {
        const newExamQuestions = new Object(examQuestions);
        const data = {
            type: type,
            subject: subject,
            subtopic: subtopic,
            positiveMarks: positiveMarks,
            negativeMarks: negativeMarks,
            question: question,
            questionImage: questionImage,
            optionA: optionA,
            optionAImage: optionAImage,
            optionB: optionB,
            optionBImage: optionBImage,
            optionC: optionC,
            optionCImage: optionCImage,
            optionD: optionD,
            optionDImage: optionDImage,
            solution: solution,
            solutionImage: solutionImage,
            correctAnswer: [...correctAnswer]
        };
        newExamQuestions[questionIndex] = data;
        setExamQuestions(newExamQuestions);
    }

    const handleDeleteBtn = async () => {
        setDeleting((deleting) => (!deleting));
        deleteQuestion();
        setDeleting((deleting) => (!deleting));
    }

    const handleSaveBtn = async () => {
        // const {isValid, errorMsg} = validateData();
        const isValid = true;
        const errorMsg = '';
        if (!isValid) {
            let errorStr = "";
            errorMsg.forEach((msg, index) => {
                errorStr += (index + 1) + ". " + msg + "\n";
            });
            window.alert("Cannot save the question: \n" + errorStr);
        } else {
            setSaving((saving) => (!saving));
            await saveQuestion();
            setSaving((saving) => (!saving));
            setUnsaved(false);
            document.addEventListener("change", updateUnsavedState);
        }
    }

    const handleAddImage = (e, baseID) => {
        document.getElementById(baseID + "Add").classList.add("hidden");
        const file = e.target.files[0];
        console.log(file);
        console.log("questionImage:", questionImage);
        updateImageStates(file, baseID);
        document.getElementById(baseID + "Remove").classList.remove("hidden");
    }

    const handleRemoveImage = async (baseID) => {
        document.getElementById(baseID + "Remove").classList.add("hidden");
        switch (baseID) {
            case "questionImage":
                setQuestionImagePreview(null);
                setQuestionImage(null);
                break;
            case "optionAImage":
                setOptionAImagePreview(null);
                setOptionAImage(null);
                break;
            case "optionBImage":
                setOptionBImagePreview(null);
                setOptionBImage(null);
                break;
            case "optionCImage":
                setOptionCImagePreview(null);
                setOptionCImage(null);
                break;
            case "optionDImage":
                setOptionDImagePreview(null);
                setOptionDImage(null);
                break;
            case "solutionImage":
                setSolutionImagePreview(null);
                setSolutionImage(null);
                break;
        }
        document.getElementById(baseID + "Add").classList.remove("hidden");
    }

    const editQuestionType = (e) => {
        setType(e.target.value);
        setCorrectAnswer(new Set());
    }

    const editSubject = (e) => {
        setSubject(subjects[e.target.value]);
        console.log(subjects[e.target.value]);
    }

    const editSubtopic = (e) => {
        setSubtopic(subject.subtopics[e.target.value]);
        console.log(subject.subtopics[e.target.value]);
    }

    const editText = (e) => {
        switch (e.target.name) {
            case "positiveMarks":
                setPositiveMarks(e.target.value);
                break;
            case "negativeMarks":
                setNegativeMarks(e.target.value);
                break;
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
        if (type === "mcq") {
            const temp = new Set();
            temp.add(e.target.value);
            setCorrectAnswer(temp);
        } else {
            const temp = new Set(correctAnswer);
            if (temp.has(e.target.value)) temp.delete(e.target.value);
            else temp.add(e.target.value);
            setCorrectAnswer(temp);
        }
    }

    return (
        <>
            <div className='w-full grid grid-cols-3 items-center my-2'>
                <button id='delete' onClick={handleDeleteBtn}
                        className={`disabled:cursor-not-allowed justify-self-start text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center`}
                        disabled={deleting || (examQuestions.length === 1)}>{deleting ? (<><span>Deleting...</span><img
                    src='./images/loading.gif' className='inline h-5 ms-2'/></>) : "Delete"}</button>
                <span className='font-bold text-center'>Question - {questionIndex + 1}</span>
                <button id='save' onClick={handleSaveBtn}
                        className={`disabled:cursor-not-allowed justify-self-end text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center`}
                        disabled={saving || !unsaved}>{saving ? (<><span>Saving...</span><img src='./images/loading.gif'
                                                                                              className='inline h-5 ms-2'/></>) : "Save"}</button>
            </div>
            <div className='w-full my-2 text-center'>
                <label htmlFor='questionTypeSelect' className='font-bold'>Select question type:</label>
                <select onChange={(e) => editQuestionType(e)}
                        className='mx-5 rounded-lg px-3 py-1 bg-gray-200 cursor-pointer' id='questionTypeSelect'>
                    <option name='mcq' value={"mcq"} selected={type === "mcq"}>MCQ</option>
                    <option name='msq' value={"msq"} selected={type === "msq"}>MSQ</option>
                </select>
            </div>
            <div className='w-full my-2 grid grid-cols-4 items-center text-start'>
                <div className='col-start-1 col-span-3 grid grid-rows-2'>
                    <div className='my-1'>
                        <label htmlFor='subjectSelect' className='font-bold'>Select subject:</label>
                        <select onChange={(e) => editSubject(e)}
                                className='ms-5 px-3 py-1 bg-gray-200 cursor-pointer rounded-lg' id='subjectSelect'>
                            <option selected={!subject} disabled={true}>Select a subject</option>
                            {subjects.map((element, index) => {
                                return (
                                    <option key={element.subId} name={element.subjectName} value={index}
                                            selected={subject === element}>{element.subjectName}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className='my-1'>
                        <label htmlFor='subtopicSelect' className='font-bold'>Select subtopic:</label>
                        <select onChange={(e) => editSubtopic(e)}
                                className='ms-5 px-3 py-1 bg-gray-200 cursor-pointer rounded-lg overflow-auto'
                                id='subtopicSelect'>
                            <option selected={!subtopic} disabled={true}>Select a subtopic</option>
                            {
                                subject &&
                                subject.subtopics.map((element, index) => {
                                        return (
                                            <option key={element.subtopicId} name={element.subtopicName}
                                                    value={index}
                                                    selected={subtopic === element.subtopicId}>{element.subtopicName}</option>
                                        );
                                    }
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className='col-start-4 col-span-1 text-end'>
                    <div className='my-1'>
                        <label className='font-bold'>Positive Marks:</label>
                        <input type='number' name='positiveMarks' id='positiveMarks' value={positiveMarks}
                               onChange={(e) => editText(e)} min={0}
                               className='ms-5 w-20 border-gray-400 border-2 rounded-lg p-1 focus:shadow-xl'/>
                    </div>
                    <div className='my-1'>
                        <label className='font-bold'>Negative Marks:</label>
                        <input type='number' name='negativeMarks' id='negativeMarks' value={negativeMarks}
                               onChange={(e) => editText(e)} max={0}
                               className='ms-5 w-20 border-gray-400 border-2 rounded-lg p-1 focus:shadow-xl'/>
                    </div>
                </div>
            </div>
            <div className='w-full my-2 p-3 bg-gray-200 rounded-lg border-gray-500 border-2'>
                <label htmlFor='question' className='font-bold'>Question:</label>
                <label htmlFor='questionImage' id='questionImageAdd'
                       className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${questionImage === null ? "" : "hidden"}`}>Add
                    image</label>
                <label id='questionImageRemove' onClick={() => handleRemoveImage("questionImage")}
                       className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${questionImage === null ? "hidden" : ""}`}>Remove
                    image</label>
                <input type='file' accept='image/*' name='questionImage' id='questionImage'
                       onChange={(e) => handleAddImage(e, "questionImage")} className='hidden'/>
                <br/>
                <textarea name='question' id='question' value={question} onChange={(e) => editText(e)}
                          className='w-full border-gray-400 border-2 rounded-lg p-2 my-1 min-h-52 focus:shadow-xl'></textarea>
                <p className='text-end mb-2 text-gray-600 text-sm'>{question.length} / {4294967295} characters</p>
                <div className='flex justify-center'>
                    <img id='questionImagePreview' src={questionImagePreview}/>
                </div>
            </div>
            <div className='w-full my-2 p-3 bg-gray-200 rounded-lg border-gray-500 border-2'>
                <label htmlFor='optionA' className='font-bold'>Option - A:</label>
                <label htmlFor='optionAImage' id='optionAImageAdd'
                       className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${optionAImage === null ? "" : "hidden"}`}>Add
                    image</label>
                <label id='optionAImageRemove' onClick={() => handleRemoveImage("optionAImage")}
                       className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${optionAImage === null ? "hidden" : ""}`}>Remove
                    image</label>
                <input type='file' accept='image/*' name='optionAImage' id='optionAImage'
                       onChange={(e) => handleAddImage(e, "optionAImage")} className='hidden'/>
                <br/>
                <textarea name='optionA' id='optionA' value={optionA} onChange={(e) => editText(e)}
                          className='w-full border-gray-400 border-2 rounded-lg p-2 my-1 min-h-32 focus:shadow-xl'></textarea>
                <p className='text-end mb-2 text-gray-600 text-sm'>{optionA.length} / {65535} characters</p>
                <div className='flex justify-center'>
                    <img id='optionAImagePreview' src={optionAImagePreview}/>
                </div>
            </div>
            <div className='w-full my-2 p-3 bg-gray-200 rounded-lg border-gray-500 border-2'>
                <label htmlFor='optionB' className='font-bold'>Option - B:</label>
                <label htmlFor='optionBImage' id='optionBImageAdd'
                       className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${optionBImage === null ? "" : "hidden"}`}>Add
                    image</label>
                <label id='optionBImageRemove' onClick={() => handleRemoveImage("optionBImage")}
                       className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer hidden ${optionBImage === null ? "hidden" : ""}`}>Remove
                    image</label>
                <input type='file' accept='image/*' name='optionBImage' id='optionBImage'
                       onChange={(e) => handleAddImage(e, "optionBImage")} className='hidden'/>
                <br/>
                <textarea name='optionB' id='optionB' value={optionB} onChange={(e) => editText(e)}
                          className='w-full border-gray-400 border-2 rounded-lg p-2 my-1 min-h-32 focus:shadow-xl'></textarea>
                <p className='text-end mb-2 text-gray-600 text-sm'>{optionB.length} / {65535} characters</p>
                <div className='flex justify-center'>
                    <img id='optionBImagePreview' src={optionBImagePreview}/>
                </div>
            </div>
            <div className='w-full my-2 p-3 bg-gray-200 rounded-lg border-gray-500 border-2'>
                <label htmlFor='optionC' className='font-bold'>Option - C:</label>
                <label htmlFor='optionCImage' id='optionCImageAdd'
                       className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${optionCImage === null ? "" : "hidden"}`}>Add
                    image</label>
                <label id='optionCImageRemove' onClick={() => handleRemoveImage("optionCImage")}
                       className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${optionCImage === null ? "hidden" : ""}`}>Remove
                    image</label>
                <input type='file' accept='image/*' name='optionCImage' id='optionCImage'
                       onChange={(e) => handleAddImage(e, "optionCImage")} className='hidden'/>
                <br/>
                <textarea name='optionC' id='optionC' value={optionC} onChange={(e) => editText(e)}
                          className='w-full border-gray-400 border-2 rounded-lg p-2 my-1 min-h-32 focus:shadow-xl'></textarea>
                <p className='text-end mb-2 text-gray-600 text-sm'>{optionC.length} / {65535} characters</p>
                <div className='flex justify-center'>
                    <img id='optionCImagePreview' src={optionCImagePreview}/>
                </div>
            </div>
            <div className='w-full my-2 p-3 bg-gray-200 rounded-lg border-gray-500 border-2'>
                <label htmlFor='optionD' className='font-bold'>Option - D:</label>
                <label htmlFor='optionDImage' id='optionDImageAdd'
                       className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${optionDImage === null ? "" : "hidden"}`}>Add
                    image</label>
                <label id='optionDImageRemove' onClick={() => handleRemoveImage("optionDImage")}
                       className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${optionDImage === null ? "hidden" : ""}`}>Remove
                    image</label>
                <input type='file' accept='image/*' name='optionDImage' id='optionDImage'
                       onChange={(e) => handleAddImage(e, "optionDImage")} className='hidden'/>
                <br/>
                <textarea name='optionD' id='optionD' value={optionD} onChange={(e) => editText(e)}
                          className='w-full border-gray-400 border-2 rounded-lg p-2 my-1 min-h-32 focus:shadow-xl'></textarea>
                <p className='text-end mb-2 text-gray-600 text-sm'>{optionD.length} / {65535} characters</p>
                <div className='flex justify-center'>
                    <img id='optionDImagePreview' src={optionDImagePreview}/>
                </div>
            </div>
            <div className='w-full my-2 p-3 bg-gray-200 rounded-lg border-gray-500 border-2'>
                <h1 className='font-bold'>Select the correct answer:</h1>
                <div className={`${type === "mcq" ? "" : "hidden"}`}>
                    <div className='w-full'>
                        <input type='radio' value={"A"} name='correctAnswer' id='mcqCorrectOptionA'
                               checked={correctAnswer.has("A")} onChange={(e) => editCorrectAnswer(e)}/>
                        <label htmlFor='mcqCorrectOptionA' className='ms-2'>Option - A</label>
                    </div>
                    <div className='w-full'>
                        <input type='radio' value={"B"} name='correctAnswer' id='mcqCorrectOptionB'
                               checked={correctAnswer.has("B")} onChange={(e) => editCorrectAnswer(e)}/>
                        <label htmlFor='mcqCorrectOptionB' className='ms-2'>Option - B</label>
                    </div>
                    <div className='w-full'>
                        <input type='radio' value={"C"} name='correctAnswer' id='mcqCorrectOptionC'
                               checked={correctAnswer.has("C")} onChange={(e) => editCorrectAnswer(e)}/>
                        <label htmlFor='mcqCorrectOptionC' className='ms-2'>Option - C</label>
                    </div>
                    <div className='w-full'>
                        <input type='radio' value={"D"} name='correctAnswer' id='mcqCorrectOptionD'
                               checked={correctAnswer.has("D")} onChange={(e) => editCorrectAnswer(e)}/>
                        <label htmlFor='mcqCorrectOptionD' className='ms-2'>Option - D</label>
                    </div>
                </div>
                <div className={`${type === "msq" ? "" : "hidden"}`}>
                    <div className='w-full'>
                        <input type='checkbox' value={"A"} name='correctAnswer' id='msqCorrectOptionA'
                               checked={correctAnswer.has("A")} onChange={(e) => editCorrectAnswer(e)}/>
                        <label htmlFor='msqCorrectOptionA' className='ms-2'>Option - A</label>
                    </div>
                    <div className='w-full'>
                        <input type='checkbox' value={"B"} name='correctAnswer' id='msqCorrectOptionB'
                               checked={correctAnswer.has("B")} onChange={(e) => editCorrectAnswer(e)}/>
                        <label htmlFor='msqCorrectOptionB' className='ms-2'>Option - B</label>
                    </div>
                    <div className='w-full'>
                        <input type='checkbox' value={"C"} name='correctAnswer' id='msqCorrectOptionC'
                               checked={correctAnswer.has("C")} onChange={(e) => editCorrectAnswer(e)}/>
                        <label htmlFor='msqCorrectOptionC' className='ms-2'>Option - C</label>
                    </div>
                    <div className='w-full'>
                        <input type='checkbox' value={"D"} name='correctAnswer' id='msqCorrectOptionD'
                               checked={correctAnswer.has("D")} onChange={(e) => editCorrectAnswer(e)}/>
                        <label htmlFor='msqCorrectOptionD' className='ms-2'>Option - D</label>
                    </div>
                </div>
            </div>
            <div className='w-full my-2 p-3 bg-gray-200 rounded-lg border-gray-500 border-2'>
                <label htmlFor='solution' className='float-start font-bold'>Solution:</label>
                <label htmlFor='solutionImage' id='solutionImageAdd'
                       className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${solutionImage === null ? "" : "hidden"}`}>Add
                    image</label>
                <label id='solutionImageRemove' onClick={() => handleRemoveImage("solutionImage")}
                       className={`float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer ${solutionImage === null ? "hidden" : ""}`}>Remove
                    image</label>
                <input type='file' accept='image/*' name='solutionImage' id='solutionImage'
                       onChange={(e) => handleAddImage(e, "solutionImage")} className='hidden'/>
                <br/>
                <textarea name='solution' id='solution' value={solution} onChange={(e) => editText(e)}
                          className='w-full border-gray-400 border-2 rounded-lg p-2 my-1 min-h-32 focus:shadow-xl'></textarea>
                <p className='text-end mb-2 text-gray-600 text-sm'>{solution.length} / {4294967295} characters</p>
                <div className='flex justify-center'>
                    <img id='solutionImagePreview' src={solutionImagePreview}/>
                </div>
            </div>
        </>
    );
};