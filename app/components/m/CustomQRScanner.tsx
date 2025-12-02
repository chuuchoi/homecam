import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

export default function CustomQRScanner({
  onComplete
}
  :{
  onComplete?: (result: string) => void,
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [result, setResult] = useState("");
  const [active, setActive] = useState(true);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

  async function loadDevices() {
    try {
      // ✅ 1. 권한 먼저 요청
      await navigator.mediaDevices.getUserMedia({ video: true });
  
      // ✅ 2. 장치 목록 조회
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = allDevices.filter((d) => d.kind === "videoinput");
      console.log("카메라 목록", videoDevices);
      setDevices(videoDevices);
      if (videoDevices.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    } catch (err) {
      console.error("카메라 접근 거부 또는 오류:", err);
      alert("카메라 접근을 허용해야 QR 스캔이 가능합니다.");
    }
  }
  useEffect(() => {
    // ✅ 카메라 목록 불러오기
    loadDevices();
  }, []);

  useEffect(() => {
    if (!selectedDeviceId) return;

    let animationId: number;
    let stream: MediaStream | null = null;

    async function startScanner(deviceId: string) {
      // ✅ 기존 스트림 정리
      stopStream();

      stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: deviceId } },
      });

      if (!videoRef.current) return;
      videoRef.current.srcObject = stream;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });

      videoRef.current.onloadedmetadata = () => {
        videoRef.current?.play();

        let frameCount = 0;
        const tick = () => {
          if (!videoRef.current || !ctx) return;

          if (videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA) {
            animationId = requestAnimationFrame(tick);
            return;
          }

          frameCount++;
          if (frameCount % 10 === 0) {
            const width = videoRef.current.videoWidth;
            const height = videoRef.current.videoHeight;
            if (width === 0 || height === 0) {
              animationId = requestAnimationFrame(tick);
              return;
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(videoRef.current, 0, 0, width, height);
            const imgData = ctx.getImageData(0, 0, width, height);
            const code = jsQR(imgData.data, width, height);

            if (code) {
              if(onComplete) onComplete(code.data);
              setResult(code.data);
              setActive(false);
              stopStream();
              return;
            }
          }
          animationId = requestAnimationFrame(tick);
        };

        tick();
      };
    }

    const stopStream = () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
        stream = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      cancelAnimationFrame(animationId);
    };

    startScanner(selectedDeviceId);

    return () => stopStream();
  }, [selectedDeviceId]);

  return (<>
  
    {/* ✅ 카메라 선택 버튼 */}
    {devices.length > 0 && (
      <select
        className="fixed top-0 right-3 z-11 mt-2 border rounded px-3 py-1"
        value={selectedDeviceId || ""}
        onChange={(e) => {
          setActive(true);
          setResult("");
          setSelectedDeviceId(e.target.value);
        }}
      >
        {devices.map((dev, i) => (
          <option key={dev.deviceId} value={dev.deviceId}>
            {dev.label || `Camera ${i + 1}`}
          </option>
        ))}
      </select>
    )}

<div className="relative flex-none h-2/3 mt-13 bg-neutral-900 flex items-center justify-center overflow-hidden">

    <div className="flex flex-col items-center w-full h-full">
      {active && (
        <>
          <video
            ref={videoRef}
            style={{ width: "100%", height: "100%", borderRadius: 8 }}
            muted
            playsInline
          />
        </>
      )}

      {/* ✅ 스캔 완료 후 결과 */}
      {result && (
        <div className="mt-4 text-center">
          <p className="text-lg font-bold text-green-600">QR 코드 인식 성공!</p>
          <p className="font-mono mt-2 break-all">{result}</p>
          <button
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => {
              setResult("");
              setActive(true);
              // 다시 선택된 카메라로 스캔 재시작
              setSelectedDeviceId(selectedDeviceId);
            }}
          >
            다시 스캔하기
          </button>
        </div>
      )}
    </div>

    <div className="absolute inset-0 opacity-40 flex items-center justify-center pointer-events-none">
      <div className="relative w-64 h-64 border-4 border-white flex items-center justify-center">
        {/* Top-left corner */}
        <div className="absolute -top-1 -left-1 w-16 h-16 border-l-4 border-t-4 border-white"></div>
        {/* Top-right corner */}
        <div className="absolute -top-1 -right-1 w-16 h-16 border-r-4 border-t-4 border-white"></div>
        {/* Bottom-left corner */}
        <div className="absolute -bottom-1 -left-1 w-16 h-16 border-l-4 border-b-4 border-white"></div>
        {/* Bottom-right corner */}
        <div className="absolute -bottom-1 -right-1 w-16 h-16 border-r-4 border-b-4 border-white"></div>
      </div>
    </div>
</div>
  </>
  );
}
