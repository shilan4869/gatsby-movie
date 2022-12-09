import React, { useState, useEffect, memo } from 'react'
import request from 'lib/utilities/request'
import { TMDB_TV_SEASON, API_KEY } from 'src/constants/apiConstants'
import SeasonMoviesList from 'src/component/list/horizontal/SeasonMoviesList'
import { isClient } from 'lib/utilities/is'

const SeasonSelectBox = memo(({ seasons, onChange }) => (
  <select
    className='bg-transparent pl-3 pr-2 py-1 rounded-full border border-white'
    onChange={ onChange }
  >
    { seasons.map((season, index) => (
      <option
        key={ index }
        value={ index }
        className='bg-sub'
      >
        { season.name }
      </option>
    )) }
  </select>
))

const Seasons = ({ seasonsCount, id, defaultBackdrop }) => {
  const [ seasonsDetails, setSeasonDetails ] = useState([])
  const [ selectedSeason, setSelectedSeason ] = useState(0)

  const params = isClient ? new URLSearchParams(location.search) : null
  const episode = isClient ? params.get('episode') || 1 : 1
  const season = isClient ? params.get('season') || 1 : 1
  const { overview } = seasonsDetails.length === seasonsCount ? seasonsDetails[ season - 1 ].episodes[ episode - 1 ] : ''


  const sort = (a, b) => (a.season_number < b.season_number ? -1 : 1)

  useEffect(() => {
    const seasons = []

    for (let i = 1; i <= seasonsCount; i++) {
      const apiEndPoint = `${ TMDB_TV_SEASON + id }/season/${ i }`

      request(apiEndPoint, { api_key: API_KEY })
        .then(data => {
          const { air_date, name, overview, poster_path, episodes, season_number } = data

          seasons.push({ air_date, name, overview, poster_path, episodes, season_number })

          if (seasons.length === seasonsCount) {
            seasons.sort(sort)
            setSeasonDetails(seasons)
          }
        })
    }
  }, [ seasonsCount, id ])


  return (
    <>
      <div className='px-4'>
        <h4 className='mt-6 mb-4'>Overview</h4>
        <p>{ overview }</p>
      </div>
      <div className='flex relative w-full justify-between px-4 mt-6'>
        <SeasonSelectBox seasons={ seasonsDetails } onChange={ e => setSelectedSeason(Number(e.target.value)) } />
        { seasonsDetails.map((season, index) => selectedSeason === index && <SeasonMoviesList movies={ season.episodes } poster={ defaultBackdrop } />) }
      </div>
    </>
  )
}

export default Seasons
