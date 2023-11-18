import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "@/Pocketbase/pocketbase";
import axios from "axios";

type Data = any;
const addResourceUsage = async (data: Data) => {
  return await pb.collection("resource_usage").create(data);
};
const addResourceUsageCustom = async (data: Data) => {
  return await axios.post("http://127.0.0.1:8090/custom_records/", data);
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
  return useMutation({ mutationFn: addResourceUsage });
};
//create
export const useAddResourceUsageDataCustom = () => {
  return useMutation({ mutationFn: addResourceUsageCustom });
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
  });
};

//delete
export const useDeleteResourceUsageByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteResourceUsageByid(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resource_usage"] });
    },
  });
};
