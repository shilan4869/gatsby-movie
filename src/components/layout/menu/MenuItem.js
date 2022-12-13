import React from 'react'
import Link from 'lib/components/Link'

const MenuItem = ({ activeCondition, children, color, icon: Icon, title, to, ...args }) => (
  <Link className='hover:no-underline cursor-pointer group' to={ to } { ...args }>
    <div className='flex md:flex-col-reverse xl:flex-row py-4 md:py-1 xl:py-4 md:px-4'>
      <div
        className='w-1 rounded-r-md bg-primary-cyan md:w-full md:h-1 md:mt-1 xl:mt-0 md:rounded-none md:rounded-t-md xl:w-1 xl:rounded-none xl:rounded-r-md xl:h-auto'
        style={ !activeCondition ? { opacity: '0' } : {} }
      />
      <Icon className='w-5 h-5 ml-9 md:hidden xl:block' fill={ color } />
      <span
        className='ml-5 md:ml-0 xl:ml-5 opacity-80 group-hover:opacity-100'
        style={ { color } }
      >
        { title }
      </span>
    </div>
    { children }
  </Link>
)

export default MenuItem
