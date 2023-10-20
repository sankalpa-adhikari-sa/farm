import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Button } from "@/components/ui/button"
import ReusableTable from '../../UI Components/Table';
import { useNavigate } from 'react-router-dom';
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

function LivestockYieldTable() {
    return(
    <div>
        Here lies livestock yield table
    </div>

    )

}
export default LivestockYieldTable