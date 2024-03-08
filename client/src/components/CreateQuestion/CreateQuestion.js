import React, { useState } from 'react';

export default function CreateQuestion(props) {

    // props.subjectwiseTopics

    const [questionType, setQuestionType] = useState("mcq");
    const [subject, setSubject] = useState("");
    const [topic, setTopic] = useState("");
    const [topicList, setTopicList] = useState([]);
    
    const handleQuestionTypeChange = () => {
        setQuestionType(document.getElementById("questionTypeSelect").value);
    };

    const handleSubjectChange = () => {
        const tempSubject = document.getElementById("subjectSelect").value;
        setSubject(tempSubject);
        const arr = props.subjectwiseTopics.find((element) => {
            return (element.title === tempSubject);
        });
        if(arr) {
            setTopicList(arr.subtopics);
        } else {
            setTopicList([]);
        }
    };

    const handleTopicChange = () => {
        setSubject(document.getElementById("topicSelect").value);
    };

    const handleCancel = () => {
        // TODO some logic to cancel ...
        console.log("cancel");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO some logic to save data ...
        console.log("save");
    }

    const handleImageChange = (id) => {
        const element = document.getElementById(id);
        const labelAdd = document.getElementById(id + "LabelAdd");
        const labelRemove = document.getElementById(id + "LabelRemove");
        const imagePreview = document.getElementById(id + "ImagePreview");
        if(element.value === "") {
            console.log("empty");
            labelAdd.classList.remove("hidden");
            labelRemove.classList.add("hidden");
            imagePreview.innerHTML = '';
        } else {
            // TODO some code to upload image ...
            console.log("upload image" + element.value);
            labelAdd.classList.add("hidden");
            labelRemove.classList.remove("hidden");
            const fileReader = new FileReader();
            fileReader.readAsDataURL(element.files[0]);
            fileReader.addEventListener("load", function() {
                imagePreview.innerHTML = `<img src=${this.result} />`;
            });
        }
    };

    const removeImage = (id) => {
        document.getElementById(id).value = "";
        handleImageChange(id);
    };

    return (
        <>
            <div className='w-full h-screen p-5'>
                <form className='w-full h-full' onSubmit={handleSubmit.bind(this)}>
                    <h1 className='font-bold text-3xl pb-3 mb-10 border-b-2 border-black'>New Question</h1>
                    <div className='w-full my-2 columns-md'>
                        <div className='my-2 w-full'>
                            <label htmlFor='questionTypeSelect' className='font-bold text-lg'>Select question type:</label>
                            <select className='mx-5 rounded-full px-3 py-1 bg-gray-200 cursor-pointer' id='questionTypeSelect' onChange={handleQuestionTypeChange}>
                                <option defaultChecked={true} name='mcq' value={"mcq"}>MCQ</option>
                                <option name='msq' value={"msq"}>MSQ</option>
                            </select>
                        </div>
                        <div className='my-2 w-full'>
                            <label htmlFor='subjectSelect' className='font-bold text-lg'>Select subject:</label>
                            <select className='mx-5 rounded-full px-3 py-1 bg-gray-200 cursor-pointer' id='subjectSelect' onChange={handleSubjectChange}>
                                <option defaultChecked={true} value={null}>Select a subject</option>
                                {props.subjectwiseTopics.map((element) => {
                                    return (
                                        <option key={element.title} name={element.title} value={element.title}>{element.title}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className='my-2 w-full'>
                            <label htmlFor='topicSelect' className='font-bold text-lg'>Select topic:</label>
                            <select className='mx-5 rounded-full px-3 py-1 bg-gray-200 cursor-pointer' id='topicSelect' onChange={handleTopicChange}>
                                <option defaultChecked={true} value={null}>Select a topic</option>
                                {topicList.map((element) => {
                                    return (
                                        <option key={element} name={element} value={element}>{element}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='w-full p-2 my-2 border-black border-2 rounded-md bg-gray-200'>
                        <label className='float-start font-bold text-lg'>Type the question here:</label>
                        <label htmlFor='question' id='questionLabelAdd' className='float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer'>Add image</label>
                        <label id='questionLabelRemove' className='float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer hidden' onClick={() => removeImage("question")}>Remove image</label>
                        <input type='file' accept='image/*' name='question' id='question' className='hidden' onChange={() => handleImageChange("question")} />
                        <br />
                        <textarea className='w-full border-gray-400 border-2 rounded-lg p-2 my-1 min-h-52 focus:shadow-xl'></textarea>
                        <div id='questionImagePreview'></div>
                    </div>
                    <div className='w-full mb-2 mt-10'>
                        <h1 className='font-bold text-xl'>OPTIONS</h1>
                    </div>
                    <div className='w-full p-2 my-3 border-black border-2 rounded-md bg-gray-200'>
                        <label className='float-start font-bold text-lg'>Option-A:</label>
                        <label htmlFor='optionA' id='optionALabelAdd' className='float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer'>Add image</label>
                        <label id='optionALabelRemove' className='float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer hidden' onClick={() => removeImage("optionA")}>Remove image</label>
                        <input type='file' accept='image/*' name='optionA' id='optionA' className='hidden' onChange={() => handleImageChange("optionA")} />
                        <br />
                        <textarea className='w-full border-gray-400 border-2 rounded-lg p-2 my-1 min-h-20 focus:shadow-xl'></textarea>
                        <div id='optionAImagePreview'></div>
                    </div>
                    <div className='w-full p-2 my-3 border-black border-2 rounded-md bg-gray-200'>
                        <label className='float-start font-bold text-lg'>Option-B:</label>
                        <label htmlFor='optionB' id='optionBLabelAdd' className='float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer'>Add image</label>
                        <label id='optionBLabelRemove' className='float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer hidden' onClick={() => removeImage("optionB")}>Remove image</label>
                        <input type='file' accept='image/*' name='optionB' id='optionB' className='hidden' onChange={() => handleImageChange("optionB")} />
                        <br />
                        <textarea className='w-full border-gray-400 border-2 rounded-lg p-2 my-1 min-h-20 focus:shadow-xl'></textarea>
                        <div id='optionBImagePreview'></div>
                    </div>
                    <div className='w-full p-2 my-3 border-black border-2 rounded-md bg-gray-200'>
                        <label className='float-start font-bold text-lg'>Option-C:</label>
                        <label htmlFor='optionC' id='optionCLabelAdd' className='float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer'>Add image</label>
                        <label id='optionCLabelRemove' className='float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer hidden' onClick={() => removeImage("optionC")}>Remove image</label>
                        <input type='file' accept='image/*' name='optionC' id='optionC' className='hidden' onChange={() => handleImageChange("optionC")} />
                        <br />
                        <textarea className='w-full border-gray-400 border-2 rounded-lg p-2 my-1 min-h-20 focus:shadow-xl'></textarea>
                        <div id='optionCImagePreview'></div>
                    </div>
                    <div className='w-full p-2 my-3 border-black border-2 rounded-md bg-gray-200'>
                        <label className='float-start font-bold text-lg'>Option-D:</label>
                        <label htmlFor='optionD' id='optionDLabelAdd' className='float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer'>Add image</label>
                        <label id='optionDLabelRemove' className='float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer hidden' onClick={() => removeImage("optionD")}>Remove image</label>
                        <input type='file' accept='image/*' name='optionD' id='optionD' className='hidden' onChange={() => handleImageChange("optionD")} />
                        <br />
                        <textarea className='w-full border-gray-400 border-2 rounded-lg p-2 my-1 min-h-20 focus:shadow-xl'></textarea>
                        <div id='optionDImagePreview'></div>
                    </div>
                    <div className='w-full mt-10'>
                        <h1 className='text-left font-bold text-lg block me-5'>Mark the correct answer(s):</h1>
                    </div>
                    <div className='w-full my-2 text-left'>
                        <div id='correctmcq' className={`${questionType === "mcq" ? "" : "hidden"}`}>
                            <input type='radio' name='correctmcq' id='correctmcqA' />
                            <label htmlFor='correctmcqA' className='mx-2 text-lg font-semibold cursor-pointer'>Option - A</label>
                            <br />
                            <input type='radio' name='correctmcq' id='correctmcqB' />
                            <label htmlFor='correctmcqB' className='mx-2 text-lg font-semibold cursor-pointer'>Option - B</label>
                            <br />
                            <input type='radio' name='correctmcq' id='correctmcqC' />
                            <label htmlFor='correctmcqC' className='mx-2 text-lg font-semibold cursor-pointer'>Option - C</label>
                            <br />
                            <input type='radio' name='correctmcq' id='correctmcqD' />
                            <label htmlFor='correctmcqD' className='mx-2 text-lg font-semibold cursor-pointer'>Option - D</label>
                        </div>
                        <div id='correctmsq' className={`${questionType === "msq" ? "" : "hidden"}`}>
                            <input type='checkbox' name='correctmsq' id='correctmsqA' />
                            <label htmlFor='correctmsqA' className='mx-2 text-lg font-semibold cursor-pointer'>Option - A</label>
                            <br />
                            <input type='checkbox' name='correctmsq' id='correctmsqB' />
                            <label htmlFor='correctmsqB' className='mx-2 text-lg font-semibold cursor-pointer'>Option - B</label>
                            <br />
                            <input type='checkbox' name='correctmsq' id='correctmsqC' />
                            <label htmlFor='correctmsqC' className='mx-2 text-lg font-semibold cursor-pointer'>Option - C</label>
                            <br />
                            <input type='checkbox' name='correctmsq' id='correctmsqD' />
                            <label htmlFor='correctmsqD' className='mx-2 text-lg font-semibold cursor-pointer'>Option - D</label>
                        </div>
                    </div>
                    <div className='w-full p-2 my-5 border-black border-2 rounded-md bg-gray-200'>
                        <label className='float-start font-bold text-lg'>Type the explanation to solution:</label>
                        <label htmlFor='explanation' id='explanationLabelAdd' className='float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer'>Add image</label>
                        <label id='explanationLabelRemove' className='float-end rounded-full bg-blue-700 px-3 py-1 text-white font-bold cursor-pointer hidden' onClick={() => removeImage("explanation")}>Remove image</label>
                        <input type='file' accept='image/*' name='explanation' id='explanation' className='hidden' onChange={() => handleImageChange("explanation")} />
                        <br />
                        <textarea className='w-full border-gray-400 border-2 rounded-lg p-2 my-1 min-h-52 focus:shadow-xl'></textarea>
                        <div id='explanationImagePreview'></div>
                    </div>
                    <div className='w-full my-10'>
                        <button type='submit' className='text-lg rounded-full bg-green-700 px-3 py-1 text-white font-bold mx-1 mb-5'>Save</button>
                        <button type='button' className='text-lg rounded-full bg-red-700 px-3 py-1 text-white font-bold mx-1 mb-5' onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    );
};