import { StarIcons5 } from "./icons"

const MDescription = () =>{
  return(
    <div className="absolute bottom-0 w-full px-2 py-2 bg-neutral-800 flex items-center justify-between rounded-b-xl">
    <div className="flex items-center gap-2">
      <div className="bg-blue-600 w-16 h-16 rounded-[8px] flex items-center justify-center">로고</div>
      <div className="flex flex-col">
        <span className="leading-[100%] mb-1">이벤트 이름</span>
        <span className="text-neutral-400 text-sm leading-[100%] mb-2">제작자 이름</span>
        <StarIcons5 score={3} />
      </div>
    </div>
    <div className="border border-blue-600 rounded-full px-4 py-1 text-blue-600">무료</div>
  </div>
  )
}

export default MDescription;