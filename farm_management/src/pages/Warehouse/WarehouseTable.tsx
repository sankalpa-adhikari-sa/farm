import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ShoppingBasket, User } from "lucide-react"
import { Separator } from "@/components/ui/separator"
function WarehouseTable() {
  return (
    <div className="pt-4 grid md:grid-cols-3 gap-6">
      <Card className="cursor-pointer">
        <CardHeader>
          <div >
            <img src="https://github.com/shadcn.png" alt="@shadcn" className="rounded-md w-full h-32 sm:h-48  object-cover"/>
          </div>
          <CardTitle className="text-lg">Warehouse 1</CardTitle>
          <CardDescription className="text-sm">
            W001   Kathmandu-3, Nepal
          </CardDescription>
        </CardHeader>
        <CardContent>
        
        <Separator className="my-2"/>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex gap-6 justify-center items-center">
            <User/>
            <p>20 </p>
          </div>
          <div className="flex gap-6 justify-center items-center">
            <ShoppingBasket/>
            <p>5 </p>
          </div>
        </div>
        <Separator className="my-2"/>
          <CardDescription className="w-full pb-3">Maintainer</CardDescription>
          <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Sanskar Adhikari</p> 
            <p className="text-xs text-muted-foreground">977-9876543210</p> 
          </div>
          </div>

        </CardContent>
        
       
      </Card>
    </div>
  )
}

export default WarehouseTable