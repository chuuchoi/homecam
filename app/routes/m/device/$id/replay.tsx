// app/routes/m/device/$id.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate, Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import dummyDevices from "../../dummyDevices.json";
import AdaptiveTimeline from "~/components/m/device/$id/replay/AdaptiveTimeLine";
import moment from "moment";
import { getData } from "~/lib/axios";
import { useQuery } from "@tanstack/react-query";
import type { ReplayEvent } from "~/routes/api/device/$id/replay";

// 1. 아이콘 컴포넌트 확장 (푸터용 아이콘 추가)
const Icons = {
  Back: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>,
  Settings: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.43.72 1.076.72 1.66v2.16c0 .585-.225 1.23-.72 1.66m-8.91-1.44h.008v.008h-.008V12zm.008 2.25h-.008v.008h.008v-.008zm0-4.5h-.008v.008h.008v-.008z" /></svg>,
  Expand: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>,
  ChevronLeft: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>,
  ChevronRight: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>,
  Play: () => <svg width="32" height="32" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>,
  RewindEnd: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 5L20 19L11 12L20 5ZM8.19411 4L8.19411 20L3.32745 20L3.32744 4L8.19411 4Z" /></svg>,
  Rewind: () => <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M11 19V5l-9 7 9 7zm11 0V5l-9 7 9 7z" /></svg>,
  FastForward: () => <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M4 19V5l9 7-9 7zm11 0V5l9 7-9 7z" /></svg>,
  FowardEnd: () => <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M4 19V5L13 12L4 19ZM15.8059 20V4H20.6726V20H15.8059Z" /></svg>,
  Motion: () => <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.2-2L14 10.8c.7-.6 1.7-1.3 1.8-2.6h2V6.5h-5c-1.2 0-2.2.7-2.6 1.6l-2 4.2-1.6-.9.6-2.5H5.1l-1 4.7 5.7 1.3z" /></svg>,
  Person: () => <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z" stroke="currentColor" strokeWidth={1.5} fill="none" /></svg>,
  GenericEvent: () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>,
  // 푸터 아이콘
  Download: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 3v13.5m0 0L8.25 9.75M12 16.5l3.75-6.75" /></svg>,
  Share: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>,
  Calendar: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" /></svg>,
  Filter: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>,
};

export function meta({ }) {
  return [
    { title: "홈캠 재생" },
    { name: "description", content: "Device replay" },
  ];
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { id } = params;
  //url search params에서 date 가져오기
  const url = new URL(request.url);
  let date = url.searchParams.get("date") || "";

  //없으면 오늘 날짜
  if (!date) {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    date = `${year}-${month}-${day}`
  }
  // 해당 date의 replay 데이터 가져오기
  // Node (Vite SSR 환경)에서는 기본 fetch나 undici가 자체 서명된 인증서를 신뢰하지 않기 때문에 요청이 실패합니다
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
  // SSL 인증서는 무시하지만, 여전히 같은 프로세스 내 HTTPS loop에서는 UND_ERR_SOCKET이 발생할 수 있음
  // console.log('------', import.meta.env.VITE_API_BASE_URL)
  // let data;
  // try {
  // const res = await fetch(`https://localhost:5173/api/device/${id}/replay?date=${date}`)
  // data = await res.json()
  // const res = await fetch(`https://google.com`)
  // data = await res.text()
  // data = await getData(`https://google.com`);
  // } catch (error) {
  // console.log(error)
  // data = ''
  // }

  return {
    id, date,
    // data 
  };
}


