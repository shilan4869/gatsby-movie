import React from 'react'
import useQuery from 'lib/hooks/useQuery'
import useAuthContext from 'src/hooks/useAuthContext'
import { TMDB_MULTI_SEARCH_API } from 'src/constants/apiConstants'
import VerticalMovie from 'src/component/movie/VerticalMovie'

const Search = () => {
  const ACCOUNT_TAB = 3
  const { setHomepageTab } = useAuthContext()

  setHomepageTab(ACCOUNT_TAB)

  const searchKeyword = window.history.state.keyword || ''
  const { loading, error, data: searchResult } = useQuery(TMDB_MULTI_SEARCH_API, { query: { query: searchKeyword, language: 'en-US', api_key: 'c298c2cccf3f21af1e7a841e1034f72e' } })

  if (loading || error) {
    return
  }

  const { results: movies } = searchResult


  return (
    <div className='w-full xl:w-5/6 xl:ml-[16.67%] text-white pt-12'>
      <h1 className='p-4'>Search Result</h1>
      <div className='flex flex-wrap'>
        { movies.map(movie => (
          <VerticalMovie key={ movie.id } movie={ movie } className='w-1/5'>
            { movie.title }
          </VerticalMovie>
        )) }
      </div>
    </div>
  )
}

export default Search
