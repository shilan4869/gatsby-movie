import React from 'react'
import { EMBED_TV_API } from 'src/constants/apiConstants'

const Iframe = ({ id, season, episode }) => {
  const embedMovieURL = `${ EMBED_TV_API }?id=${ id }&s=${ season }&e=${ episode }`

  console.log(`Iframe loaded ${ Math.random() }`)

  return (
    <div
      className='aspect-ratio aspect-w-16 aspect-h-9 mt-16 md:mt-8 rounded-lg overflow-hidden'
    >
      <iframe
        id='iframe'
        src={ embedMovieURL }
        frameBorder='0'
        className='absolute px-3 md:px-4 rounded-lg'
        allowFullScreen
      />
    </div>
  )
}

export default Iframe
