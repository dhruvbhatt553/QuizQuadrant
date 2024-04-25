import React, {useState} from 'react';
import Subtopics from './Subtopics';

export default function Topics({topic, selection, changeSelection, index1, allSelected, checkAllSelected}) {

    function handleSelection(e) {
        let arr = [...selection];
        for (let j = 0; j < selection[index1].length; j++) {
            arr[index1][j] = !subjectSelected;
        }
        changeSelection(arr);
        checkChildren();
    }

    function checkChildren() {
        changeSubjectSelected(checkSubject());
        checkAllSelected();
    }

    function checkSubject() {

        let check = topic.subtopics.length !== 0;

        console.log("Selection", selection, index1, topic);
        for (let j = 0; j < selection[index1].length; j++) {
            check = check && selection[index1][j];
            if (!check)
                break;
        }
        return check;
    }

    const [subjectSelected, changeSubjectSelected] = useState(checkSubject());
    const [isOpen, changeIsOpen] = useState(false);
    return (
        <>
       {(topic.subtopics.length!==0) && (<div>
            <div className='border border-y-black text-start px-4 py-0.5 flex justify-between items-center'>
                <div className={`font-bold cursor-pointer ${isOpen ? 'text-blue-500 ' : 'text-white'}`} onClick={() => {
                    console.log("nnn");
                    changeIsOpen(!isOpen);
                }}>
                    {topic.subjectName}
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="all"
                        className="mr-2 h-4 w-4"
                        checked={checkSubject() || allSelected || subjectSelected || topic.subtopics.length === 0}
                        onClick={(e) => handleSelection(e)}
                    />
                </div>
            </div>
            {
                isOpen && topic.subtopics.map((subtopic, index) => <Subtopics subtopic={subtopic} selection={selection}
                                                                              changeSelection={changeSelection}
                                                                              index1={index1} index2={index}
                                                                              parentSelected={allSelected || subjectSelected}
                                                                              checkParent={checkChildren}/>  )
            }
        </div> )}
        </>
    );
};
