import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getData } from '~/lib/axios';
import { LoadingSpinner } from './LoadingSpinner';
import MDescription from './MDescription';

const FadeSlider = ({ id }:any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(currentIndex)
  // 특정 룸의 이미지 목록 조회
  const {data, isLoading, isError} = useQuery({
    queryKey: ['room_images', id],
    queryFn: () => getData(`/api/rooms/${id}/images`),
    retry: 0,
  })
  //@ts-ignore
  const images = data?.images
  if(isLoading) return <LoadingSpinner />
  if(isError || images.length===0) return(
    <div className="main-fslider" style={{position:'relative'}}>
      <div style={{background:`56% 40% / 50% 50% url('NoFiles.png') no-repeat`, paddingBottom:"20%",color:"var(--color-gray-20)", fontWeight:'600', display:'flex', justifyContent:'center', alignItems:'flex-end', position: 'absolute', top: '0', width: '100%', height: '100%',}}>
        이미지가 없습니다</div>
    </div>
  )


  return (<div className='w-full flex items-center gap-4'>
    <div className="my-fslider-prev" style={{cursor:images.length>1?'pointer':'default', opacity:images.length>1?1:0.5}}>
      <svg style={{width:'24px', height:'fit-content'}} width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 11L1 6L6 1" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <Swiper
      modules={[EffectFade, Autoplay, Navigation, Pagination]}
      // effect="fade"
      loop={true}
      // autoplay={{ delay: 3000 }}
      autoplay={false}
      // pagination={{ clickable: true }}
      // navigation={true}
      navigation={{
        prevEl: '.my-fslider-prev',
        nextEl: '.my-fslider-next',
      }}
      spaceBetween={20}
      slidesPerView={3}
      className="main-fslider"
      onSlideChange={(swiper) => {
        setCurrentIndex(swiper.realIndex);
      }}
    >
      {images.map((src:any, index:any) => (
        <SwiperSlide key={index} style={{borderRadius:'20px', overflow:'hidden'}}>
          <img src={src} alt={`slide-${index}`}
            onError={(e) => { e.currentTarget.src = '/fallback.png';}}
          />
          <div className='my-fslider-dim' />
          <MDescription />
        </SwiperSlide>
      ))}

    </Swiper>
    <div className="my-fslider-next" style={{cursor:images.length>1?'pointer':'default', opacity:images.length>1?1:0.5}}>
      <svg style={{width:'24px', height:'fit-content'}} width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L6 6L1 11" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>

    {/* <div className='my-fslider-page'>{currentIndex+1} / {images.length}</div> */}

  </div>
  );
};

export default FadeSlider;
