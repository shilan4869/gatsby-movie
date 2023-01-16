import React from 'react'
import Logout from 'src/assets/icon/Logout.svg'
import clsx from 'lib/utilities/clsx'
import Link from 'lib/components/Link'
import useAuthContext from 'src/hooks/useAuthContext'

const User = ({ className }) => {
  const { user, setUser } = useAuthContext()
  const logOut = async () => {
    const data = await fetch('http://localhost:1000/auth/logout', {
      credentials: 'include',
    }).then(res => res.json())

    if (data && data.success) {
      setUser(null)
    }
  }

  return (
    <div className={ clsx('flex flex-col border-b md:border-0 xl:border-b-2 border-dark-gray group text-shadow cursor-pointer', className) }>
      <div className='flex items-center pl-8 pr-2 xl:pl-12 mb-10 md:mb-0 xl:mb-10 md:ml-auto xl:ml-0 text-sm lg:text-base'>
        <img src='https://cdn.divineshop.vn/static/b1402e84a947ed36cebe9799e47f61c2.svg' alt='' className='p-1 w-1/6 md:w-12 xl:p-0 xl:w-1/6' />
        <Link
          className='py-3 px-2 max-w-2/3 rounded-lg inline hover:no-underline opacity-80 hover:opacity-100 overflow-hidden md:hidden xl:block'
          to='/'
        >
          { user?.username || 'shilan4869' }
        </Link>
        <Logout className='w-5 opacity-80 hover:opacity-100 md:hidden xl:block ml-2' fill='#fff' onClick={ logOut } />
      </div>
    </div>
  )
}

export default User
