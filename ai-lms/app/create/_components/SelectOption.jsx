import React, { useState } from 'react'
import Image from 'next/image'

const SelectOption = ({selectedStudyType}) => {
    const Options=[
        {
            name:'Exam',
            icon:'/exam1.webp'
        },
        {
            name:'Job Interview',
            icon:'/job.jpeg'
        },
        {
            name:'Practice',
            icon:'/practice.webp'
        },
        {
            name:'Coding Prep',
            icon:'/code.gif'
        },
        {
            name:'Other',
            icon:'/content.webp'
        },
    ]

  const [selectedOption,setSelectionOption]=useState();

  return (
    <div>
      <h2 className='tetx-center mb-2 text-lg'>For which you want to create your personal study material?</h2>
      <div className='grid grid-cols-2 mt-5 md:grid-cols-3 lg:grid-cols-5 gap-5'>
        {Options.map((option,index)=>{
            return(
            <div key={index} className={`p-4 flex flex-col items-center justify-center border rounded-xl hover:border-primary cursor-pointer ${option?.name==selectedOption&&'border-primary'}`}
            onClick={()=>{setSelectionOption(option.name); selectedStudyType(option.name)}}> 
             <Image src={option.icon} alt={option.name} width={50} height={50}/>
             <h2 className='text-sm mt-2'>{option.name}</h2>
            </div>    
            )
        })}
      </div>
    </div>
  )
}

export default SelectOption
