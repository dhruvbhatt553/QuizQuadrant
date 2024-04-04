//import data from "../HomePage/data";

import React, {useContext, useState, useEffect} from 'react';
import Topics from "./Topics";
import subjectContext from '../../context/subject/subjectContext';



export default function MockTestSelection() {

    const [allSelected, changeAllSelected] = useState(false);
    const [selection, changeSelection] = useState(null);
    const [isOpen, changeIsOpen] = useState(false);
    const { subjects } = useContext(subjectContext);

    console.log("subjects in starting",subjects);
    useEffect(() => {
        console.log("in use effect",subjects);
        const arr = subjects.map(topic => {
            const subtopicsLength = topic.subtopics.length;
            return Array(subtopicsLength).fill(false);
        });
        console.log("arr 0 ",arr[0],subjects);
        changeSelection(() => { return arr; });
    }, [subjects]);

    function createMockTest() {
        let subtopicArr = [];
        for (let i = 0; i < selection.length; i++) {
            for (let j = 0; j < selection[i].length; j++) {
                if (selection[i][j])
                    subtopicArr.push(subjects[i].subtopics[j]);
            }
        }
    }

    function handleAllSelection(e) {

        
            const arr1 = selection.map(row =>
                row.map(value => !allSelected)
            );

            changeSelection(arr1);
            changeAllSelected(!allSelected);
        

    }

    function checkChildren() {
        changeAllSelected(checkAll());
    }

    function checkAll() {
        let check = true;

        for (let i = 0; i < selection.length; i++) {
            for (let j = 0; j < selection[i].length; j++) {
                check = check && selection[i][j];
                if (!check)
                    return false;
            }
        }
        return check;
    }


    return (
        <div >
            <div className="text-center text-2xl font-bold text-gray-800 p-4" >
                SELECT TOPICS TO GENERATE MOCK TEST

            </div >

            <div className="w-64 mx-auto">
                <label htmlFor="dropdown" className="block text-sm font-medium text-gray-700">Select No of questions:</label>
                <select id="dropdown"
                    className="mt-1 mx-auto text-black border border-gray-900 block w-fit py-2  sm:text-sm rounded-md">
                    <option value="option1">10</option>
                    <option value="option2">20</option>
                    <option value="option3">50</option>
                    <option value="option3">65</option>
                    <option value="option3">75</option>
                    <option value="option3">100</option>
                    <option value="option3">200</option>
                    <option value="option3">300</option>
                </select>
            </div>
            <div className="my-8 mx-16 border border-gray-800 shadow-blue-800 bg-green-500">
                <div className="bg-black text-start px-4 py-2 font-bold flex justify-between" >
                    <div className={ `cursor-pointer ${isOpen ? 'text-blue-500 ' : 'text-white'}` } onClick={ () => { console.log("nnn"); changeIsOpen(!isOpen) } }>
                        All Topics
                    </div>
                    <input
                        type="checkbox"
                        id="all"
                        className="mr-2 h-6 w-6"
                        checked={ allSelected }
                        onClick={ (e) => handleAllSelection(e) }
                    />

                </div>
                {console.log("selection in mcselction", selection)}
                {

                    isOpen && subjects.map((topic, index) => <Topics topic={ topic } selection={ selection } changeSelection={ changeSelection } index1={ index } allSelected={ allSelected } checkAllSelected={ checkChildren } />)
                }
            </div>
            <div onClick={ (e) => { console.log(selection); } } className="cursor-pointer">
                Create Mock test
            </div>
        </div>
    );
};