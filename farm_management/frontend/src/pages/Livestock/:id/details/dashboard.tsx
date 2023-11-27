// import DualAxisLineBar from '@/charts/DualAxisLineBar'
import { useParams } from "react-router-dom";
import { useTotalYieldByLivestockID } from "../../hooks/useYieldData";
import {
  useIndvRUTotalByR,
  useIndvRUTotalByRT,
} from "../../hooks/useResourceUsageData";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayIcon } from "lucide-react";
import RUbyType from "./charts/RUbyType";
import RUbyResource from "./charts/RUbyResource";
function LivestockDashboard() {
  const { id } = useParams();
  const { data: TotalYield } = useTotalYieldByLivestockID(id!);
  const { data: TotalResourceUsageByRT } = useIndvRUTotalByRT(id!);
  const { data: TotalResourceUsageByR } = useIndvRUTotalByR(id!);

  return (
    <div>
      <h3>Total Yield</h3>
      <br></br>
      {TotalYield?.length > 0 ? (
        <div className="flex flex-row gap-5 mb-4">
          {TotalYield.map((item: any) => (
            <Card key={item.yield_type} className="flex flex-col min-w-[160px]">
              <CardHeader className="p-3 flex flex-row items-baseline justify-between">
                <CardTitle className="text-lg font-medium capitalize">
                  {item.yield_type}
                </CardTitle>
                <div className="pb-3 text-2xl font-bold text-success">
                  $ {item.total_expected_revenue}
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-0 flex flex-row justify-between">
                <div className="flex flex-col">
                  <div className="flex flex-row capitalize gap-1 text-xs items-baseline ">
                    Yield
                    <PlayIcon className="w-3 h-3 -rotate-90 text-success" />
                  </div>
                  <div className="text-sm font-bold">
                    {item.total_yield}
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      {item.yield_unit}
                    </span>
                  </div>
                </div>
                <Separator orientation="vertical" />
                <div className="flex flex-col">
                  <div className="flex flex-row capitalize gap-1 text-xs items-baseline">
                    Loss
                    <PlayIcon className="w-3 h-3 rotate-90 text-destructive" />
                  </div>
                  <div className="text-sm font-bold">
                    {item.total_loss}
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      {item.yield_unit}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>null </p>
      )}
      <Separator />
      {TotalResourceUsageByRT?.length > 0 ? (
        <RUbyType data={TotalResourceUsageByRT} />
      ) : null}

      <Separator />
      <h3>Total Resource Usage by Resource</h3>
      {TotalResourceUsageByR?.length > 0 ? (
        <RUbyResource data={TotalResourceUsageByR} />
      ) : (
        <p>null </p>
      )}
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
