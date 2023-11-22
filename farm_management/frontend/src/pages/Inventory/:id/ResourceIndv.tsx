import { useParams } from "react-router-dom";
import { useResourceByID } from "../hooks/useInventoryData";
function ResourceIndv() {
  const { id } = useParams();
  if (!id) {
    return <p>404 No Data found</p>;
  }
  const { data: ResourceData } = useResourceByID(id);
  console.log("Resource Data", ResourceData);
  return (
    <div className="md:flex">
      <div className="flex grow-[3] flex-col">
        <p className="text-3xl font-bold">{ResourceData?.input_name}</p>
        <p>{ResourceData?.details}</p>
      </div>
      <div className="flex grow-[1] flex-col">
        <p>
          <span className="text-2xl font-semibold">
            {ResourceData?.current_quantity}
          </span>
          <span className="pl-3"></span>
          <span className="text-muted-foreground text-sm">
            {ResourceData?.quantity_unit}
          </span>
        </p>
        <p>
          <span className="text-muted-foreground text-sm">Vendor :</span>
          <span> {ResourceData?.vendor}</span>
        </p>
        <p>
          <span className="text-muted-foreground text-sm">
            Storage Location :
          </span>
          <span> {ResourceData?.expand?.storage_location.warehouse_name}</span>
        </p>
        <p>
          <span className="text-muted-foreground text-sm">Manufacturer :</span>
          <span> {ResourceData?.manufacturer}</span>
        </p>
        <p>
          <span className="text-muted-foreground text-sm">Type :</span>
          <span> {ResourceData?.inventory_type}</span>
        </p>
        <p>
          <span className="text-muted-foreground text-sm">chemical_type :</span>
          <span> {ResourceData?.chemical_type}</span>
        </p>
        <p>
          <span className="text-muted-foreground text-sm">
            expiration date :
          </span>
          <span> {ResourceData?.expiration_date}</span>
        </p>
        <p>
          <span className="text-muted-foreground text-sm">addition_date :</span>
          <span> {ResourceData?.addition_date}</span>
        </p>
        <p>
          <span className="text-muted-foreground text-sm">alert level :</span>
          <span> {ResourceData?.alert_level}</span>
        </p>
        <p>
          <span className="text-muted-foreground text-sm">Per unit Price:</span>
          <span> {ResourceData?.per_unit_price}</span>
        </p>
        <p>
          <span className="text-muted-foreground text-sm">
            Initial Quantity:
          </span>
          <span> {ResourceData?.quantity}</span>
        </p>
      </div>
    </div>
  );
}

// "details": "test",
//   "vendor": "test",
//   "storage_location": "RELATION_RECORD_ID",
//   "alert_level": 123,
//   "addition_date": "2022-01-01 10:00:00.123Z",
//   "per_unit_price": 123,
//   "manufacturer": "test",
//   "expiration_date": "2022-01-01 10:00:00.123Z",
//   "quantity": 123,
//   "quantity_unit": "gm",
//   "chemical_type": "fertilizer",
//   "input_name": "test",
//   "inventory_type": "feed",
//   "current_quantity": 123

export default ResourceIndv;
