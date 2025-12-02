
import { useEffect, useState } from "react";
import { Form, Link, useActionData } from "react-router";
import { loginAction } from "~/actions/login";
import { startAuthentication } from "@simplewebauthn/browser";

export function meta({}) {
  return [
    { title: "홈캠" },
    { name: "description", content: "HomeCam Login" },
  ];
}

// 패스키 로그인
const loginPasskey = async (userId:string) => {
  const resp = await fetch("/api/webauthn/login/options",{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  }).then(r=>r.json());

  if(!resp.ok) return console.log(resp.message)

  console.log(`optionsJSON :\n${JSON.stringify(resp.options)}`)
  try {
    const authResp = await startAuthentication({ optionsJSON: resp.options });
  
    const result = await fetch("/api/webauthn/login/verify", {
      method: "POST",
      body: JSON.stringify({
        userId,
        assertionResponse: authResp,
      }),
      headers: { "Content-Type": "application/json" },
    }).then(r => r.json());
    console.log(result)
    if(!result.ok) throw new Error(result.message)
    if (result.ok) {
      alert("로그인 성공!");
    }
  } catch (error) {
    console.log(error)
    alert(error)
  }
};

export const action = loginAction

export default function MobileLogin() {
  const actionData = useActionData()
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  useEffect(()=>{
    loginPasskey("test")
  },[])

  return (
    <div
      className="relative flex flex-col items-center justify-end h-screen bg-cover bg-center text-white p-6"
      style={{ background: 'center / 100% 100% url("/m_login_bg.png")' }} // Assuming you have a background image at this path
    >
      {/* Background Overlay */}
      {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}

      {/* Header Content */}
      <div className="relative z-10 text-center mb-auto pt-20">
        <h1 className="text-5xl font-bold mb-2">Home</h1>
        <p className="text-xl">Security everyday</p>
      </div>

<div className="fixed w-full bottom-0 px-6">
      {/* Login Form */}
      <Form method="post" className="relative z-10 w-full max-w-sm mb-12">
        {/* Email Input */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {/* Email Icon */}
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <input
            name="id" type="text" placeholder="이메일"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[rgba(0,0,0,0.4)] placeholder-white text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {/* Pw Icon */}

          </div>
          <input
            name="password" type="password" autoComplete="password" placeholder="비밀번호"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[rgba(0,0,0,0.4)] placeholder-white text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-50"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
          />
        </div>
        {actionData?.message && <p className="text-red-500">{actionData.message}</p>}
        {/* Login Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center py-3 rounded-xl bg-[rgba(0,0,0,0.4)]  text-white text-lg font-semibold hover:bg-opacity-40 transition duration-300"
        >
          로그인
          {/* Arrow Icon */}
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </button>
      </Form>

      {/* Navigation for Sign-up/Other */}
      <div className="relative z-10 mb-8 text-center">
        <Link to="/m/sign-up" className="text-white text-opacity-80 hover:underline">
          Don't have an account? Sign Up
        </Link>
      </div>

      <button className="bg-amber-800 rounded-xl py-2 px-4 text-white mr-12" onClick={()=>loginPasskey("test")}>패스키 로그인</button>
      <Link className="text-blue-600 text-opacity-80 underline" to={"/m/test-Passkey"}>패스키 등록</Link>
</div>
    </div>
  );
}