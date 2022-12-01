import React from 'react'
import Movies from 'src/component/home/Movies'
import { EMBED_MOVIE_API } from 'src/constants/apiConstants'
import RightSide from 'src/component/home/RightSide'

const Watch = () => {
  const params = new URLSearchParams(location.search)
  const id = params.get('id')
  const apiURL = EMBED_MOVIE_API + id

  return (
    <div className='flex bg'>
      <div className='w-full xl:w-4/6 mx-auto'>
        <div
          className='aspect-ratio aspect-w-16 aspect-h-9 mt-16 md:mt-8 rounded-lg overflow-hidden'
        >
          <iframe
            id='iframe'
            src={ apiURL }
            width='100%'
            height='100%'
            frameBorder='0'
            className='absolute px-3 md:px-4 rounded-lg'
            allowFullScreen
          />
        </div>
        <Movies />
      </div>
      <RightSide className='fixed right-0 hidden xl:flex flex-col w-1/6 h-screen pt-16' />
    </div>
  )
}

export default Watch
