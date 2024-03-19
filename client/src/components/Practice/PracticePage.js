import React from 'react'
import questions from '../../dummy-data/questions';
import QuestionContainer from './QuestionContainer';

export default function PracticePage({subtopics}) {
  
  function requestQuestionSet(setNo) {
    if(current>setNo) {
      current--;
      next_set = [...curr_set];
      curr_set = [...prev_set];
      for(let i=0;i<curr_set.length;i++) {
      //  curr_set.push(questions[i]);
        responses.push([false,false,false,false]);
    
      }
      if(current===1) {
        prev_set = null;
      }
      else {
        for(let i=5*(current-2);i<Math.min(total,5*(current-1));i++) {
          prev_set.push(questions[i]);
        }
      }
      
    }
    else {

      current++;
      prev_set = [...curr_set];
      curr_set = [...next_set];
      let x = total/5;
      if(total%5!==0)
      x++;
      if(current===x) {
        next_set = null;
      }
      else {
        for(let i=current*5;i<Math.min((current+1)*5,total);i++) {
          next_set.push(questions[i]);
        }
      }

    }
  }

  // function push_initial() {
  //   if(responses.length-1<5*current)
  //         {
  //         }

  // }


  const length = subtopics.length;
  const total = questions.length;
  let tracker = Array(length).fill(0);
  let current = 1;
  let prev_set=[],curr_set=[],next_set=[],responses=[];
  for(let i=0;i<Math.min(total,5);i++) {
    curr_set.push(questions[i]);
    responses.push([false,false,false,false]);

  }
  for(let i=6;i<Math.min(total,10);i++) {
    next_set.push(questions[i]);
  }


  let x=0;



  return (
    <div className='flex flex-col gap-y-6 pt-2 pb-6'>
      
      {  
        curr_set.map((question, index) => ( <QuestionContainer question={question} number={5*(current-1)+(index+1)} shift={Math.floor(Math.random()*4)} responses={responses}/>))
      }
       <div onClick={()=>console.log(responses)}>
      print
    </div>
    </div>
   
  )
};
