import data from "../HomePage/data";

import React, { useState } from 'react';
import Topics from "./Topics";

export default function MockTestSelection() {
    const arr = data.map(topic => {
        const subtopicsLength = topic.subtopics.length;
        return Array(subtopicsLength).fill(false);
    });

    function handleAllSelection(e){
       
        if(!checkAll())
        {
        const arr1 = arr.map(row =>
            row.map(value => !allSelected)
          );
         // const a = checkAll();
          changeAllSelected(!allSelected);
          changeSelection(arr1);
        }
          
    }

    function checkAll()
    {
        let check = true;
        console.log("here check all");

        for (let i = 0; i < selection.length; i++) {
            for (let j = 0; j < selection[i].length; j++) {
              check = check && selection[i][j];
              if(!check)
              return false;
            }
          }
          console.log("gamaerrr "+check);
          return check;

    }

    const[allSelected,changeAllSelected] = useState(false);
    const [selection, changeSelection] = useState(arr);
    const [isOpen,changeIsOpen] = useState(false);
    return (
        <div >
            <div className="text-center text-2xl font-bold text-gray-800 p-4" >
                SELECT TOPICS TO GENERATE MOCK TEST

            </div >
            <div className="my-8 mx-16 border border-gray-800 shadow-blue-800 bg-green-500">
                <div className="bg-black text-start px-4 py-2 font-bold flex justify-between" >
                  <div className={`cursor-pointer ${isOpen ? 'text-blue-500 ' :'text-white'}`} onClick={()=>{console.log("nnn"); changeIsOpen(!isOpen)}}>
                    All Topics
                    </div>
                    <input
                        type="checkbox"
                        id="all"
                        className="mr-2 h-6 w-6"
                        checked={allSelected}
                        onClick={(e)=>handleAllSelection(e)}       
                    />
                    
                </div>
                {
                   isOpen &&  data.map((topic, index) => <Topics topic={ topic } selection={ selection } changeSelection={ changeSelection } index={ index } allSelected={allSelected} changeAllSelected={changeAllSelected} checkAll={checkAll} />)
                }
            </div>

        </div>
    );
};