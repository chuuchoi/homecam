import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useOutletContext, type ClientLoaderFunctionArgs, useNavigate, redirect } from "react-router";
import type { AuthUserPayload } from "~/lib/auth";
import { getData } from "~/lib/axios";

export function meta({}) {
  return [
    { title: "개발" },
    { name: "description", content: "developer" },
  ];
}

export async function loader(){
  // const res = await fetch('http://localhost:5173/api/rooms/')
  // return res
  return redirect('/developers/workspace')
}
export async function clientLoader({serverLoader,request}:ClientLoaderFunctionArgs){
  const serverData = await serverLoader<any>()
  console.log(request)
  const clientData = {clientData : 'clientLoader Data'}
  return {...serverData, clientData}
}

export default function Home({loaderData}:any) {
  const {data} = useQuery({
    queryKey:['rooms'],
    queryFn:()=>getData('/api/rooms/3/images')
  })
  // const navigate = useNavigate()
  const {loginInfo} = useOutletContext<{loginInfo:AuthUserPayload|null}>()
  //개발자 아이디면 개발자 홈으로 이동 아니면 진입불가
  // useEffect(()=>{
  //   if(loginInfo?.id === "123123") navigate('/developers/')
  //   else{alert; navigate('/')}
  // },[])

  console.log(loginInfo)
  return(
    <div className="bg-neutral-950 p-24 text-white min-h-[calc(100vh-77px)]">
      {JSON.stringify(data)}<br/>
      {JSON.stringify(loaderData)}<br/>
      {JSON.stringify(loginInfo)}
    </div>
  )
}
