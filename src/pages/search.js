import React from 'react'
import useQuery from 'lib/hooks/useQuery'
import { TMDB_MULTI_SEARCH_API } from 'src/constants/apiConstants'
import VerticalMovie from 'src/component/movie/VerticalMovie'

const Search = () => {
  const searchKeyword = window.history.state.keyword || ''
  const { loading, error, data: searchResult } = useQuery(TMDB_MULTI_SEARCH_API, { query: { query: searchKeyword, language: 'en-US', api_key: 'c298c2cccf3f21af1e7a841e1034f72e' } })

  if (loading || error) {
    return
  }

  const { results: movies } = searchResult


  return (
    <div className='w-full bg-black text-white p-16'>
      <h1>Search Result</h1>
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
