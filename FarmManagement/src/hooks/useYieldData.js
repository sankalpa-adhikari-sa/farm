import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from '@/pocketbase/pocketbase'

const addYield = async(data) => {
    return await pb.collection('yield').create(data);
}
const fetchAllYield= async(id) => {
    return await pb.collection('yield').getFullList();
}
const fetchYieldByLivestock= async(id) => {
    return await pb.collection('yield').getFullList({
        filter: `livestock = "${id}"`,
        sort: '-yield_date',
    });
}
export const useYieldByLivestock =(id) => {
    return useQuery({
        querykey:["yield",id],
        queryFn:()=> fetchYieldByLivestock(id)
    })
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