// app/routes/community/enroll-dev.tsx
import { useState } from "react"; // useState import
import { redirect, type LoaderFunctionArgs } from "react-router";
import { getUserFromRequest } from "~/lib/auth";
import { cn } from "~/lib/utils";

export function meta({}) {
  return [
    { title: "홈캠 개발자 등록" },
    { name: "description", content: "HomeCam Community" },
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {
  const loginInfo = getUserFromRequest(request)
  if(loginInfo?.id === '123123') return redirect('/community?msg=already-developer')
  return loginInfo
}

// 각 단계를 나타내는 컴포넌트들을 정의합니다.
// 이 부분은 이미지 내용을 바탕으로 대략적으로 구현한 것이므로,
// 실제 구현에서는 더 상세한 UI와 로직을 추가해야 합니다.

function TermsAndConditions({ onNext }: { onNext: () => void }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-white flex flex-col items-center pt-20 pb-10">
      <div className="max-w-3xl w-full bg-neutral-900 rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">개발자 계약 동의</h2>
        <div className="bg-black border border-blue-600 rounded-md h-96 flex items-center justify-center mb-6">
          <p className="text-xl font-semibold">이용약관 동의 내용</p>
        </div>
        <div className="flex items-center mb-8">
          <label className="cursor-pointer">
            <input
              type="checkbox"
              id="agreement"
              className="form-checkbox h-5 w-5 text-blue-600 rounded mr-2 bg-neutral-700 border-neutral-600 focus:ring-blue-500"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
            />
            <div className={cn("h-5 w-5 text-blue-600 rounded mr-2 border border-blue-600 focus:ring-blue-500"
            ,agreed&& "bg-neutral-50"
            )}>
              {agreed&&
              <svg className="h-full w-full" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.54998 18L3.84998 12.3L5.27498 10.875L9.54998 15.15L18.725 5.97498L20.15 7.39998L9.54998 18Z" fill="var(--color-blue-700)"/>
              </svg>              
              }
            </div>
          </label>
          
          <label htmlFor="agreement" className="text-sm cursor-pointer">
            이 상자를 체크함으로써 나는 위의 계약을 읽었고 이에 동의함을 확인합니다.
          </label>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onNext}
            disabled={!agreed}
            className={`px-6 py-2 rounded-md font-semibold transition ${
              agreed
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            제출
          </button>
        </div>
      </div>
    </div>
  );
}

function DeveloperInformation({ onNext }: { onNext: () => void }) {
  // 실제 폼 상태 관리 및 유효성 검사 로직 추가 필요
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const canProceed = name && lastName && phone && address && city && state && zipCode;

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-white flex flex-col items-center pt-20 pb-10">
      <div className="max-w-3xl w-full bg-neutral-900 rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">HOME DEMELOPER 정보 입력</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">이름</label>
            <input type="text" id="name" className="mt-1 block w-full bg-black border border-blue-600 rounded-md shadow-sm p-2 text-white" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">성</label>
            <input type="text" id="lastName" className="mt-1 block w-full bg-black border border-blue-600 rounded-md shadow-sm p-2 text-white" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">전화번호</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-blue-600 bg-black text-white sm:text-sm">+82</span>
              <input type="text" id="phone" className="flex-1 block w-full rounded-none rounded-r-md bg-black border border-blue-600 p-2 text-white" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-300">국가</label>
            <select id="country" className="mt-1 block w-full bg-black border border-blue-600 rounded-md shadow-sm p-2 text-white">
              <option>South Korea</option>
            </select>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-300">주소</label>
            <input type="text" id="address" className="mt-1 block w-full bg-black border border-blue-600 rounded-md shadow-sm p-2 text-white" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div>
            <label htmlFor="detailAddress" className="block text-sm font-medium text-gray-300">선택사항</label>
            <input type="text" id="detailAddress" placeholder="아파트, 동, 호 등" className="mt-1 block w-full bg-black border border-blue-600 rounded-md shadow-sm p-2 text-white" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-300">시/군/구</label>
            <input type="text" id="city" className="mt-1 block w-full bg-black border border-blue-600 rounded-md shadow-sm p-2 text-white" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-300">주/도</label>
            <select id="state" className="mt-1 block w-full bg-black border border-blue-600 rounded-md shadow-sm p-2 text-white" value={state} onChange={(e) => setState(e.target.value)}>
              <option value="">-</option> {/* Placeholder */}
              {/* Add actual Korean provinces/states here */}
              <option value="Seoul">서울특별시</option>
              <option value="Gyeonggi">경기도</option>
              {/* ... more options */}
            </select>
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-300">우편번호</label>
            <input type="text" id="zipCode" className="mt-1 block w-full bg-black border border-blue-600 rounded-md shadow-sm p-2 text-white" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <button
            onClick={onNext}
            disabled={!canProceed}
            className={`px-6 py-2 rounded-md font-semibold transition ${
              canProceed
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

function LegalTypeSelection({ onNext }: { onNext: () => void }) {
  const [selectedType, setSelectedType] = useState('');

  const canProceed = selectedType !== '';

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-white flex flex-col items-center pt-20 pb-10">
      <div className="max-w-xl w-full bg-neutral-900 rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">법인유형 선택</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="legalType" className="block text-sm font-medium text-gray-300">자격선택</label>
            <select
              id="legalType"
              className="mt-1 block w-full bg-black border border-blue-600 rounded-md shadow-sm p-2 text-white"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">-</option>
              <option value="individual">개인 사업자</option>
              <option value="corporate">법인 사업자</option>
              {/* 기타 옵션 추가 */}
            </select>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            HOME STORE 제품 페이지에 회사명을 기재하려면 해당 지역에서 법인으로 인정을 받아야 합니다. 해당 지역 내에서 법인으로 인정되지 않은 개인 사업자 및 1인 기업은 HOMERIA에서 기술을 배포하도록 허가한 경우 개인의 경력 이름 아래에 다운로드할 수도 있도록 등록 및 기재됩니다.
          </p>
        </div>
        <div className="flex justify-end mt-8">
          <button
            onClick={onNext}
            disabled={!canProceed}
            className={`px-6 py-2 rounded-md font-semibold transition ${
              canProceed
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

// 메인 컴포넌트
export default function EnrollDev() { // Home 대신 의미있는 이름으로 변경 (선택 사항)
  const [process, setProcess] = useState(0); // process 상태와 setProcess 함수

  const handleNext = () => {
    setProcess(prevProcess => prevProcess + 1);
  };

  // 마지막 단계 이후의 로직 (예: 등록 완료 페이지로 이동 또는 API 호출)
  const handleFinish = () => {
    alert('개발자 등록이 완료되었습니다!');
    // 실제로는 여기에 등록 데이터를 서버로 전송하는 로직 등을 추가합니다.
    // window.location.href = '/community'; // 예시: 커뮤니티 페이지로 이동
  };

  return (
    <> {/* Fragment로 감싸줍니다 */}
      {process === 0 && <TermsAndConditions onNext={handleNext} />}
      {process === 1 && <DeveloperInformation onNext={handleNext} />}
      {process === 2 && <LegalTypeSelection onNext={handleFinish} />} {/* 마지막 단계는 finish 핸들러 */}
    </>
  );
}