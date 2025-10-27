import { useState } from "react";
import PlanCard from "~/components/PlanCard";
import { cn } from "~/lib/utils";

export function meta({}) {
  return [
    { title: "스토어 > 클라우드 구독플랜" },
    { name: "description", content: "Store > Cloud Subscription Plan" },
  ];
}

export default function Home() {
  const [menu, setMenu] = useState<number>(0)
  const [hover, setHover] = useState<number>(menu)
  return(<>
    <div className="w-full bg-amber-50 h-91 relative">
      <img src="/3.png" alt="banner" className="w-full h-full object-cover object-left"/>
      <div className="absolute bottom-15 w-full flex justify-center px-24">
        <p className="max-w-[1260px] w-full text-white text-xl font-bold">
          <span className="font-extrabold text-6xl">HOME Cloud</span><br/>
          많은 영상들을 용량 부담없이 저장하고 관리하세요
        </p>
      </div>
    </div>
    <main className="w-full bg-neutral-950 px-24 flex justify-center text-white min-h-[calc(100vh-441px)]">
      <div className="max-w-[1260px] w-full pt-4 pb-16">
        <h1>클라우드 구독플랜</h1>
        <div className="relative flex gap-1 m-auto w-120 bg-gray-900 rounded-xl p-1">
          <div className={cn("absolute top-0 left-0 w-1/2 p-1 h-full opacity-10 pointer-events-none transition-transform duration-300 ease-in-out", hover===1&&"translate-x-full", hover===0&&"translate-x-0")}><div className="bg-amber-50 w-full h-full rounded-lg"/></div>
          <button className={cn("px-8 py-4 z-1 rounded-lg flex-1 cursor-pointer", menu===0 && "bg-blue-600")}
          onClick={()=>setMenu(0)} onMouseEnter={()=>setHover(0)} onMouseLeave={()=>setHover(menu)}>월간</button>
          <button className={cn("px-8 py-4 z-1 rounded-lg flex-1 cursor-pointer", menu===1 && "bg-blue-600")}
          onClick={()=>setMenu(1)} onMouseEnter={()=>setHover(1)} onMouseLeave={()=>setHover(menu)}>연간</button>
        </div>
        {menu === 0 && <Monthly />}
        {menu === 1 && <Yearly />}
      </div>
    </main>
  </>
  )
}
const Monthly = ()=>{
  return(
    <div className="flex w-full justify-between mt-8">
      <PlanCard size="16GB" price={7000} 
        features={[
          '400만 화소 약 6일 저장',
          '300만 화소 약 7일 저장',
          '200만 화소 약 8일 저장',
        ]}
        planId="monthly-16gb"
       />
      <PlanCard size="32GB" price={14000} 
        features={[
          '400만 화소 약 12일 저장',
          '300만 화소 약 14일 저장',
          '200만 화소 약 16일 저장',
        ]}
        planId="monthly-32gb"
       />
      <PlanCard size="128GB" price={56000} 
        features={[
          '400만 화소 약 24일 저장',
          '300만 화소 약 28일 저장',
          '200만 화소 약 32일 저장',
        ]}
        planId="monthly-128gb"
       />
    </div>
  )
}
const Yearly = ()=>{
  return(
    <div className="flex w-full justify-between mt-8">
      <PlanCard size="16GB" price={70000} 
        features={[
          '400만 화소 약 6일 저장',
          '300만 화소 약 7일 저장',
          '200만 화소 약 8일 저장',
        ]}
        planId="yearly-16gb"
       />
      <PlanCard size="32GB" price={140000} 
        features={[
          '400만 화소 약 12일 저장',
          '300만 화소 약 14일 저장',
          '200만 화소 약 16일 저장',
        ]}
        planId="yearly-32gb"
       />
      <PlanCard size="128GB" price={560000} 
        features={[
          '400만 화소 약 24일 저장',
          '300만 화소 약 28일 저장',
          '200만 화소 약 32일 저장',
        ]}
        planId="yearly-128gb"
       />
    </div>
  )
}
