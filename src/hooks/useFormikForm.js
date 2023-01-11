import { useState } from 'react'
import useForm from 'lib/hooks/useForm'
import useAuthContext from './useAuthContext'

const useFormikForm = () => {
  const [ responseError, setResponseError ] = useState('')
  const { setUser, closeAuthPopUp } = useAuthContext()
  const { loading, submit: formSubmit } = useForm()

  const clearResponseError = () => {
    setResponseError('')
  }

  const submit = props => event => {
    if (props.isValid) {
      const onFulfilled = response => {
        if (response.data && response.data.username) {
          setUser(response.data)
          closeAuthPopUp()
        } else if (response.data && response.data.success) {
          console.log('email sent!')
        } else {
          setResponseError(response.message)
        }
      }

      formSubmit(event, { onFulfilled })
    } else {
      event.preventDefault()
    }
  }

  return {
    responseError,
    clearResponseError,
    loading,
    submit,
  }
}

export default useFormikForm
