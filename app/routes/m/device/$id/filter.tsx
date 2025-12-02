// app/routes/m/device/$id/filter.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Checkbox } from "~/components/checkbox";
import { BackIcon } from "~/components/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getData, postData } from "~/lib/axios";

export function meta() {
  return [
    { title: "홈캠" },
    { name: "description", content: "Homecam home" },
  ];
}

interface FilterItem {
  name: string;
  val: boolean;
}

export default function ReplayFilter() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id || "";
  console.log('params', params, id)
  const queryClient = useQueryClient();

  // deviceFilter 조회
  const { data: deviceFilter } = useQuery<FilterItem[], Error>({
    queryKey: ["deviceFilter", id],
    queryFn: () => getData<FilterItem[]>(`/api/device/filter`, { id }),
  });

  // 필터 적용 뮤테이션
  const { mutate: applyFilter } = useMutation<any, Error, { id: string; filters: FilterItem[] }>({
    mutationFn: (body) => postData(`/api/device/filter`, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["deviceFilter", id] }),
    onError: () => alert("에러 발생"),
  });

  const [filters, setFilters] = useState<FilterItem[]>([
    { name: "사람", val: true },
    { name: "화재", val: true },
    { name: "움직임", val: true },
    { name: "쓰러짐", val: true },
  ]);

  useEffect(() => {
    if (deviceFilter) setFilters(deviceFilter);
  }, [deviceFilter]);

  const handleCheckboxChange = (changedFilter: FilterItem, checked: boolean) => {
    const updatedFilters = filters.map((f) =>
      f.name === changedFilter.name ? { ...f, val: checked } : f
    );
    console.log('updatedFilters', updatedFilters)
    // setFilters(updatedFilters);
    applyFilter({ id, filters: updatedFilters });
  };

  return (
    <div className="w-full bg-[#121212] text-white min-h-screen pt-6">
      <header className="w-full px-4 py-2.5 flex items-center gap-1 relative">
        <div
          className="aspect-square flex items-center justify-center absolute top-0 left-0 h-full"
          onClick={() => navigate(-1)}
        >
          <BackIcon className="w-5 h-5" />
        </div>
        <div className="font-bold text-lg flex items-center justify-center w-full gap-1">
          필터
        </div>
      </header>
      <main className="px-6 py-4">
        <div className="relative w-full gap-4 flex flex-col">
          {filters.map((filter, idx) => (
            <label
              key={idx}
              htmlFor={`checkbox-${idx}`}
              className="flex justify-between bg-neutral-800 w-full px-3 py-2 items-center rounded"
            >
              <span className="mt-0.5">{filter.name}</span>
              <Checkbox
                id={`checkbox-${idx}`}
                checked={filter.val}
                onChange={(e) => handleCheckboxChange(filter, e.target.checked)}
              />
            </label>
          ))}
        </div>
      </main>
    </div>
  );
}
