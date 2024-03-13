

export default function Subtopics({subtopic,selection,changeSelection,index1,index2,parentSelected,checkParent}) {
   

    function handleSelection(e){
        console.log("handel "+index1+" "+index2);
        let arr=[...selection];
        arr[index1][index2]=!arr[index1][index2];
            changeSelection(arr);
 
           checkParent();
          
    }

   
    
    return (
        <div className=' text-start ps-6 pe-4 py-0.5 flex justify-between items-center'>
            <div className='font-bold text-white'>

            {subtopic}
            </div>

            <input
                        type="checkbox"
                        id="all"
                        className="mr-2 h-4 w-4"
                        checked={selection[index1][index2] || parentSelected }
                        onClick={(e)=>handleSelection(e)}
                    />
                  
        </div>
    );
};