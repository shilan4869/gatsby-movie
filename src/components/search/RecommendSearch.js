import React, { useCallback, useRef } from 'react'
import useQueryInfinite from 'lib/hooks/useQueryInfinite'
import VerticalMovie from '../movie/VerticalMovie'
import { TMDB_TRENDING_MOVIE_API, API_KEY } from 'src/constants/apiConstants'

const RecommendSearch = () => {
  const observer = useRef()
  const { loading: loadingRecommend, data: recommendsPages, next: nextRecommend } = useQueryInfinite(TMDB_TRENDING_MOVIE_API, { query: { language: 'en-US', api_key: API_KEY } })


  const recommendMovies = recommendsPages.reduce((mergedMovies, page) => {
    const newMovies = page.results

    return [ ...mergedMovies, ...newMovies ]
  }, [])

  const observedRef = useCallback(node => {
    if (loadingRecommend) {
      return
    }

    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[ 0 ].isIntersecting) {
        nextRecommend()
      }
    })

    if (node) {
      observer.current.observe(node)
    }
  }, [ loadingRecommend, nextRecommend ])


  return (
    <div className='flex flex-wrap'>
      { recommendMovies.map((movie, index) => {
        if (index + 10 === recommendMovies.length) {
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
  )
}

export default RecommendSearch
