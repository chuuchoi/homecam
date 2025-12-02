// app/routes/m/sign-up.tsx
import { Form, useActionData, useNavigate, useNavigation } from "react-router";
import { BackIcon, CheckIcon, EyeOffMD, EyeOnMD } from "~/components/icons";
import { useState, useEffect } from "react"; // Import useEffect
import { registerAction } from "~/actions/register";

// Assuming these API endpoints and their responses based on your logic
// You would replace these with actual API calls to your backend
async function checkEmailApi(email: string): Promise<{ taken: boolean }> {
  const res = await fetch(`/api/check-email?email=${encodeURIComponent(email)}`);
  return res.json();
}

async function sendCodeApi(email: string): Promise<{ success: boolean; error?: string; detail?: string }> {
  const res = await fetch("/api/send-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to send code");
  }
  return { success: true };
}

async function verifyCodeApi(email: string, code: string): Promise<{ success: boolean; error?: string }> {
  const res = await fetch("/api/verify-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Verification failed");
  }
  return { success: true };
}

export const action = registerAction


export function meta({}) {
  return [
    { title: "홈캠 회원가입" },
    { name: "description", content: "Sign-up" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0); // 0: Country, 1: Email, 2: Verification, 3: Password

  // Form states
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  // Loading and Error states
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");


  // Restore step and email from sessionStorage on mount
  useEffect(() => {
    const savedS = sessionStorage.getItem("step");
    const savedE = sessionStorage.getItem("email");
    if (savedE) setEmail(savedE);
    if (savedS) {
      setStep(parseInt(savedS) as 1 | 2 | 3);
    }
    return () => {
      sessionStorage.removeItem("step");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("code");
    };
  }, []);

  // Save step to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("step", step.toString());
  }, [step]);


  const handleNext = async () => {
    if (step === 0) {
      setStep(1); // Move from country to email input
    } else if (step === 1) {
      // Handled by handleEmailSubmit below
    } else if (step === 2) {
      // Handled by handleCodeSubmit below
    } else if (step === 3) {
      // Handled by handlePasswordSubmit below
    }
  };

  const handleBack = () => {
    if (step === 0) {
      navigate('/m/'); // Go back to the previous page if on the first step
    } else {
      setStep((prevStep) => (prevStep - 1) as 0 | 1 | 2 | 3);
      // Clear errors when going back
      setEmailError("");
      setCodeError("");
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      return;
    }

    setIsCheckingEmail(true);
    try {
      const checkRes = await checkEmailApi(email);
      if (checkRes.taken) {
        setEmailError("이미 등록된 이메일입니다.");
      } else {
        setIsSendingCode(true);
        try {
          await sendCodeApi(email);
          sessionStorage.setItem("email", email); // Save email on success
          setStep(2); // Move to verification step
        } catch (sendError: any) {
          setEmailError(`인증 코드 전송 실패: ${sendError.message}`);
        } finally {
          setIsSendingCode(false);
        }
      }
    } catch (error) {
      setEmailError("이메일 확인 중 오류가 발생했습니다.");
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCodeError("");
    if (!code) {
      setCodeError("인증 코드를 입력해주세요.");
      return;
    }

    setIsVerifyingCode(true);
    try {
      await verifyCodeApi(email, code);
      sessionStorage.setItem("code", code); // Save code on success
      setStep(3); // Move to password creation step
    } catch (error: any) {
      setCodeError(`인증 코드가 일치하지 않습니다.`);
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const reSendCode = async () => {
    setIsSendingCode(true);
    setCodeError("");
    try {
      await sendCodeApi(email);
      alert("인증 코드가 이메일로 전송되었습니다.");
    } catch (sendError: any) {
      alert(`인증 코드 재전송 실패: ${sendError.message}`);
    } finally {
      setIsSendingCode(false);
    }
  };


  return (
    <div className="w-full bg-[#121212] text-white min-h-screen pt-6">
      <header className="w-full px-4 py-2.5 flex items-center gap-1 relative">
        <div className="aspect-square flex items-center justify-center absolute top-0 left-0 h-full" onClick={handleBack}>
          <BackIcon className="w-5 h-5" />
        </div>
        <div className="font-bold text-lg flex items-center justify-center w-full gap-1">
          {step === 0 && "국가선택"}
          {step === 1 && "이메일 입력"}
          {step === 2 && "인증 코드 입력"}
          {step === 3 && "계정생성"}
        </div>
      </header>
      <main className="px-6 py-4">
        {step === 0 && ( // Country selection
          <div className="relative w-full">
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
              <BackIcon className="rotate-270 scale-120" />
            </div>
            <select name="country" className="w-full appearance-none bg-black py-2 pl-4 pr-9 rounded-lg">
              <option>대한민국</option>
              <option>일본</option>
              <option>중국</option>
              <option>미국</option>
              <option>영국</option>
              <option>프랑스</option>
              <option>독일</option>
              <option>스위스</option>
            </select>

      <footer className="fixed bottom-0 left-0 w-full py-3 px-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xl font-bold p-2 w-full"
            onClick={handleNext}
          >
            다음
          </button>
      </footer>

          </div>
        )}

        {step === 1 && ( // Email input
          <form onSubmit={handleEmailSubmit} className="w-full">
            <p className="text-sm text-gray-400 mb-4">
              홈캠에서 사용할 이메일 주소를 입력해주세요.
            </p>
            <input
              type="email"
              placeholder="이메일 주소"
              className="w-full bg-black py-2 px-4 rounded-lg text-white placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isCheckingEmail || isSendingCode}
            />
            {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
            <footer className="fixed bottom-0 left-0 w-full py-3 px-6">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xl font-bold p-2 w-full mt-4"
                disabled={isCheckingEmail || isSendingCode}
              >
                {(isCheckingEmail || isSendingCode) ? "처리 중..." : "다음"}
              </button>
            </footer>
          </form>
        )}

        {step === 2 && ( // Email verification
          <form onSubmit={handleCodeSubmit} className="w-full">
            <p className="text-sm text-gray-400 mb-4">
              <span className="font-bold text-white">{email}</span> 인증을 위해<br/>
              보내드린 코드를 입력하세요.
            </p>
            <label htmlFor="code" className="block text-sm font-bold mb-1">
              코드입력
            </label>
            <input
              type="text"
              id="code"
              placeholder=""
              className="w-full bg-black py-2 px-4 rounded-lg text-white placeholder-gray-500"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              disabled={isVerifyingCode}
            />
            {codeError && <p className="text-red-500 text-sm mt-2">{codeError}</p>}
            <button
              type="button"
              onClick={reSendCode}
              className="text-blue-500 text-sm mt-2 block w-full text-center"
              disabled={isSendingCode}
            >
              {isSendingCode ? "재전송 중..." : "코드 재전송"}
            </button>

            <footer className="fixed bottom-0 left-0 w-full py-3 px-6">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xl font-bold p-2 w-full mt-4"
                disabled={isVerifyingCode}
              >
                {isVerifyingCode ? "확인 중..." : "다음"}
              </button>
            </footer>
          </form>
        )}

        {step === 3 && ( // Password creation
          <Step3 email={email}/>
        )}
      </main>
    </div>
  );
}


const Step3 = ({
  email
}: { 
 email: string;
}) => {
 const navigate = useNavigate()
 const actionData = useActionData<{ok:boolean, message: string }>();
 const navigation = useNavigation();
 const isRegistering = navigation.state === 'submitting';
 const [isPWHidden, setIsPWHidden] = useState(true);
 useEffect(()=>{
   if(actionData?.ok){
     setTimeout(() => {
       navigate('/m/')
     }, 1200);
   }
 },[actionData])
 return (
   <Form method="post" className="w-full">
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="code" value={sessionStorage.getItem("code")||""} />
      
      <label htmlFor="password" className="block text-sm font-bold mb-1">
        암호
      </label>
      <div className="relative mb-2">
        <input
          type={isPWHidden ? "password" : "text"}
          id="password"
          name="password"
          placeholder=""
          className="w-full bg-black py-2 px-4 pr-10 rounded-lg text-white placeholder-gray-500"
          required
          disabled={isRegistering}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          onClick={() => setIsPWHidden(!isPWHidden)}
        >
          {isPWHidden ? <EyeOffMD /> :<EyeOnMD />}
        </span>
      </div>

      <label htmlFor="passwordConfirm" className="block text-sm font-bold mb-1 mt-4">
        암호 확인
      </label>
      <div className="relative mb-4">
        <input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          placeholder=""
          className="w-full bg-black py-2 px-4 pr-10 rounded-lg text-white placeholder-gray-500"
          required
          disabled={isRegistering}
        />
      </div>
     {!actionData?.ok &&<p className="text-red-500">{actionData?.message||'회원가입 실패'}</p>}
     {actionData?.ok &&<div className="fovrlay">
       <div className="bg-neutral-100 px-10 py-8 text-neutral-800 text-xl font-bold rounded-xl">
         회원가입이 완료되었습니다. <br/>
         <span className="text-neutral-600 text-sm font-medium float-right">로그인 화면으로 이동합니다.</span>
       </div>
     </div>}


      <p className="text-lg font-bold mb-2">비밀번호 필수조건</p>
      <ul className="text-sm space-y-2">
        <li className="flex items-center gap-2">
          <CheckIcon />최소 8자리 이상
        </li>
        <li className="flex items-center gap-2">
          <CheckIcon />대문자와 소문자 포함
        </li>
        <li className="flex items-center gap-2">
          <CheckIcon />최소 하나의 숫자 포함
        </li>
        <li className="flex items-center gap-2">
          <CheckIcon />최소 하나의 기호(특수문자) 포함
        </li>
        <li className="flex items-center gap-2">
          <CheckIcon />이메일에 있는 글자 불가
        </li>
      </ul>

      <footer className="fixed bottom-0 left-0 w-full py-3 px-6">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xl font-bold p-2 w-full mt-4"
          disabled={isRegistering}
        >
          {isRegistering ? "등록 중..." : "완료"}
        </button>
      </footer>
   </Form>
 );
};
