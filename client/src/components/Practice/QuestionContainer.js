import React, { useState } from 'react'



export default function QuestionContainer({question , number, shift, responses}) {
    const handleImageError = (event) => {
        event.target.src = 'https://images.pexels.com/photos/2649841/pexels-photo-2649841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'; // Put your default image URL here
      };
    
      function checkAnswerable (res) {
        let ans = false;
        for(let i=0;i<4;i++) {
            ans = ans || res[i];
            if(ans)
            break;
        }
        return ans;
      }

      const handleResponseChange = (index) => {
        let updatedResponse = [...response];
     
            updatedResponse[index] = !updatedResponse[index];
        
        if(question.questionType === "mcq") {
            for(let i=0;i<4;i++) {
               if(i!==index) {
                updatedResponse[i] = false;
               }
            }
        }
       
        changeResponse(updatedResponse); 
        changeFlag(checkAnswerable(updatedResponse));
      };
      
      const [response,changeResponse] = useState (responses[number-1]);
      const [flag, changeFlag] = useState(checkAnswerable(responses[number-1]));


    
    const handelCheckAnswers = (event) => {
        responses[number-1] = response;
        changeFlag(false);


    }
    return(
        <div className='border border-blue-300 mx-4 text-start'>
            <div className='py-3 ps-4 border-b-blue-300 border-b font-semibold'>
                Question {number}
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
                <div className={`border  ps-2 py-1  rounded flex items-center gap-x-3  ${response[0] ? "border-blue-500 font-bold border-2" : "border-black border-0.5"} `}  onClick={() => handleResponseChange(0)} >
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
                <div className={`border  ps-2 py-1  rounded flex items-center gap-x-3  ${response[1] ? "border-blue-500 font-bold border-2" : "border-black border-0.5"} `}  onClick={() => handleResponseChange(1)} >
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
                <div className={`border  ps-2 py-1  rounded flex items-center gap-x-3  ${response[2] ? "border-blue-500 font-bold border-2" : "border-black border-0.5"} `} onClick={() => handleResponseChange(2)} >
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
                <div className={`border  ps-2 py-1  rounded flex items-center gap-x-3  ${response[3] ? "border-blue-500 font-bold border-2" : "border-black border-0.5"} `}  onClick={() => handleResponseChange(3)} >
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
            <div className={`float-end  px-2 ${flag ? "bg-gray-500 cursor-pointer" : " bg-gray-300 cursor-none" }`} onClick={() => handelCheckAnswers()} >
               Check Answer 
            </div>
        </div>
        
        )
            
  

};