import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "@/Pocketbase/pocketbase";
import axios from "axios";
import { toast } from "sonner";

type Data = any;
const addResourceUsage = async (data: Data) => {
  return await pb.collection("resource_usage").create(data);
};
const addResourceUsageCustom = async (data: Data) => {
  return await axios.post("http://127.0.0.1:8090/custom_records/", data, {
    headers: {
      Authorization: `${pb.authStore.token}`,
    },
  });
};
const updateResourceUsage = async ({
  id,
  data,
}: {
  id: string;
  data: Data;
}) => {
  return await pb.collection("resource_usage").update(id, data);
};
const deleteResourceUsageByid = async (id: string) => {
  return await pb.collection("resource_usage").delete(id);
};
const fetchAllResourceUsage = async () => {
  return await pb.collection("resource_usage").getFullList();
};
const fetchResourceUsageByid = async (id: string) => {
  return await pb.collection("resource_usage").getOne(id);
};
const fetchResourceUsageByLivestock = async (id: string) => {
  return await pb.collection("resource_usage").getFullList({
    filter: `livestock = "${id}"`,
    sort: "-created",
    expand: "resource",
  });
};

//list
export const useResourceUsageByLivestock = (id: string) => {
  return useQuery({
    queryKey: ["resource_usage_by_livestock", id],
    queryFn: () => fetchResourceUsageByLivestock(id),
  });
};

//list
export const useResourceUsage = () => {
  return useQuery({
    queryKey: ["resource_usage"],
    queryFn: fetchAllResourceUsage,
    staleTime: 10000,
  });
};
//create
export const useAddResourceUsageData = () => {
  return useMutation({
    mutationFn: addResourceUsage,
    onSuccess: () => {
      toast.success("Resource Usage  Added");
    },
    onError: (error) => {
      toast.error("Resource Usage Addition Failed!", {
        description: `${error}`,
      });
    },
  });
};
//create
export const useAddResourceUsageDataCustom = () => {
  return useMutation({
    mutationFn: addResourceUsageCustom,
    onSuccess: () => {
      toast.success("Resource Usage  Added");
    },
    onError: (error) => {
      toast.error("Resource Usage Addition Failed!", {
        description: `${error}`,
      });
    },
  });
};

//read
export const useResourceUsageByID = (id: string) => {
  return useQuery({
    queryKey: ["resource_usage", id],
    queryFn: () => fetchResourceUsageByid(id),
  });
};
//update
export const useUpdateResourceUsageData = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Data }) =>
      updateResourceUsage({ id, data }),
    onSuccess: () => {
      toast.success("Resource Usage  Updated");
    },
    onError: (error) => {
      toast.error("Resource Usage Update Failed!", {
        description: `${error}`,
      });
    },
  });
};

//delete
export const useDeleteResourceUsageByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteResourceUsageByid(id),
    onSuccess: () => {
      toast.success("Resource Usage  Deleted");
      queryClient.invalidateQueries({
        queryKey: ["resource_usage_by_livestock"],
      });
    },
    onError: (error) => {
      toast.error("Resource Usage Deletion Failed!", {
        description: `${error}`,
      });
    },
  });
};
