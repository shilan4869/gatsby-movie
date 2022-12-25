import React, { memo } from 'react'
import LoginImage from 'static/login.jpg'
import { FORGOT_PASS, LOG_IN, SIGN_UP } from 'src/constants/authentication'
import LogIn from './login/Login'
import SignUp from './signup/SignUp'
import ResetPassword from './ResetPassword'
import useAuthContext from 'src/hooks/useAuthContext'

const AuthenticationPopup = ({ page }) => {
  const { logIn, signUp, resetPassword } = useAuthContext()

  return (

    <div className='flex items-center justify-between'>
      { (page === LOG_IN || page === SIGN_UP) && (
        <div className='w-full lg:span-12'>
          <div className='flex justify-between z-10 absolute'>
            <button
              type='button'
              className='font-medium text-2xl py-2 px-8 rounded-t-xl border-t border-x bg-gray-50'
              style={ page === LOG_IN ? {} : { opacity: '40%' } }
              onClick={ logIn }
            >Log in
            </button>
            <button
              type='button'
              className='font-medium text-2xl ml-1 py-2 px-8 rounded-t-xl border-t border-x bg-gray-50'
              style={ page === SIGN_UP ? {} : { opacity: '40%' } }
              onClick={ signUp }
            >Sign Up
            </button>
          </div>
          <div className='p-8 border-x border-y rounded-b-lg mt-12 bg-gray-50'>
            { page === LOG_IN && <LogIn resetPassword={ resetPassword } /> }
            { page === SIGN_UP && <SignUp /> }
          </div>
        </div>
      ) }
      { page === FORGOT_PASS && <ResetPassword logIn={ logIn } /> }
      <img src={ 'https://movie.tienlm.tech/login.jpg?hash=2c68b3858d38155e9707d4d07c49b823' } alt='' className='span-12 ml-6 rounded-lg hidden lg:block' />
    </div>

  )
}

export default memo(AuthenticationPopup)
