import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShoppingBasket, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

type WarehouseCardProps = {
  cardTitle: string;
  cardSubtitle?: string;
  cardDescription?: string;
  cardLocation: string;
  cardMaintainer?: string;
  cardContactNumber?: string;
  warehouseID: string;
};
function WarehouseCard(props: WarehouseCardProps) {
  const navigate = useNavigate();
  const handleOpenWarehouse = () => {
    navigate(`/warehouse/${props.warehouseID}`);
  };
  return (
    <Card onClick={handleOpenWarehouse} className="cursor-pointer">
      <CardHeader>
        <div>
          <img
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="rounded-md w-full h-32 sm:h-48  object-cover"
          />
        </div>
        <CardTitle className="text-lg">{props.cardTitle}</CardTitle>
        <CardDescription className="text-sm">
          {props.cardLocation}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="my-2" />
        <div className="grid grid-cols-2 gap-6">
          <div className="flex gap-6 justify-center items-center">
            <User />
            <p>20 </p>
          </div>
          <div className="flex gap-6 justify-center items-center">
            <ShoppingBasket />
            <p>5 </p>
          </div>
        </div>
        <Separator className="my-2" />
        <CardDescription className="w-full pb-3">Maintainer</CardDescription>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{props.cardMaintainer}</p>
            <p className="text-xs text-muted-foreground">
              {props.cardContactNumber}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default WarehouseCard;
