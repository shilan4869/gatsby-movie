import React, { useState, useEffect } from 'react'
import request from 'lib/utilities/request'
import { TMDB_TV_SEASON, API_KEY } from 'src/constants/apiConstants'

const Seasons = ({ seasonsCount, id }) => {
  const [ seasonsDetail, setSeasonDetails ] = useState([])
  const [ tab, setTab ] = useState(0)

  console.log(seasonsDetail)

  const sort = (a, b) => (a.season_number < b.season_number ? -1 : 1)

  useEffect(() => {
    const seasons = []

    for (let i = 1; i <= seasonsCount; i++) {
      const apiEndPoint = `${ TMDB_TV_SEASON + id }/season/${ i }`

      request(apiEndPoint, { api_key: API_KEY })
        .then(data => {
          const { air_date, name, overview, poster_path, episodes } = data

          seasons.push({ air_date, name, overview, poster_path, episodes })

          if (seasons.length === seasonsCount) {
            seasons.sort(sort)
            setSeasonDetails(seasons)
          }
        })
    }
  }, [ seasonsCount, id ])


  return (
    <div className='p-4'>
      <div className='flex relative w-full justify-between'>
        { seasonsDetail.map((season, index) => (
          <div onClick={ () => setTab(index) } key={ index } className='inline'>
            { season.name }
            { tab === index && (
              <div className='flex absolute top-4 left-0'>
                { season.episodes.map(episode => (
                  <div key={ episode.episode_number }>
                    { episode.name }
                  </div>
                )) }
              </div>
            ) }
          </div>
        )) }
      </div>
    </div>
  )
}

export default Seasons
