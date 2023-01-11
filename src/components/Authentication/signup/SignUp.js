import React from 'react'
import { PrimaryButton } from '../../utilities/Button'
import { Formik, Form } from 'formik'
import { FormikInput } from 'lib/components/FormikField'
import { signUpSchema } from '../Schema'
import useFormikForm from 'src/hooks/useFormikForm'


const SignUp = () => {
  const SIGN_UP_API = 'http://localhost:1000/auth/register'
  const { responseError, clearResponseError, loading, submit } = useFormikForm()

  const clearValidateErrors = props => () => {
    props.setErrors({})
  }

  console.log('register')

  return (
    <Formik
      initialValues={ { email: '', password: '', username: '' } }
      validationSchema={ signUpSchema }
      validateOnChange={ false }
    >
      { props => (
        <Form
          action={ SIGN_UP_API }
          onSubmit={ submit(props) }
          onFocus={ clearResponseError }
          onChange={ clearValidateErrors(props) }
        >
          <fieldset className='pb-8 border-b' disabled={ loading }>
            <p className=''>Sign up to add movies to your favorite list, make comments and more...</p>
            <FormikInput className='mt-4' label='Enter your email' name='email' />
            <FormikInput className='mt-4' label='User name' name='username' />
            <FormikInput className='mt-4' label='Enter your password' type='password' name='password' />
            { responseError && <p className='text-danger pt-2'>{ responseError }</p> }
            <PrimaryButton className='w-full mt-4' disabled={ loading } type='submit'>Register</PrimaryButton>
          </fieldset>
        </Form>
      ) }
    </Formik>
  )
}

export default SignUp
