import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from '@/pocketbase/pocketbase'

const addResourceUsage = async(data) => {
    return await pb.collection('resource_usage').create(data);
}
const updateResourceUsage = async(id,data) => {
    return await pb.collection('resource_usage').update(id, data);
}
const deleteResourceUsageByid= async(id) => {
    return await pb.collection('resource_usage').delete(id);
}
const fetchAllResourceUsage= async(id) => {
    return await pb.collection('resource_usage').getFullList();
}
const fetchResourceUsageByid= async(id) => {
    return await pb.collection('resource_usage').getOne(id);
}
const fetchResourceUsageByLivestock= async(id) => {
    return await pb.collection('resource_usage').getFullList({
        filter: `livestock = "${id}"`,
        sort: '-created',
    });
}

//list
export const useResourceUsageByLivestock =(id) => {
    return useQuery({
        querykey:["resource_usage_by_livestock",id],
        queryFn:()=> fetchResourceUsageByLivestock(id)
    })
}

//list
export const useResourceUsage = () => {
    return  useQuery({
        queryKey:['resource_usage'],
        queryFn: fetchAllResourceUsage,
        staleTime:10000
      })
}
//create
export const useAddResourceUsageData = () => {
    return useMutation({mutationFn: addResourceUsage,
    })
}

//read
export const useResourceUsageByID = (id) => {
    return  useQuery({
        queryKey:['resource_usage',id],
        queryFn: ()=> fetchResourceUsageByid(id),
       
        
      })
}
//update
export const useUpdateResourceUsageData = () => {
    return useMutation({mutationFn:(id,data) => updateResourceUsage(id,data),
    })
}

//delete
export const useDeleteResourceUsageByID = () => {
    const queryClient = useQueryClient()
    return  useMutation({mutationFn: (id) => deleteResourceUsageByid(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["resource_usage"]})
        }})
}