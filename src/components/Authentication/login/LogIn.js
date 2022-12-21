import { Input } from 'lib/components/Field'
import React, { useState } from 'react'
import { PrimaryButton } from '../../utilities/Button'
import GoogleIcon from 'src/assets/icon/google.svg'
import FacebookIcon from 'src/assets/icon/facebook.svg'
import useForm from 'lib/hooks/useForm'
import useAuthContext from 'src/hooks/useAuthContext'
import clsx from 'lib/utilities/clsx'

const LogIn = ({ resetPassword }) => {
  const [ isEmailInvalid, setIsEmailInvalid ] = useState(false)
  const [ isPasswordInvalid, setIsPasswordInvalid ] = useState(false)
  const [ emailErrorMessage, setEmailErrorMessage ] = useState(false)
  const [ passwordErrorMessage, setPasswordErrorMessage ] = useState(false)
  const LOGIN_API = 'http://localhost:1000/auth/login'
  const { setUser } = useAuthContext()
  const { loading, submit } = useForm()

  const handleLogIn = event => {
    const onFulfilled = response => {
      if (response.data) {
        setUser(response.data)
      } else {
        switch (response.target) {
          case 'email':
            setIsEmailInvalid(true)
            setEmailErrorMessage(response.message)
            break
          case 'password':
            setIsPasswordInvalid(true)
            setPasswordErrorMessage(response.message)
            break
          default:
            break
        }
      }
    }

    submit(event, { onFulfilled })
  }


  return (
    <form action={ LOGIN_API } onSubmit={ handleLogIn }>
      <fieldset className='pb-8 border-b disabled:opacity-70' disabled={ loading }>
        <p className=''>Login to add movies to your favorite list, make comments and more...</p>
        <Input
          className={ clsx('mt-4', isEmailInvalid && 'field-invalid') }
          label='Enter Email'
          name='email'
          onInvalid={ () => {
            setIsEmailInvalid(true)
          } }
          min={ 4 }

        />
        { emailErrorMessage }
        <Input
          className={ clsx('mt-4', isPasswordInvalid && 'field-invalid') }
          label='Enter your password'
          type='password'
          name='password'
          onInvalid={ () => {
            setIsPasswordInvalid(true)
          } }
        />
        { passwordErrorMessage }
        <button type='button' onClick={ resetPassword } className='text-primary-cyan mt-6'>Forgot your password?</button>
        <PrimaryButton
          className='w-full mt-4'
          type='submit'
          disabled={ loading }
        >
          Log In
        </PrimaryButton>
      </fieldset>
      <div className='text-center block bg-gray-50 -mt-2 mx-auto w-1/2'>Or log in with</div>
      <div className='flex justify-center items-center mt-2'>
        <button type='button'>
          <GoogleIcon className='w-8' />
        </button>
        <button type='button'>
          <FacebookIcon className='w-8 ml-3' />
        </button>
      </div>
    </form>
  )
}

export default LogIn
