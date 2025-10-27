// routes/admin/community.tsx
import { useState } from "react"; // useState import 추가
import { Link } from "react-router";
import NewsCreateModal from "~/components/admin/NewsCreateModal"; // 새로운 컴포넌트 import

export function meta() {
  return [
    { title: "관리자 커뮤니티 관리" },
    { name: "description", content: "Admin community management page" },
  ];
}

export default function AdminCommunity() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  const newsItems = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: "2025년 06월 30일 업데이트 소식",
    author: "2025-07-02",
    views: (i + 1) * 100 + (i === 0 ? 0 : Math.floor(Math.random() * 500)),
    comments: (i + 1) * 100 + (i === 0 ? 0 : Math.floor(Math.random() * 500)),
  }));

  return (
    <div className="min-h-[calc(100vh-165px)] bg-[#F1F2F7] p-8">
      <div className="bg-white rounded-lg shadow p-6">
        {/* 헤더 섹션 */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">뉴스</h1>
          <div className="flex items-center space-x-4">
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>최신순</option>
              <option>오래된순</option>
              <option>조회수순</option>
            </select>
            {/* 작성하기 버튼 클릭 시 모달 열기 */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
            >
              작성하기
            </button>
          </div>
        </div>

        {/* 게시글 목록 테이블 (이하 동일) */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3"
                >
                  제목
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  게시일자
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  조회수
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  댓글수
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  수정하기
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  삭제
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {newsItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.comments}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 py-1 px-3 rounded-md">
                      수정
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 py-1 px-3 rounded-md ml-2">
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 모달 컴포넌트 렌더링 */}
      {isModalOpen && <NewsCreateModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}