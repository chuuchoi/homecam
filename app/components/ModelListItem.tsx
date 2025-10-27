import { formatDownloads } from "~/lib/utils";
import { DownloadIcon, StarIcons5 } from "./icons";

export type ModelT = {
  logo: string
  name: string
  desc: string
  downloads: number
  rating: number
  price: number
  [key: string]: any; // 확장 가능
}

export default function ModelListItem({model}
  : {model: ModelT}
){
  return (
    <div className="flex items-center justify-between bg-neutral-900 rounded-xl p-4">
      {/* 좌측 */}
      <div className="flex items-center gap-4">
        <div className="bg-neutral-700 rounded-lg w-16 h-16 flex items-center justify-center text-sm">
          {model.logo}
        </div>
        <div>
          <div className="font-semibold">{model.name}</div>
          <div className="text-sm text-gray-400">{model.desc}</div>
        </div>
      </div>

      {/* 우측 */}
      <div className="flex items-center gap-8 text-sm">
        <div className="flex items-center gap-1 text-gray-300">
          <DownloadIcon />
          {formatDownloads(model.downloads)}
        </div>
        <StarIcons5 score={model.rating} />
        <div className="border border-blue-500 text-blue-500 px-3 py-1 rounded-full">
          {`₩ ${model.price.toLocaleString()}`}
        </div>
      </div>
    </div>
  );
}
