import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "@/Pocketbase/pocketbase";
import { toast } from "sonner";

type Data = any;

const addResource = async (data: Data) => {
  return await pb.collection("resource").create(data);
};
const updateResource = async ({ id, data }: { id: string; data: Data }) => {
  return await pb.collection("resource").update(id, data);
};
const deleteResourceByid = async (id: string) => {
  return await pb.collection("resource").delete(id);
};
const fetchAllResource = async () => {
  return await pb.collection("resource").getFullList({
    expand: "storage_location",
  });
};
const fetchResourceByid = async (id: string) => {
  return await pb.collection("resource").getOne(id, {
    expand: "storage_location",
  });
};
const fetchResourceByWarehouse = async (id: string) => {
  return await pb.collection("resource").getFullList({
    filter: `storage_location = "${id}"`,
    sort: "-created",
  });
};

export const useResourceByWarehouse = (id: string) => {
  return useQuery({
    queryKey: ["resource_by_warehouse", id],
    queryFn: () => fetchResourceByWarehouse(id),
  });
};

//list
export const useResource = () => {
  return useQuery({
    queryKey: ["resource"],
    queryFn: fetchAllResource,
    staleTime: 10000,
  });
};
//create
export const useAddResourceData = () => {
  return useMutation({
    mutationFn: addResource,
    onError: (error) => {
      toast.error("Resource Addition Failed!", {
        description: `${error}`,
      });
    },
    onSuccess: () => {
      toast.success("Resource Added");
    },
  });
};

//read
export const useResourceByID = (id: string) => {
  return useQuery({
    queryKey: ["resource", id],
    queryFn: () => fetchResourceByid(id),
  });
};
//update
export const useUpdateResourceData = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Data }) =>
      updateResource({ id, data }),
    onError: (error) => {
      toast.error("Resource Update Failed!", {
        description: `${error}`,
      });
    },
    onSuccess: () => {
      toast.success("Resource Updated");
    },
  });
};

//delete
export const useDeleteResourceByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteResourceByid(id),
    onError: (error) => {
      toast.error("Resource Deletion Failed!", {
        description: `${error}`,
      });
    },
    onSuccess: () => {
      toast.success("Resource Deleted");
      queryClient.invalidateQueries({ queryKey: ["resource"] });
    },
  });
};
