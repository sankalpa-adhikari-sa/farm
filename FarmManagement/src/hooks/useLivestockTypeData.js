import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from '@/pocketbase/pocketbase'

const addLivestockType = async(data) => {
    return await pb.collection('livestock_type').create(data);
}
const updateLivestockType = async(id,data) => {
    return await pb.collection('livestock_type').update(id, data);
}
const deleteLivestockTypeByid= async(id) => {
    return await pb.collection('livestock_type').delete(id);
}
const fetchAllLivestockType= async(id) => {
    return await pb.collection('livestock_type').getFullList();
}
const fetchLivestockTypeByid= async(id) => {
    return await pb.collection('livestock_type').getOne(id);
}

//list
export const useLivestockType = () => {
    return  useQuery({
        queryKey:['livestock_type'],
        queryFn: fetchAllLivestockType,
        staleTime:10000
      })
}
//create
export const useAddLivestockTypeData = () => {
    return useMutation({mutationFn: addLivestockType,
    })
}

//read
export const useLivestockTypeByID = (id) => {
    return  useQuery({
        queryKey:['livestock_type',id],
        queryFn: ()=> fetchLivestockTypeByid(id),
       
        
      })
}
//update
export const useUpdateLivestockTypeData = () => {
    return useMutation({mutationFn:(id,data) => updateLivestockType(id,data),
    })
}

//delete
export const useDeleteLivestockTypeByID = () => {
    const queryClient = useQueryClient()
    return  useMutation({mutationFn: (id) => deleteLivestockTypeByid(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["livestock_type"]})
        }})
}