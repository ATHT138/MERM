import { axiosInstance } from "@/configs";
import { toast } from "react-toastify";

export const DeleteWatch = async (id: string) => {
  try {
    await axiosInstance.delete(`/watches/${id}`);
    toast.success("Watch deleted successfully");
    return true;
  } catch (error) {
    toast.error("Failed to delete watch");
    console.log(error);
    return false;
  }
};
