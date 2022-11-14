import React from 'react'
import SearchBox from './SearchBox'


const Header = () => (
  <div className='absolute left-0 right-0 top-0 h-16 gradient-top z-50'>
    <div className='boundary relative'>
      <SearchBox />
    </div>
  </div>
)

export default Header
