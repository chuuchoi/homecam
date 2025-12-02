// app/routes/m/add-device/name.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Checkbox } from "~/components/checkbox";
import { BackIcon } from "~/components/icons";

export function meta({}) {
  return [
    { title: "홈캠" },
    { name: "description", content: "Homecam home" },
  ];
}


export default function AddDeviceName() {
  const navigate = useNavigate();
  const [camNames, setCamNames] = useState([
    {name:"입구"},
    {name:"거실"},
    {name:"주방"},
    {name:"침실"},
  ]);
  const [home, setHome] =useState("");
  const [name, setName] =useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [selected, setSelected]=useState<number|null>(null);
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
          장치이름
        </div>
      </header>
      <main className="px-6 py-4">
        <p className="text-neutral-400 text-sm">카메라 이름 지정</p>
        <div className="relative w-full gap-4 flex flex-col">
          {camNames.map((cam, idx)=><label key={idx} htmlFor={`checkbox-${idx}`} className="flex justify-between bg-neutral-800 w-full px-3 py-2 items-center rounded">
            <span className="mt-0.5">{cam.name}</span>
            <Checkbox
              id={`checkbox-${idx}`}
              checked={idx===selected}
              onChange={()=>{setSelected(idx)}}
            />

          </label>)}

          <div className="flex justify-center bg-black text-blue-600 font-semibold w-full p-3 rounded"
          onClick={()=>{setIsAdding(true)}}>직접입력</div>
            

          <footer className="fixed bottom-0 left-0 w-full py-3 px-6">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xl font-bold p-2 w-full"
                onClick={()=>{
                  if(selected===null) return alert("이름을 지정해주세요")
                  navigate(`/m/add-device/notification?home=${home}&mid=${mid}&camname=${camNames[selected].name}`)
                }}
              >
                다음
              </button>
          </footer>

        </div>

      </main>
      {isAdding && <div className="fixed top-0 left-0 bg-black/50 w-full h-full flex items-center justify-center">
        <div className="relative bg-neutral-800 rounded-xl gap-2 p-4 border border-neutral-700 flex flex-col items-center justify-center">
          <span>직접입력</span>
          <input className="bg-neutral-900 p-2 w-full rounded"
            value={name}
            placeholder="카메라 이름을 지정하세요"
            onChange={(e)=>setName(e.target.value)}
          />
          <div className="flex gap-2 self-end">
            <button className="text-neutral-300 bg-neutral-800 hover:bg-neutral-700 px-3 py-2 rounded"
            onClick={()=>setIsAdding(false)}>취소</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
            onClick={()=>{setCamNames([...camNames, {name}]);setIsAdding(false);setName("")}}>추가</button>
          </div>
        </div>
      </div>}
    </div>
  );
}
