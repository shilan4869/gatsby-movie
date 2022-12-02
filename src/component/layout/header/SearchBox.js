import React, { useRef, useState, useEffect } from 'react'
import request from 'lib/utilities/request'
import { TMDB_MULTI_SEARCH_API, API_KEY } from 'src/constants/apiConstants'
import FontAwesome from 'lib/components/FontAwesome'
import { farFaSearch } from 'lib/fontawesome/fontawesome'
import { navigate } from 'gatsby'
import Link from 'lib/components/Link'

const AutoComplete = ({ suggestions }) => {
  if (suggestions.length === 0) {
    return
  }

  return (
    <div className='fixed w-1/2 md:w-1/3 xl:w-1/6 top-16 right-0 md:right-14 xl:right-0 p-2 flex flex-col overflow-hidden py-1 bg-sub text-shadow-sm rounded-xl animate-shrink shadow-lg shadow-black'>
      { suggestions.map((suggest, index) => (
        <Link
          className='block px-4 py-2 hover:no-underline opacity-60 hover:opacity-100'
          key={ index }
          to={ `/watch?id=${ suggest.id }` }
        >{ suggest.name || suggest.title }
        </Link>
      )) }
    </div>
  )
}

const SearchBox = ({ className, actived }) => {
  const searchBox = useRef()
  const searchInput = useRef()
  const searchIcon = useRef()
  const [ keyword, setKeyword ] = useState('')
  const [ focused, setFocused ] = useState(false)
  const [ suggestions, setSuggestions ] = useState([])
  const debounceSearchTimeout = useRef()

  const resetSuggestions = () => {
    setSuggestions([])
  }

  const unFocus = () => setTimeout(() => setFocused(false), 100)
  const suggestKeyword = newKeyword => {
    if (newKeyword !== '') {
      request(TMDB_MULTI_SEARCH_API, { query: newKeyword, api_key: API_KEY })
        .then(data => {
          if (data.results.length === 0) {
            resetSuggestions()

            return
          }

          setSuggestions(data.results)
        })
    } else {
      resetSuggestions()
    }
  }

  const handleFormFocus = () => {
    const newKeyword = searchInput.current.value

    suggestKeyword(newKeyword)
    setFocused(true)
  }
  const handleFormBlur = () => {
    unFocus()
  }

  const debounce = (cb, timer = 300) => {
    clearTimeout(debounceSearchTimeout.current)
    debounceSearchTimeout.current = setTimeout(cb, timer)
  }

  const handleEnterKeyword = e => {
    const newKeyword = e.target.value

    debounce(() => suggestKeyword(newKeyword))
    setKeyword(newKeyword)
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    clearTimeout(debounceSearchTimeout.current)
    setKeyword('')
    unFocus()
    resetSuggestions()
    navigate('/search', { state: { keyword } })
  }

  useEffect(() => {
    if (focused || actived) {
      searchIcon.current.style.left = '1rem'
      searchInput.current.style.width = '100%'
      searchInput.current.style.opacity = '100%'
    } else {
      searchIcon.current.style.left = '83.33333%'
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
        className='relative flex items-center w-full justify-end'
        ref={ searchBox }
      >
        <label
          className='absolute left-5/6 w-8 h-8 p-1 cursor-pointer duration-500 delay-200 z-20'
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
          value={ keyword }
          ref={ searchInput }
        />
        { focused && <AutoComplete suggestions={ suggestions } /> }
      </div>
    </form>
  )
}

export default SearchBox

