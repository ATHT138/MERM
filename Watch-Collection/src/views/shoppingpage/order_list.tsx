import { OrderDetail } from "@/models";
import OrderItem from "./order_item";

interface OrderProps {
  data?: OrderDetail[];
  onQuantityUpdate: () => void;
}

const OrderList = ({ data, onQuantityUpdate }: OrderProps) => {
  if (data === undefined) return <div>Your cart is empty</div>;
  return (
    <div className="flex flex-col gap-4">
      {data.map((order, index) => (
        <OrderItem
          key={index}
          order={order}
          onQuantityUpdate={onQuantityUpdate}
        />
      ))}
    </div>
  );
};

export default OrderList;
