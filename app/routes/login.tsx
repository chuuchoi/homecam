// app/routes/login.tsx
import { Form, Link, useActionData } from "react-router";
import type { Route } from "./+types/login";
import { loginAction } from "~/actions/login";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "홈캠 로그인" },
    { name: "description", content: "Home Cam Login" },
  ];
}

export const action = loginAction;

export default function Home() {
  const actionData = useActionData();
  const [isFindPW, setIsFindPW] = useState(false)

  return (
    <main className="bg-neutral-950 flex flex-col items-center justify-center p-24 text-white min-h-[calc(100vh-77px)]">
      {!isFindPW && <LoginForm actionData={actionData} setIsFindPW={setIsFindPW}/>}
      {isFindPW && <FindPW setIsFindPW={setIsFindPW}/>}
    </main>
  );
}

const LoginForm = ({actionData, setIsFindPW} : any)=>{
  return(
    <Form method="post" className="bg-neutral-900 p-8 rounded-lg flex flex-col gap-4">
    <h1>로그인</h1>
    <input className="inputS0"
     name="id" type="text" placeholder="이메일" />
    <input className="inputS0"
     name="password" type="password" autoComplete="password" placeholder="비밀번호"/>
    {actionData?.message && <p className="text-red-500">{actionData.message}</p>}
    <span className="cursor-pointer text-end text-neutral-300"
      onClick={()=>setIsFindPW(true)}>비밀번호를 잊으셨나요?</span>
    <button type="submit" className="cursor-pointer bg-blue-600 p-2 rounded-lg" >로그인</button>
    <div className="flex flex-col gap-2">

    <span className="cursor-default text-neutral-300 text-center">아직 계정이 없으신가요?</span>
    <Link to="/sign-up" className="text-blue-600 font-bold text-center">계정만들기 &gt;</Link>
    </div>
  </Form>
  )
}

const FindPW = ({setIsFindPW} : any)=>{
  return(
    <Form method="post" action="/find-pw" className="bg-neutral-900 p-8 rounded-lg flex flex-col gap-4">
      <h1 className="cursor-pointer"
      onClick={()=>setIsFindPW(false)}>&lt; 비밀번호 찾기</h1>
      <input className="inputS0"
        name="id" type="text" placeholder="이메일" />
      <button type="submit" className="cursor-pointer bg-blue-600 p-2 rounded-lg" >비밀번호 찾기</button>
    </Form>
  )
}