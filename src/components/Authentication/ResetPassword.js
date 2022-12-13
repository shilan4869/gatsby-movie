import React from 'react'
import { PrimaryButton } from '../utilities/Button'
import { Input } from 'lib/components/Field'

const ResetPassword = ({ logIn }) => (
  <div className='w-full lg:span-12'>
    <div className='absolute font-medium text-2xl py-2 px-8 rounded-t-xl border-t border-x bg-gray-50'>
      Reset your password
    </div>

    <div className='p-8 border-x border-y rounded-b-lg mt-12 bg-gray-50'>
      <p className=''>Fill in the fields below to reset your password</p>
      <Input label='Your Email' className='my-4' type='password' />
      <Input label='New password' className='my-4' type='password' />
      <Input label='Confirm password' className='my-4' type='password' />
      <PrimaryButton className='w-full mt-4'>Reset Password</PrimaryButton>
    </div>

    <button type='button' onClick={ logIn } className='mt-2 text-primary-cyan'>Quay lại đăng nhập</button>
  </div>
)

export default ResetPassword
