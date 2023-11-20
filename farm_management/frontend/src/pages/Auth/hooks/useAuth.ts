import { useMutation } from "@tanstack/react-query";
import pb from "@/Pocketbase/pocketbase";
import { useNavigate } from "react-router-dom";
import { CustomToast } from "../customtoast";
type Data = any;

const addUser = async (data: Data) => {
  return await pb.collection("users").create(data);
};
const loginUser = async (data: Data) => {
  return await pb
    .collection("users")
    .authWithPassword(data.email, data.password);
};
export const useAddUserData = () => {
  return useMutation({
    mutationFn: addUser,
  });
};
export const useLoginUser = () => {
  const naviagate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onError: () => {
      CustomToast({
        title: "Scheduled: Catch up",
        description: "Friday, February 10, 2023 at 5:57 PM",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      CustomToast({
        title: "Scheduled: Catch up",
        description: "Friday, February 10, 2023 at 5:57 PM",
        variant: "success",
      });
      naviagate("/");
    },
  });
};
