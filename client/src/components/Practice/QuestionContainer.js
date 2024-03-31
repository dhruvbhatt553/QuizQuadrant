import React, { useState } from 'react'



export default function QuestionContainer({question , number, shift, responses, resHandler}) {
    const handleImageError = (event) => {
        event.target.src = 'https://images.pexels.com/photos/2649841/pexels-photo-2649841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'; 
      };
    
    console.log("number   "+number);
    console.log(responses);

      const handleResponseChange = (index,event) => {
        console.log(event);
        let updatedResponses = [...responses];
     
            updatedResponses[number-1][index] = !updatedResponses[number-1][index];
        
        if(question.questionType === "mcq") {
            for(let i=0;i<4;i++) {
               if(i!==index) {
                updatedResponses[number-1][i] = false;
               }
            }
        }
       
        resHandler([...updatedResponses]); 
        event.preventDefault();
      };
      
   

    
    const handelCheckAnswers = (event) => {
       

    }
    return(
        <div className='border border-blue-300 mx-4 text-start'>
            <div className='flex justify-between border-b-blue-300 border-b items-center px-4'>
                <div className='py-3   font-semibold'>
                    Question {number}
                </div>
                <div className='flex gap-x-2'>
                    <div className='bg-yellow-400 p-1 rounded'>
                        +{question.maxMarks}
                    </div>
                    
                    <div className='bg-red-400 p-1 rounded'>
                        -{question.maxMarks}
                    </div>
                </div>
            </div>
            <div className='py-3 px-4 flex justify-between'>
                <div>
                    
                            <div className='text-[14px] w-4/5 '>
                                {question.questionText}
                            </div>
                    
                    <div>
                        <img src={question.questionImage} 
                        className='w-1/5'
                        alt="loading"
                        onError={handleImageError}
                        />
                    </div>
                </div>

                <div className='font-serif font-bold'>
                    {  question.questionType.toUpperCase()}
                </div>

               
                
            </div>

            <div className='px-4 mb-3 cursor-pointer'>
                <div className={`border  ps-2 py-1  rounded flex items-center gap-x-3  ${responses[number-1][0] ? "border-blue-500 font-bold border-2" : "border-black border-0.5"} `}  onClick={(event) => handleResponseChange(0,event)} >
                    <div className={`text-[15px] border border-black w-fit px-3 py-1.5 ${question.questionType === 'mcq' ? 'rounded-full' : 'rounded'}`}>
                        A 
                    </div>
                    <div>
                    {question.options[(0+shift)%4].optionText}
                    <div>
                        <img src={question.options[(0+shift)%4].optionImage} 
                        className='w-1/6'
                        alt="Image is loading "
                        onError={handleImageError}

                        />
                    </div>
                    </div>
                </div>
            </div>
            <div className='px-4 mb-3 cursor-pointer'>
                <div className={`border  ps-2 py-1  rounded flex items-center gap-x-3  ${responses[number-1][1] ? "border-blue-500 font-bold border-2" : "border-black border-0.5"} `}  onClick={(event) => handleResponseChange(1,event)} >
                    <div className={`text-[15px] border border-black w-fit px-3 py-1.5 ${question.questionType === 'mcq' ? 'rounded-full' : 'rounded'}`}>
                        B
                    </div>
                    <div>
                    {question.options[(1+shift)%4].optionText}
                    <div>
                        <img src={question.options[(1+shift)%4].optionImage} 
                        className='w-1/6'
                        alt="Image is loading "
                        onError={handleImageError}

                        />
                    </div>
                    </div>
                </div>
            </div>
            <div className='px-4 mb-3 cursor-pointer'>
                <div className={`border  ps-2 py-1  rounded flex items-center gap-x-3  ${responses[number-1][2] ? "border-blue-500 font-bold border-2" : "border-black border-0.5"} `} onClick={(event) => handleResponseChange(2,event)} >
                    <div className={`text-[15px] border border-black w-fit px-3 py-1.5 ${question.questionType === 'mcq' ? 'rounded-full' : 'rounded'}`}>
                        C
                    </div>
                    <div>
                    {question.options[(2+shift)%4].optionText}
                    <div>
                        <img src={question.options[(2+shift)%4].optionImage} 
                        className='w-1/6'
                        alt="Image is loading "
                        onError={handleImageError}
                        />
                    </div>
                    </div>
                </div>
            </div>
            <div className='px-4 mb-3 cursor-pointer'>
                <div className={`border  ps-2 py-1  rounded flex items-center gap-x-3  ${responses[number-1][3] ? "border-blue-500 font-bold border-2" : "border-black border-0.5"} `}  onClick={(event) => handleResponseChange(3,event)} >
                    <div className={`text-[15px] border border-black w-fit px-3 py-1.5 ${question.questionType === 'mcq' ? 'rounded-full' : 'rounded'}`}>
                        D
                    </div>
                    <div>
                    {question.options[(3+shift)%4].optionText}
                    <div>
                        <img src={question.options[(3+shift)%4].optionImage} 
                        className='w-1/6'
                        alt="Image is loading "
                        onError={handleImageError}
                        />
                    </div>
                    </div>
                </div>
            </div>
            <div className={`float-end  px-2 ${(responses[number-1][0] || responses[number-1][1] || responses[number-1][2] || responses[number-1][3] ) ? "bg-gray-500 cursor-pointer" : " bg-gray-300 cursor-none" }`} onClick={() => handelCheckAnswers()} >
               Check Answer 
            </div>
        </div>
        
        )
            
  

};