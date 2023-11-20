import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "@/Pocketbase/pocketbase";
import { toast } from "sonner";
type Data = any;
const addTask = async (data: Data) => {
  return await pb.collection("task").create(data);
};
const updateTaskByid = async ({ id, data }: { id: string; data: Data }) => {
  return await pb.collection("task").update(id, data);
};

const fetchAllTask = async () => {
  return await pb.collection("task").getFullList();
};
const fetchTaskByid = async (id: string) => {
  return await pb.collection("task").getOne(id);
};
const deleteTaskByid = async (id: string) => {
  return await pb.collection("task").delete(id);
};

export const useTask = () => {
  return useQuery({
    queryKey: ["task"],
    queryFn: fetchAllTask,
  });
};
export const useTaskByID = (id: string) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => fetchTaskByid(id),
  });
};
export const useDeleteTaskByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTaskByid(id),
    onSuccess: () => {
      toast.success("Task Deleted");
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
    onError: (error) => {
      toast.error("Task Deletion Failed!", {
        description: `${error}`,
      });
    },
  });
};
export const useUpdateTaskByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Data }) =>
      updateTaskByid({ id, data }),
    onSuccess: () => {
      toast.success("Task Updated");
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
    onError: (error) => {
      toast.error("Task Update Failed!", {
        description: `${error}`,
      });
    },
  });
};
export const useAddTaskData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTask,
    onSuccess: (data) => {
      toast.success("Task Added");
      queryClient.setQueryData(["task"], (oldQueryData: any[]) => {
        return oldQueryData.concat({
          ...data,
        });
      });
    },
    onError: (error) => {
      toast.error("Task Addition Failed!", {
        description: `${error}`,
      });
    },
  });
};
