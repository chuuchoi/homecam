// routes/admin/analytics.tsx
import { Link } from "react-router";
import { useOutletContext } from "react-router";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"; // Recharts 컴포넌트 임포트

export function meta() {
  return [
    { title: "관리자 > 통계" },
    { name: "description", content: "Admin dashboard analytics page" },
  ];
}

// 더미 매출 데이터 (이미지 패턴과 유사하게 구성)
const salesData = [
  { name: "1일", uv: 400 },
  { name: "2일", uv: 300 },
  { name: "3일", uv: 600 },
  { name: "4일", uv: 500 },
  { name: "5일", uv: 800 },
  { name: "6일", uv: 700 },
  { name: "7일", uv: 900 },
  { name: "8일", uv: 750 },
  { name: "9일", uv: 850 },
  { name: "10일", uv: 700 },
  { name: "11일", uv: 950 },
  { name: "12일", uv: 800 },
  { name: "13일", uv: 1000 },
  { name: "14일", uv: 900 },
];

export default function AdminAnalytics() {
  const { search } = useOutletContext<{ search: string }>();

  return (
    <div className="min-h-[calc(100vh-165px)] bg-[#F1F2F7] p-8">
      {/* search: {search} */}

      {/* 상단 섹션 (매출, 수익 정산 요청) */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2 text-gray-500 text-sm">
          {/* <DownloadIcon className="h-5 w-5" /> */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15H6V18H18V15H20V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z"
            fill="var(--color-blue-600)"/>
          </svg>
          <span>~ 2025.07.02</span>
          {/* 달력 아이콘 (필요시 Heroicons 등에서 가져와 사용) */}
          <button className="p-1 rounded hover:bg-gray-100">
            {/* <CalendarIcon className="h-4 w-4" /> */}
            📅
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 매출 카드 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-12">매출</h2>
          {/* 매출 차트 */}
          <div className="h-32"> {/* 차트 높이 설정 */}
            <ResponsiveContainer width="100%" height="100%" initialDimension={{width:320, height:200}}>
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                {/* 배경 그리드는 이미지에 없으므로 주석 처리 또는 제거 */}
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" tick={false} /> {/* X축 레이블 숨김 */}
                <YAxis width={1} tickLine={false} tick={false} /> {/* Y축 레이블 숨김 */}
                <Tooltip /> {/* 마우스 오버 시 데이터 표시 */}
                <Line
                  type="monotone"
                  dataKey="uv"
                  stroke="#3B82F6" // 파란색 라인 (Tailwind blue-500)
                  strokeWidth={2}
                  dot={false} // 데이터 포인트에 원형 점을 표시하지 않음
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 수익 정산 요청 카드 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-12">가입자 수</h2>
          {/* 가입자 수 차트 */}
          <div className="h-32"> {/* 차트 높이 설정 */}
            <ResponsiveContainer width="100%" height="100%" initialDimension={{width:320, height:200}}>
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                {/* 배경 그리드는 이미지에 없으므로 주석 처리 또는 제거 */}
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" tick={false} /> {/* X축 레이블 숨김 */}
                <YAxis width={1} tickLine={false} tick={false} /> {/* Y축 레이블 숨김 */}
                <Tooltip /> {/* 마우스 오버 시 데이터 표시 */}
                <Line
                  type="monotone"
                  dataKey="uv"
                  stroke="#3B82F6" // 파란색 라인 (Tailwind blue-500)
                  strokeWidth={2}
                  dot={false} // 데이터 포인트에 원형 점을 표시하지 않음
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 하단 섹션 (클라우드 구독 목록, 장치 구매 관리) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 클라우드 구독 목록 카드 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-12">모델 다운로드 수</h2>
          {/* 모델 다운로드 수 차트 */}
          <div className="h-32"> {/* 차트 높이 설정 */}
            <ResponsiveContainer width="100%" height="100%" initialDimension={{width:320, height:200}}>
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                {/* 배경 그리드는 이미지에 없으므로 주석 처리 또는 제거 */}
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" tick={false} /> {/* X축 레이블 숨김 */}
                <YAxis width={2} tickLine={false} tick={false} /> {/* Y축 레이블 숨김 */}
                <Tooltip /> {/* 마우스 오버 시 데이터 표시 */}
                <Line
                  type="monotone"
                  dataKey="uv"
                  stroke="#3B82F6" // 파란색 라인 (Tailwind blue-500)
                  strokeWidth={2}
                  dot={false} // 데이터 포인트에 원형 점을 표시하지 않음
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 장치 구매 관리 카드 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-12">국가별 다운로드 수</h2>
          {/* 국가별 다운로드 수 차트 */}
          <div className="h-32"> {/* 차트 높이 설정 */}
          <ResponsiveContainer width="100%" height="100%" initialDimension={{width:320, height:200}}>
            <BarChart
              data={dummyCountryData}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 10,
              }}
            >
              {/* 이미지에는 배경 그리드가 없으므로 주석 처리 */}
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" tick={false} />
              <YAxis width={2} tickLine={false} tick={false} />
              <Tooltip /> {/* 마우스 오버 시 데이터 표시 */}
              <Bar
                dataKey="downloads"
                fill="#6495ED" // 이미지와 유사한 파란색 계열
                barSize={40} // 막대 너비 조절
              />
            </BarChart>
          </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// 더미 데이터 (국가별 다운로드 수를 나타냄)
const dummyCountryData = [
  { name: '미국', downloads: 4000 },
  { name: '한국', downloads: 6000 },
  { name: '일본', downloads: 5000 },
  { name: '중국', downloads: 7000 },
  { name: '기타', downloads: 3000 },
];
