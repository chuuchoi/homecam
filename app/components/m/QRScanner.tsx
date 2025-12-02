// QRScanner.tsx
// import React, { useEffect } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";
import './qrscanner.css'

const QRScanner = ({ onResult }: { onResult: (text: string) => void }) => {
  // useEffect(() => {
  //   const scanner = new Html5QrcodeScanner(
  //     "qr-reader",
  //     {
  //       fps: 10,
  //       qrbox: { width: 250, height: 250 },
  //       showTorchButtonIfSupported: true,
  //       showZoomSliderIfSupported: true,
  //       rememberLastUsedCamera: true,
  //       // ✅ Scan File 버튼 비활성화
  //       // showScanButton: true,
  //       // showFilePicker: false,
  //     },
  //     false
  //   );

  //   scanner.render(
  //     (decodedText) => {
  //       onResult(decodedText);
  //       scanner.clear();
  //     },
  //     (error) => console.warn(error)
  //   );

  //   // ✅ 렌더 후 버튼 텍스트 변경
  //   const renameButtons = () => {
  //     const buttons = document.querySelectorAll("#qr-reader button");
  //     buttons.forEach((btn) => {
  //       if (btn.textContent?.includes("Request Camera Permissions")) {
  //         btn.textContent = "Select Cam"; // ← 변경 텍스트
  //       }
  //     });
  //   };

  //   // 약간의 지연 후 버튼 탐색
  //   const timer = setTimeout(renameButtons, 300);

  //   return () => {
  //     clearTimeout(timer);
  //     scanner.clear().catch(console.error);
  //   };
  // }, [onResult]);

  return <div id="qr-reader" className="w-full" />;
};

export default QRScanner;