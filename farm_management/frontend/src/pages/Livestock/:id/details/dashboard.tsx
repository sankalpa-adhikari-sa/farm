// import DualAxisLineBar from '@/charts/DualAxisLineBar'
import { useParams } from "react-router-dom";
import { useTotalYieldByLivestockID } from "../../hooks/useYieldData";
import {
  useIndvRUTotalByR,
  useIndvRUTotalByRT,
} from "../../hooks/useResourceUsageData";
import { Separator } from "@/components/ui/separator";
function LivestockDashboard() {
  const { id } = useParams();
  const { data: TotalYield } = useTotalYieldByLivestockID(id!);
  const { data: TotalResourceUsageByRT } = useIndvRUTotalByRT(id!);
  const { data: TotalResourceUsageByR } = useIndvRUTotalByR(id!);
  console.log("Total Yield", TotalResourceUsageByR?.length);
  console.log("Total Yield", TotalResourceUsageByR);
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
              <br></br>
            </div>
          ))}
        </div>
      ) : (
        <p>null </p>
      )}
      <Separator />
      <h3>Total Resource Usage By Type</h3>
      {TotalResourceUsageByRT?.length > 0 ? (
        <div>
          {TotalResourceUsageByRT.map((item: any) => (
            <div key={item.resource_type}>
              <p>Item: {item.resource_type}</p>
              <p>Usage Price: {item.total_usage_price} $</p>
              <br></br>
            </div>
          ))}
        </div>
      ) : (
        <p>null </p>
      )}
      <Separator />
      <Separator />
      <h3>Total Resource Usage by Resource</h3>
      {TotalResourceUsageByR?.length > 0 ? (
        <div>
          {TotalResourceUsageByR.map((item: any) => (
            <div key={item.resourceId}>
              <p>Resource: {item.resource_name}</p>
              <p>Type: {item.resource_type}</p>
              <p>Usage Price: {item.total_usage_price} $</p>
              <p>
                Usage quantity: {item.total_usage_quantity} {item.quantity_unit}
              </p>
              <br></br>
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
