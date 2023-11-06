import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from '@/Pocketbase/pocketbase'
type Data= any
const addMeasurement = async(data:Data) => {
    return await pb.collection('measurement').create(data);
}
const updateMeasurement = async({id,data}:{id:string, data:Data}) => {
    return await pb.collection('measurement').update(id, data);
}
const deleteMeasurementByid= async(id:string) => {
    return await pb.collection('measurement').delete(id);
}
const fetchAllMeasurement= async() => {
    return await pb.collection('measurement').getFullList();
}
const fetchMeasurementByid= async(id:string) => {
    return await pb.collection('measurement').getOne(id);
}

//list
export const useMeasurement = () => {
    return  useQuery({
        queryKey:['measurement'],
        queryFn: fetchAllMeasurement,
        staleTime:10000
      })
}
//create
export const useAddMeasurementData = () => {
    return useMutation({mutationFn: addMeasurement,
    })
}

//read
export const useMeasurementByID = (id:string) => {
    return  useQuery({
        queryKey:['measurement',id],
        queryFn: ()=> fetchMeasurementByid(id),
       
        
      })
}
//update
export const useUpdateMeasurementData = () => {
    return useMutation({mutationFn:({id,data}:{id:string, data:Data}) => updateMeasurement({id,data}),
    })
}

//delete
export const useDeleteMeasurementByID = () => {
    const queryClient = useQueryClient()
    return  useMutation({mutationFn: (id:string) => deleteMeasurementByid(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["measurement"]})
        }})
}