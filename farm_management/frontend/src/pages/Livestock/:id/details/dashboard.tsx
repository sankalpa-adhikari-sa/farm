// import DualAxisLineBar from '@/charts/DualAxisLineBar'
import { useParams } from "react-router-dom";
import { useTotalYieldByLivestockID } from "../../hooks/useYieldData";
function LivestockDashboard() {
  const { id } = useParams();
  const { data: TotalYield } = useTotalYieldByLivestockID(id!);
  console.log("Total Yield", TotalYield?.length);
  console.log("Total Yield", TotalYield);
  return (
    <div className="flex flex-wrap gap-2">
      {TotalYield?.length > 0 ? (
        <div>
          {TotalYield.map((item: any) => (
            <div key={item.yield_type}>
              <p>Item: {item.yield_type}</p>
              <p>Revenue: {item.total_expected_revenue} $</p>
              <p>
                Yield: {item.total_yield}-{item.yield_unit}
              </p>
              <p>
                loss: {item.total_loss} -{item.yield_unit}
              </p>
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
