// app/routes/support.tsx
export function meta({}) {
  return [
    { title: "고객지원" },
    { name: "description", content: "Support" },
  ];
}

export default function Home() {

  return(<>
    <div className="w-full bg-amber-50 h-91 relative">
      <img src="/캡처.png" alt="banner" className="w-full h-full object-cover object-left"/>
      <div className="absolute bottom-15 w-full flex justify-center px-24">
        <p className="max-w-[1260px] w-full text-white text-xl font-bold">
          <span className="font-extrabold text-6xl">HOME Customer Service</span><br/>
          새로운 소식과 개발자 등록을 통해 더 많은 기능을 만들어보세요
        </p>
      </div>
    </div>
    <main className="w-full bg-neutral-950 px-24 flex justify-center text-white min-h-[calc(100vh-441px)]">
      <div className="max-w-[1260px] w-full pt-4 pb-16">
        <h1>고객지원</h1>
      </div>
    </main>
  </>
  )
}
