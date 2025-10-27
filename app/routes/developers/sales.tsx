// app/routes/developers/sales.tsx
import { useState } from "react";

export function meta({}) {
  return [
    { title: "매출" },
    { name: "description", content: "Sales" },
  ];
}

export default function Home() {
  const [selectedModels, setSelectedModels] = useState<number[]>([]);

  const salesData = [
    { id: 1, modelName: "테스트 빌드1", salesAmount: 50000, commission: 15000 },
    { id: 2, modelName: "테스트 빌드2", salesAmount: 50000, commission: 15000 },
    { id: 3, modelName: "테스트 빌드3", salesAmount: 50000, commission: 15000 },
  ];

  const handleCheckboxChange = (id: number) => {
    setSelectedModels(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(item => item !== id)
        : [...prevSelected, id]
    );
  };

  const calculateTotalSettlementAmount = () => {
    return selectedModels.reduce((total, id) => {
      const model = salesData.find(d => d.id === id);
      return total + (model ? (model.salesAmount - model.commission) : 0);
    }, 0);
  };

  const totalSettlementAmount = calculateTotalSettlementAmount();

  return (
    <main className="w-full bg-neutral-950 px-24 flex justify-center text-white min-h-[calc(100vh-53px)]">
      <div className="max-w-[1260px] w-full pt-4 pb-16">
        <div className="flex justify-end mb-8">
          <div className="flex items-center bg-neutral-800 rounded-lg px-4 py-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>~ 2025.07.02</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* 다운로드 수 카드 */}
          <div className="bg-neutral-900 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">다운로드 수</h2>
            <div className="flex items-center mb-2">
              <span className="text-3xl font-bold mr-2">100</span>
              <span className="text-green-500 flex items-center text-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                10%
              </span>
            </div>
            <div className="h-20 bg-gray-800 rounded-md">
              {/* 그래프는 실제 구현 시 라이브러리 (Recharts, Chart.js 등) 사용 */}
              <img src="https://via.placeholder.com/300x80/1a202c/ffffff?text=Graph" alt="다운로드 수 그래프" className="w-full h-full object-cover rounded-md"/>
            </div>
          </div>

          {/* 수익금 카드 */}
          <div className="bg-neutral-900 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">수익금</h2>
            <div className="flex items-center mb-2">
              <span className="text-3xl font-bold mr-2">₩ 14,000</span>
              <span className="text-green-500 flex items-center text-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                10%
              </span>
            </div>
            <div className="h-20 bg-gray-800 rounded-md">
              {/* 그래프는 실제 구현 시 라이브러리 (Recharts, Chart.js 등) 사용 */}
              <img src="https://via.placeholder.com/300x80/1a202c/ffffff?text=Graph" alt="수익금 그래프" className="w-full h-full object-cover rounded-md"/>
            </div>
          </div>

          {/* 수익금 정산 테이블 (3열에 위치) */}
          <div className="bg-neutral-900 p-6 rounded-xl shadow-lg col-span-2 lg:col-span-1">
            <h2 className="text-xl font-bold mb-4 flex items-center justify-between">
              수익금 정산
              <span className="text-sm text-gray-500 font-normal">
                *최초 1회는 2개월 그 후 1개월마다 정산 신청이 가능
              </span>
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-neutral-800">
                    <th scope="col" className="px-3 py-2"></th>
                    <th scope="col" className="px-3 py-2">모델명</th>
                    <th scope="col" className="px-3 py-2">수익금</th>
                    <th scope="col" className="px-3 py-2">수수료</th>
                    <th scope="col" className="px-3 py-2">최종 정산금액</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((data) => (
                    <tr key={data.id} className="border-b border-neutral-800 last:border-b-0">
                      <td className="px-3 py-2">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-blue-600 bg-gray-900 border-gray-700 rounded focus:ring-blue-500"
                          checked={selectedModels.includes(data.id)}
                          onChange={() => handleCheckboxChange(data.id)}
                        />
                      </td>
                      <td className="px-3 py-2">{data.modelName}</td>
                      <td className="px-3 py-2">₩ {data.salesAmount.toLocaleString()}</td>
                      <td className="px-3 py-2">₩ {data.commission.toLocaleString()}</td>
                      <td className="px-3 py-2">
                        ₩ {(data.salesAmount - data.commission).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-neutral-800">
              <span className="text-lg font-bold">총 정산 금액 = <span className="text-blue-500">₩ {totalSettlementAmount.toLocaleString()}</span></span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                정산요청
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 배포 중 모델 카드 */}
          <div className="bg-neutral-900 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">배포 중 모델</h2>
            <p className="text-5xl font-bold text-center py-8">3<span className="text-3xl">건</span></p>
          </div>

          {/* 심사 중 모델 카드 */}
          <div className="bg-neutral-900 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">심사 중 모델</h2>
            <p className="text-5xl font-bold text-center py-8">1<span className="text-3xl">건</span></p>
          </div>
        </div>
      </div>
    </main>
  );
}
