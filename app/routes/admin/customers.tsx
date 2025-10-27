import BrushChart from "~/components/visx/BrushChart";
import ForceNetwork from "~/components/visx/ForceNetwork";
import NetworkGraph from "~/components/visx/NetworkGraph";

// routes/admin/customers.tsx
export default function AdminCustomers() {
  return <div>
    <div className="float-left">
    <BrushChart width={800} height={800}/>
    </div>
    <NetworkGraph />
    <ForceNetwork />
    </div>;
}

