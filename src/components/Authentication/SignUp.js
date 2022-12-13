import React from 'react'
import { Input } from 'lib/components/Field'
import { PrimaryButton } from '../utilities/Button'

const SignUp = () => (
  <div className='pb-8 border-b'>
    <p className=''>Sign up to add movies to your favorite list, make comments and more...</p>
    <Input className='my-4' label='Enter your email' />
    <Input className='my-4' label='User name' />
    <Input className='my-4' label='Enter your password' type='password' />
    <PrimaryButton className='w-full mt-4'>Register</PrimaryButton>
  </div>
)

export default SignUp
