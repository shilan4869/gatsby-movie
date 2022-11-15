import React from 'react'
import AuthProvider from 'src/context/authContext'
import Header from 'src/component/layout/Header'

export const wrapPageElement = ({ element }) => (
  <AuthProvider>
    <div className='mt-6 bg w-full relative text-white'>
      <Header />
      { element }
    </div>
  </AuthProvider>
)
