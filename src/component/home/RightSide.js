import React from 'react'
import RecommenedMovies from '../list/vertical/RecommenedMovies'
import clsx from 'lib/utilities/clsx'


const RightSide = ({ className }) => (
  <div className={ clsx('h-screen', className) }>
    <RecommenedMovies />
  </div>
)

export default RightSide
