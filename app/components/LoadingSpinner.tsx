import Lottie from 'react-lottie'
import animationDataLoading from './lotties/loading.json'

export const LoadingSpinner = ({style}
  :{style?:React.CSSProperties})=>{
  return(
    <Lottie 
    style={style}
    isClickToPauseDisabled
    options={{
      loop: true,
      autoplay: true,
      animationData: animationDataLoading,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet",
      },
    }}
  />
  )
}
