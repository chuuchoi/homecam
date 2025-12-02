// app/routes/m/add-device/name.tsx
import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BackIcon } from "~/components/icons";

export function meta({}) {
  return [
    { title: "홈캠" },
    { name: "description", content: "Homecam home" },
  ];
}

export default function AddDeviceNotification() {
  const navigate = useNavigate();
  const [mid, setMid]=useState("");
  const [home, setHome] =useState("");
  const [camname, setCamname] =useState("");
  const [notification, setNotification] =useState({
    text:true,
    thumbnail:true
  });
  useEffect(()=>{
    const params = new URLSearchParams(window.location.search)
    setMid(params.get("mid")||"")
    setHome(params.get("home")||"")
    setCamname(params.get("camname")||"")
  },[])

  const addDevice = async()=>{
    try {
      const reqBody = {
        home,
        device_model_name:mid,
        cam_name:camname,
        notification
      }
      const res = await fetch("/api/device/add-device", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      }).then(r=>r.json());
      if(res.ok){
        alert(res.message)
        navigate("/m/home")
      }
      else throw new Error(res.message)
    } catch (error) {
      alert(error)
      window.location.reload();
    }
  }


  return (
    <div className="w-full bg-[#121212] text-white min-h-screen pt-6">
      <header className="w-full px-4 py-2.5 flex items-center gap-1 relative">
        <div className="aspect-square flex items-center justify-center absolute top-0 left-0 h-full" 
          onClick={()=>{navigate(-1)}}>
          <BackIcon className="w-5 h-5" />
        </div>
        <div className="font-bold text-lg flex items-center justify-center w-full gap-1">
          알림
        </div>
      </header>
      <main className="px-6 py-4">
        <p className="text-neutral-400 text-sm">카메라 이름 지정</p>
        <div className="relative w-full gap-4 flex flex-col">
          <div className="flex justify-between">
            <span>텍스트</span>
            <Switch className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-blue-600 data-focus:outline data-focus:outline-white"
              checked={notification.text}
              onChange={(e)=>setNotification({...notification, text:e})}
            >
             <span
                aria-hidden="true"
                className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
              />
            </Switch>
          </div>
          <div className="flex justify-between">
            <span>썸네일</span>
            <Switch className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-blue-600 data-focus:outline data-focus:outline-white"
              checked={notification.thumbnail}
              onChange={(e)=>setNotification({...notification, thumbnail:e})}
            >
             <span
                aria-hidden="true"
                className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
              />
            </Switch>
          </div>

            

          <footer className="fixed bottom-0 left-0 w-full py-3 px-6">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xl font-bold p-2 w-full"
                onClick={addDevice}
              >
                완료
              </button>
          </footer>

        </div>

      </main>
    </div>
  );
}
