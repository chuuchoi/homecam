// app/routes/m/add-device/connect-wifi.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BackIcon, WifiIcon } from "~/components/icons";

export function meta({}) {
  return [
    { title: "홈캠" },
    { name: "description", content: "Homecam home" },
  ];
}


export default function ConnectWifi() {
  const navigate = useNavigate();
  const [wifiList, setWifiList] = useState([
    {name:'ANNA_2.4G', lock:false},
    {name:'TTT_2.4G', lock:true},
  ])
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
          Wi-fi 연결
        </div>
      </header>
      <main className="px-6 py-4">
        <div className="relative w-full gap-4 flex flex-col">
          <p className="text-neutral-400">
            카메라에 연결할 Wi-fi 네트워크를 선택합니다.
          </p>
          <div className="flex flex-col gap-2">
            {wifiList.map((wifi, idx)=><div key={idx} className="flex justify-between bg-black w-full px-3 py-2 items-center rounded"
              onClick={()=>{navigate(`/m/add-device/name?home=${home}&mid=${mid}`)}}
            >
              <span>{wifi.name}</span>
              <WifiIcon lock={wifi.lock} className="w-5 h-5 text-blue-600"/>
            </div>)}
          </div>
            

          <footer className="fixed bottom-0 left-0 w-full py-3 px-6">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xl font-bold p-2 w-full"
                onClick={()=>{}}
              >
                재탐색
              </button>
          </footer>

        </div>

      </main>
    </div>
  );
}
