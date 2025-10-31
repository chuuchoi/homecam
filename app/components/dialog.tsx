// app/components/dialog.tsx
import { useEffect, useState } from "react";
import { useIsMobile } from "~/hooks/commons";
import { useAppStore } from "~/store/useAppStore";

export function Confirm(){
  const isMobile = useIsMobile()
  const confirmData = useAppStore((state) => state.confirm);

  useEffect(()=>{
    if(!confirmData){
      document.body.style.overflow = "";
    }else{
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  },[confirmData])

  if(!confirmData) return null //확인창 없으면 렌더링 안 함

  if(confirmData.style == 0){ //스타일 variations
    return(
      <div className="fovrlay conf-bg-anim" style={{zIndex:'10'}}>
      <div className={isMobile?"confirm-box mob":"confirm-box"} style={{paddingTop:isMobile?'':'30px'}}>
        <div className={isMobile?"conftxt mob":"conftxt"} style={{marginTop:isMobile?'':'30px'}}>
          <pre className={isMobile?'conftxtmob':''}>{confirmData.message}</pre>
        </div>
        <div style={{display:'flex', gap:'20px', justifyContent:'end', position:'relative', right:isMobile?'-16px':'-30px'}}>
          <button className="cancelbtn" onClick={confirmData.onCancel}>취소</button>
          <button className="btn-primary1" style={{width:'70px', height:'40px', userSelect:'none'}}
            onClick={confirmData.onConfirm}>확인</button>
        </div>
      </div>
    </div>
    )
  }
  if(confirmData.style === 1){ //확인버튼만 있는경우
    return(
      <div className="fovrlay conf-bg-anim" style={{zIndex:'10'}}>
      <div className={isMobile?"confirm-box mob":"confirm-box"} style={{paddingTop:isMobile?'':'30px'}}>
        <div className={isMobile?"conftxt mob":"conftxt"} style={{marginTop:isMobile?'':'30px'}}>
          <pre className={isMobile?'conftxtmob':''}>{confirmData.message}</pre>
        </div>
        <div style={{display:'flex', gap:'20px', justifyContent:'end', position:'relative', right:isMobile?'-16px':'-30px'}}>
          {/* <button className="cancelbtn" onClick={confirmData.onCancel}>취소</button> */}
          <button className="btn-primary1" style={{width:'70px', height:'40px', userSelect:'none'}}
            onClick={confirmData.onConfirm}>확인</button>
        </div>
      </div>
    </div>
    )
  }
  if(confirmData.style === 2){ //2. 이미 예약된 룸 
    return(
      <div className="fovrlay conf-bg-anim" style={{zIndex:'10'}}>
      <div className={isMobile?"confirm-box mob":"confirm-box"}
       style={{width:isMobile?'calc(100vw - 40px)':'360px', borderRadius:isMobile?'16px':'', padding:isMobile?'20px':'30px', border:'none',backgroundColor:'#333', position:'relative'}}>
        <div className={isMobile?"conftxt mob":"conftxt"}
         style={{marginBottom:'20px',gap:'20px', display:'flex', flexDirection:"column", alignItems:'center'}}>
<img src="/stop.png" alt="reservation failed" width={63}/>
          <pre className={isMobile?'conftxtmob':''}
          style={{margin:isMobile?'0':'', fontSize:'16px', color:'white' , textAlign:'center', fontWeight:'600'}}>
해당 룸은 이미 예약되었습니다.<br/>
<span style={{fontSize:'14px', fontWeight:'400'}}>다른 룸으로 이용바랍니다.</span>
          </pre>
        </div>
        <div style={{display:'flex', gap:'20px', justifyContent:'center', position:'relative'}}>
          <button className="btn-primary1"
           style={{width:'100%',userSelect:'none', fontSize:isMobile?'16px':'15px',
             padding:isMobile?'14px 16px 15px 15px':'8px 16px 9px 15px'}}
            onClick={confirmData.onConfirm}>닫기</button>
        </div>
      </div>
    </div>
    )
  }

  if(confirmData.style === 3){ //3. 세션 만료창
    return(
      <div className="fovrlay conf-bg-anim">
      <div className="confirm-box" style={{paddingTop:'30px'}}>
        {/* <ConfirmRejectIcon style={{display:'block', margin:'auto'}}/> */}
        <div className="conftxt" style={{marginTop:'30px'}}>
          세션이 만료되었습니다.&nbsp; 다시 로그인 해주세요.
        </div>
        <div style={{display:'flex', gap:'20px', justifyContent:'end', position:'relative', right:'-30px'}}>
          <button className="btn-primary1 rej" style={{width:'70px', height:'40px', userSelect:'none'}}
            onClick={confirmData.onConfirm}>확인</button>
        </div>
      </div>
    </div>
    )
  }

  if(confirmData.style === 4){ //4. 예약 취소
    return(
      <div className="fovrlay conf-bg-anim" style={{zIndex:'10'}}>
      <div className={isMobile?"confirm-box mob":"confirm-box"}
       style={{width:isMobile?'calc(100vw - 40px)':'360px', borderRadius:isMobile?'16px':'', padding:isMobile?'20px':'30px', border:'none',backgroundColor:'#333', position:'relative'}}>
        <div className={isMobile?"conftxt mob":"conftxt"}
         style={{marginBottom:'20px',gap:'20px', display:'flex', flexDirection:"column", alignItems:'center'}}>
<img src="/del.png" alt="reservation failed" width={63}/>
          <pre className={isMobile?'conftxtmob':''}
          style={{margin:isMobile?'0':'', fontSize:'16px', color:'white' , textAlign:'center', fontWeight:'600'}}>
정말 예약을 취소하시겠습니까?<br/>
<span style={{fontSize:'14px', fontWeight:'400'}}>이 작업은 되돌릴 수 없습니다.</span>
          </pre>
        </div>
        <div style={{display:'flex', gap:'20px', justifyContent:'center', position:'relative'}}>
          <button className="btn-primary1 black"
           style={{width:'100%',userSelect:'none', fontSize:isMobile?'16px':'15px',
             padding:isMobile?'14px 16px 15px 15px':'8px 16px 9px 15px'}}
            onClick={confirmData.onCancel}>예약유지</button>
          <button className="btn-primary1 red"
           style={{width:'100%',userSelect:'none', fontSize:isMobile?'16px':'15px',
             padding:isMobile?'14px 16px 15px 15px':'8px 16px 9px 15px'}}
            onClick={confirmData.onConfirm}>취소하기</button>
        </div>
      </div>
    </div>
    )
  }

  return (
    <div className="fovrlay conf-bg-anim">
      <div className="confirm-box"><div className="conftxt">NONESTYLE</div></div>
    </div>
  );
};

export function Alert(){
  const alertData = useAppStore((state) => state.alert);

  if(!alertData) return null //alert 창 없으면 렌더링 안 함

  return(
  <div className="process-card-toast">
    <div onClick={alertData.onClose}>
      <div>
      {/* <ToastCheckIcon /> */}
      <span>{alertData.message}</span>
      </div>
    </div>
  </div>
  )
}

