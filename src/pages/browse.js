import React, { useRef, useCallback } from 'react'
import useQueryInfinite from 'lib/hooks/useQueryInfinite'
import useAuthContext from 'src/hooks/useAuthContext'
import { TMDB_DISCOVER_MOVIE, TMDB_DISCOVER_TV } from 'src/constants/apiConstants'
import { isClient } from 'lib/utilities/is'
import VerticalMovie from 'src/component/movie/VerticalMovie'
import { SEO as Seo } from 'src/component/seo/seo'

const Browse = () => {
  const { homepageTab, genres } = useAuthContext()
  const params = isClient ? new URLSearchParams(location.search) : null
  const genreId = isClient ? params.get('genre') : ''
  const genre = genres.get(Number(genreId))
  const apiURL = homepageTab === 1 ? TMDB_DISCOVER_TV : TMDB_DISCOVER_MOVIE
  const { loading, error, data: moviePages, next, retry } = useQueryInfinite(apiURL, { query: { with_genres: genreId, language: 'en-US', api_key: 'c298c2cccf3f21af1e7a841e1034f72e', sort_by: 'popularity.desc' } })

  const observer = useRef()
  const observedRef = useCallback(node => {
    if (loading) {
      return
    }

    if (error) {
      retry()
    }

    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[ 0 ].isIntersecting) {
        next()
      }
    })

    if (node) {
      observer.current.observe(node)
    }
  }, [ next, retry, loading, error ])


  const movies = moviePages.reduce((mergedMovies, page) => {
    const newMovies = page.results

    return [ ...mergedMovies, ...newMovies ]
  }, [])


  return (
    <Seo title={ `${ genre } movies` }>
      <div className='min-h-screen xl:w-5/6 xl:ml-1/6 text-white pt-16'>
        <h3 className='p-4 text-shadow'>Select your favorite { genre } { homepageTab === 1 ? 'TV shows' : 'movies' }.</h3>
        <div className='flex flex-wrap'>
          { movies.map((movie, index) => {
            if (index + 10 === movies.length) {
              return (
                <div className='w-1/2 md:w-1/4 lg:w-1/5' key={ movie.id } ref={ observedRef }>
                  <VerticalMovie movie={ movie }>
                    { movie.title }
                  </VerticalMovie>
                </div>
              )
            }

            return (
              <VerticalMovie key={ movie.id } movie={ movie } className='w-1/4 lg:w-1/5'>
                { movie.title }
              </VerticalMovie>
            )
          }) }
        </div>
      </div>
    </Seo>
  )
}

export default Browse
