// routes/admin/home.tsx
import { useOutletContext } from "react-router";
import CountryDownloadChart from "~/components/admin/CountryDownloadChart";
import { StarIcons5 } from "~/components/icons";
import { useLogout } from "~/hooks/commons";

export function meta() {
  return [
    { title: "관리자 대시보드" },
    { name: "description", content: "admin dashboard" },
  ];
}

export default function AdminHome() {
  const logout = useLogout()
  const {search} = useOutletContext<{search:string}>()

  return <div className="min-h-[calc(100vh-165px)] bg-[#F1F2F7] p-8">
      <h1 className="text-2xl font-bold mb-6">안녕하세요 홍길동 관리자님! 👋    search:{search}</h1>
      <p className="text-gray-600 mb-8">금일 스토어 현황을 알려드려요</p>

      {/* 상단 통계 카드 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard title="신규 가입자(유저)" value="100명" change="10%" isNegative={true} />
        <StatCard title="모델 다운로드" value="400회" change="10%" isNegative={true} />
        <StatCard title="심사요청" value="2건" change="10%" isNegative={true} />
        <StatCard title="수익요청" value="4건" change="10%" isNegative={true} />
        <StatCard title="매출" value="₩ 100,000원" change="10%" isNegative={true} />
      </div>

      {/* 하단 섹션 (차트, 인기 모델, 문의사항) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 국가별 다운로드 */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
          <CountryDownloadChart />
        </div>

        {/* 인기 감지 모델 */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
          <PopularModelList />
        </div>

        {/* 문의사항 */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
          <InquiryList />
        </div>
      </div>
    </div>
}

function StatCard({ title, value, change, isNegative }: any) {
  const changeColorClass = isNegative ? 'text-blue-500' : 'text-red-500';
  // const IconComponent = isNegative ? ChevronDownIcon : ChevronUpIcon;

  return (
    <div className="bg-white rounded-lg shadow p-5 flex flex-col justify-between h-40">
      <p className="text-sm text-gray-500 mb-2">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900 mb-auto">{value}</h3>
      <div className="flex items-center text-sm">
        {/* <IconComponent className={`w-4 h-4 ${changeColorClass}`} /> */}
        <span className={`ml-1 ${changeColorClass}`}>{change}</span>
      </div>
    </div>
  );
}

function InquiryItem({ userImage, text }: any) {
  return (
    <div className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
      <img
        src={userImage}
        alt="User"
        className="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0"
      />
      <p className="flex-1 text-sm text-gray-800 truncate">{text}</p>
      {/* <ChevronRightIcon className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" /> */}
    </div>
  );
}

function InquiryList() {
  const inquiries = [
    { id: 1, userImage: 'https://randomuser.me/api/portraits/women/1.jpg', text: '사용방법에 대해서 문의드립니다.' },
    { id: 2, userImage: 'https://randomuser.me/api/portraits/men/2.jpg', text: '개발자 등록 방법' },
    { id: 3, userImage: 'https://randomuser.me/api/portraits/men/3.jpg', text: '클라우드 구독 가격에 대해' },
    { id: 4, userImage: 'https://randomuser.me/api/portraits/women/4.jpg', text: '설치방법에 관해 문의드립니다.' },
    { id: 5, userImage: 'https://randomuser.me/api/portraits/men/5.jpg', text: '장치 별도 구매 가능한지?' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">문의사항</h2>
        <button className="text-gray-400 hover:text-gray-600">
          {/* <PlusIcon className="h-5 w-5" /> */}
        </button>
      </div>
      <div>
        {inquiries.map((inquiry) => (
          <InquiryItem
            key={inquiry.id}
            userImage={inquiry.userImage}
            text={inquiry.text}
          />
        ))}
      </div>
    </div>
  );
}

function PopularModelItem({ name, description, rating }: any) {
  return (
    <div className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold mr-3">
        로고
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800">{name}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <div className="flex items-center ml-2">
        
          <StarIcons5
            score={3.5} bgColor="#ccc"
          />
        
      </div>
    </div>
  );
}

function PopularModelList() {
  const models = [
    { id: 1, name: '이벤트 이름', description: '이벤트 간단 설명', rating: 5 },
    { id: 2, name: '이벤트 이름', description: '이벤트 간단 설명', rating: 4 },
    { id: 3, name: '이벤트 이름', description: '이벤트 간단 설명', rating: 5 },
    { id: 4, name: '이벤트 이름', description: '이벤트 간단 설명', rating: 3 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">인기 감지 모델</h2>
        <button className="text-gray-400 hover:text-gray-600">
          {/* <PlusIcon className="h-5 w-5" /> */}
          +
        </button>
      </div>
      <div>
        {models.map((model) => (
          <PopularModelItem
            key={model.id}
            name={model.name}
            description={model.description}
            rating={model.rating}
          />
        ))}
      </div>
    </div>
  );
}