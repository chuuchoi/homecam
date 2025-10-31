import Lottie from 'lottie-react'
import animationDataLoading from './lotties/loading.json'
import { useEffect, useState } from 'react';

export const LoadingSpinner = ({style}
  :{style?:React.CSSProperties})=>{
    const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null; // SSR 단계에서는 렌더링 안 함

  return(
    <Lottie 
    style={style}
    animationData={animationDataLoading}
    loop={true}
    autoplay={true}
    rendererSettings={{
      preserveAspectRatio: 'xMidYMid meet',
    }}
  />
  )
}
