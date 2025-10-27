import { Link } from "react-router";
import MDescription from "~/components/MDescription";
import { DBIcon } from "~/components/icons";

export function meta({}) {
  return [
    { title: "스토어" },
    { name: "description", content: "Store" },
  ];
}

export default function Home() {

  return(<>
    <div className="w-full bg-amber-50 h-91 relative">
      <img src="/캡처.png" alt="banner" className="w-full h-full object-cover object-left"/>
      <div className="absolute bottom-15 w-full flex justify-center px-24">
        <p className="max-w-[1260px] w-full text-white text-xl font-bold">
          <span className="font-extrabold text-6xl">HOME STORE</span><br/>
          클라우드부터 이벤트 탐지까지<br/> 다양한 이벤트 감지를 통해 더욱 더 안전한 서비스를 제공합니다.
        </p>
      </div>
    </div>
    <main className="w-full bg-neutral-950 px-24 flex justify-center text-white min-h-[calc(100vh-441px)]">
      <div className="max-w-[1260px] w-full py-16 flex flex-col gap-8">
        <EventDetection />
        <Subscription />
        <Device />
      </div>
    </main>
  </>
  )
}

const EventDetection = ()=>{
  return(
  <div>
    <div className="flex items-center justify-between">
      <div>
        <h1>이벤트 감지</h1>
        <h3 className="text-neutral-300">더 많은 이벤트 감지를 통해 365일 안전하게 관리하세요</h3>
      </div>
      <Link to="/store/category/" className="text-blue-500 border rounded-full border-blue-500 px-4 py-1 hover:bg-blue-500 hover:text-white transition">더보기</Link>
    </div>
    <div className="flex gap-8 w-full">
      <CardED />
      <CardED />
      <CardED />
    </div>
  </div>
  )
}

const CardED = ()=>{
  return(
  <div className="relative min-w-1/4 flex-1 h-80 min-h-full rounded-2xl bg-neutral-400">
    <label className="block w-fit m-auto relative top-28">썸네일</label>
    <MDescription />
  </div>
  )
}

const Subscription = ()=>{
  return(
  <div>
    <div className="flex items-center justify-between">
      <div>
        <h1>클라우드 구독플랜</h1>
        <h3 className="text-neutral-300">많은 영상들을 용량 부담없이 저장하고 관리하세요</h3>
      </div>
      <Link to="/store/subscription" className="text-blue-500 border rounded-full border-blue-500 px-4 py-1 hover:bg-blue-500 hover:text-white transition">자세히 알아보기</Link>
    </div>
    <div className="flex gap-4 w-full">
      <CardCloud gb="16GB"/>
      <CardCloud gb="32GB"/>
      <CardCloud gb="128GB"/>
    </div>
  </div>
  )
}

const CardCloud = ({gb}:{gb:string})=>{
  return(
  <div className="relative min-w-1/4 flex-1 h-80 min-h-full rounded-2xl bg-neutral-800">
    <div className="flex w-fit m-auto h-55 items-center gap-3">
      <DBIcon style={{width:'64px'}}/>
      <span className="text-4xl font-black">{gb}</span>
    </div>
    <div className="absolute bottom-0 w-full px-4 py-4 bg-neutral-800 flex items-center justify-between  rounded-b-xl">
      <div className="flex flex-col gap-1 text-sm text-neutral-300 leading-[100%] ">
        <span>• ₩ 7,000/월</span>
        <span>• ₩ 70,000/년</span>
        <span>• 400만 화소 약 6일 저장</span>
        <span>• 300만 화소 약 7일 저장</span>
        <span>• 200만 화소 약 8일 저장</span>
      </div>
    </div>
  </div>
  )
}

const Device = ()=>{
  return(
  <div>
    <div className="flex items-center justify-between">
      <div>
        <h1>장치</h1>
        <h3 className="text-neutral-300">다양한 장치를 통해 보다 더 안전하게 관리하세요</h3>
      </div>
      <Link to="/store/device" className="text-blue-500 border rounded-full border-blue-500 px-4 py-1 hover:bg-blue-500 hover:text-white transition">더보기</Link>
    </div>
    <div className="flex gap-4 w-full">
      <CardDevice/>
      <CardDevice/>
      <CardDevice/>
    </div>
  </div>
  )
}

const CardDevice = ()=>{
  return(
  <div className="relative min-w-1/4 flex-1 h-80 min-h-full rounded-2xl overflow-clip flex flex-col">
    <img src="/캡처2.png" alt="device" width={'100%'} className="object-cover h-full"/>
    <div className=" w-full px-4 py-4 bg-neutral-800 flex items-center justify-between rounded-b-xl">
      <div className="flex flex-col gap-1 text-neutral-100">
        <span>제품명</span>
        <span className="text-neutral-400 text-sm leading-[100%]">제품 스펙 설명란</span>
      </div>
    </div>
  </div>
  )
}