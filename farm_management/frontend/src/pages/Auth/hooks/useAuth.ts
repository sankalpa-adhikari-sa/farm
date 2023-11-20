import { useMutation } from "@tanstack/react-query";
import pb from "@/Pocketbase/pocketbase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
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
    onError: (error) => {
      toast.error("Login Failed", {
        description: `${error}`,
      });
    },
    onSuccess: () => {
      toast.success("Login Successful");
      naviagate("/");
    },
  });
};
