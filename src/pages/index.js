import React from 'react'
import Main from 'src/component/home/Main'
import RightSide from 'src/component/home/RightSide'

const Index = () => (
  <div className='flex'>
    <Main className='w-full lg:w-3/4' />
    <RightSide className='fixed right-0 hidden lg:flex flex-col w-1/4 h-screen pt-16 p-2' />
  </div>
)

export default Index
