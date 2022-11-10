import { useCallback, useEffect, useRef } from 'react'
import FormError from 'lib/errors/FormError'
import useMutation from 'lib/hooks/useMutation'
import { entries, reportValidity, setCustomValidity } from 'lib/utilities/form'

const useForm = _body => {
  // this hook works with mutiple form
  // so we need to keep track of the last submitted form
  /**
   * @type {React.MutableRefObject<HTMLFormElement>}
   */
  const ref = useRef()
  const mutation = useMutation(null, _body)
  const { error, mutate } = mutation

  const submit = useCallback(
    /**
     * @typedef {import('lib/hooks/useMutation').MutationOptions} MutationOptions
     * @param {object} [data]
     * @param {MutationOptions} [options]
     */
    (data, { body: _body, ...options } = {}) => {
      const form = data?.target

      if (form) {
        data.preventDefault?.()
      }

      ref.current = form

      const url = form ? form.getAttribute('action') : null
      const enctype = form?.getAttribute('enctype')

      if (enctype) {
        data = new FormData(form)

        if (_body) {
          for (const key in _body) {
            data.append(key, _body[ key ])
          }
        }
      } else {
        data = form ? entries(form) : data
        data = _body ? { ...data, ..._body } : data
      }

      return mutate(data, { url, ...options })
    },
    [ mutate ],
  )

  useEffect(
    () => {
      const form = ref.current

      if (form && error instanceof FormError) {
        setCustomValidity(form.elements, error)
        reportValidity(form)
      }
    },
    [ error ],
  )

  return {
    ...mutation,
    submit,
  }
}

export default useForm
