// app/routes/developers/workspace.tsx
import React, { useState } from 'react';
import { Link } from 'react-router';

export function meta() {
  return [
    { title: "창작 공간" },
    { name: "description", content: "Workspace" },
  ];
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
  const [currentStep, setCurrentStep] = useState(0); // 0: My Models, 1: New Model Form, 2: Upload/Pricing
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
      {currentStep === 0 && (<>
        <div className="w-4/5 mb-4">
            <div className="flex justify-between">
              <h1>나의 모델</h1>
              <Link to={'/developers/workspace/upload-new'}
                onClick={handleNewModelClick}
                className="cursor-pointer border rounded-full border-blue-600 px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white transition"
              >
                신규 모델
              </Link>
            </div>
        </div>
        <div className="border border-blue-700 rounded-lg flex-1 w-4/5 min-h-96 flex justify-center items-center">
            <div className="text-gray-400 text-lg">
              {/* You can render a list of models here later */}
              {models.length > 0 ?
                <MyModelsList models={models} />
               : <p>현재 등록된 모델이 없습니다. 신규 모델을 생성해주세요.</p>
              }
            </div>
        </div>
      </>)}
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