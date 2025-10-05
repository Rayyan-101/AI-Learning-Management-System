import React, { useState } from 'react'

const QuizCardItem = ({quiz,userSelectedOption}) => {
    const [selectedOption,setSelectedOption]=useState();
  return quiz&&(
    <div className='mt-10 p-5'>
      <h2 className='font-medium text-3xl text-center'>{quiz?.questionText}</h2>

      <div className='grid grid-cols-2 gap-5 mt-6'>
        {quiz?.options.map((option,index)=>(
            <h2 key={index}
            onClick={()=>{setSelectedOption(option);
                  userSelectedOption(option)
            }}
            variant='outline'
            className={`w-full border rounded-full p-3 text-center px-4 hover:bg-gray-200 text-lg cursor-pointer 
                ${selectedOption==option&&'bg-primary text-white hover:bg-primary'}`}>{option}</h2>
        ))}
      </div>
    </div>
  )
}

export default QuizCardItem
