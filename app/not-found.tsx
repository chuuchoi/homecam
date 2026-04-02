// not-found.tsx
import { useNavigate, type LoaderFunctionArgs, redirect } from "react-router";
import { Icon404 } from "./components/icons";
import { isMobileUserAgent } from "./lib/utils";

export async function loader({ request }: LoaderFunctionArgs) {
  const ua = request.headers.get("user-agent") || "";
  const url = new URL(request.url);
  // console.log('not-found.tsx', url, ua)

  if (isMobileUserAgent(ua) && !url.pathname.startsWith("/m")) {
    url.pathname = "/m" + url.pathname;
    return redirect(url.toString());
  }
  if (!isMobileUserAgent(ua) && url.pathname.startsWith("/m")) {
    url.pathname = url.pathname.replace(/^\/m/, "");
    return redirect(url.toString());
  }
  if (isMobileUserAgent(ua) && url.pathname.startsWith("/m")) {
    return redirect('/m/home')
  }

  return null; // 그냥 통과
}

export default function NotFound() {
  const navigate = useNavigate()
  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.visualViewport) {
      const vh = window.visualViewport.height;
      const vw = window.visualViewport.width;
      const glass = document.querySelector('.MagnifyingGlass');
      glass?.setAttribute(
        'style',
        `transform:translate(${(vw / 2 - e.clientX) / 20}px,${(vh / 2 - e.clientY) / 20
        }px)`,
      );
    }
  }
  return (
    <div className="bg-white min-h-screen pb-[30vh] flex flex-col items-center justify-center" onMouseMove={handleMouseMove}>
      <div className="h-[50vh] flex flex-col justify-end items-center relative">
        <img className="ml-[2vw] z-1 transition-all duration-300" src={'/magnifyingGlass.png'} alt="MagnifyingGlass" />
        <Icon404 style={{ position: 'absolute', zIndex: '0', transform: 'translateY(-144px)' }} />
      </div>
      <p className="text-[24px] font-semibold text-[#5F5F5F] text-center z-2 "
        style={{ marginTop: '4vh', lineHeight: '146%' }}>
        찾을 수 없는 페이지입니다.
      </p>
      <p className="text-[15px] font-medium text-neutral-600" style={{ marginTop: '1vh', textAlign: 'center' }}>
        페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다.<br />
        입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
      </p>
      <div style={{ display: 'flex', marginTop: '5vh' }}>
        <button className="cursor-pointer px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors font-medium text-sm"
          onClick={() => { navigate(-1); }}>
          이전 화면
        </button>
        <button className="cursor-pointer px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors font-medium text-sm"
          style={{ marginLeft: '24px' }}
          onClick={() => { navigate('/'); }}>
          홈으로 가기
        </button>
      </div>
    </div>
  )
}
