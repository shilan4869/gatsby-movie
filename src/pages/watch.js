import React from 'react'
import Movies from 'src/component/home/Movies'
import { EMBED_MOVIE_API } from 'src/constants/apiConstants'
import RightSide from 'src/component/home/RightSide'

const Watch = () => {
  const params = new URLSearchParams(location.search)
  const id = params.get('id')
  const apiURL = EMBED_MOVIE_API + id

  return (
    <div className='flex bg min-h-96'>
      <div className='w-full md:mt-0 xl:w-4/6 mx-auto'>
        <div className='aspect-ratio aspect-w-16 aspect-h-9'>
          <iframe id='iframe' src={ apiURL } width='100%' height='100%' frameBorder='0' className='absolute px-4 pt-8' allowFullScreen />
        </div>
        <Movies />
      </div>
      <RightSide className='fixed right-0 hidden xl:flex flex-col w-1/6 h-screen pt-16' />
    </div>
  )
}

export default Watch
