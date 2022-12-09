import { isClient } from 'lib/utilities/is'
import React from 'react'
import { EMBED_TV_API } from 'src/constants/apiConstants'

const Iframe = () => {
  const params = isClient ? new URLSearchParams(location.search) : null
  const id = isClient ? params?.get('id') : ''
  const season = isClient ? params.get('season') : 1
  const episode = isClient ? params.get('episode') : 1
  const embedMovieURL = `${ EMBED_TV_API }?id=${ id }&s=${ season }&e=${ episode }`

  return (
    <div
      className='aspect-ratio aspect-w-16 aspect-h-9 mt-16 md:mt-8 rounded-lg overflow-hidden'
    >
      <iframe
        id='iframe'
        src={ embedMovieURL }
        width='100%'
        height='100%'
        frameBorder='0'
        className='absolute px-3 md:px-4 rounded-lg'
        allowFullScreen
      />
    </div>
  )
}

export default Iframe
