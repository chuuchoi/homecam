// app/routes/developers/news.tsx

import { useMemo, useState } from "react";
import dummy from "./dummyNews.json";
import { SearchBar } from "../store/category/all";
import { Link } from "react-router";

export function meta({}) {
  return [
    { title: "소식" },
    { name: "description", content: "News" },
  ];
}

export default function Home() {

  const [search, setSearch] = useState('')

  const searched = useMemo(()=>{
    return dummy.filter(d=>d.title.includes(search))
  },[search])

  return(<>
    <main className="w-full bg-neutral-950 px-24 flex justify-center text-white min-h-[calc(100vh-53px)]">
      <div className="max-w-[1260px] w-full pt-4 pb-16">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">새로운 소식</h2>
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <DiscussionList list={searched} />
      </div>
    </main>
  </>
  )
}

type Discussion = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  answers: number;
  views: number;
};

type DiscussionCardProps = Partial<Discussion> & {
  href: string;
};

function DiscussionCard({
  title,
  description,
  startDate,
  answers,
  views,
  href,
}: DiscussionCardProps) {
  return (
    <Link
      to={href}
      className="bg-neutral-900 text-white rounded-xl p-4 flex items-start justify-between hover:bg-neutral-800 cursor-pointer transition"
    >
      {/* 왼쪽 영역 */}
      <div className="flex-1 pr-6">
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-sm text-gray-300 line-clamp-2 mb-2">{description}</p>
        <p className="text-xs text-gray-500">시작일 : {startDate}</p>
      </div>

      {/* 오른쪽 영역 */}
      <div className="flex flex-col items-end text-sm min-w-[60px]">
        <div className="flex flex-col items-center mb-2">
          <span className="text-gray-400">답변</span>
          <span className="font-semibold">{answers}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-400">조회수</span>
          <span className="font-semibold">{views}</span>
        </div>
      </div>
    </Link>
  );
}

function DiscussionList({list}:{list:Discussion[]}) {
  return (
    <div className="space-y-4 mt-4">
      {list.map((item, index) => (
        <DiscussionCard
          key={index}
          title={item.title}
          description={item.description}
          startDate={item.startDate}
          answers={item.answers}
          views={item.views}
          href={`/community/discussion/${item.id}`}
        />
      ))}
    </div>
  );
}
