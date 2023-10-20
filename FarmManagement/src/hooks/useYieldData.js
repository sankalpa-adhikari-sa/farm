import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from '@/pocketbase/pocketbase'

const addYield = async(data) => {
    return await pb.collection('yield').create(data);
}
const fetchAllYield= async(id) => {
    return await pb.collection('yield').getFullList();
}

//list
export const useYield = () => {
    return  useQuery({
        queryKey:['yield'],
        queryFn: fetchAllYield,
        staleTime:10000
      })
}

//create
export const useAddYieldData = () => {
    return useMutation({mutationFn: addYield,
    })
}