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
} from "recharts"; // Recharts 컴포넌트 임포트

export function meta() {
  return [
    { title: "관리자 매출 현황" },
    { name: "description", content: "Admin sales dashboard" },
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

export default function AdminSales() {
  const { search } = useOutletContext<{ search: string }>();

  return (
    <div className="min-h-[calc(100vh-165px)] bg-[#F1F2F7] p-8">
      {/* search: {search} */}

      {/* 상단 섹션 (매출, 수익 정산 요청) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 매출 카드 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">매출</h2>
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <span>~ 2025.07.02</span>
              {/* 달력 아이콘 (필요시 Heroicons 등에서 가져와 사용) */}
              <button className="p-1 rounded hover:bg-gray-100">
                {/* <CalendarIcon className="h-4 w-4" /> */}
                📅
              </button>
            </div>
          </div>
          <div className="flex items-end mb-4">
            <h3 className="text-4xl font-bold text-gray-900">
              ₩ 400,000<span className="text-2xl font-normal">원</span>
            </h3>
            <div className="flex items-center ml-4 text-red-500 text-sm font-semibold">
              {/* <ChevronUpIcon className="h-4 w-4" /> */}
              ▲ 20%
            </div>
            <button className="ml-auto p-1 rounded hover:bg-gray-100 text-gray-500">
              {/* <DownloadIcon className="h-5 w-5" /> */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15H6V18H18V15H20V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z"
               fill="var(--color-blue-600)"/>
              </svg>
            </button>
          </div>
          {/* 매출 차트 */}
          <div className="h-32"> {/* 차트 높이 설정 */}
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                {/* 배경 그리드는 이미지에 없으므로 주석 처리 또는 제거 */}
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" tick={false} height={2} />
                <YAxis width={1} tick={false} />
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              수익 정산 요청(4건)
            </h2>
            <button className="text-gray-400 hover:text-gray-600">
              {/* <PlusIcon className="h-5 w-5" /> */}
              +
            </button>
          </div>
          <div>
            <PayoutRequestItem
              userImage="https://randomuser.me/api/portraits/men/1.jpg"
              email="jeongwoo.ahn@byanna.io"
            />
            <PayoutRequestItem
              userImage="https://randomuser.me/api/portraits/men/2.jpg"
              email="jeongwoo.ahn1@byanna.io"
            />
            <PayoutRequestItem
              userImage="https://randomuser.me/api/portraits/men/3.jpg"
              email="jeongwoo.ahn2@byanna.io"
            />
            <PayoutRequestItem
              userImage="https://randomuser.me/api/portraits/men/4.jpg"
              email="jeongwoo.ahn3@byanna.io"
            />
          </div>
        </div>
      </div>

      {/* 하단 섹션 (클라우드 구독 목록, 장치 구매 관리) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 클라우드 구독 목록 카드 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              클라우드 구독 목록
            </h2>
            <button className="text-gray-400 hover:text-gray-600">
              {/* <PlusIcon className="h-5 w-5" /> */}
              +
            </button>
          </div>
          <SubscriptionList />
        </div>

        {/* 장치 구매 관리 카드 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">장치 구매 관리</h2>
            <button className="text-gray-400 hover:text-gray-600">
              {/* <PlusIcon className="h-5 w-5" /> */}
              +
            </button>
          </div>
          <DevicePurchaseList />
        </div>
      </div>
    </div>
  );
}

// 수익 정산 요청 아이템 컴포넌트
function PayoutRequestItem({
  userImage,
  email,
}: {
  userImage: string;
  email: string;
}) {
  return (
    <div className="flex items-center py-2 border-b border-gray-100 last:border-b-0">
      <img
        src={userImage}
        alt="User"
        className="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0"
      />
      <p className="flex-1 text-sm text-gray-800 truncate">{email}</p>
      <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600 ml-2">
        정산
      </button>
    </div>
  );
}

// 클라우드 구독 목록 테이블 컴포넌트
function SubscriptionList() {
  const subscriptions = [
    {
      id: 1,
      account: "jeongwoo@byanna.io",
      item: "16GB",
      type: "월간",
      date: "2025.07.03",
    },
    {
      id: 2,
      account: "jeongwoo1@byanna.io",
      item: "16GB",
      type: "년간",
      date: "2025.07.03",
    },
    {
      id: 3,
      account: "jeongwoo2@byanna.io",
      item: "32GB",
      type: "월간",
      date: "2025.07.03",
    },
    {
      id: 4,
      account: "jeongwoo3@byanna.io",
      item: "128GB",
      type: "년간",
      date: "2025.07.03",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              계정
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              상품명
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              구분
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              구독일자
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {subscriptions.map((sub) => (
            <tr key={sub.id}>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                {sub.account}
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                {sub.item}
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                {sub.type}
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                {sub.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 장치 구매 목록 테이블 컴포넌트
function DevicePurchaseList() {
  const purchases = [
    { id: 1, account: "jeongwoo@byanna.io", item: "카메라 모델1", date: "2025.07.03" },
    { id: 2, account: "jeongwoo1@byanna.io", item: "카메라 모델2", date: "2025.07.03" },
    { id: 3, account: "jeongwoo2@byanna.io", item: "카메라 모델1", date: "2025.07.03" },
    { id: 4, account: "jeongwoo3@byanna.io", item: "카메라 모델3", date: "2025.07.03" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              계정
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              상품명
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              구매일자
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {purchases.map((purchase) => (
            <tr key={purchase.id}>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                {purchase.account}
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                {purchase.item}
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                {purchase.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}