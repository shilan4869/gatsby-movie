import React from 'react'
import useQuery from 'lib/hooks/useQuery'
import Star from 'src/assets/icon/Star.svg'
import Calender from 'src/assets/icon/Calender.svg'
import personnel from 'static/personnel.png'
import { Tags } from 'src/components/utilities/Button'
import Movies from 'src/components/home/Movies'
import { TMDB_MOVIE_ORIGIN, API_KEY } from 'src/constants/apiConstants'
import SimilarMovies from './SimilarMovies'
import Iframe from './Iframe'
import { isClient } from 'lib/utilities/is'
import Link from 'lib/components/Link'
import Head from 'src/components/head/head'

const MovieWatch = () => {
  const key = Math.random() * 1000
  const params = isClient ? new URLSearchParams(location.search) : null
  const id = isClient ? params?.get('id') : ''
  const apiURL = `${ TMDB_MOVIE_ORIGIN }/${ id }`

  const { loading, data: movieDetail } = useQuery(apiURL, { query: { api_key: API_KEY } })

  const numberOfStar = (!loading ? (Math.floor(Number(movieDetail?.vote_average) * 10) / 10) : 5) || 5

  if (movieDetail?.success === false) {
    return (
      <Head
        title='Video Not Found'
      >
        <div className='w-full xl:w-4/6 mx-auto pt-28 px-16'>
          <Link to='/' className='hover:no-underline'>
            <div className='text-3xl mb-16'>
              There is nothing in the desert...
            </div>
            <img src={ personnel } alt='' />
          </Link>
        </div>
      </Head>
    )
  }

  return (
    <Head
      title={ movieDetail?.title }
      description={ `Watch ${ movieDetail?.title } online!` }
      image={ movieDetail?.poster_path }
    >
      <div className='flex bg'>
        <div className='w-full xl:w-4/6 mx-auto'>
          <Iframe key={ key } id={ id } />
          { (
            <div className='p-4 text-shadow-sm mb-4'>
              <h3 className='my-4'>
                { loading ? 'Movie Title' : movieDetail?.title }
              </h3>
              { loading ? 'This is movies tagline'
                : movieDetail?.tagline !== '' && <p className='opacity-70 italic text-sm my-4'> { movieDetail?.tagline } </p> }
              <div className='hidden md:flex opacity-70 mb-6'>
                <Star className='w-2 h-2 md:w-4 md:h-4 mt-1 mr-1 fill-primary-cyan' />
                { numberOfStar }
                <Calender className='w-2 h-2 md:w-4 md:h-4 mt-1 mx-2 fill-primary-cyan' />
                { loading ? '2022' : movieDetail?.release_date || movieDetail?.first_air_date }
              </div>
              { !loading && movieDetail?.genres.map(genre => (
                <Tags key={ genre.id } className='mt-4 mr-1 md:mr-2' to={ `/browse?genre=${ genre.id }` }>
                  { genre.name }
                </Tags>
              )) }
              <h4 className='mt-6 mb-4'>Overview</h4>
              <p>{ loading ? 'Movie overview' : movieDetail?.overview }</p>
            </div>
          ) }
          <Movies />
        </div>
        <SimilarMovies className='fixed right-0 hidden xl:flex flex-col w-1/6 h-screen pt-9' id={ id } />
      </div>
    </Head>
  )
}


export default MovieWatch
