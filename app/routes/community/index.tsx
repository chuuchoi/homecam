import { useState } from "react";
import { Link } from "react-router";
import { DiscussionIcon, EnrollDevIcon } from "~/components/icons";

// app/routes/community.tsx
export function meta({}) {
  return [
    { title: "홈캠 커뮤니티" },
    { name: "description", content: "HomeCam Community" },
  ];
}

export default function Home() {
  
  return(<>
    <div className="w-full bg-amber-50 h-91 relative">
      <img src="/4.png" alt="banner" className="w-full h-full object-cover object-left"/>
      <div className="absolute bottom-15 w-full flex justify-center px-24">
        <p className="max-w-[1260px] w-full text-white text-xl font-bold">
          <span className="font-extrabold text-6xl">HOME Community</span><br/>
          새로운 소식과 개발자 등록을 통해 더 많은 기능을 만들어보세요
        </p>
      </div>
    </div>
    <main className="w-full bg-neutral-950 px-24 flex justify-center text-white min-h-[calc(100vh-441px)]">
      <div className="max-w-[1260px] w-full pt-4 pb-16">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">새로운 소식</h2>
          <button className="text-sm px-3 py-1 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition">
            더 보기
          </button>
        </div>
        <NewsCard />

        <Sections />

      </div>
    </main>
  </>
  )
}

function NewsCard() {
  return (

      <div className="bg-neutral-900 rounded-2xl flex items-stretch overflow-hidden">
        {/* 왼쪽 텍스트 */}
        <div className="flex-1 p-6 space-y-2">
          <h3 className="text-xl font-extrabold">
            2025년 06월 30일 업데이트 소식
          </h3>
          <p className="text-sm text-gray-400">게시일 : 2025년 06월 30일</p>
          <pre className="text-sm leading-relaxed text-gray-200">
            {`검색이 작동하는 방식에 대한 몇 가지 개선 사항을 알려드립니다.
이번 업데이트를 통해, 검색 시 이제 부분적으로 일치하는 문자열을 처리하여 검색 결과에 반영하고
인기도와 사용자 평가를 고려하여 가장 연관성이 높은 결과를 우선으로 정리합니다.`}
          </pre>
        </div>

        {/* 오른쪽 이미지 영역 */}
        <div className="w-48 bg-neutral-800 flex items-center justify-center">
          <span className="text-2xl font-bold">Update</span>
        </div>
      </div>
  );
}



type SectionCardProps = {
  icon: React.ReactNode;     // 아이콘 컴포넌트 (또는 <img /> 가능)
  title: string;             // 카드 제목
  description: string;       // 카드 설명
  buttonText: string;        // 버튼 내용
  href: string;
};

function SectionCard({
  icon,
  title,
  description,
  buttonText,
  href,
}: SectionCardProps) {
  return (
    <div className="bg-neutral-900 text-white rounded-2xl p-6 flex flex-col shadow-md w-full">
      {/* 아이콘 영역 */}
      <div className="flex justify-center items-center bg-black rounded-xl h-40 mb-4">
        {icon}
      </div>

      {/* 제목 */}
      <h3 className="text-lg font-bold mb-2">{title}</h3>

      {/* 설명 */}
      <p className="text-sm text-gray-300 flex-1">{description}</p>

      {/* 버튼 */}
      <Link
        to={href}
        className="text-center w-36 self-end text-blue-500 border rounded-full border-blue-500 px-4 py-2 hover:bg-blue-500 hover:text-white transition"
      >
        {buttonText}
      </Link>
    </div>
  );
}

function Sections() {
  return (
    <div className="flex gap-6 mt-16">
      <SectionCard
        icon={<DiscussionIcon size={120} />}
        title="토론"
        description="유저 및 개발자들이 서로 질문하고 협업하며 최신 개발 동향을 파악할 수 있는 공간인 HOME 토론에 오신 것을 환영합니다. 더 많은 지식과 영감을 얻어가세요."
        buttonText="토론 참여하기"
        href="/community/discussion"
      />

      <SectionCard
        icon={<EnrollDevIcon size={120} />}
        title="개발자 등록"
        description="HOME 개발자 등록, HOME 개발자의 첫걸음을 딛어보세요. 무료기능부터 유료기능까지 더 새롭고 다양한 기능을 만들어 보세요."
        buttonText="개발자 등록하기"
        href="/community/enroll-dev"
      />
    </div>
  );
}