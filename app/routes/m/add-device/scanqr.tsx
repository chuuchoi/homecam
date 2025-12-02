// app/routes/m/scanqr.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import CustomQRScanner from "~/components/m/CustomQRScanner";
// import QRScanner from "~/components/m/QRScanner";

export default function MobileScanQR() {
  const [showManual, setShowManual] = useState(false)
  const [manualInputVal, setManualInputVal] = useState("")
  const navigate = useNavigate();

  const reqAddDevice = async (modelId:string) => {
    try {
      const res = await fetch("/api/device/add-device", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device_model_name: modelId }),
      }).then(r=>r.json());
      if(res.ok){
        alert(res.message)
        navigate(`/m/add-device/select-home?mid=${modelId}`)
      }
      else throw new Error(res.message)
    } catch (error) {
      alert(error)
      window.location.reload();
    }
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 z-10 w-full flex items-center justify-center p-4 pt-8 bg-black">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 mt-2 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          {/* <ChevronLeftIcon className="h-6 w-6 text-white" /> */}
          <span>Back &lt;</span>
        </button>
      </header>

      {/* QR Scan Area */}
      <CustomQRScanner onComplete={(res)=>reqAddDevice(res)}/>


      {/* Instructions and Manual Input */}
      <main className="flex-1 flex flex-col items-center justify-start p-2 bg-black">
        <h2 className="text-xl font-semibold text-white mb-2">QR 코드 스캔</h2>
        <p className="text-gray-400 text-center mb-2">
          기기 하단에 위치한 QR 코드를 스캔
        </p>
        {!showManual &&
          <span onClick={()=>{setShowManual(true)}} className="text-blue-500 text-lg font-medium">
            수동입력
          </span>
        }
        {showManual && <>
          <input className="bg-neutral-800"
           value={manualInputVal} onChange={(e)=>setManualInputVal(e.target.value)}></input>
          <button onClick={()=>reqAddDevice(manualInputVal)}>완료</button>
        </>
        }
      </main>
    </div>
  );
}