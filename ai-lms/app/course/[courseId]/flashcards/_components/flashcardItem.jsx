import React from 'react'
import ReactCardFlip from 'react-card-flip'

const FlashCardItem = ({isFlipped,handleClick,flashcard}) => {
  return (
    <div className='flex items-center justify-center'>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className='p-4 bg-primary text-white flex items-center justify-center rounded-lg cursor-pointer shadow-lg
        h-[250px] w-[200px] md:h-[350px] md:w-[300px]' onClick={handleClick}>
          <h2>{flashcard?.front}</h2>
        </div>

        <div className='p-4 bg-white text-primary flex items-center justify-center rounded-lg cursor-pointer shadow-lg
        h-[250px] w-[200px] md:h-[350px] md:w-[300px]' onClick={handleClick}>
          <h2>{front?.back}</h2>
        </div>
      </ReactCardFlip>
    </div>
  )
}

export default FlashCardItem
