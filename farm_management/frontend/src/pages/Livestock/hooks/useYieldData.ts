import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "@/Pocketbase/pocketbase";
import { toast } from "sonner";

type Data = any;
const addYield = async (data: Data) => {
  return await pb.collection("yield").create(data);
};
const fetchAllYield = async () => {
  return await pb.collection("yield").getFullList();
};
const fetchYieldByLivestock = async (id: string) => {
  return await pb.collection("yield").getFullList({
    filter: `livestock = "${id}"`,
    sort: "-yield_date",
    expand: "storage_location",
  });
};
const fetchYieldTypesByLivestock = async (id: string) => {
  const value_ret = await pb.collection("livestock").getOne(id, {
    fields: "expand.livestock_type.livestock_type_yield",
    expand: "livestock_type",
  });
  //@ts-ignore
  const type_data = value_ret.expand.livestock_type.livestock_type_yield;
  // console.log(type_data);
  return type_data;
};
export const useYieldTypeByLivestockID = (livestock_id: string) => {
  return useQuery({
    queryKey: ["livestock_yield_types", livestock_id],
    queryFn: () => fetchYieldTypesByLivestock(livestock_id),
  });
};

//show only one
const fetchYieldByid = async (id: string) => {
  return await pb.collection("yield").getOne(id, {
    // expand: 'livestock_type',
    // fields: "id,dam_id, livestock_breed, livestock_tag_no, livestock_colour, livestock_gender, livestock_details, expand.livestock_type"
  });
};

const deleteYieldByid = async (id: string) => {
  return await pb.collection("yield").delete(id);
};

const updateYieldByid = async ({ id, data }: { id: string; data: Data }) => {
  return await pb.collection("yield").update(id, data);
};
//list by livestock
export const useYieldByLivestock = (id: string) => {
  return useQuery({
    queryKey: ["yield", id],
    queryFn: () => fetchYieldByLivestock(id),
  });
};

//list all
export const useYield = () => {
  return useQuery({
    queryKey: ["yield"],
    queryFn: fetchAllYield,
    staleTime: 10000,
  });
};
export const useYieldByID = (id: string) => {
  return useQuery({
    queryKey: ["yield", id],
    queryFn: () => fetchYieldByid(id),
  });
};
//create
export const useAddYieldData = () => {
  return useMutation({
    mutationFn: addYield,
    onSuccess: () => {
      toast.success("Yield Added");
    },
    onError: (error) => {
      toast.error("Yield Addition Failed!", {
        description: `${error}`,
      });
    },
  });
};

//update
export const useUpdateYieldByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Data }) =>
      updateYieldByid({ id, data }),
    onSuccess: () => {
      toast.success("Yield Updated");
      queryClient.invalidateQueries({ queryKey: ["yield"] });
    },
    onError: (error) => {
      toast.error("Yield Update Failed!", {
        description: `${error}`,
      });
    },
  });
};

//delete
export const useDeleteYieldByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteYieldByid(id),
    onSuccess: () => {
      toast.success("Yield Deleted");
      queryClient.invalidateQueries({ queryKey: ["yield"] });
    },
    onError: (error) => {
      toast.error("Yield Deletion Failed!", {
        description: `${error}`,
      });
    },
  });
};
