import React, { useEffect } from 'react'
import useQuery from 'lib/hooks/useQuery'
import useAuthContext from 'src/hooks/useAuthContext'
import { TMDB_MULTI_SEARCH_API } from 'src/constants/apiConstants'
import VerticalMovie from 'src/component/movie/VerticalMovie'
import { ACCOUNT_TAB } from 'src/component/layout/constant'

const Search = () => {
  const { setHomepageTab } = useAuthContext()

  useEffect(() => {
    setHomepageTab(ACCOUNT_TAB)
  }, [ setHomepageTab ])

  const searchKeyword = window.history.state?.keyword || ''
  const { loading, error, data: searchResult } = useQuery(TMDB_MULTI_SEARCH_API, { query: { query: searchKeyword, language: 'en-US', api_key: 'c298c2cccf3f21af1e7a841e1034f72e' } })

  if (loading || error) {
    return
  }

  const { results: movies } = searchResult


  return (
    <div className='w-full xl:w-5/6 xl:ml-[16.67%] text-white pt-12'>
      <h2 className='p-4'>{ `Search Result for ${ searchKeyword }` }</h2>
      <div className='flex flex-wrap'>
        { movies.map(movie => (
          <VerticalMovie key={ movie.id } movie={ movie } className='w-1/4 lg:w-1/5'>
            { movie.title }
          </VerticalMovie>
        )) }
      </div>
    </div>
  )
}

export default Search
