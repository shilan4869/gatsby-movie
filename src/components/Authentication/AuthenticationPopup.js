import React, { memo } from 'react'
import LoginImage from 'static/login.jpg'
import { LOG_IN, SIGN_UP } from 'src/constants/authentication'
import LogIn from './LogIn'
import SignUp from './SignUp'
import useAuthContext from 'src/hooks/useAuthContext'
import clsx from 'lib/utilities/clsx'

const AuthenticationPopup = ({ page }) => {
  const { logIn, signUp, resetPassword } = useAuthContext()

  const components = { LOG_IN, SIGN_UP }

  return (

    (page === LOG_IN || page === SIGN_UP) ? (
      <div className='flex items-center justify-between'>
        <div className='w-full lg:span-12'>
          <div className='flex justify-beetween z-5 absolute'>
            <button
              type='button'
              className={ clsx(page === LOG_IN ? '' : 'opacity-30', 'font-medium text-2xl py-2 px-8 rounded-t-xl border-t border-x bg-gray-50') }
              onClick={ logIn }
            >Log in
            </button>
            <button
              type='button'
              className={ clsx(page === SIGN_UP ? '' : 'opacity-30', 'font-medium text-2xl ml-4 py-2 px-8 rounded-t-xl border-t border-x bg-gray-50') }
              onClick={ signUp }

            >Sign Up
            </button>
          </div>
          <div className='p-8 border-x border-y rounded-b-lg mt-12 bg-gray-50'>
            { page === LOG_IN && <LogIn resetPassword={ resetPassword } /> }
            { page === SIGN_UP && <SignUp /> }
          </div>
        </div>
        <img src={ LoginImage } alt='' className='span-12 ml-6 rounded-lg hidden lg:block' />
      </div>
    )
      : (
        <div>
          <div>
            Đây là trang quên mật khẩu
          </div>
          <button type='button' onClick={ () => logIn() }>Quay lại đăng nhập</button>
        </div>
      )


  )
}

export default memo(AuthenticationPopup)
