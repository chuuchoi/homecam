// app/routes/m/devices.tsx
import { Link, useLoaderData, useNavigate } from "react-router";
import { BackIcon } from "~/components/icons";
import dummyDevices from "./dummyDevices.json"
import type { HomeDevice } from "./home";

export function meta({ }) {
  return [
    { title: "장치관리" },
    { name: "description", content: "Homecam device management" },
  ];
}

// ✅ Loader: 홈캠 데이터 가져오기
export const loader = async () => {
  // 실제로는 DB나 API에서 가져올 데이터
  const devices = dummyDevices
  return { devices } as { devices: HomeDevice[] };
};

export default function Devices() {
  const navigate = useNavigate();
  const { devices } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-auto">
      {/* Header */}
      <header className="w-full px-4 py-2.5 flex items-center gap-1 sticky top-0 z-10 bg-black">
        <div className="aspect-square flex items-center justify-center absolute top-0 left-0 h-full cursor-pointer"
          onClick={() => { navigate(-1) }}>
          <BackIcon className="w-5 h-5" />
        </div>
        <div className="font-bold text-lg flex items-center justify-center w-full gap-1">
          장치관리
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-4 gap-4 pb-21 text-gray-400">
        {devices.length > 0 ? (
          <div className="w-full flex flex-col gap-4 px-4">
            {devices.map((device) => (
              <div className="p-4 bg-neutral-800 backdrop-blur-sm rounded-2xl">
                <div className="flex flex-col items-center justify-between">
                  <span className="font-bold text-lg text-neutral-50">{device.name}</span>
                  <span className="whitespace-pre-wrap break-all" >{JSON.stringify(device)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg">등록된 기기가 없습니다</p>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 w-full py-3 px-6 bg-black">
        <Link
          to="/m/scanqr" // Link to the QR scan page
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold flex items-center justify-center transition duration-200 hover:bg-blue-700"
        >
          장치 추가
        </Link>
      </footer>
    </div>
  );
}