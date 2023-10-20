import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from '@/pocketbase/pocketbase'

const addTreatment = async(data) => {
    return await pb.collection('treatment').create(data);
}
const updateTreatment = async(id,data) => {
    return await pb.collection('treatment').update(id, data);
}
const deleteTreatmentByid= async(id) => {
    return await pb.collection('treatment').delete(id);
}
const fetchAllTreatment= async(id) => {
    return await pb.collection('treatment').getFullList();
}
const fetchTreatmentByid= async(id) => {
    return await pb.collection('treatment').getOne(id);
}

//list
export const useTreatment = () => {
    return  useQuery({
        queryKey:['treatment'],
        queryFn: fetchAllTreatment,
        staleTime:10000
      })
}
//create
export const useAddTreatmentData = () => {
    return useMutation({mutationFn: addTreatment,
    })
}

//read
export const useTreatmentByID = (id) => {
    return  useQuery({
        queryKey:['treatment',id],
        queryFn: ()=> fetchTreatmentByid(id),
       
        
      })
}
//update
export const useUpdateTreatmentData = () => {
    return useMutation({mutationFn:(id,data) => updateTreatment(id,data),
    })
}

//delete
export const useDeleteTreatmentByID = () => {
    const queryClient = useQueryClient()
    return  useMutation({mutationFn: (id) => deleteTreatmentByid(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["treatment"]})
        }})
}