import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from '@/pocketbase/pocketbase'
import Livestock from "@/Pages/Livestock/Livestock";

const addLivestock = async(data) => {
    return await pb.collection('livestock').create(data);
}
const updateLivestockByid = async(id,data) => {
    return await pb.collection('livestock').update(id, data);
}


const fetchAllLivestock= async(id) => {
    return await pb.collection('livestock').getFullList({
        expand:"livestock_type,rel_data",
    })
}
const fetchLivestockByid= async(id) => {
    return await pb.collection('livestock').getOne(id, {
        expand: 'livestock_type',
        // fields: "id,dam_id, livestock_breed, livestock_tag_no, livestock_colour, livestock_gender, livestock_details, expand.livestock_type"
    });
}
const deleteLivestockByid= async(id) => {
    console.log("inside",id)
    return await pb.collection('livestock').delete(id);
}


export const useLivestock = () => {
    return  useQuery({
        queryKey:['livestock'],
        queryFn: fetchAllLivestock,       
        
      })
}
export const useLivestockByID = (id) => {
    return  useQuery({
        queryKey:['livestock',id],
        queryFn: ()=> fetchLivestockByid(id),
       
        
      })
}
export const useDeleteLivestockByID = () => {
    const queryClient = useQueryClient()
    return  useMutation({mutationFn: (id) => deleteLivestockByid(id,data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["livestock"]})
        }})
}
export const useUpdateLivestockByID = () => {
    const queryClient = useQueryClient()
    return  useMutation({mutationFn: (id) => updateLivestockByid(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["livestock"]})
        }})
}
export const useAddLivestockData = () => {
    const queryClient = useQueryClient()
    return useMutation({mutationFn: addLivestock,
        onSuccess:(data) => {
            // queryClient.invalidateQueries({queryKey: ["livestock_id"]})
                
            queryClient.setQueryData(["livestock"], (oldQueryData)=>{
                return oldQueryData.concat({
                    // id: data.id,
                    // livestock_tag_no: data.livestock_tag_no
                    ...data
                });
            })

        }
    
    
    })
}


