// app/routes/register.tsx
import { useEffect, useState } from "react";
import { Form, Link, useActionData, useNavigate, useSubmit } from "react-router";
import type { Route } from "./+types/register";
import { registerAction } from "~/actions/register";
import { useMutation } from "@tanstack/react-query";
import { postData } from "~/lib/axios";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "홈캠 회원가입" },
    { name: "description", content: "Home Cam Sign-up" },
  ];
}

export const action = registerAction;

export default function Register({}: Route.ComponentProps) {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0); // SSR과 동일하게 초기값은 0
  const [email, setEmail] = useState("");
  // 클라이언트에서 step 복원
  useEffect(() => {
    const savedS = sessionStorage.getItem("step");
    const savedE = sessionStorage.getItem("email");
    if (savedE) setEmail(savedE);
    if (savedS) {
      setStep(parseInt(savedS) as 1 | 2 | 3);
    }else{
      setStep(1)
    }
    return () => {sessionStorage.removeItem("step");sessionStorage.removeItem("email");sessionStorage.removeItem("code");}
  }, []);

  // 클라이언트에서 step 저장
  useEffect(() => {sessionStorage.setItem("step", step.toString());}, [step]);
  return (
    <main className="bg-neutral-950 flex flex-col items-center justify-center p-24 text-white min-h-[calc(100vh-77px)]">
      {step === 1 && (
        <Process1
          onNext={setStep}
          email={email}
          setEmail={setEmail}
        />
      )}
      {step === 2 && (
        <Process2
          onNext={setStep}
          email={email}
        />
      )}
      {step === 3 && <Process3 email={email} />}
    </main>
  );
}

const Process1 = ({
  onNext,
  email,
  setEmail,
}: {
  onNext: (step: 2) => void;
  email: string;
  setEmail: (email: string) => void;
}) => {
  const handleCheckEmail = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const res = await fetch(`/api/check-email?email=${encodeURIComponent(email)}`);
    const data = await res.json();
  
    if (data.taken) {
      alert("이미 등록된 이메일입니다.");
    } else {
      onNext(2);
      sessionStorage.setItem("email", email);
      
      const sendRes = await fetch("/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      if (!sendRes.ok){
        const result = await sendRes.json();
        alert(`인증 코드 전송 실패\n${result.error}\n${result.detail}`);
      }
    }
  };
  

  return (
    <form onSubmit={handleCheckEmail} className="bg-neutral-900 px-8 py-6 flex flex-col gap-4">
      <h1>계정 생성</h1>
      <input
        className="inputS0"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="이메일"
      />
      <button type="submit" className="btn-primary0 w-full">다음</button>
      <div className="flex flex-col gap-0">
        <span className="text-center text-neutral-300">이미 계정이 있으신가요?</span>
        <Link to='/login' className="text-blue-600 font-bold text-center">로그인 &gt;</Link>
      </div>
    </form>
  );
};

const Process2 = ({
  onNext,
  email,
}: {
  onNext: (step: 3) => void;
  email: string;
}) => {
  const {mutate: reSendCode, isPending} = useMutation({
    mutationFn:(body:any) => postData("/api/send-code", body),
    onSuccess: ()=>{
      alert("인증 코드가 이메일로 전송되었습니다.");
      sessionStorage.setItem("email", email);
    },
    onError: (err:any)=>{
      alert(`${err.response.data.error}\n${err.response.data.detail}`);
      console.log(err.response.data)
    }
  })
  const [code, setCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const res = await fetch("/api/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    if (res.ok) {
      onNext(3);
      sessionStorage.setItem("code", code)
    } else {
      alert("인증 코드가 일치하지 않습니다.");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-neutral-900 px-8 py-6 flex flex-col gap-4">
      <h1>코드 인증</h1>
      <div>
        <p className="text-neutral-300">{email} 인증을 위해<br/>보내드린 코드를 입력하세요</p>
        <input
        className="inputS0"
          type="text"
          placeholder="인증코드를 입력하세요"
          name="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <button type="submit" className="btn-primary0 w-full">다음</button>
      <div className="flex flex-col gap-0">
        <span className="text-center text-neutral-300">코드가 오지 않았나요?</span>
        <p className="cursor-pointer text-blue-600 font-bold text-center"
        onClick={()=>reSendCode({email})}>코드 재전송 &gt;</p>
      </div>
      {isPending && <div className="drovrlay cursor-wait" style={{background:'rgba(0,0,0,0.04)'}}/>}
    </form>
  );
};

const Process3 = ({
   email
}: { 
  email: string;
}) => {
  const navigate = useNavigate()
  const actionData = useActionData<{ message: string }>();
  useEffect(()=>{
    if(actionData?.message === '회원가입이 완료되었습니다.'){
      setTimeout(() => {
        navigate('/login')
      }, 1200);
    }
  },[actionData])
  return (
    <Form method="post" className="bg-neutral-900 px-8 py-6 flex flex-col gap-4">
      <h1>비밀번호 설정</h1>
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="code" value={sessionStorage.getItem("code")||""} />
      <input className="inputS0" name="password" type="password" required  placeholder="비밀번호"/>
      <input className="inputS0" name="passwordConfirm" type="password" required  placeholder="비밀번호 확인"/>
      <button type="submit" className="btn-primary0 w-full">가입 완료</button>
      {actionData?.message && actionData?.message !== '회원가입이 완료되었습니다.' &&<p className="text-red-500">{actionData.message}</p>}
      {actionData?.message && actionData?.message === '회원가입이 완료되었습니다.' &&<div className="fovrlay">
        <div className="bg-neutral-100 px-10 py-8 text-neutral-800 text-xl font-bold rounded-xl">
          회원가입이 완료되었습니다. <br/>
          <span className="text-neutral-600 text-sm font-medium float-right">로그인 화면으로 이동합니다.</span>
        </div>
      </div>}
    </Form>
  );
};
