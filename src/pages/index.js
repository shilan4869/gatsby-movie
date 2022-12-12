import React from 'react'
import Main from 'src/components/home/Main'
import RightSide from 'src/components/home/RightSide'
import Head from 'src/components/head/head'
import 'lib/styles/swiper/swiper.css'
import 'lib/styles/swiper/navigation.css'

const Index = () => (
  <Head>
    <div className='flex bg min-h-screen'>
      <Main className='w-full mt-16 md:mt-0 xl:w-4/6 mx-auto' />
      <RightSide className='fixed right-0 hidden xl:flex flex-col w-1/6 h-screen pt-16' />
    </div>
  </Head>
)

export default Index
