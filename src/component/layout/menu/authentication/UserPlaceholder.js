import React, { useEffect, useRef } from 'react'
import { ACCOUNT_TAB, FAVORITE_TAB, BOOKMARK_TAB } from '../../constant'
import clsx from 'lib/utilities/clsx'
import useAuthContext from 'src/hooks/useAuthContext'
import FontAwesome from 'lib/components/FontAwesome'
import { fasFaUserAlt } from 'lib/fontawesome/fontawesome'
import Link from 'lib/components/Link'
import Setting from 'src/assets/icon/Setting.svg'
import Favorite from 'src/assets/icon/Favorite.svg'
import Logout from 'src/assets/icon/Logout.svg'

const UserPlaceholder = ({ className }) => {
  const { homepageTab } = useAuthContext()
  const accountBarRef = useRef()
  const accountTextRef = useRef()
  const favoriteBarRef = useRef()
  const favoriteTextRef = useRef()
  const bookmarkBarRef = useRef()
  const bookmarkTextRef = useRef()

  useEffect(() => {
    accountBarRef.current.style.opacity = '0%'
    favoriteBarRef.current.style.opacity = '0%'
    bookmarkBarRef.current.style.opacity = '0%'
    accountTextRef.current.style.color = 'white'
    favoriteTextRef.current.style.color = 'white'
    bookmarkTextRef.current.style.color = 'white'

    switch (homepageTab) {
      case ACCOUNT_TAB: {
        accountBarRef.current.style.opacity = '100%'
        accountTextRef.current.style.color = '#00B9AE'
        break
      }

      case FAVORITE_TAB: {
        favoriteBarRef.current.style.opacity = '100%'
        favoriteTextRef.current.style.color = '#00B9AE'
        break
      }

      case BOOKMARK_TAB: {
        bookmarkBarRef.current.style.opacity = '100%'
        bookmarkTextRef.current.style.color = '#00B9AE'
        break
      }

      default: {
        break
      }
    }
  }, [ homepageTab ])

  return (
    <div className={ clsx('flex flex-col border-b md:border-0 xl:border-b-2 border-dark-gray group text-shadow cursor-pointer', className) }>
      <div className='flex items-center pl-6 mb-4 md:mb-0 xl:mb-4 md:ml-auto xl:ml-0'>
        <div className='rounded-md overflow-hidden border border-white p-2'>
          <FontAwesome icon={ fasFaUserAlt } className='w-6 h-6' />
        </div>
        <div className='ml-4 text-sm opacity-70 md:hidden xl:block'>Your name here</div>
      </div>
      <div className='bg opacity-95 xl:bg-transparent md:border-x md:border-b md:rounded-b-lg md:rounded-l-lg xl:rounded-none xl:border-0 md:opacity-0 md:group-hover:opacity-100 duration-200 xl:opacity-100'>
        <Link className='py-4 px-6 flex md:block xl:flex hover:no-underline md:ml-auto xl:ml-0' to='/'>
          <div className='w-1 md:hidden xl:block rounded-r-md bg-primary-cyan opacity-0' ref={ accountBarRef } />
          <Setting className='w-5 h-5 ml-7 md:hidden xl:block' fill='#fff' />
          <span className='ml-5 md:ml-0 xl:ml-5 opacity-80 hover:opacity-100' ref={ accountTextRef }>Your Account</span>
        </Link>
        <Link className='py-4 px-6 flex md:block xl:flex hover:no-underline md:ml-auto xl:ml-0' to='/'>
          <div className='w-1 md:hidden xl:block rounded-r-md bg-primary-cyan opacity-0' ref={ favoriteBarRef } />
          <Favorite className='w-5 h-5 ml-7 md:hidden xl:block' fill='#fff' />
          <span className='ml-5 md:ml-0 xl:ml-5 opacity-80 hover:opacity-100' ref={ favoriteTextRef }>Favorite Movies</span>
        </Link>
        <Link className='py-4 px-6 flex md:block xl:flex hover:no-underline md:ml-auto xl:ml-0' to='/'>
          <div className='w-1 md:hidden xl:block rounded-r-md bg-primary-cyan opacity-0' ref={ bookmarkBarRef } />
          <Logout className='w-5 h-5 ml-7 md:hidden xl:block' fill='#fff' />
          <span className='ml-5 md:ml-0 xl:ml-5 opacity-80 hover:opacity-100' ref={ bookmarkTextRef }>Bookmark</span>
        </Link>
      </div>
    </div>
  )
}

export default UserPlaceholder
