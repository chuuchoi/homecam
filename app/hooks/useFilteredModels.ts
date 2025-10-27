// app/hooks/useFilteredModels.ts
import { useMemo } from "react";
import type { ModelT } from "~/components/ModelListItem";

export type FilterT = {
  detectType: string | null;
  detectObj: string | null;
  orderBy: string | null;
  order: string | null;
};

export function useFilteredModels(
  data: any,
  search: string,
  filter: FilterT
) {
  return useMemo(() => {
    if (!data) return [];

    let result:ModelT[] = data.filter((model:ModelT) => {
      const searchCondition = model.name
        .toLowerCase()
        .includes(search.toLowerCase());

      let filterCondition = true;
      if (filter.detectType)
        filterCondition =
          filterCondition && model.detect_type === filter.detectType;
      if (filter.detectObj)
        filterCondition =
          filterCondition && model.detect_obj === filter.detectObj;

      return searchCondition && filterCondition;
    });

    // 정렬
    if (filter.orderBy && filter.order) {
      result.sort((a, b) => {
        let valA: number | string = a[filter.orderBy as keyof typeof a];
        let valB: number | string = b[filter.orderBy as keyof typeof b];

        // 숫자 변환 필요 (price가 "₩ 1,000" 같은 문자열이면)
        if (typeof valA === "string" && typeof valB === "string") {
          valA = parseInt(valA.replace(/[^0-9]/g, ""), 10);
          valB = parseInt(valB.replace(/[^0-9]/g, ""), 10);
        }

        if (valA < valB) return filter.order === "오름차순" ? -1 : 1;
        if (valA > valB) return filter.order === "오름차순" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, search, filter]);
}
