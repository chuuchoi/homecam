// app/routes/developers/workspace.tsx
import React, { useState } from 'react';
import { cn } from '~/lib/utils';

export function meta() {
  return [
    { title: "창작 공간" },
    { name: "description", content: "Workspace" },
  ];
}

// 1. NewModelReleaseForm Component
function NewModelReleaseForm({ onNext }: any) {
  const [modelName, setModelName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [category, setCategory] = useState('옵션'); // Default category

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // In a real app, you'd send this data to a backend
    console.log("New Model Form Data:", {
      modelName,
      shortDescription,
      detailedDescription,
      keywords,
      category,
    });
    onNext(); // Proceed to the next step
  };

  return (
    <div className="w-4/5 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">신규 모델 출시</h2>
      <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-neutral-900 rounded-2xl">
        <div>
          <label htmlFor="model-name" className="block text-sm font-medium text-gray-300">감지 모델 이름</label>
          <input
            type="text"
            id="model-name"
            className="mt-1 block w-full bg-neutral-950 border border-blue-700 rounded-md shadow-sm p-2 text-white focus:ring-blue-500 focus:border-blue-500"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="block text-sm font-medium text-gray-300">감지 모델 아이콘</label>
          <button type="button" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition">업로드</button>
        </div>

        <div className="flex items-center space-x-4">
          <label className="block text-sm font-medium text-gray-300">감지 모델 설명 스크린샷 및 영상</label>
          <button type="button" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition">업로드</button>
        </div>

        <div>
          <label htmlFor="short-description" className="block text-sm font-medium text-gray-300">간단 설명 텍스트</label>
          <input
            type="text"
            id="short-description"
            className="mt-1 block w-full bg-neutral-950 border border-blue-700 rounded-md shadow-sm p-2 text-white focus:ring-blue-500 focus:border-blue-500"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="detailed-description" className="block text-sm font-medium text-gray-300">상세 설명</label>
          <textarea
            id="detailed-description"
            rows={5}
            className="mt-1 block w-full bg-neutral-950 border border-blue-700 rounded-md shadow-sm p-2 text-white focus:ring-blue-500 focus:border-blue-500"
            value={detailedDescription}
            onChange={(e) => setDetailedDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-300">키워드</label>
          <input
            type="text"
            id="keywords"
            className="mt-1 block w-full bg-neutral-950 border border-blue-700 rounded-md shadow-sm p-2 text-white focus:ring-blue-500 focus:border-blue-500"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300">카테고리</label>
          <select
            id="category"
            className="mt-1 block w-full bg-neutral-950 border border-blue-700 rounded-md shadow-sm p-2 text-white focus:ring-blue-500 focus:border-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>옵션</option>
            <option>사람</option>
            <option>동물</option>
            <option>풍경</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition"
          >
            제출
          </button>
        </div>
      </form>
    </div>
  );
}

// 2. ModelUploadAndPricing Component
function ModelUploadAndPricing({ onComplete }: any) {
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState('');
  const [uploadedModels, setUploadedModels] = useState([
    { name: '테스트 감지', date: 'Jul 01, 2025 at 5:50 PM', version: '1.0' }
  ]); // Example data

  const handleUpload = () => {
    // Simulate an upload
    // const newModel = {
    //   name: `새 모델 ${uploadedModels.length + 1}`,
    //   date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    //   version: '1.0'
    // };
    // setUploadedModels([...uploadedModels, newModel]);
    alert("모델 업로드 완료!");
  };

  const handleDistribute = () => {
    // Logic for distributing the model with pricing
    console.log("Distribute Model:", { isPaid, price: isPaid ? price : 'Free', uploadedModels });
    // alert("모델이 성공적으로 배포되었습니다!");
    onComplete(); // Go back to the main workspace
  };

  return (
    <div className="w-4/5 p-8 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
      {/* Model Upload Section */}
      <div className="md:w-3/5 bg-neutral-900 border border-gray-700 rounded-lg p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">모델 업로드</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">이름</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">배포일자</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">버전</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {uploadedModels.map((model, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{model.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{model.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{model.version}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-auto flex justify-end pt-4">
          <button
            onClick={handleUpload}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition"
          >
            업로드
          </button>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="md:w-2/5 bg-neutral-900 border border-gray-700 rounded-lg p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">가격 책정</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <label className='cursor-pointer'>
              <input
                id="free-option"
                name="pricing-option"
                type="radio"
                checked={!isPaid}
                onChange={() => setIsPaid(false)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700"
              />
              <div className={cn("mr-3 h-5 w-5 text-blue-600 rounded border-1 border-blue-600 focus:ring-blue-500"
              ,!isPaid&& "bg-neutral-50"
              )}>
                {!isPaid&&
                  <svg className="h-full w-full" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.54998 18L3.84998 12.3L5.27498 10.875L9.54998 15.15L18.725 5.97498L20.15 7.39998L9.54998 18Z" fill="var(--color-blue-700)"/>
                  </svg>              
                }
              </div>
            </label>
            <label htmlFor="free-option" className="block cursor-pointer text-sm font-medium text-white">
              무료
            </label>
          </div>
          <div className="flex items-center">
            <label className='cursor-pointer'>
              <input
                id="paid-option"
                name="pricing-option"
                type="radio"
                checked={isPaid}
                onChange={() => setIsPaid(true)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700"
              />
              <div className={cn("mr-3 h-5 w-5 text-blue-600 rounded border-1 border-blue-600 focus:ring-blue-500"
              ,isPaid&& "bg-neutral-50"
              )}>
                {isPaid&&
                  <svg className="h-full w-full" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.54998 18L3.84998 12.3L5.27498 10.875L9.54998 15.15L18.725 5.97498L20.15 7.39998L9.54998 18Z" fill="var(--color-blue-700)"/>
                  </svg>              
                }
              </div>
            </label>
            <label htmlFor="paid-option" className="block cursor-pointer text-sm font-medium text-white">
              유료
            </label>
          </div>

          {isPaid && (
            <div className="mt-2">
              <label htmlFor="price-input" className="sr-only">금액입력</label>
              <input
                type="number"
                id="price-input"
                className="mt-1 block w-full bg-neutral-800 border border-gray-700 rounded-md shadow-sm p-2 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="금액입력"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="0.01"
              />
              <p className="mt-2 text-sm text-gray-400">판매 수익의 30%는 HOME에서 가져갑니다.</p>
            </div>
          )}
        </div>
        <div className="mt-auto flex justify-end pt-4">
          <button
            onClick={handleDistribute}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition"
          >
            배포하기
          </button>
        </div>
      </div>
    </div>
  );
}


function UploadSuccess() {
  return (
    <div className="w-4/5 flex-1 flex flex-col items-center justify-center py-24">
      <div className="w-full h-120 flex-1 flex flex-col items-center justify-center p-8 space-y-6 bg-neutral-900 rounded-2xl">
        <svg className='w-32 h-32' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1.46094C17.8206 1.46094 22.5391 6.17944 22.5391 12C22.5391 17.8206 17.8206 22.5391 12 22.5391C6.17944 22.5391 1.46094 17.8206 1.46094 12C1.46094 6.17944 6.17944 1.46094 12 1.46094ZM9.80176 14.8242L5.9668 10.9893L4.68848 12.2676L9.80176 17.3818L19.3115 7.87207L18.0332 6.59375L9.80176 14.8242Z"
        fill="var(--color-blue-600)"/>
        </svg>
        <h2 className="text-4xl font-bold mb-6">업로드 성공</h2>
        <span className='text-gray-400'>심사가 이뤄질 예정입니다. 심사 완료 후 배포가 시작되면 메일로 알려드리겠습니다.</span>
      </div>
    </div>
  )
}

// 3. Home Component (main entry)
export default function Home() {
  const [currentStep, setCurrentStep] = useState(2); //  2: Upload/Pricing
  const [models, setModels] = useState([])

  const handleNewModelClick = () => {
    setCurrentStep(1);
  };

  const handleFormNext = () => {
    setCurrentStep(2);
  };

  const handleUploadComplete = () => {
    setCurrentStep(3);
    setTimeout(() => {
      setCurrentStep(0); // Go back to "My Models" after completion
    }, 2000);
  };

  return (
    <main className="bg-neutral-950 flex flex-col items-center p-24 pt-12 text-white min-h-[calc(100vh-53px)] min-w-2xl">

      {currentStep === 2 && <ModelUploadAndPricing onComplete={handleUploadComplete} />}
      {currentStep === 3 && <UploadSuccess />}
    </main>
  );
}

function MyModelsList({ models }: any) {
  return (
    <div className="flex flex-col space-y-4">
      {models.map((model : any, index: number) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="w-16 h-1  bg-blue-600 rounded-full"></div>
        </div>
      ))}
    </div>
  )
}