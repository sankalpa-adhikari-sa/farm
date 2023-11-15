import WarehouseCard from "./components/WarehouseCard";
import { useWarehouse } from "./hooks/useWarehouseData";
function WarehouseTable() {
  const { data: WarehouseList = [] } = useWarehouse();
  console.log(WarehouseList);
  return (
    <div className="pt-4 grid md:grid-cols-3 gap-6">
      {WarehouseList.map((Warehouse) => {
        return (
          <WarehouseCard
            key={Warehouse.id}
            cardTitle={Warehouse.warehouse_name}
            cardLocation={Warehouse.warehouse_location}
            cardMaintainer={"Sanskar Adhikari"}
            cardSubtitle={Warehouse.warehouse_subtitle}
            cardContactNumber={"9867335759"}
          />
        );
      })}
    </div>
  );
}

export default WarehouseTable;
