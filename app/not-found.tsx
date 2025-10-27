// not-found.tsx
import { useNavigate } from "react-router";
import { Icon404 } from "./components/icons";
import './404.css';

export default function NotFound() {
  const navigate = useNavigate()
  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.visualViewport) {
      const vh = window.visualViewport.height;
      const vw = window.visualViewport.width;
      const glass = document.querySelector('.MagnifyingGlass');
      glass?.setAttribute(
        'style',
        `transform:translate(${(vw / 2 - e.clientX) / 20}px,${
          (vh / 2 - e.clientY) / 20
        }px)`,
      );
    }    
  }
  return(
    <div className="page404" onMouseMove={handleMouseMove}>
    <div className="ImageContainer">
      <img className="MagnifyingGlass"  src={'/magnifyingGlass.png'}  alt="MagnifyingGlass" />
      <Icon404 style={{ position: 'absolute', zIndex: '0', transform: 'translateY(-144px)' }} />
    </div>
    <p className="StyledP" style={{ marginTop: '4vh', fontSize:"24px", fontWeight:"600", color:"#1A201B" }}>
      찾을 수 없는 페이지입니다.
    </p>
    <p className="h2msg" style={{ marginTop: '0vh', textAlign:'center' }}>
      페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다.<br />
      입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
    </p>
    <div style={{ display: 'flex', marginTop: '5vh' }}>
      <button className="btn-primary2"
        onClick={() => {navigate(-1);}}>
        이전 화면
      </button>
      <button className="btn-primary2"
        style={{ marginLeft: '24px' }}
        onClick={() => {navigate('/');}}>
        홈으로 가기
      </button>
    </div>
  </div>
  )
}
