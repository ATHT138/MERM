import { axiosInstance } from "../configs";
import { Cart, ResponseSingle } from "../models";

export const AddToCart = async (
  watchId: string,
  quantity: number
): Promise<ResponseSingle<Cart>> => {
  return await axiosInstance.post("/carts/add-to-cart", {
    watchId,
    quantity,
  });
};

export const DeleteCart = async (id: string) => {
  return await axiosInstance.delete(`/carts/checkout/${id}`);
};
