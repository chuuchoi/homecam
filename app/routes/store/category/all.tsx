import { useState } from "react";
import { SearchIcon } from "~/components/icons";
import { FloatingSelect } from "~/components/FloatingSelect";
import { cn } from "~/lib/utils";
import ModelListItem, { type ModelT } from "~/components/ModelListItem";
import { useQuery } from "@tanstack/react-query";
import { getData } from "~/lib/axios";
import { useFilteredModels, type FilterT } from "~/hooks/useFilteredModels";
import { Link } from "react-router";
import dummy from "../dummyModels.json"

export function meta({}) {
  return [
    { title: "스토어" },
    { name: "description", content: "Store" },
  ];
}

const DETECT_TYPE_OPTIONS = ['모션', '소리']
const DETECT_OBJ_OPTIONS = ['사람', '동물']
const ORDER_OPTIONS = ['내림차순', '오름차순']

const DUMMY_DATA = dummy

export default function Home() {
  const {data, isLoading} = useQuery({
    queryKey: ['models'],
    queryFn:()=>getData('/api/rooms')
  })
  console.log(data)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterT>({
    detectType: null,
    detectObj: null,
    orderBy: null,
    order: null
  })
  // const filteredModels = useFilteredModels(data, search, filter)
  const filteredModels = useFilteredModels(DUMMY_DATA, search, filter)

  if(isLoading) return <main className="bg-black text-white min-h-[calc(100vh-441px)] p-6 max-w-[1520px]">loading...</main>
  return(
    <main className="bg-black text-white min-h-[calc(100vh-441px)] px-6 pt-2 pb-6 max-w-[1520px]">
      <div className="bg-black py-4 sticky top-[77px] mb-2">
        <h1 className="float-left">전체</h1>
        <div className="flex flex-col items-end gap-4">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchFilters
            filter={filter}
            setFilter={setFilter}
          />
        </div>
      </div>
      <ModelList models={filteredModels} />
    </main>
  )
}

export const SearchBar = ({value, onChange}: {value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => any}) => {
return(
  <div className="relative">
    <SearchIcon className="absolute top-1/2 -translate-y-1/2 left-3"/>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="검색"
      className="bg-neutral-900 rounded-full px-4 py-2 pl-11 w-64 outline-none text-white"
    />
  </div>
)
}

export const SearchFilters = ({filter, setFilter, fixedDetectType, fixedDetectObj}:
   {filter: FilterT, setFilter: React.Dispatch<React.SetStateAction<FilterT>>, fixedDetectType?: string, fixedDetectObj?: string})=>{
  const handleSelectDetectType = (index: number) => {
    setFilter((c:FilterT) => ({ ...c, detectType: DETECT_TYPE_OPTIONS[index] }));
  };
  const handleSelectDetectObj = (index: number) => {
    setFilter((c:FilterT) => ({ ...c, detectObj: DETECT_OBJ_OPTIONS[index] }));
  };
  const handleSelectOrder = (orderBy: string) => (index: number) => {
    setFilter((c:FilterT) => ({ ...c, orderBy:orderBy, order: ORDER_OPTIONS[index] }));
  };
  return(
    <div className="flex gap-4 text-sm text-gray-400">
    {!fixedDetectType &&
      <FloatingSelect options={DETECT_TYPE_OPTIONS} seleted={filter.detectType} onSelect={handleSelectDetectType} >
        <button className="cursor-pointer hover:text-white">감지종류{filter.detectType?`: ${filter.detectType}`:''} ▼</button>
      </FloatingSelect>
    }
    {!fixedDetectObj &&
      <FloatingSelect options={DETECT_OBJ_OPTIONS} seleted={filter.detectObj} onSelect={handleSelectDetectObj} >
        <button className="cursor-pointer hover:text-white">감지대상{filter.detectObj?`: ${filter.detectObj}`:''} ▼</button>
      </FloatingSelect>
    }
    <FloatingSelect options={ORDER_OPTIONS} seleted={filter.orderBy==='downloads'?filter.order:null} onSelect={handleSelectOrder('downloads')} >
      <button className={cn("cursor-pointer hover:text-white",filter.orderBy==='downloads'&&"text-blue-500 hover:text-blue-400")}>다운로드순
        <span className={cn("inline-block ml-1 transition-transform",filter.orderBy==='downloads'&&filter.order==='오름차순'&&"rotate-180")}>▼</span>
      </button>
    </FloatingSelect>
    <FloatingSelect options={ORDER_OPTIONS} seleted={filter.orderBy==='rating'?filter.order:null} onSelect={handleSelectOrder('rating')} >
      <button className={cn("cursor-pointer hover:text-white",filter.orderBy==='rating'&&"text-blue-500 hover:text-blue-400")}>별점순
        <span className={cn("inline-block ml-1 transition-transform",filter.orderBy==='rating'&&filter.order==='오름차순'&&"rotate-180")}>▼</span>
      </button>
    </FloatingSelect>
    <FloatingSelect options={ORDER_OPTIONS} seleted={filter.orderBy==='price'?filter.order:null} onSelect={handleSelectOrder('price')} >
      <button className={cn("cursor-pointer hover:text-white",filter.orderBy==='price'&&"text-blue-500 hover:text-blue-400")}>가격순
        <span className={cn("inline-block ml-1 transition-transform",filter.orderBy==='price'&&filter.order==='오름차순'&&"rotate-180")}>▼</span>
      </button>
    </FloatingSelect>
  </div>
  )
}

export const ModelList = ({models}
  : {models: ModelT[]}
) => {
  return (
      <div className="flex flex-col gap-4">
        {models.map((model, idx) => (
        <Link key={idx} to={`/store/model/${model.id}`}>
          <ModelListItem model={model} />
        </Link>
        ))}
      </div>
  );
}
