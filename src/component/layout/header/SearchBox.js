import React, { useRef, useState, useEffect } from 'react'
import FontAwesome from 'lib/components/FontAwesome'
import { farFaSearch } from 'lib/fontawesome/fontawesome'
import { navigate } from 'gatsby'

const SearchBox = ({ className, actived }) => {
  const searchBox = useRef()
  const searchInput = useRef()
  const searchIcon = useRef()
  const [ keyword, setKeyword ] = useState('')
  const [ focused, setFocused ] = useState(false)

  const handleFormFocus = () => {
    setFocused(true)
  }
  const handleFormBlur = () => {
    setFocused(false)
  }
  const handleEnterKeyword = e => {
    const newKeyword = e.target.value

    setKeyword(newKeyword)
  }
  const handleFormSubmit = e => {
    e.preventDefault()
    navigate('/search', { state: { keyword } })
  }

  useEffect(() => {
    if (focused || actived) {
      searchIcon.current.style.right = '80%'
      searchInput.current.style.width = '100%'
      searchInput.current.style.opacity = '100%'
    } else {
      searchIcon.current.style.right = '1rem'
      searchInput.current.style.width = '0px'
      searchInput.current.style.opacity = '0%'
    }
  }, [ focused, actived ])

  return (
    <form
      autoComplete='off'
      className={ className }
      onFocus={ handleFormFocus }
      onBlur={ handleFormBlur }
      onSubmit={ handleFormSubmit }
    >
      <div
        className='relative flex items-center w-full lg:w-full justify-end'
        ref={ searchBox }
      >
        <label
          className='absolute right-4 w-12 h-12 p-3 cursor-pointer hover:scale-105 duration-500 delay-200 z-20'
          htmlFor={ 'search-input' }
          ref={ searchIcon }
        >
          <FontAwesome
            icon={ farFaSearch }
          />
        </label>
        <input
          type='text'
          name='search'
          id='search-input'
          className='block h-12 text-white outline-none rounded-full pl-16 pr-4 border border-white bg-black-50 opacity-0 duration-500 delay-200'
          placeholder='Enter movie, actor or genres'
          onChange={ handleEnterKeyword }
          ref={ searchInput }
        />
      </div>
    </form>
  )
}

export default SearchBox

