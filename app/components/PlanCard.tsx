// app/components/PlanCard.tsx

import { useNavigate } from "react-router";
import { DBIcon } from "./icons";

type PlanCardProps = {
  size: string;
  price: number;
  features: string[];
  planId: string;
};

export default function PlanCard({ size, price, features, planId }: PlanCardProps) {
  const navigate = useNavigate();
  const isYearly = planId.includes("yearly");

  return (
    <div className="bg-neutral-900 text-white rounded-2xl p-6 w-100 flex flex-col shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <DBIcon style={{width:'48px', height:'auto'}}/>
        <span className="text-4xl font-bold">{size}</span>
      </div>
      <div>
        <span className="text-4xl font-bold">₩ {price.toLocaleString()}</span>
        <span className="text-2xl opacity-70"> /{isYearly?'년':'월'}</span>
      </div>
      <span className="text-xl opacity-70">{isYearly?'매년결제':'매월결제'}</span>
      <button
        onClick={() => navigate(`/subscribe/${planId}`)}
        className="bg-blue-600 text-2xl mt-4 cursor-pointer hover:bg-blue-700 text-white py-2 px-4 w-full rounded-lg font-semibold"
      >
        구독하기
      </button>
      <ul className="mt-6 space-y-2 w-full">
        {features.map((f, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-blue-400">✔</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
