import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "@/Pocketbase/pocketbase";
import { toast } from "sonner";
type Data = any;
const addLivestock = async (data: Data) => {
  return await pb.collection("livestock").create(data);
};
const updateLivestockByid = async ({
  id,
  data,
}: {
  id: string;
  data: Data;
}) => {
  return await pb.collection("livestock").update(id, data);
};

const fetchAllLivestock = async () => {
  return await pb.collection("livestock").getFullList({
    expand: "livestock_type,rel_data",
  });
};
const fetchLivestockByid = async (id: string) => {
  return await pb.collection("livestock").getOne(id, {
    expand: "livestock_type",
    // fields: "id,dam_id, livestock_breed, livestock_tag_no, livestock_colour, livestock_gender, livestock_details, expand.livestock_type"
  });
};
const deleteLivestockByid = async (id: string) => {
  console.log("inside", id);
  return await pb.collection("livestock").delete(id);
};

export const useLivestock = () => {
  return useQuery({
    queryKey: ["livestock"],
    queryFn: fetchAllLivestock,
  });
};
export const useLivestockByID = (id: string) => {
  return useQuery({
    queryKey: ["livestock", id],
    queryFn: () => fetchLivestockByid(id),
  });
};
export const useDeleteLivestockByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteLivestockByid(id),
    onSuccess: () => {
      toast.success("Livestock Deleted");
      queryClient.invalidateQueries({ queryKey: ["livestock"] });
    },
    onError: (error) => {
      toast.error("Livestock Deletion Failed!", {
        description: `${error}`,
      });
    },
  });
};
export const useUpdateLivestockByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Data }) =>
      updateLivestockByid({ id, data }),
    onSuccess: () => {
      toast.success("Livestock Updated");
      queryClient.invalidateQueries({ queryKey: ["livestock"] });
    },
    onError: (error) => {
      toast.error("Livestock Update Failed!", {
        description: `${error}`,
      });
    },
  });
};
export const useAddLivestockData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addLivestock,
    onSuccess: (data) => {
      toast.success("Livestock Added");
      queryClient.setQueryData(["livestock"], (oldQueryData: any[]) => {
        return oldQueryData.concat({
          ...data,
        });
      });
    },
    onError: (error) => {
      toast.error("Livestock Addition Failed!", {
        description: `${error}`,
      });
    },
  });
};
