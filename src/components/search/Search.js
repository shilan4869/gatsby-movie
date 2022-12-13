import React, { useRef, useCallback, useEffect } from 'react'
import useMenuTabContext from 'src/hooks/useMenuTabContext'
import useQueryInfinite from 'lib/hooks/useQueryInfinite'
import VerticalMovie from 'src/components/movie/VerticalMovie'
import Head from '../head/head'
import RecommendSearch from './RecommendSearch'
import { isClient } from 'lib/utilities/is'
import { TMDB_MULTI_SEARCH_API, API_KEY } from 'src/constants/apiConstants'
import { TV_TAB } from '../layout/constant'

const Search = () => {
  /* eslint-disable react-hooks/rules-of-hooks */
  /** I want to call react hooks conditionally for some improvement */
  const { setMenuTab } = useMenuTabContext()

  const searchKeyword = isClient ? window.history.state?.keyword || '' : ''

  useEffect(() => {
    setMenuTab(Number(localStorage.getItem('menuTab')) || TV_TAB)
  }, [ setMenuTab ])

  if (searchKeyword === '') {
    return (
      <Head title={ `Search` }>
        <div className='min-h-screen xl:w-5/6 xl:ml-1/6 text-white pt-16'>
          <h3 className='p-4 text-shadow mt-4'>Please enter something to search...</h3>
          <h3 className='p-4 text-shadow mt-4'>Recommends for you</h3>
          <RecommendSearch />
        </div>
      </Head>
    )
  }

  const observer = useRef()

  const { loading: loadingSearch, data: searchPages, next: nextSearch } = useQueryInfinite(TMDB_MULTI_SEARCH_API, { query: { query: searchKeyword, language: 'en-US', api_key: API_KEY } })
  const observedRef = useCallback(node => {
    if (loadingSearch) {
      return
    }

    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[ 0 ].isIntersecting) {
        nextSearch()
      }
    })

    if (node) {
      observer.current.observe(node)
    }
  }, [ loadingSearch, nextSearch ])

  const searcheMovies = searchPages.reduce((mergedMovies, page) => {
    const newMovies = page.results
    const filteredMovies = newMovies.filter(movie => (movie.poster_path && !(movie.media_type === 'person')))

    return [ ...mergedMovies, ...filteredMovies ]
  }, [])

  const results = searcheMovies.length

  if (results === 0) {
    return (
      <Head title={ `No result` }>
        <div className='min-h-screen xl:w-5/6 xl:ml-1/6 text-white pt-16'>
          <h3 className='p-4 text-shadow'>{ `There is no result for ${ searchKeyword }...` }</h3>
          <h3 className='p-4 text-shadow'>{ `We have some recommends for you` }</h3>
          <RecommendSearch />
        </div>
      </Head>

    )
  }

  return (
    <Head title={ `Search ${ searchKeyword }` }>
      <div className='min-h-screen xl:w-5/6 xl:ml-1/6 text-white pt-16'>
        <h3 className='p-4 text-shadow'>{ `Search Result for ${ searchKeyword }` }</h3>
        <div className='flex flex-wrap'>
          { searcheMovies.map((movie, index) => {
            if (index + 10 === results) {
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
        { results < 10 && (
          <>
            <h3 className='p-4 text-shadow mt-4'>Recommends for you</h3>
            <RecommendSearch />
          </>
        ) }
      </div>
    </Head>
  )
}

export default Search
