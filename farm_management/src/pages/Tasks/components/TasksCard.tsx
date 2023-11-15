import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { GiCow } from "react-icons/gi";
import { AiFillFire } from "react-icons/ai";
function TasksCard() {
  return (
    <Card className="cursor-pointer ">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Avatar className="w-7 h-7">
            <AvatarFallback>
              {" "}
              <GiCow />
            </AvatarFallback>
          </Avatar>
          <Badge
            className="px-1 gap-1 font-normal rounded-sm"
            variant="destructive"
          >
            <AiFillFire />
            High
          </Badge>
        </div>
        <CardTitle className="text-md">Make a visit to Vet</CardTitle>
        <CardDescription>Vet for A001</CardDescription>
      </CardHeader>

      <Separator className="mb-2" />
      <CardFooter className="flex flex-col gap-2">
        <div className="w-full flex items-center justify-between">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="w-fit">Sanskar Adhikari</div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default TasksCard;
