import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from '@/pocketbase/pocketbase'

const addMeasurement = async(data) => {
    return await pb.collection('measurement').create(data);
}
const fetchAllMeasurement= async(id) => {
    return await pb.collection('measurement').getFullList();
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