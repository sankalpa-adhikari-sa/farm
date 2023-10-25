import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Button } from "@/components/ui/button"
import ReusableTable from '../../UI Components/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { Pencil,Eye, Trash,PlusSquare,Group } from 'lucide-react';
import { DataTableColumnHeader } from '@/components/ui/table-header';
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import pb from '@/pocketbase/pocketbase'
import YieldChart from '@/charts/YieldChart';
import { useYieldByLivestock } from '@/hooks/useYieldData';
import { useQueryClient } from '@tanstack/react-query';

const fetchLivestockByid= async(id) => {
  return await pb.collection('livestock').getOne(id, {
      expand: 'livestock_type',
  });
}
function LivestockYieldTable() {
  const {id}= useParams()
  const {data:yield_data}= useYieldByLivestock(id)
  const queryClient= useQueryClient()
  //this ensures if livestock data is available
  queryClient.ensureQueryData({
    queryKey:["livestock", id],
    queryFn: ()=> fetchLivestockByid(id)
  })
  const yield_type= queryClient.getQueryData(["livestock", id])?.expand.livestock_type.livestock_type_yield

  return(
    <div>
      {/* Show only when id val and yield_data is present */}
      {yield_data?
      (<YieldChart type={yield_type} data={yield_data} />):
      (<div> Data Not found </div>)
      
    }
    </div>

    )

}
export default LivestockYieldTable