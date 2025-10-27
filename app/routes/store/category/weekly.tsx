import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getData } from "~/lib/axios";
import { useFilteredModels, type FilterT } from "~/hooks/useFilteredModels";
import { ModelList, SearchBar, SearchFilters } from "./all";
import dummy from "../dummyModels.json"
export function meta({}) {
  return [
    { title: "스토어" },
    { name: "description", content: "Store > Event Detection > Weekly Popular Model" },
  ];
}

const DUMMY_DATA = dummy.filter(d=>d.category==='weekly')

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
        <h1 className="float-left">주간 인기모델</h1>
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