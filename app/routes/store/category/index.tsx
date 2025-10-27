import { useQuery } from "@tanstack/react-query";
import { getData } from "~/lib/axios";
import FadeSlider from "~/components/fadeSlider";
import { Link } from "react-router";
import { ModelList } from "./all";
import dummy from "../dummyModels.json";

export function meta({}) {
  return [
    { title: "스토어" },
    { name: "description", content: "Store" },
  ];
}

const MODELS = dummy.filter(d=>d.category==='new')

export default function Home() {
  const {data, isLoading} = useQuery({
    queryKey: ['models'],
    queryFn:()=>getData('/api/rooms')
  })
  console.log(data)

  if(isLoading) return <main className="bg-black text-white min-h-[calc(100vh-441px)] p-6 max-w-[1520px]">loading...</main>
  return(
    <main className="bg-black text-white min-h-[calc(100vh-441px)] p-6 max-w-[1520px]">
      <div className="flex justify-between items-center mb-4">
        <h1>주간 인기모델</h1>
        <Link to="/store/category/weekly" className="text-blue-500 border rounded-full border-blue-500 px-4 py-1 hover:bg-blue-500 hover:text-white transition">더보기</Link>
      </div>
      <FadeSlider id={3}/>
      <div className="flex justify-between items-center mb-4 mt-16">
        <h1>신규모델</h1>
        <Link to="/store/category/new" className="text-blue-500 border rounded-full border-blue-500 px-4 py-1 hover:bg-blue-500 hover:text-white transition">더보기</Link>
      </div>
      <ModelList models={MODELS.slice(0,5)} />
    </main>
  )
}