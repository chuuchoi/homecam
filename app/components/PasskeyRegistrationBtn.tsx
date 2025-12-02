import { startRegistration } from "@simplewebauthn/browser";

const registerPasskey = async (userId:string) => {
  const options = await fetch("/api/webauthn/register/options",{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: userId }),
  }).then(r=>r.json());
  
  if(!options.ok) return alert(options.message)

  try {
    const attResp = await startRegistration({optionsJSON:options.options});
    console.log(JSON.stringify(attResp))

    const result = await fetch("/api/webauthn/register/verify", {
      method: "POST",
      body: JSON.stringify({ userId: userId, attestationResponse:  attResp}),
      headers: { "Content-Type": "application/json" },
    }).then(r => r.json());
    
    if (result.ok) alert("패스키 등록 완료!");
    else alert(`패스키 등록 실패.\n${result.message}`);
    console.log(result)
  } catch (error) {
    alert(error)
  }

};

export default function PasskeyRegisterButton() {
  return (
      <button className="bg-amber-800 rounded-xl p-4 text-white"
        onClick={()=>registerPasskey('test')}
      >
        패스키 등록하기
      </button>
  );
}