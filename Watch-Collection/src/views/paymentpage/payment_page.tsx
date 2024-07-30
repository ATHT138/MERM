import { useNavigate } from "react-router-dom";
import DataRenderer from "../../components/dataRender";
import { Button, Card } from "../../components/ui";
import useFetch from "../../hooks/useFetch";
import { Cart, ResponseSingle } from "../../models";
import { formatTotal } from "../shoppingpage/shopping_page";
import { DeleteCart } from "../../features/cardApi";
import { toast } from "react-toastify";
import { useState } from "react";
import Show from "../../lib/show";
import { BadgeCheck } from "lucide-react";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [payment, setPayment] = useState<boolean>(false);
  const {
    data: order,
    loading,
    error,
  } = useFetch<ResponseSingle<Cart>>("/carts");

  const onClickPayment = async (id: string) => {
    const deleteData = DeleteCart(id);

    deleteData
      .then(() => {
        setPayment(true);
        toast.success("Payment Successful");
      })
      .catch(() => {
        toast.error("Please login to add to cart");
      });
  };

  return (
    <div className="container py-8 mx-auto">
      <Card className="w-full max-w-4xl p-8 mx-auto shadow-lg">
        <h1 className="w-full mb-6 text-3xl font-semibold text-center text-gray-600">
          Your cart items
        </h1>

        <Show>
          <Show.When isTrue={payment}>
            <div className="flex items-center justify-center w-full">
              <BadgeCheck className="text-green-500 size-32" />
            </div>
          </Show.When>
          <Show.Else>
            <DataRenderer isLoading={loading} error={error}>
              {order?.data?.orderDetails.map((order, index) => (
                <Card
                  key={index}
                  className="flex flex-row items-center justify-between p-4 mb-4 shadow-md"
                >
                  <div className="flex flex-row items-center gap-6">
                    <img
                      src={order.watch.image}
                      alt={order.watch.watchName}
                      className="object-cover w-20 h-20"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-700">
                        {order.watch.watchName}
                      </h2>
                      <p className="text-gray-500 ">Price: ${order.price}</p>
                    </div>
                  </div>
                  <div className="p-5 text-xl font-bold ">
                    <div className="p-3 text-white rounded-md bg-slate-400">
                      {order.quantity}
                    </div>
                  </div>
                </Card>
              ))}
            </DataRenderer>
          </Show.Else>
        </Show>
        <div
          className={`flex flex-col justify-end mt-8 ${
            payment ? "items-center" : "items-end"
          }`}
        >
          <Show>
            <Show.When isTrue={!payment}>
              <p className="text-lg font-semibold text-gray-800 ">
                Total: ${formatTotal(order?.data?.total || 0)}
              </p>
              <div className="space-x-3">
                <Button onClick={() => navigate("/shopping-cart")}>
                  Back to Cart
                </Button>
                <Button
                  onClick={() => {
                    onClickPayment(order?.data?._id || "");
                  }}
                  className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                >
                  Pay to Checkout
                </Button>
              </div>
            </Show.When>
            <Show.Else>
              <Button onClick={() => navigate("/shopping-cart")}>
                Back to Cart
              </Button>
            </Show.Else>
          </Show>
        </div>
      </Card>
    </div>
  );
};
export default PaymentPage;
