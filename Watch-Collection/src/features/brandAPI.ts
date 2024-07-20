import { toast } from "react-toastify";
import { axiosInstance } from "@/configs";

export const DeleteBrand = async (id: string) => {
  try {
    await axiosInstance.delete(`/brands/${id}`);
    toast.success("Brand deleted successfully");
    return true;
  } catch (err) {
    toast.error("Brand deletion failed");
    console.log(err);
    return false;
  }
};
