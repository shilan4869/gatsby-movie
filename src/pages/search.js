import React, { useRef, useCallback } from 'react'
import useQueryInfinite from 'lib/hooks/useQueryInfinite'
import { TMDB_MULTI_SEARCH_API, API_KEY } from 'src/constants/apiConstants'
import VerticalMovie from 'src/component/movie/VerticalMovie'

const Search = () => {
  const searchKeyword = window.history.state?.keyword || ''
  const { loading, data: searchResult, next } = useQueryInfinite(TMDB_MULTI_SEARCH_API, { query: { query: searchKeyword, language: 'en-US', api_key: API_KEY } })

  const observer = useRef()
  const observerRef = useCallback(node => {
    if (loading) {
      return
    }

    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[ 0 ].isIntersecting) {
        next()
        console.log('abc')
      }
    })

    if (node) {
      observer.current.observe(node)
    }
  }, [ loading, next ])

  const movies = searchResult.reduce((movs, data) => {
    const newMovies = data.results

    return [ ...movs, ...newMovies ]
  }, [])

  return (
    <div className='w-full xl:w-5/6 xl:ml-1/6 text-white pt-12'>
      <h2 className='p-4'>{ `Search Result for ${ searchKeyword }` }</h2>
      <div className='flex flex-wrap'>
        { movies.map((movie, index) => {
          if (index + 10 === movies.length) {
            return (
              <div className='w-1/4 lg:w-1/5' key={ movie.id } ref={ observerRef }>
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
  )
}

export default Search
