import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from '@/pocketbase/pocketbase'

const addEquipment = async(data) => {
    return await pb.collection('equipment').create(data);
}
const updateEquipment = async(id,data) => {
    return await pb.collection('equipment').update(id, data);
}
const deleteEquipmentByid= async(id) => {
    return await pb.collection('equipment').delete(id);
}
const fetchAllEquipment= async(id) => {
    return await pb.collection('equipment').getFullList();
}
const fetchEquipmentByid= async(id) => {
    return await pb.collection('equipment').getOne(id);
}

//list
export const useEquipment = () => {
    return  useQuery({
        queryKey:['equipment'],
        queryFn: fetchAllEquipment,
        staleTime:10000
      })
}
//create
export const useAddEquipmentData = () => {
    return useMutation({mutationFn: addEquipment,
    })
}

//read
export const useEquipmentByID = (id) => {
    return  useQuery({
        queryKey:['equipment',id],
        queryFn: ()=> fetchEquipmentByid(id),
       
        
      })
}
//update
export const useUpdateEquipmentData = () => {
    return useMutation({mutationFn:(id,data) => updateEquipment(id,data),
    })
}

//delete
export const useDeleteEquipmentByID = () => {
    const queryClient = useQueryClient()
    return  useMutation({mutationFn: (id) => deleteEquipmentByid(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["equipment"]})
        }})
}