export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  try {
    const reg = await navigator.serviceWorker.register("/webpush-sw.js");
    console.log("SW registered", reg);

    // 알림 권한 요청
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Notification permission denied");
      return;
    }

  // 기존 구독 취소
  const existingSub = await reg.pushManager.getSubscription();
  if (existingSub) {
    console.log("Unsubscribing old subscription...");
    await existingSub.unsubscribe();
  }

    // 새로운 구독 생성 (VAPID public key 필요)
    const vapidPublicKey = "BDX86XqaKKLIAeNhiZTOqEU_07jp1ps3GSZp5cd_8OH1nTfPknCT03nWqJ1rQUQn0kp6LoxrMAKw-CP0RDGfH8I" // 생성해야 함
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    });

    console.log("Push subscription:", JSON.stringify(subscription));
    localStorage.setItem("push-subscription", JSON.stringify(subscription));

      // 백엔드로 subscription 전송 필요 (없다면 localStorage 저장)
      // 백엔드로 구독 전송
      //       await fetch("/api/save-subscription", {
      //         method: "POST",
      //         headers: { "Content-Type": "application/json" },
      //         body: JSON.stringify(subscription),
      //       });
      //       ⚠️ 위의 /api/save-subscription 엔드포인트는 나중에 만들거나,
      // 테스트 용으로는 localStorage.setItem("subscription", JSON.stringify(subscription)) 으로 대체 가능.
  } catch (err) {
    console.error("SW registration failed", err);
  }
}

// helper
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
