import LivestockTable from "./LivestockTable";
import { useLivestockSummary } from "./hooks/useLivestockTypeData";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
function LivestockList() {
  const { data: LivestockTypeSummary = [] } = useLivestockSummary();
  const LivestockSummary = LivestockTypeSummary?.reduce(
    (acc, livestock) => {
      (acc.total_male_count += livestock.male_count),
        (acc.total_female_count += livestock.female_count),
        (acc.total_archived_count += livestock.archived_count),
        (acc.total_ill_count += livestock.ill_count),
        (acc.total_livestock += livestock.livestock_count_by_type);
      return acc;
    },
    {
      total_male_count: 0,
      total_female_count: 0,
      total_archived_count: 0,
      total_ill_count: 0,
      total_livestock: 0,
    }
  );
  console.log(LivestockTypeSummary);
  console.log("info", LivestockSummary);
  return (
    <>
      <div className="flex flex-col gap-2 mt-3">
        <h3>Livestock Summary</h3>
        <div className="flex flex-row gap-3">
          <Card className="flex flex-col w-full items-center ">
            <CardHeader className="p-3 text-sm text-accent-foreground capitalize">
              Total Livestock
            </CardHeader>
            <CardContent className="p-3 pt-0 text-lg font-bold">
              {LivestockSummary?.total_livestock}
            </CardContent>
          </Card>
          <Card className="flex flex-col w-full items-center  ">
            <CardHeader className="p-3 text-sm text-accent-foreground capitalize">
              Male
            </CardHeader>
            <CardContent className="p-3 pt-0 text-lg font-bold">
              {LivestockSummary?.total_male_count}
            </CardContent>
          </Card>
          <Card className="flex flex-col w-full items-center  ">
            <CardHeader className="p-3 text-sm text-accent-foreground capitalize">
              Female
            </CardHeader>
            <CardContent className="p-3 pt-0 text-lg font-bold">
              {LivestockSummary?.total_female_count}
            </CardContent>
          </Card>
          <Card className="flex flex-col w-full items-center  ">
            <CardHeader className="p-3 text-sm text-accent-foreground capitalize">
              Ill
            </CardHeader>
            <CardContent className="p-3 pt-0 text-lg font-bold">
              {LivestockSummary?.total_ill_count}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <h3>Livestock Type</h3>
        <div className="flex flex-row gap-3">
          {LivestockTypeSummary?.length > 0
            ? LivestockTypeSummary?.map((item) => (
                <p key={item.id}>{item.expand!.type.type}</p>
              ))
            : null}
        </div>
      </div>
      <LivestockTable />
    </>
  );
}

export default LivestockList;