export default function Device() {
  const { id, date } = useLoaderData<typeof loader>();
  const device = useMemo(() => dummyDevices.find((d) => d.id === id), [id]);

  const { data } = useQuery({
    queryKey: ["replay", id, date],
    queryFn: () => getData(`/api/device/${id}/replay?date=${date}`),
  });
  const BASE_TIME = useMemo(() => isNaN(new Date(data?.video?.startTime).getTime()) ? undefined : data?.video?.startTime, [data]); // 영상 시작 시간
  const eventTimes = useMemo(() => {
    let times: string[] = [];
    data?.events.forEach((e: ReplayEvent) => {
      times.push(e.startTime);
      times.push(e.endTime);
    });
    return times;
  }, [data]);

  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);

  const [showEvents, setShowEvents] = useState(false);
  const END_TIME = useMemo(() => {
    if (!BASE_TIME) return undefined;
    return moment(BASE_TIME).add(videoDuration, "seconds").toISOString()
  }, [BASE_TIME, videoDuration]);

  const handleVideoLoadedMetadata = () => {
    setVideoDuration(videoRef.current?.duration || 0);
  };
  const handleVideoTimeUpdate = () => {
    if (videoCurrentTime === videoRef.current?.currentTime) return;
    setVideoCurrentTime(videoRef.current?.currentTime || 0);
  };
  const handleAdaptiveTimelineTimeUpdate = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setVideoCurrentTime(time);
    }
  };
  const handleVideoPlay = () => {
    setVideoIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  const handleVideoPause = () => {
    setVideoIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  const handleVideoSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setVideoCurrentTime(time);
    }
  };
  const handleVideoFastForward = () => {
    let nextEventTime = eventTimes.find((t) => new Date(t).getTime() - new Date(BASE_TIME).getTime() > videoCurrentTime * 1000);
    if (nextEventTime) {
      let ms = new Date(nextEventTime).getTime() - new Date(BASE_TIME).getTime()
      handleVideoSeek(ms / 1000);
    } else {
      handleVideoSeek(videoDuration - 1);
    }
  };
  const handleVideoFastRewind = () => {
    let nextEventTimeIndex = eventTimes.findIndex((t) => new Date(t).getTime() - new Date(BASE_TIME).getTime() >= videoCurrentTime * 1000);
    if (nextEventTimeIndex > -1) {
      if (nextEventTimeIndex === 0) { handleVideoSeek(0); return; }
      let ms = new Date(eventTimes[nextEventTimeIndex - 1]).getTime() - new Date(BASE_TIME).getTime()
      handleVideoSeek(ms / 1000);
    } else {
      let ms = new Date(eventTimes[eventTimes.length - 1]).getTime() - new Date(BASE_TIME).getTime()
      handleVideoSeek(ms / 1000);
    }
  };

  const handleClickShare = () => {
    console.log('handleClickShare');
  }

  useEffect(() => {
    if (videoRef.current) {
      // onLoadedMetadata 무조건 실행
      videoRef.current.load();
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#121212] text-white overflow-hidden font-sans">
      {/* ✅ 헤더 */}
      <header className="flex items-center justify-between px-3 py-2 z-10 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="p-1 rounded-full active:bg-gray-800 transition-colors"
        >
          <Icons.Back />
        </button>
        <h1 className="text-lg font-bold">{device?.name || "거실"}</h1>
        <button className="p-1 rounded-full active:bg-gray-800 transition-colors">
          <Icons.Settings />
        </button>
      </header>

      {/* ✅ 메인 영역 */}
      <main className="flex flex-col flex-1 relative overflow-auto scrollbar-hide pb-20">

        {/* 🎥 비디오 스트림 영역 */}
        <div className="relative w-full aspect-video bg-black shrink-0">
          {/* 임시 이미지 */}
          {/* <img 
            src={device?.thumbnail || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"} 
            alt="CCTV" 
            className="w-full h-full object-cover opacity-90 aspect-video"
          /> */}
          {/* 임시 동영상 */}
          <video
            ref={videoRef}
            src={data?.video?.url}
            preload="auto"
            autoPlay={false}
            muted={false}
            loop={false}
            className="w-full h-full object-cover opacity-90 aspect-video"
            onLoadedMetadata={handleVideoLoadedMetadata}
            onTimeUpdate={handleVideoTimeUpdate}
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
          />
          {/* 전체화면 버튼 */}
          <div className="absolute bottom-4 right-4 text-white drop-shadow-md p-1 bg-black/20 rounded"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.requestFullscreen();
              }
            }}
          >
            <Icons.Expand />
          </div>
          {/* 디버그용 시간 표시 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/50 px-2 py-1 rounded text-sm">
              {moment.utc(videoCurrentTime * 1000).format("HH:mm:ss")}
            </div>
          </div>
        </div>

        {/* 🎛 컨트롤 패널 영역 */}
        <div className="flex flex-col flex-1 pb-6">

          {/* 탭 (재생 / 라이브) */}
          <div className="flex items-center justify-center gap-8 py-2">
            <button className="text-white font-bold px-4 py-1">재생</button>
            <div className="w-px h-4 bg-gray-600"></div>
            <Link to={`/m/device/${id}/live`} className="text-gray-500 font-medium px-4 py-1">라이브</Link>
          </div>

          {/* 날짜 선택기 */}
          <div className="flex items-center justify-center gap-6 mb-4">
            <button className="text-gray-300 active:text-white p-2"
              onClick={() => { navigate(`/m/device/${id}/replay?date=${moment(date).subtract(1, "day").format("YYYY-MM-DD")}`) }}
            >
              <Icons.ChevronLeft />
            </button>
            <span className="font-bold tracking-wide">{date}</span>
            <button className="text-gray-300 active:text-white p-2"
              onClick={() => { navigate(`/m/device/${id}/replay?date=${moment(date).add(1, "day").format("YYYY-MM-DD")}`) }}
            >
              <Icons.ChevronRight />
            </button>
          </div>

          {/* 타임라인 및 감지 이벤트 */}
          <AdaptiveTimeline
            videoStart={BASE_TIME}
            videoEnd={END_TIME}
            videoCurrentTime={videoCurrentTime}
            videoDuration={videoDuration}
            onTimeUpdate={handleAdaptiveTimelineTimeUpdate}
            onPause={handleVideoPause}
            events={data?.events}
          />

          {/* 재생 컨트롤 버튼 */}
          <div className="flex items-center justify-center gap-4 mt-auto mb-10">
            <ControlBtn icon={<Icons.RewindEnd />} onClick={() => handleVideoSeek(0)} />
            <ControlBtn icon={<Icons.Rewind />} onClick={handleVideoFastRewind} />
            <button
              onClick={videoIsPlaying ? handleVideoPause : handleVideoPlay}
              className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center active:scale-95 transition-transform"
            >
              {videoIsPlaying ? <span className="block w-5 h-5 bg-white rounded-sm" /> : <Icons.Play />}
            </button>
            <ControlBtn icon={<Icons.FastForward />} onClick={handleVideoFastForward} />
            <ControlBtn icon={<Icons.FowardEnd />} onClick={() => handleVideoSeek(videoDuration - 1)} />
          </div>

          {/* 하단 감지 이벤트 배너 */}
          <div className="mx-4 bg-[#1A1A1A] rounded-xl overflow-hidden">
            <div
              className="p-4 flex items-center justify-between active:bg-[#252525] transition-colors cursor-pointer"
              onClick={() => setShowEvents(!showEvents)}
            >
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-gray-100">감지 이벤트</span>
                <div className={`transition-transform duration-300 ${showEvents ? "rotate-90" : ""}`}>
                  <Icons.ChevronRight />
                </div>
              </div>
              <span className="text-[#0066FF] text-lg font-bold">{data?.events?.length}</span>
            </div>

            {data?.events?.length > 0 && (
              <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${showEvents ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-auto max-h-[120px]">
                  <div className="flex flex-col pb-2">
                    {data?.events?.map((event: ReplayEvent, index: number) => (
                      <div key={index} className="flex items-center justify-between px-4 py-3 border-t border-gray-800/50">
                        <span className="text-sm font-medium text-gray-300">{event.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{moment(event.startTime).format("HH:mm:ss")}</span>
                          <span className="text-xs text-gray-600">~</span>
                          <span className="text-xs text-gray-500">{moment(event.endTime).format("HH:mm:ss")}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ✅ 푸터 */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black px-8 py-4 z-50 grid grid-cols-4 gap-4 border-t border-gray-900">
        <FooterBtn icon={<Icons.Download />} label="다운로드" onClick={() => { navigate(`/m/device/${id}/download`); }} />
        <FooterBtn icon={<Icons.Share />} label="공유" onClick={handleClickShare} />
        <FooterBtn icon={<Icons.Calendar />} label="캘린더" onClick={() => { navigate(`/m/device/${id}/calendar`); }} />
        <FooterBtn icon={<Icons.Filter />} label="필터" onClick={() => { navigate(`/m/device/${id}/filter`); }} />
      </footer>
    </div>
  );
}

// ----------------------
// 하위 컴포넌트들
// ----------------------
function ControlBtn({ icon, onClick }: { icon: React.ReactNode, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 bg-[#1A1A1A] rounded-full flex items-center justify-center text-gray-200 active:bg-gray-800 active:scale-95 transition-all"
    >
      {icon}
    </button>
  )
}

function FooterBtn({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-1.5 text-gray-300 active:text-white transition-colors"
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}