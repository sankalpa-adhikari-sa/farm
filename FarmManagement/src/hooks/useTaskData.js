import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from '@/pocketbase/pocketbase'

const addTask = async(data) => {
    return await pb.collection('task').create(data);
}
const updateTask = async(id,data) => {
    return await pb.collection('task').update(id, data);
}
const deleteTaskByid= async(id) => {
    return await pb.collection('task').delete(id);
}
const fetchAllTask= async(id) => {
    return await pb.collection('task').getFullList();
}
const fetchTaskByid= async(id) => {
    return await pb.collection('task').getOne(id);
}

//list
export const useTask = () => {
    return  useQuery({
        queryKey:['task'],
        queryFn: fetchAllTask,
        staleTime:10000
      })
}
//create
export const useAddTaskData = () => {
    return useMutation({mutationFn: addTask,
    })
}

//read
export const useTaskByID = (id) => {
    return  useQuery({
        queryKey:['task',id],
        queryFn: ()=> fetchTaskByid(id),
       
        
      })
}
//update
export const useUpdateTaskData = () => {
    return useMutation({mutationFn:(id,data) => updateTask(id,data),
    })
}

//delete
export const useDeleteTaskByID = () => {
    const queryClient = useQueryClient()
    return  useMutation({mutationFn: (id) => deleteTaskByid(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["task"]})
        }})
}