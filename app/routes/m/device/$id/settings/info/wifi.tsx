// app/routes/m/device/$id/settings/info/wifi.tsx
import { useNavigate, useParams } from "react-router";
import { BackIcon } from "~/components/icons";

export function meta({ }) {
  return [
    { title: "Wi-Fi" },
    { name: "description", content: "Wi-Fi Setting" },
  ];
}


export default function WifiSetting() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#121212] text-white min-h-screen pb-10">
      <header className="w-full px-4 py-4 flex items-center gap-1 mb-4 sticky top-0 z-10 bg-[#121212]">
        <div className="aspect-square flex items-center justify-center absolute top-0 left-0 h-full cursor-pointer"
          onClick={() => { navigate(-1) }}>
          <BackIcon className="w-5 h-5" />
        </div>
        <div className="font-bold text-[17px] flex items-center justify-center w-full gap-1">
          Wi-Fi
        </div>
      </header>

      <main className="px-4 flex flex-col gap-4">


      </main>
    </div>
  );
}
