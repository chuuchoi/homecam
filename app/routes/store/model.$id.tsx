// app/routes/store/model.$id.tsx
import { useParams } from "react-router";
import dummy from "./dummyModels.json";
import { useEffect } from "react";
import { LikeIcon, ShareIcon, StarIcons5 } from "~/components/icons";

export default function ModelDetail() {
  const { id } = useParams();
  const data = dummy.find((d) => d.id === Number(id));
  
  //새로고침시 fallback.png 안나오는 문제 ->onError 외에 useEffect로 강제로 체크
  useEffect(()=>{const imgs = document.querySelectorAll<HTMLImageElement>('img[alt^="model-fig"]'); imgs.forEach(img => {
    if (!img.complete || img.naturalWidth === 0) {img.src = "/fallback.png";}
  });},[])

  return (
    <main className="bg-black text-white min-h-[calc(100vh-441px)] p-6 pl-12 max-w-[1520px]">
      <h1 className="pl-4">{data?.name||'모델 이름'}</h1>
      <div className="relative flex items-start">
        <div className="p-4 w-full max-w-[1000px]">
          <video className="rounded-2xl m-auto w-full"
            src="/bgv1.mp4" controls
          />
          <div className="relative">
            <div className="py-4 px-1 flex gap-6 w-full overflow-auto">
              <img alt="model-fig-0" src="/qwe.png" className="flex-1" width={160} height={120} onError={(e)=>{ console.log(e);e.currentTarget.src='/fallback.png'; }}/>
              <img alt="model-fig-1" src="/qwe.png" className="flex-1" width={160} height={120} onError={(e)=>{ console.log(e);e.currentTarget.src='/fallback.png'; }}/>
              <img alt="model-fig-2" src="/qwe.png" className="flex-1" width={160} height={120} onError={(e)=>{ console.log(e);e.currentTarget.src='/fallback.png'; }}/>
              <img alt="model-fig-3" src="/qwe.png" className="flex-1" width={160} height={120} onError={(e)=>{ console.log(e);e.currentTarget.src='/fallback.png'; }}/>
            </div>
            <div className="absolute right-0 top-0 w-1 h-[calc(100%-15px)]" style={{background:'linear-gradient(to Right, transparent, black)'}}/>
            <div className="absolute left-0 top-0 w-1 h-[calc(100%-15px)]" style={{background:'linear-gradient(to Right, black, transparent)'}}/>
          </div>
          <div className="mt-8">
            <h3>상세설명</h3>
            {[1,2,3,4,5].map(d=><p>• 모델 상세 설명 부분{d}</p>)}
          </div>
          <div className="mt-8">
            <h3>평점 및 리뷰</h3>
            <div className="flex gap-2.5">
              <span>4점<span className="ml-0.5"/>/<span className="ml-0.5"/>5점</span>
              <StarIcons5 score={4} />
            </div>
          </div>

          <p>lorem ipsum</p><p>lorem ipsum</p><p>lorem ipsum</p><p>lorem ipsum</p><p>lorem ipsum</p><p>lorem ipsum</p><p>lorem ipsum</p><p>lorem ipsum</p><p>lorem ipsum</p><p>lorem ipsum</p><p>lorem ipsum</p><p>lorem ipsum</p><p>lorem ipsum</p><p>lorem ipsum</p>

        </div>
        <div className="sticky top-24 flex-1">
          <div className="bg-neutral-950 p-4 float-right min-w-92">
            <div className="w-50 h-50 bg-neutral-500 flex items-center justify-center">
              로고
            </div>
            <div>
              <p>개발자 : technologia@gmail.com</p>
              <p>출시일 : 2025.06.27</p>
              <p>다운로드 횟수 : 10k</p>
              <p>평점</p>
            </div>
            <div className="flex justify-between">
              <div className="flex">
                <ShareIcon />
                <span>공유</span>
              </div>
              <div className="flex">
                <LikeIcon />
                <span>위시리스트 추가</span>
              </div>
            </div>
            <div className="bg-blue-600 py-2 rounded-2xl flex items-center justify-center">구매 ₩1,000</div>
          </div>
        </div>
      </div>
    </main>
  );
}