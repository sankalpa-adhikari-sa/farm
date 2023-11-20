import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "@/Pocketbase/pocketbase";
import { toast } from "sonner";
type Data = any;
const addMeasurement = async (data: Data) => {
  return await pb.collection("measurement").create(data);
};
const updateMeasurement = async ({ id, data }: { id: string; data: Data }) => {
  return await pb.collection("measurement").update(id, data);
};
const deleteMeasurementByid = async (id: string) => {
  return await pb.collection("measurement").delete(id);
};
const fetchAllMeasurement = async () => {
  return await pb.collection("measurement").getFullList();
};
const fetchMeasurementByid = async (id: string) => {
  return await pb.collection("measurement").getOne(id);
};
const fetchMeasurementByLivestock = async (id: string) => {
  return await pb.collection("measurement").getFullList({
    filter: `livestock = "${id}"`,
    sort: "-recorded_date",
  });
};

//list
export const useMeasurement = () => {
  return useQuery({
    queryKey: ["measurement"],
    queryFn: fetchAllMeasurement,
    staleTime: 10000,
  });
};
//list by livestock
export const useMeasurementByLivestock = (id: string) => {
  return useQuery({
    queryKey: ["measurement", id],
    queryFn: () => fetchMeasurementByLivestock(id),
  });
};

//create
export const useAddMeasurementData = () => {
  return useMutation({
    mutationFn: addMeasurement,
    onSuccess: () => {
      toast.success("Measurement  Added");
    },
    onError: (error) => {
      toast.error("Measurement Addition Failed!", {
        description: `${error}`,
      });
    },
  });
};

//read
export const useMeasurementByID = (id: string) => {
  return useQuery({
    queryKey: ["measurement", id],
    queryFn: () => fetchMeasurementByid(id),
  });
};
//update
export const useUpdateMeasurementData = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Data }) =>
      updateMeasurement({ id, data }),
    onSuccess: () => {
      toast.success("Measurement Updated");
    },
    onError: (error) => {
      toast.error("Measurement Update Failed!", {
        description: `${error}`,
      });
    },
  });
};

//delete
export const useDeleteMeasurementByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMeasurementByid(id),
    onSuccess: () => {
      toast.success("Measurement Deleted");
      queryClient.invalidateQueries({ queryKey: ["measurement"] });
    },
    onError: (error) => {
      toast.error("Measurement Deletion Failed!", {
        description: `${error}`,
      });
    },
  });
};
