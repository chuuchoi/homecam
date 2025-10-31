// routes/admin/developers.tsx
// import { Link } from "react-router";
import { useOutletContext } from "react-router";

export function meta() {
  return [
    { title: "관리자 대시보드 > 개발자 관리" },
    { name: "description", content: "Admin dashboard > developer management" },
  ];
}

// 심사요청 리스트 더미 데이터
const reviewRequests = [
  {
    id: 1,
    type: "신규",
    price: "₩ 7,000",
    modelName: "모델명1",
    requestDate: "2025-07-02",
    file: true,
    account: "jeongwoo.ahn@byanna.io",
    status: "승인",
  },
  {
    id: 2,
    type: "업데이트",
    price: "무료",
    modelName: "모델명2",
    requestDate: "2025-07-02",
    file: true,
    account: "jeongwoo.ahn@byanna.io",
    status: "재심사",
  },
];

// 개발자 목록 더미 데이터
const developers = [
  { id: 1, email: "jeongwoo.ahn@byanna.io", imageUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: 2, email: "jeongwoo.ahn1@byanna.io", imageUrl: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: 3, email: "jeongwoo.ahn2@byanna.io", imageUrl: "https://randomuser.me/api/portraits/men/3.jpg" },
  { id: 4, email: "jeongwoo.ahn3@byanna.io", imageUrl: "https://randomuser.me/api/portraits/men/4.jpg" },
  { id: 5, email: "jeongwoo.ahn4@byanna.io", imageUrl: "https://randomuser.me/api/portraits/men/5.jpg" },
  { id: 6, email: "jeongwoo.ahn5@byanna.io", imageUrl: "https://randomuser.me/api/portraits/men/6.jpg" },
  { id: 7, email: "jeongwoo.ahn6@byanna.io", imageUrl: "https://randomuser.me/api/portraits/men/7.jpg" },
  { id: 8, email: "jeongwoo.ahn7@byanna.io", imageUrl: "https://randomuser.me/api/portraits/men/8.jpg" },
  { id: 9, email: "jeongwoo.ahn8@byanna.io", imageUrl: "https://randomuser.me/api/portraits/men/9.jpg" },
  { id: 10, email: "jeongwoo.ahn9@byanna.io", imageUrl: "https://randomuser.me/api/portraits/men/10.jpg" },
];

export default function AdminDevelopers() {
  const { search } = useOutletContext<{ search: string }>();

  return (
    <div className="min-h-[calc(100vh-165px)] bg-[#F1F2F7] p-8">
      {/* search: {search} */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 심사요청 리스트 섹션 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              심사요청 리스트({reviewRequests.length}건)
            </h2>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>요청일자순</option>
                <option>최신순</option>
                <option>오래된순</option>
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>구분</option>
                <option>신규</option>
                <option>업데이트</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    구분
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    가격
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    모델명
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    요청일자
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    파일
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    계정
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    승인/재심사
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reviewRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                      {request.type}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                      {request.price}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                      {request.modelName}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                      {request.requestDate}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-blue-500">
                      {request.file ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="#3B82F6"/>
                        </svg>
                      ) : null}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                      {request.account}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm">
                      {request.status === "승인" ? (
                        <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600 mr-2">
                          승인
                        </button>
                      ) : (
                        <button className="bg-red-500 text-white text-xs px-3 py-1 rounded-full hover:bg-red-600">
                          재심사
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 개발자 목록 섹션 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              개발자 목록({developers.length}명)
            </h2>
            <button className="text-blue-500 hover:text-blue-600 p-1 rounded-full bg-blue-100 flex items-center justify-center w-6 h-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z" fill="#3B82F6"/>
              </svg>
            </button>
          </div>

          <div>
            {developers.map((developer) => (
              <div 
              // to={`/admin/developers/${developer.id}`} 
              key={developer.id} className="flex items-center py-2 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 -mx-2 px-2 rounded-md">
                <img
                  src={developer.imageUrl}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover mr-3 shrink-0 bg-gray-200"
                />
                <p className="flex-1 text-sm text-gray-800 truncate">
                  {developer.email}
                </p>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                  <path d="M9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L14.5858 12L9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071Z" fill="currentColor"/>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
