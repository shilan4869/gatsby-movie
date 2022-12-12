import React from 'react'
import clsx from 'lib/utilities/clsx'
import useAuthContext from 'src/hooks/useAuthContext'
import { PrimaryButton, SecondaryButton } from 'src/components/utilities/Button'


const UserPlaceholder = ({ className }) => {
  const { logIn, signUp } = useAuthContext()


  return (
    <div className={ clsx('flex flex-col border-b md:border-0 xl:border-b-2 border-dark-gray group text-shadow cursor-pointer', className) }>
      <div className='flex items-center pl-8 pr-2 xl:pl-12 mb-10 md:mb-0 xl:mb-10 md:ml-auto xl:ml-0 text-sm lg:text-base'>
        <PrimaryButton type='PrimaryButton' onClick={ logIn } className='py-3 px-6 md:px-4 xl:px-6 xl:py-3 bg-primary-cyan rounded-lg'>Log in</PrimaryButton>
        <SecondaryButton type='button' onClick={ signUp } className='block md:hidden xxl:block ml-4'>Sign up</SecondaryButton>
      </div>

    </div>
  )
}

export default UserPlaceholder
