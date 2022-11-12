import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"

const Index = () => {
  return (
    <>
      <Swiper
        slidesPerView="auto"
        slidesPerGroup={4}
        breakpoints={{
          320: {
            slidesPerGroup: 2,
          },
          640: {
            slidesPerGroup: 3,
          },
          960: {
            slidesPerGroup: 4,
          },
        }}
        grabCursor={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper max-w-7xl"
      >
        <SwiperSlide className="!w-80">Slide 1</SwiperSlide>
        <SwiperSlide className="!w-80">Slide 2</SwiperSlide>
        <SwiperSlide className="!w-80">Slide 3</SwiperSlide>
        <SwiperSlide className="!w-80">Slide 4</SwiperSlide>
        <SwiperSlide className="!w-80">Slide 5</SwiperSlide>
        <SwiperSlide className="!w-80">Slide 6</SwiperSlide>
        <SwiperSlide className="!w-80">Slide 7</SwiperSlide>
        <SwiperSlide className="!w-80">Slide 8</SwiperSlide>
        <SwiperSlide className="!w-80">Slide 9</SwiperSlide>
        <SwiperSlide className="!w-80">Slide 10</SwiperSlide>
        <SwiperSlide className="!w-80">Slide 11</SwiperSlide>
        <SwiperSlide className="!w-80">Slide 12</SwiperSlide>
        <SwiperSlide className="!w-80">Slide 13</SwiperSlide>
        <SwiperSlide className="!w-80">Slide 14</SwiperSlide>
        <SwiperSlide className="!w-80">Slide 15</SwiperSlide>
        <SwiperSlide className="!w-80">Slide 16</SwiperSlide>
        <SwiperSlide className="!w-80">Slide 17</SwiperSlide>
        <SwiperSlide className="!w-80">Slide 18</SwiperSlide>
        <SwiperSlide className="!w-80">Slide 19</SwiperSlide>
        <SwiperSlide className="!w-80">Slide 20</SwiperSlide>
      </Swiper>
    </>
  )
}

export default Index
