// app/hooks/commons.ts
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router";
import { useAppStore } from "~/store/useAppStore";

export const useLogout = () => {
  const navigate = useNavigate()
  return () => navigate("/api/logout");
}// 방식 변경. 기존:fetch로 Response받아오고 클라쪽에서 redirect -> 변경:서버쪽에서 리디렉션응답
// await fetch("/api/logout", { method: "POST" });
// navigate("/");

export const useIsMobile = () => {
  return useMediaQuery({ maxWidth: 767 });
}; //브라우저 control+wheel 확대시 모바일 화면 나오는 문제
// export const useIsMobile = () => {
//   const isClient = typeof window !== 'undefined';
//   const isMobile = isClient
//     ? /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
//     : false;
//   const mediaQuery = useMediaQuery({ maxWidth: 767 });
//   return isMobile && mediaQuery;
// };

export const useConfirm = () => {
  const setConfirm = useAppStore.getState().setConfirm;

  const requestConfirm = (message: string, style = 0) => {
    return new Promise<boolean>((resolve) => {
      const onConfirm = () => {
        setConfirm(null);
        resolve(true);
      };
  
      const onCancel = () => {
        setConfirm(null);
        resolve(false);
      };
  
      setConfirm({
        style,
        message,
        onConfirm,
        onCancel,
      });
    });
  };

  return requestConfirm;
};

export const useAlert = () => {
  const setAlertData = useAppStore.getState().setAlert;

  const showAlert = (message='저장 완료', duration=1600) => {
    let timeoutId:NodeJS.Timeout | null = null;
    
    const closeAlert = ()=>{
      setAlertData(null);
      if(timeoutId)clearTimeout(timeoutId)
    }
    setAlertData({message, onClose: closeAlert});

    if(duration){
      timeoutId = setTimeout(closeAlert, duration);
    }
  };

  return showAlert;
};
