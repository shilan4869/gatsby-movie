import React, { useEffect } from 'react'
import useAuthenticationPopup from 'src/hooks/useAuthenticationPopup'

const Test = () => {
  const { popup, logIn, signUp, preload } = useAuthenticationPopup()
  const Popup = () => popup

  useEffect(() => {
    logIn()
  }, [ logIn, preload ])

  return (

    <Popup />

  )
}

export default Test
