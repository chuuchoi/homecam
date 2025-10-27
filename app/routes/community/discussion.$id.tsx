// app/routes/community/discussion.$id.tsx
import { Link, useParams } from "react-router";
import dummy from "./dummyDiscussions.json";

export function meta({}) {
  return [
    { title: "홈캠 커뮤니티 > 토론" },
    { name: "description", content: "HomeCam Community" },
  ];
}

export default function DiscussionDetail() {
  const { id } = useParams();
  const data = dummy.find((d) => d.id === Number(id));
  console.log(data)

  return (<>
    <Link to={'/community/discussion'} className="block w-full bg-amber-50 h-91 relative">
      <img src="/5.png" alt="banner" className="w-full h-full object-cover object-left"/>
      <div className="absolute bottom-15 w-full flex justify-center px-24">
        <p className="max-w-[1260px] w-full text-white text-xl font-bold">
          <span className="font-extrabold text-6xl">HOME Discussion</span><br/>
          다른 개발자들과 개발에 관해 이야기하고 소통하며 더 많은 영감을 얻으세요
        </p>
      </div>
    </Link>
    <main className="w-full bg-neutral-950 px-24 flex justify-center text-white min-h-[calc(100vh-441px)]">
      <div className="max-w-[1260px] w-full pt-4 pb-16">
        <h2 className="text-lg font-bold">{data?.title}</h2>
        <p>시작일{data?.startDate}</p>
        <p>{data?.description}</p>
        <p>답변수{data?.answers}</p>
        <p>조회수{data?.views}</p>
      </div>
    </main>
  </>
  );
}