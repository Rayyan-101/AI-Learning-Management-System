'use client'
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FlashCardItem from './_components/flashcardItem';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const Flashcards = () => {
    const {courseId} = useParams();
    const [flashCards,setFlashCards]=useState([]);
    const [isFlipped,setIsFlipped]=useState();
    const [api,setApi]=useState();
    useEffect(()=>{
     GetFlashCards()
    },[]);

    useEffect(()=>{
        if(!api){
            return ;
        }
        api.on('select',()=>{
            setIsFlipped(false);
        })
    },[api]);

    const GetFlashCards=async()=>{
        const result=await axios.post('/api/study-type',{
            courseId:courseId,
            studyType:'Flashcard'
        });
        console.log(result)
        setFlashCards(result?.data);
        console.log('Flashcard',result.data);
    }

    const handleClick=()=>{
        setIsFlipped(!isFlipped)
    }

  return (
    <div>
      <h2 className='font-bold text-2xl'>Flashcards</h2>
      <p>Flashcards: The Ultimate Tool to Lock in Concepts!</p>
      <div className='flex items-center justify-center mt-10'>
          <Carousel setApi={setApi}>
        <CarouselContent>
            {flashCards?.content&&flashCards.content?.map((flashcard,index)=>(
            <CarouselItem key={index} className='flex items-center justify-center'>          
                <FlashCardItem handleClick={handleClick} isFlipped={isFlipped} flashcard={flashcard}/>
            </CarouselItem>
            ))}

        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

export default Flashcards
