import React from "react"
import { Navigation, Mousewheel } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"

export default () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Mousewheel]}
      spaceBetween={50}
      slidesPerView={2}
      loop={true}
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      className="w-full min-h-40 flex items-center bg-slate-500"
    >
      <SwiperSlide className="px-12" isDuplicate={true}>
        Slide 1
      </SwiperSlide>
      <SwiperSlide className="px-12" isDuplicate={true}>
        Slide 2
      </SwiperSlide>
      <SwiperSlide className="px-12" isDuplicate={true}>
        Slide 3
      </SwiperSlide>
      <SwiperSlide className="px-12" isDuplicate={true}>
        Slide 4
      </SwiperSlide>
    </Swiper>
  )
}
