import React, { useEffect, useState } from 'react'
import MaterialCardItem from './MaterialCardItem'
import axios from 'axios'
import Link from 'next/link';

const StudyMaterialSection = ({courseId,course}) => {
    const [studyTypeContent,setStudyTypeContent]=useState();
    const MaterialList=[
        {
            name:'Notes/Chapters',
            desc:'Read Notes to prepare it',
            icon:'/notes.jpeg',
            path:'/notes',
            type:'notes'
        },
        {
            name:'FlashCard',
            desc:'FlashCard help to remember the concepts',
            icon:'/flashcard.jpg',
            path:'/flashcards',
            type:'flashcard'
        },{
            name:'Quiz',
            desc:'Great way to test your knowledge',
            icon:'/quiz.jpeg',
            path:'/quiz',
            type:'quiz'
        },{
            name:'Question/Answer',
            desc:'Help to practice your learning',
            icon:'/qa.jpeg',
            path:'/qa',
            type:'qa'
        },
    ]

    useEffect(()=>{
        GetStudyMaterial();
    },[])
    const GetStudyMaterial=async()=>{
        const result=await axios.post('/api/study-type',{
            courseId:courseId,
            studyType:'ALL'
        })
        console.log(result?.data);
        setStudyTypeContent(result.data);
    }

  return (
    <div className='mt-5'>
      <h2 className='font-medium text-xl'>Study Material</h2>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-3'>
        {MaterialList.map((item,index)=>(
            <Link href={'/course/'+course?.courseId+item.path} key={item.type}>
            <MaterialCardItem item={item}
            studyTypeContent={studyTypeContent}
            course={course}
            refreshData={GetStudyMaterial}
            />
            </Link>
            
        ))}
      </div>

    </div>
  )
}

export default StudyMaterialSection
