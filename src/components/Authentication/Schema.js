import * as yup from 'yup'

const letterPattern = /^[a-zA-Z0-9]*$/

export const loginSchema = yup.object().shape({
  email: yup.string()
    .email('This is not an Email')
    .min(8, 'Email must be at least 8 characters')
    .required('You must enter email to log in'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(30, 'Password must be maximum at 30 characters')
    .required('You must enter password to log in'),
})

export const signUpSchema = yup.object().shape({
  email: yup.string()
    .email('This is not an Email')
    .min(8, 'Email must be at least 8 characters')
    .required('You must enter email to register'),
  username: yup.string()
    .matches(letterPattern, 'Username contains special character')
    .min(6, 'Username must be at least 6 characters')
    .max(16, 'Username must be maximum at 16 characters')
    .required('You must enter username to register'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(30, 'Password must be maximum at 30 characters')
    .required('You must enter password to register'),
})
