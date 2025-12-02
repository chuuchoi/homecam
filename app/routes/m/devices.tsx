// app/routes/m/devices.tsx
import { Link, useNavigate } from "react-router";

export function meta({}) {
  return [
    { title: "장치관리" },
    { name: "description", content: "Homecam device management" },
  ];
}

export default function Devices() {
  const navigate = useNavigate();

  // In a real app, you would fetch device data here.
  // For this example, we'll assume there are no devices initially.
  const hasDevices = false; // Set to true to see a list if you implement one later

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <header className="relative flex items-center justify-center p-4 pt-8 bg-black">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 mt-2 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          {/* <ChevronLeftIcon className="h-6 w-6 text-white" /> */}
          <span className="sr-only">Back &lt;</span>
        </button>
        <h1 className="text-xl font-semibold mt-2">장치관리</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-gray-400">
        {hasDevices ? (
          // This would be your list of registered devices
          <div>
            {/* Example:
            <ul>
              <li>Device 1</li>
              <li>Device 2</li>
            </ul>
            */}
            <p>등록된 기기가 있습니다.</p>
          </div>
        ) : (
          <p className="text-lg">등록된 기기가 없습니다</p>
        )}
      </main>

      {/* "Add Device" Button */}
      <footer className="p-4 bg-black">
        <Link
          to="/m/scanqr" // Link to the QR scan page
          className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold flex items-center justify-center transition duration-200 hover:bg-blue-700"
        >
          장치 추가
        </Link>
      </footer>
    </div>
  );
}