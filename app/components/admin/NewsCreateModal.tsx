// app/components/admin/NewsCreateModal.tsx
import { useState } from "react";

interface NewsCreateModalProps {
  onClose: () => void;
}

export default function NewsCreateModal({ onClose }: NewsCreateModalProps) {
  // 현재 날짜를 YYYY.MM.DD 형식으로 가져오기
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 0부터 시작하므로 +1
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}.${month}.${day}`;

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(""); // 썸네일 파일 이름 또는 URL
  const [content, setContent] = useState("");

  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      // 실제 이미지 업로드 로직 (API 호출 등)은 여기에 구현
      // 여기서는 파일 이름만 표시하도록 합니다.
      setThumbnail(event.target.files[0].name);
      // 실제 구현에서는 파일 업로드 후 반환된 URL을 저장해야 합니다.
    }
  };

  const handleSave = () => {
    // 임시 저장 로직
    console.log("뉴스 임시 저장:", { title, thumbnail, content, date: formattedDate });
    // TODO: 서버에 데이터 전송 로직 구현
    onClose(); // 저장 후 모달 닫기
  };

  const handleSubmit = () => {
    // 게시 로직
    console.log("뉴스 게시:", { title, thumbnail, content, date: formattedDate });
    // TODO: 서버에 데이터 전송 및 게시 로직 구현
    onClose(); // 게시 후 모달 닫기
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.5)]">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl min-w-fit mx-auto my-8 overflow-hidden">
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center bg-blue-600 p-4 text-white">
          <h2 className="text-lg font-bold">뉴스 작성</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* 모달 본문 */}
        <div className="p-6 space-y-6">
          {/* 제목 */}
          <div>
            <label htmlFor="news-title" className="block text-sm font-medium text-gray-700 mb-2">
              제목
            </label>
            <input
              type="text"
              id="news-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 text-base"
              placeholder="제목을 입력하세요"
            />
          </div>

          {/* 게시일 / 썸네일 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 게시일 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                게시일
              </label>
              <div className="flex items-center border border-gray-300 rounded-md shadow-sm p-3 bg-gray-50 text-base text-gray-700">
                <svg
                  className="w-5 h-5 text-gray-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <span>{formattedDate}</span>
              </div>
            </div>

            {/* 썸네일 */}
            <div>
              <label htmlFor="news-thumbnail" className="block text-sm font-medium text-gray-700 mb-2">
                썸네일
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  id="news-thumbnail-display"
                  value={thumbnail}
                  readOnly
                  className="block flex-1 border-gray-300 rounded-md shadow-sm p-3 bg-gray-50 text-base text-gray-700"
                  placeholder="이미지 없음"
                />
                <label
                  htmlFor="news-thumbnail-upload"
                  className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md shadow-sm cursor-pointer transition-colors duration-200"
                >
                  이미지 업로드
                  <input
                    id="news-thumbnail-upload"
                    type="file"
                    className="sr-only" // 시각적으로 숨김
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* 내용 */}
          <div>
            <label htmlFor="news-content" className="block text-sm font-medium text-gray-700 mb-2">
              내용
            </label>
            <textarea
              id="news-content"
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 text-base resize-y"
              placeholder="내용을 입력하세요"
            ></textarea>
          </div>
        </div>

        {/* 모달 푸터 (버튼) */}
        <div className="flex justify-end p-4 border-t border-gray-200 bg-gray-50 space-x-3">
          <button
            onClick={handleSave}
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-2 px-4 rounded-md transition-colors duration-200"
          >
            임시저장
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
          >
            게시
          </button>
        </div>
      </div>
    </div>
  );
}