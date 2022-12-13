import { Input } from 'lib/components/Field'
import React from 'react'
import { PrimaryButton } from '../utilities/Button'
import GoogleIcon from 'src/assets/icon/google.svg'
import FacebookIcon from 'src/assets/icon/facebook.svg'

const LogIn = ({ resetPassword }) => (
  <>
    <div className='pb-8 border-b'>
      <p className=''>Login to add movies to your favorite list, make comments and more...</p>
      <Input className='my-4' label='Enter your email' />
      <Input className='my-4' label='Enter your password' type='password' />
      <button type='button' onClick={ resetPassword } className='text-primary-cyan'>Forgot your password?</button>
      <PrimaryButton className='w-full mt-4'>Log In</PrimaryButton>
    </div>
    <div className='text-center block bg-gray-50 -mt-2 mx-auto w-1/2'>Or log in with</div>
    <div className='flex justify-center items-center mt-2'>
      <button type='button'>
        <GoogleIcon className='w-8' />
      </button>
      <button type='button'>
        <FacebookIcon className='w-8 ml-3' />
      </button>
    </div>
  </>
)

export default LogIn
