import { Progress } from '@radix-ui/react-progress'
import Image from 'next/image'
import React from 'react'

const CourseIntroCard = ({course}) => {
  return (
    <div className='flex gap-5 items-center p-10 border shadow-md rounded-2xl'> 
      <Image src={'/knowledge.gif'} alt='other' width={70} height={70}/>
      <div>
        <h2 className='font-bold text-2xl'>{course?.courseLayout.course_title}</h2>
        <p>{course?.courseLayout?.summary}</p>
        <Progress className='mt-3s'/>

        <h2 className='mt-3 text-lg text-primary'>Total Chapters: {course?.courseLayout?.chapters?.length}</h2>
      </div>
    </div>
  )
}

export default CourseIntroCard
