import React, { useRef } from 'react'
import useFormikForm from 'src/hooks/useFormikForm'
import { Formik, Form } from 'formik'
import { PrimaryButton } from '../../utilities/Button'
import GoogleIcon from 'src/assets/icon/google.svg'
import FacebookIcon from 'src/assets/icon/facebook.svg'
import { FormikInput } from 'lib/components/FormikField'
import { loginSchema } from '../Schema'
import { getGoogleUrl, loginWithGoogle } from 'src/utilities/getGoogleUrl'

const LOG_IN_API = 'http://localhost:1000/auth/login'
const LogIn = ({ resetPassword }) => {
  const { responseError, clearResponseError, loading, submit } = useFormikForm()
  const googleButton = useRef()

  const clearValidateErrors = props => () => {
    props.setErrors({})
  }

  const googleLogin = () => {
    const googleLoginUrl = getGoogleUrl()

    window.addEventListener('message', loginWithGoogle)
    window.open(googleLoginUrl, '_blank', 'location=yes,height=700,width=600,scrollbars=yes,status=yes')
  }


  return (
    <Formik
      initialValues={ { email: '', password: '' } }
      validationSchema={ loginSchema }
      validateOnChange={ false }
    >
      { props => (
        <Form
          action={ LOG_IN_API }
          onSubmit={ submit(props) }
          onFocus={ clearResponseError }
          onChange={ clearValidateErrors(props) }
        >
          <fieldset className='pb-8 border-b disabled:opacity-70' disabled={ loading }>
            <p>Login to add movies to your favorite list, make comments and more...</p>
            <FormikInput
              className='mt-4'
              label='Enter Email'
              name='email'
            />
            <FormikInput
              className='mt-4'
              label='Enter your password'
              type='password'
              name='password'
            />
            { responseError && <p className='text-danger pt-2'>{ responseError }</p> }
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
            <button type='button' ref={ googleButton } onClick={ googleLogin }>
              <GoogleIcon className='w-8' />
            </button>
            <button type='button'>
              <FacebookIcon className='w-8 ml-3' />
            </button>
          </div>
        </Form>
      ) }
    </Formik>
  )
}

export default LogIn
