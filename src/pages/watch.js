import React from 'react'
import useQuery from 'lib/hooks/useQuery'
import Star from 'src/assets/icon/Star.svg'
import Calender from 'src/assets/icon/Calender.svg'
import { Tags } from 'src/component/utilities/Button'
import Movies from 'src/component/home/Movies'
import { EMBED_MOVIE_API, TMDB_MOVIE_ORIGIN, TMDB_TV_ORIGIN, API_KEY } from 'src/constants/apiConstants'
import SimilarMovies from 'src/component/watch/SimilarMovies'
import useAuthContext from 'src/hooks/useAuthContext'

const Watch = () => {
  const params = new URLSearchParams(location.search)
  const id = params.get('id')
  const embedMovieURL = EMBED_MOVIE_API + id
  const { homepageTab } = useAuthContext()
  const apiURL = homepageTab === 1 ? `${ TMDB_TV_ORIGIN }/${ id }` : `${ TMDB_MOVIE_ORIGIN }/${ id }`
  const { loading, error, data: movieDetail } = useQuery(apiURL, { query: { api_key: API_KEY } })
  const numberOfStar = (!loading ? (Math.floor(Number(movieDetail.vote_average) * 10) / 10) : 5) || 5

  return (
    <div className='flex bg'>
      <div className='w-full xl:w-4/6 mx-auto'>
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
        { !(loading || error) && (
          <div className='p-4 text-shadow-sm mb-4'>
            <h3 className='mt-4'>
              { movieDetail.title || movieDetail.name }
            </h3>
            { movieDetail.tagline !== '' && <p className='opacity-70 italic text-sm my-4'> { movieDetail.tagline } </p> }
            <div className='hidden md:flex opacity-70 mb-6'>
              <Star className='w-2 h-2 md:w-4 md:h-4 mt-1 mr-1 fill-primary-cyan' />
              { numberOfStar }
              <Calender className='w-2 h-2 md:w-4 md:h-4 mt-1 mx-2 fill-primary-cyan' />
              { movieDetail.release_date }
            </div>
            { movieDetail.genres.map(genre => (
              <Tags key={ genre.id } className='mt-2 mr-2' to={ `/browse?genre=${ genre.id }` }>
                { genre.name }
              </Tags>
            )) }
            <h4 className='mt-6 mb-4'>Overview</h4>
            <p>{ movieDetail.overview }</p>
          </div>
        ) }
        <Movies />
      </div>
      <SimilarMovies className='fixed right-0 hidden xl:flex flex-col w-1/6 h-screen pt-9' id={ id } />
    </div>
  )
}

export default Watch
