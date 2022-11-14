import React, { useRef } from 'react'
import FontAwesome from 'lib/components/FontAwesome'
import { farFaSearch } from 'lib/fontawesome/fontawesome'

const SearchBox = () => {
  const searchBox = useRef()
  const searchInput = useRef()
  const searchIcon = useRef()
  const handleClick = () => {
    searchBox.current.classList.toggle('actived')

    if (!searchBox.current.classList.contains('actived')) {
      console.log('go right!')
      searchIcon.current.style.right = '16px'
      searchInput.current.style.width = '0px'
      searchInput.current.style.opacity = '0%'
    } else {
      console.log('go left!')
      searchIcon.current.style.right = '244px'
      searchInput.current.style.width = '320px'
      searchInput.current.style.opacity = '100%'
    }
  }

  return (
    <div
      className='absolute right-36 top-4'
    >
      <div
        className='relative flex items-center w-80 justify-end'
        ref={ searchBox }
      >
        <div
          className='absolute right-4 w-5 h-5 invert cursor-pointer hover:scale-105 duration-500 delay-200 z-20'
          onClick={ handleClick }
          ref={ searchIcon }
        >
          <FontAwesome
            icon={ farFaSearch }
          />
        </div>
        <input
          type='text'
          name='search'
          className='block text-white py-1 pl-16 pr-12 border border-white bg-black-50 opacity-0 duration-500 delay-200'
          placeholder='Enter movie, actor or genres'
          ref={ searchInput }
        />
      </div>
    </div>
  )
}

export default SearchBox

