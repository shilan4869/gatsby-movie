import { Formik, Form } from 'formik'
import FormikField from 'lib/components/FormikField'
import React from 'react'

const LoginForm = () => (
  <Formik initialValues={ { email: '', password: '' } }>
    { () => (
      <Form>
        <FormikField
          type='email'
          name='email'
          label='Enter your email'
        />
        <FormikField type='password' name='password' placeholder='Enter your password' />

      </Form>
    ) }
  </Formik>
)

export default LoginForm
