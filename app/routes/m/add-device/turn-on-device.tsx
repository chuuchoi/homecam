// app/routes/m/add-device/turn-on-device.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BackIcon, TurnOnDeviceIcon } from "~/components/icons";

export function meta({}) {
  return [
    { title: "홈캠" },
    { name: "description", content: "Homecam home" },
  ];
}


export default function TurnOnDevice() {
  const navigate = useNavigate();
  const [home, setHome]=useState("");
  const [mid, setMid]=useState("");
  useEffect(()=>{
    const params = new URLSearchParams(window.location.search)
    setMid(params.get("mid")||"")
    setHome(params.get("home")||"")
  },[])


  return (
    <div className="w-full bg-[#121212] text-white min-h-screen pt-6">
      <header className="w-full px-4 py-2.5 flex items-center gap-1 relative">
        <div className="aspect-square flex items-center justify-center absolute top-0 left-0 h-full" 
          onClick={()=>{navigate(-1)}}>
          <BackIcon className="w-5 h-5" />
        </div>
        <div className="font-bold text-lg flex items-center justify-center w-full gap-1">
          장치 전원 켜기
        </div>
      </header>
      <main className="px-6 py-4">
        <div className="relative w-full gap-4 flex flex-col">
          <div className="text-neutral-100 m-auto">
            <TurnOnDeviceIcon className="w-36 h-36"/>
          </div>
          <p className="text-neutral-400">
            1. 설치전 장치를 콘센트 꽂 설정을 진행합니다.<br/>
            2. LED가 파란색으로 켜질떄 까지 기다립니다.
          </p>

          <div className="flex justify-center bg-transparent hover:bg-black text-blue-600 font-semibold w-full p-3 rounded"
          onClick={()=>{}}>설치 가이드</div>
            

          <footer className="fixed bottom-0 left-0 w-full py-3 px-6">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xl font-bold p-2 w-full"
                onClick={()=>{
                  navigate(`/m/add-device/connect-wifi?home=${home}&mid=${mid}`)
                }}
              >
                다음
              </button>
          </footer>

        </div>

      </main>
    </div>
  );
}
