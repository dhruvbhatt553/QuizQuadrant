import React, { useContext, useState } from 'react';
import * as xlsx from 'xlsx';
import createExamContext from '../../../context/create-exam/createExamContext';

export default function Page3() {

    const { candidateEmail, setCandidateEmail } = useContext(createExamContext);
    const [emailChoice, setEmailChoice] = useState("manual");
    const [emailField, setEmailField] = useState("");
    const emailRegExp = /[\w-\.]+@[\w]{2,}[\.][\w]{2,}/;

    const handleEmailChoiceChange = (e) => {
        setEmailChoice(e.target.value);
    }

    const editEmailField = (e) => {
        setEmailField(e.target.value);
    }

    const handleCandidateEmailAddBtn = () => {
        const arr = emailField.split(",");
        const emailSet = new Set(candidateEmail);
        arr.map((email) => {
            if(emailRegExp.test(email)) {
                emailSet.add(email);
            }
        });
        setCandidateEmail(emailSet);
        setEmailField("");
    }

    const handleCandidateEmailFileChange = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer(file);
        const excelFile = xlsx.read(data);
        const excelSheet = excelFile.Sheets[excelFile.SheetNames[0]];
        const excelJSON = xlsx.utils.sheet_to_json(excelSheet);
        const emailSet = new Set(candidateEmail);
        excelJSON.map((element) => {
            const email = element.email;
            if(emailRegExp.test(email)) {
                emailSet.add(email);
            }
        });
        setCandidateEmail(emailSet);
    }

    const handleRemoveEmail = (e) => {
        const emailSet = new Set(candidateEmail);
        emailSet.delete(e.target.value);
        setCandidateEmail(emailSet);
    }

    return (
        <>
            <div className='w-3/4 h-full text-left text-xl'>
                <div className='w-full my-5'>
                    <h1 className='font-medium mb-2 me-5 inline'>Email address of allowed candidates:</h1>
                    <input type='radio' name='email-entry-choice' id='manual-entry' value='manual' onChange={handleEmailChoiceChange} defaultChecked={true} />
                    <label htmlFor='manual-entry' className='ms-2 me-5 cursor-pointer'>Enter Manually</label>
                    <input type='radio' name='email-entry-choice' id='file-entry' value='file' onChange={handleEmailChoiceChange} />
                    <label htmlFor='file-entry' className='ms-2 cursor-pointer'>Enter from Excel File</label>
                </div>
                <div className={`w-full my-5 ${emailChoice === "manual" ? "" : "hidden"}`}>
                    <label htmlFor='candidateEmailInput' className='mb-2 block'>Enter Email Address of Candidate:</label>
                    <input type='email' name='candidateEmailInput' id='candidateEmailInput' value={emailField} onChange={(e) => editEmailField(e)} className='w-[calc(90%)] bg-gray-200 rounded-lg border-black border-2 px-3 py-2 focus:shadow-xl' />
                    <button onClick={handleCandidateEmailAddBtn} className='float-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center'>Add</button>
                    <h1 className='mt-5'><b>NOTE: </b>You can add multiple emails separated by a comma(<b>,</b>) in the field to add all emails at once.</h1>
                </div>
                <div className={`w-full my-5 ${emailChoice === "file" ? "" : "hidden"}`}>
                    <label htmlFor='candidateEmailFile' className='cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center'>Select File</label>
                    <input type='file' name='candidateEmailFile' id='candidateEmailFile' accept='.xlsx, .xls' className='hidden' onChange={(e) => handleCandidateEmailFileChange(e)} />
                    <h1 className='mt-5'><b>NOTE: </b>Your excel file must contain only one column containing the email address of all candidates, with title of the column as <b>email</b>.</h1>
                </div>
                <div className='w-full my-5 grid grid-cols-4 gap-3'>
                    {
                        [...candidateEmail].map((email, index) => {
                            return (
                                <div key={index} className='w-full py-2 px-2 bg-gray-200 rounded-lg grid grid-cols-10'>
                                    <div className='col-span-9 overflow-auto'>
                                        <span>{email}</span>
                                    </div>
                                    <div className='col-span-1'>
                                        <button value={email} onClick={handleRemoveEmail} className='px-2 text-white font-bold bg-red-700 rounded-full'>X</button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}