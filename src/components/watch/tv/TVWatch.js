import React from 'react'
import Link from 'lib/components/Link'
import useQuery from 'lib/hooks/useQuery'
import StarIcon from 'src/assets/icon/Star.svg'
import CalenderIcon from 'src/assets/icon/Calender.svg'
import personnel from 'static/personnel.png'
import { Tags } from 'src/components/utilities/Button'
import TvShows from 'src/components/home/TvShows'
import { TMDB_TV_ORIGIN, API_KEY } from 'src/constants/apiConstants'
import SimilarTVShows from './SimiliarTVShows'
import Seasons from './Seasons'
import Iframe from './Iframe'
import { isClient } from 'lib/utilities/is'
import Head from 'src/components/head/head'
import { TV_TAB } from 'src/components/layout/constant'

const TVWatch = () => {
  const key = Math.random() * 1000
  const params = isClient ? new URLSearchParams(location.search) : null
  const id = isClient ? params?.get('id') : ''
  const season = isClient ? params.get('season') || TV_TAB : TV_TAB
  const episode = isClient ? params.get('episode') || TV_TAB : TV_TAB
  const apiURL = `${ TMDB_TV_ORIGIN }/${ id }`

  const { loading, data: movieDetail } = useQuery(apiURL, { query: { api_key: API_KEY } })

  const numberOfStar = (!loading ? (Math.floor(Number(movieDetail?.vote_average) * 10) / 10) : 5) || 5
  const seasonsCount = movieDetail?.number_of_seasons

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
      title={ movieDetail?.title || movieDetail?.name }
      description={ `Watch ${ movieDetail?.name } and more TV Shows at movie.tienlm.tech` }
      image={ movieDetail?.poster_path }
    >
      <div className='flex bg'>
        <div className='w-full xl:w-4/6 mx-auto'>
          <Iframe id={ id } season={ season } episode={ episode } key={ key } />
          { (
            <div className='p-4 text-shadow-sm mb-4'>
              <h3 className='my-4'>
                { movieDetail?.name }
              </h3>
              { movieDetail?.tagline !== '' && <p className='opacity-70 italic text-sm my-4'> { movieDetail?.tagline } </p> }
              <div className='hidden md:flex opacity-70 mb-6'>
                <StarIcon className='w-2 h-2 md:w-4 md:h-4 mt-1 mr-1 fill-primary-cyan' />
                { numberOfStar }
                <CalenderIcon className='w-2 h-2 md:w-4 md:h-4 mt-1 mx-2 fill-primary-cyan' />
                { movieDetail?.release_date || movieDetail?.first_air_date }
              </div>
              <div className='flex flex-wrap w-full px-1'>
                { movieDetail?.genres.map(genre => (
                  <Tags key={ genre.id } className='mt-4 mr-1 md:mr-2' to={ `/browse?genre=${ genre.id }` }>
                    { genre.name }
                  </Tags>
                )) }
              </div>
            </div>
          ) }
          <Seasons seasonsCount={ seasonsCount } id={ id } defaultBackdrop={ movieDetail?.backdrop_path } />
          <TvShows className='mt-56 md:mt-36 lg:mt-44' />
        </div>
        <SimilarTVShows className='fixed right-0 hidden xl:flex flex-col w-1/6 h-screen pt-9' id={ id } />
      </div>
    </Head>
  )
}


export default TVWatch
