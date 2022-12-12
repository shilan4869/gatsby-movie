import React, { memo } from 'react'
import LoginImage from 'static/login.jpg'
import { LOG_IN, SIGN_UP, FORGOT_PASS } from 'src/constants/authentication'
import LogIn from './LogIn'
import SignUp from './SignUp'
import useAuthContext from 'src/hooks/useAuthContext'

const AuthenticationPopup = ({ page }) => {
  const { logIn, signUp, resetPassword } = useAuthContext()

  const components = { LOG_IN, SIGN_UP }

  return (

    (page === LOG_IN || page === SIGN_UP) ? (
      <div className='flex items-center justify-between'>
        <div className='span-12'>
          { page }
          <div className='flex'>
            <button
              type='button'
              className={ page === LOG_IN ? '' : 'opacity-50' }
              onClick={ logIn }
            >Đăng nhập
            </button>
            <button
              type='button'
              className={ page === SIGN_UP ? '' : 'opacity-50' }
              onClick={ signUp }

            >Đăng ký
            </button>
          </div>
          { page === LOG_IN && <LogIn /> }
          { page === SIGN_UP && <SignUp /> }
          <button type='button' onClick={ resetPassword } className='text-primary-cyan'>Bạn quên mật khẩu?</button>
        </div>
        <img src='https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?t=st=1670819708~exp=1670820308~hmac=907abf615ebfa4820b1018ee250f411947da5062cd0eb3a1641aec903f929323' alt='' className='span-12 ml-6 rounded-lg' />
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
