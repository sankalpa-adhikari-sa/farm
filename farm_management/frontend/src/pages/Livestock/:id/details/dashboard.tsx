// import DualAxisLineBar from '@/charts/DualAxisLineBar'
import { useParams } from "react-router-dom";
import { useTotalYieldByLivestockID } from "../../hooks/useYieldData";
import { useIndvRUTotalByRT } from "../../hooks/useResourceUsageData";
import { Separator } from "@/components/ui/separator";
function LivestockDashboard() {
  const { id } = useParams();
  const { data: TotalYield } = useTotalYieldByLivestockID(id!);
  const { data: TotalResourceUsage } = useIndvRUTotalByRT(id!);
  console.log("Total Yield", TotalResourceUsage?.length);
  console.log("Total Yield", TotalResourceUsage);
  return (
    <div className="flex flex-wrap gap-2">
      <h3>Total Yield</h3>
      {TotalYield?.length > 0 ? (
        <div>
          {TotalYield.map((item: any) => (
            <div key={item.yield_type}>
              <p>Item: {item.yield_type}</p>
              <p>Revenue: {item.total_expected_revenue} $</p>
              <p>
                Yield: {item.total_yield} {item.yield_unit}
              </p>
              <p>
                Yield loss: {item.total_loss} {item.yield_unit}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>null </p>
      )}
      <Separator />
      <h3>Total Resource Usage</h3>
      {TotalResourceUsage?.length > 0 ? (
        <div>
          {TotalResourceUsage.map((item: any) => (
            <div key={item.resource_type}>
              <p>Item: {item.resource_type}</p>
              <p>Usage Price: {item.total_usage_price} $</p>
            </div>
          ))}
        </div>
      ) : (
        <p>null </p>
      )}
    </div>
  );
}

export default LivestockDashboard;
