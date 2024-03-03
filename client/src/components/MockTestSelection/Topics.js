
import React, { useState } from 'react';

export default function Topics({topic,selection,changeSelection,index,allSelected,changeAllSelected,checkAll}) {
    // const arr = data.map(topic => {
    //     const subtopicsLength = topic.subtopics.length;
    //     return Array(subtopicsLength).fill(false);
    //   });
      
    // const [selection,changeSelection] = useState(arr)

    function handleSelection(e){
       let arr=[...selection];
        // for(let i=0;i<selection.length;i++)
        // {
        //     for(let j=0;j<selection[i].length;i++)
        //     {
        //         arr[i][j] = selection[i][j];
        //     }
        // }
        for (let j = 0; j < selection[index].length; j++) {
           arr[index][j] = !subjectSelected;
          }
            
          changeSubjectSelected(!subjectSelected);
          changeSelection(arr);
          changeAllSelected(checkAll());
    }
    
    function checkSubject()
    {
        let check = true;
     //   console.log("here"+index);

            for (let j = 0; j < selection[index].length; j++) {
              check = check && selection[index][j];
              if(!check)
              return false;
            }
          
     //     console.log(""+check);
          return check;

    }
    const[subjectSelected,changeSubjectSelected] = useState(checkSubject())
    return (
        <div className='border border-y-black text-start px-4 py-0.5 flex justify-between items-center'>
            <div className='font-bold '>

            {topic.title}
            </div>

            <input
                        type="checkbox"
                        id="all"
                        className="mr-2 h-4 w-4"
                        checked={subjectSelected || allSelected }
                        onClick={(e)=>handleSelection(e)}
                    />
        </div>
    );
};