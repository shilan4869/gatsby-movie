import React, { useRef, useCallback } from 'react'
import useQueryInfinite from 'lib/hooks/useQueryInfinite'
import { TMDB_MULTI_SEARCH_API, API_KEY, TMDB_TRENDING_MOVIE_API } from 'src/constants/apiConstants'
import VerticalMovie from 'src/component/movie/VerticalMovie'

const Search = () => {
  const searchKeyword = window.history.state?.keyword || ''
  const { loading: loadingSearch, data: searchPages, next: nextSearch } = useQueryInfinite(TMDB_MULTI_SEARCH_API, { query: { query: searchKeyword, language: 'en-US', api_key: API_KEY } })
  const { loading: loadingRecommend, data: recommendsPages, next: nextRecommend } = useQueryInfinite(TMDB_TRENDING_MOVIE_API, { query: { language: 'en-US', api_key: API_KEY } })
  const results = searchPages[ 0 ]?.total_results

  const observer = useRef()
  const observedRef = useCallback(node => {
    if (loadingSearch || loadingRecommend) {
      return
    }

    const next = results > 20 ? nextSearch : nextRecommend

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
  }, [ loadingSearch, loadingRecommend, nextSearch, nextRecommend, results ])


  const searcheMovies = searchPages.reduce((mergedMovies, page) => {
    const newMovies = page.results

    return [ ...mergedMovies, ...newMovies ]
  }, [])

  const recommendMovies = recommendsPages.reduce((mergedMovies, page) => {
    const newMovies = page.results

    return [ ...mergedMovies, ...newMovies ]
  }, [])


  return (
    <div className='w-full xl:w-5/6 xl:ml-1/6 text-white pt-16'>
      <h3 className='p-4 text-shadow'>{ results !== 0 ? `Search Result for ${ searchKeyword }` : `There is no result for ${ searchKeyword }...` }</h3>
      <div className='flex flex-wrap'>
        { searcheMovies.map((movie, index) => {
          if (index + 10 === searcheMovies.length && results > 20) {
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
      { results > 20
        ? null
        : (
          <>
            <h3 className='p-4 text-shadow mt-4'>Recommends for you</h3>
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
          </>
        ) }

    </div>
  )
}

export default Search
