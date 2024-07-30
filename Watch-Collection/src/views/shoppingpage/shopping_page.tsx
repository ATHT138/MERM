import { Button } from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import Show from "@/lib/show";
import { Cart, ResponseSingle } from "@/models";
import { ShoppingBag } from "lucide-react";
import OrderList from "./order_list";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const formatTotal = (amount: number): string => {
  const formattedAmount = amount.toFixed(2);

  const [integerPart, decimalPart] = formattedAmount.split(".");

  const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${integerWithCommas}.${decimalPart}`;
};

const ShoppingPage = () => {
  const navigator = useNavigate();
  const { data: order, refetch } = useFetch<ResponseSingle<Cart>>("/carts");

  return (
    <div className="container flex flex-col w-full h-full gap-8 py-6 px-9">
      <Show>
        <Show.When
          isTrue={
            order?.data?.orderDetails === undefined ||
            order.data.orderDetails.length === 0
          }
        >
          <div className="flex flex-col items-center justify-center w-full h-screen gap-8 text-3xl font-semibold text-gray-500">
            <h1 className="text-5xl font-semibold text-gray-500">
              Shopping Page
            </h1>
            <ShoppingBag className="size-36" />
            <div>Your cart is empty</div>
          </div>
        </Show.When>
        <Show.Else>
          <h1 className="text-5xl font-semibold text-gray-500">
            Shopping Page
          </h1>
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex-1">
              <OrderList
                data={order?.data?.orderDetails}
                onQuantityUpdate={refetch}
              />
            </div>
            <div className="w-full md:w-1/3">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="text-xl font-semibold text-gray-500">
                  Items ({order?.data?.orderDetails.length})
                </div>
                <div className="mt-2 text-3xl font-semibold text-gray-500">
                  $ {formatTotal(order?.data?.total || 0)}
                </div>
                <Button
                  variant="outline"
                  disabled={
                    order?.data?.orderDetails === undefined ||
                    order.data.orderDetails.length === 0
                  }
                  onClick={() => {
                    console.log(order?.data?.orderDetails.length);

                    navigator("/checkout");
                  }}
                  className="w-full mt-4 text-white bg-slate-500"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </Show.Else>
      </Show>
    </div>
  );
};

export default ShoppingPage;
