import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from '@/pocketbase/pocketbase'

const addWarehouse = async(data) => {
    return await pb.collection('warehouse').create(data);
}
const updateWarehouse = async(id,data) => {
    return await pb.collection('warehouse').update(id, data);
}
const deleteWarehouseByid= async(id) => {
    return await pb.collection('warehouse').delete(id);
}
const fetchAllWarehouse= async(id) => {
    return await pb.collection('warehouse').getFullList();
}
const fetchWarehouseByid= async(id) => {
    return await pb.collection('warehouse').getOne(id);
}

//list
export const useWarehouse = () => {
    return  useQuery({
        queryKey:['warehouse'],
        queryFn: fetchAllWarehouse,
        staleTime:10000
      })
}
//create
export const useAddWarehouseData = () => {
    return useMutation({mutationFn: addWarehouse,
    })
}

//read
export const useWarehouseByID = (id) => {
    return  useQuery({
        queryKey:['warehouse',id],
        queryFn: ()=> fetchWarehouseByid(id),
       
        
      })
}
//update
export const useUpdateWarehouseData = () => {
    return useMutation({mutationFn:(id,data) => updateWarehouse(id,data),
    })
}

//delete
export const useDeleteWarehouseByID = () => {
    const queryClient = useQueryClient()
    return  useMutation({mutationFn: (id) => deleteWarehouseByid(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["warehouse"]})
        }})
}