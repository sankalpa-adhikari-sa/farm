import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from '@/pocketbase/pocketbase'

const addResource = async(data) => {
    return await pb.collection('resource').create(data);
}
const updateResource = async(id,data) => {
    return await pb.collection('resource').update(id, data);
}
const deleteResourceByid= async(id) => {
    return await pb.collection('resource').delete(id);
}
const fetchAllResource= async(id) => {
    return await pb.collection('resource').getFullList({
        expand: 'storage_location'
    });
}
const fetchResourceByid= async(id) => {
    return await pb.collection('resource').getOne(id);
}
const fetchResourceByWarehouse= async(id) => {
    return await pb.collection('resource').getFullList({
        filter: `storage_location = "${id}"`,
        sort: '-created',
    });
}

export const useResourceByWarehouse =(id) => {
    return useQuery({
        querykey:["resource_by_warehouse",id],
        queryFn:()=> fetchResourceByWarehouse(id)
    })
}

//list
export const useResource = () => {
    return  useQuery({
        queryKey:['resource'],
        queryFn: fetchAllResource,
        staleTime:10000
      })
}
//create
export const useAddResourceData = () => {
    return useMutation({mutationFn: addResource,
    })
}

//read
export const useResourceByID = (id) => {
    return  useQuery({
        queryKey:['resource',id],
        queryFn: ()=> fetchResourceByid(id),
       
        
      })
}
//update
export const useUpdateResourceData = () => {
    return useMutation({mutationFn:(id,data) => updateResource(id,data),
    })
}

//delete
export const useDeleteResourceByID = () => {
    const queryClient = useQueryClient()
    return  useMutation({mutationFn: (id) => deleteResourceByid(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["resource"]})
        }})
}