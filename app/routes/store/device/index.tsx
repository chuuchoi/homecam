import type { Route } from "./+types";

export function meta({}) {
  return [
    { title: "스토어" },
    { name: "description", content: "Store > Device" },
  ];
}

export default function Home() {

  return(<>
    <div className="w-full bg-amber-50 h-91 relative">
      <img src="/3.png" alt="banner" className="w-full h-full object-cover object-left"/>
      <div className="absolute bottom-15 w-full flex justify-center px-24">
        <p className="max-w-[1260px] w-full text-white text-xl font-bold">
          <span className="font-extrabold text-6xl">HOME Cloud</span><br/>
          많은 영상들을 용량 부담없이 저장하고 관리하세요
        </p>
      </div>
    </div>
    <main className="w-full bg-neutral-950 px-24 flex justify-center text-white min-h-[calc(100vh-441px)]">
      <div className="max-w-[1260px] w-full pt-4 pb-16">
        <h1>장치</h1>
      </div>
    </main>
  </>
  )
}
