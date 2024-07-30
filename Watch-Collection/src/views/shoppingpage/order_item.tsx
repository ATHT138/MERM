import { Button, Card } from "@/components/ui";
import { axiosInstance } from "@/configs";
import { useDebounce } from "@/hooks";
import { OrderDetail } from "@/models";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import DialogCustom from "../dashboardpage/dialog";

interface OrderProps {
  order: OrderDetail;
  onQuantityUpdate: () => void;
}

const OrderItem = ({ order, onQuantityUpdate }: OrderProps) => {
  const [quantity, setQuantity] = useState<number>(order.quantity);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const debounceQuantity = useDebounce(quantity, 500);

  const onChangeQuantity = useCallback(
    async (quantity: number) => {
      try {
        await axiosInstance.put(`/carts/update-cart/${order.watch._id}`, {
          quantity,
        });
        onQuantityUpdate();
      } catch (err) {
        console.log(err);
      }
    },
    [order.watch._id, onQuantityUpdate]
  );

  const deleteItemInCart = async () => {
    await axiosInstance
      .delete(`/carts/update-cart/${order.watch._id}`)
      .then(() => {
        onQuantityUpdate();
        setIsDialogOpen(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (debounceQuantity !== order.quantity) {
      onChangeQuantity(debounceQuantity);
    }
  }, [debounceQuantity, onChangeQuantity, order.quantity]);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <Card className="flex flex-row justify-between p-2">
      <div className="flex gap-4 ">
        <img
          className="bg-cover rounded-lg size-28"
          src={order.watch.image}
          alt={order.watch.watchName}
        />
        <div className="p-3">
          <h1 className="text-xl font-semibold">{order.watch.watchName}</h1>
          <p>Price: $ {order.price}</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-3 pr-4">
        <div className="flex flex-row items-center gap-4 p-2 bg-gray-400 rounded-xl">
          <button type="button" onClick={handleIncreaseQuantity}>
            <Plus className="size-5" />
          </button>
          <p>{quantity}</p>
          <button type="button" onClick={handleDecreaseQuantity}>
            <Minus className="size-5" />
          </button>
        </div>
        <button onClick={() => setIsDialogOpen(true)}>
          <Trash2 size={24} />
        </button>
        <DialogCustom
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          children={
            <div>
              <h1>
                Are you sure you want to remove &nbsp;
                <strong>{order.watch.watchName}</strong>?
              </h1>
              <div className="flex justify-end gap-4 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={deleteItemInCart}>Delete</Button>
              </div>
            </div>
          }
        />
      </div>
    </Card>
  );
};

export default OrderItem;
