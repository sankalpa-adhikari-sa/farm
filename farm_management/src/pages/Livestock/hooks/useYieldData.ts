import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "@/Pocketbase/pocketbase";

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
  return useMutation({ mutationFn: addYield });
};

//update
export const useUpdateYieldByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Data }) =>
      updateYieldByid({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["yield"] });
    },
  });
};

//delete
export const useDeleteYieldByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteYieldByid(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["yield"] });
    },
  });
};
