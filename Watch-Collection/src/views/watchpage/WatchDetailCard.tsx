import RatingRender from "@/components/ratingRender";
import { Badge, Separator } from "@/components/ui";
import { FormatType, formatFromISOString } from "@/lib/formatDate";
import { WatchDetail } from "@/models";
import { AddToCart } from "../../features/cardApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface WatchDetailCardProps {
  data?: WatchDetail;
}

const WatchDetailCard = ({ data }: WatchDetailCardProps) => {
  const navigator = useNavigate();
  const onClickAddToCard = () => {
    const addData = AddToCart(data?.watch._id ?? "", 1);

    addData
      .then(() => {
        toast.success("Add to cart successfully");
      })
      .catch(() => {
        toast.error("Please login to add to cart");
      });
  };

  const onClickBuyNow = () => {
    const addData = AddToCart(data?.watch._id ?? "", 1);

    addData
      .then(() => {
        navigator("/checkout");
      })
      .catch(() => {
        toast.error("Please login to add to cart");
      });
  };

  return (
    <div className="relative grid grid-cols-1 gap-4 mt-4 overflow-hidden bg-white rounded-lg shadow-md sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div className="overflow-hidden">
        <img
          className="object-cover object-center w-full h-auto"
          src={data?.watch.image}
          alt={data?.watch.watchName}
        />
      </div>
      <div className="col-span-1 p-6 pb-16 lg:col-span-2 xl:col-span-3">
        <div className="flex flex-wrap items-center justify-start gap-5 mb-2">
          <h1 className="text-2xl font-bold sm:text-4xl">
            {data?.watch.watchName}
          </h1>
          <Badge
            color="yellow"
            className="text-sm sm:text-xl whitespace-nowrap"
          >
            $ {data?.watch.price}
          </Badge>
        </div>
        <div className="flex flex-wrap items-center mb-3 space-x-3 text-sm sm:space-x-1 lg:space-x-2 lg:h-5">
          <RatingRender rating={data?.totalRate} />
          <div className="font-semibold text-gray-500">
            ({data?.watch.comments.length} comments)
          </div>
          <Separator orientation="vertical" />
          <p className="text-gray-700">
            <span className="font-semibold">{data?.nameBrand}</span>
          </p>
        </div>
        <div className="mb-4 ml-1 font-semibold text-gray-500">
          {formatFromISOString(
            data?.watch.createdAt ?? "",
            FormatType.DATETIME
          )}
        </div>

        <p>Description:</p>
        <p className="p-2 mt-2 mb-4 text-gray-700 rounded-md bg-slate-200">
          {data?.watch.watchDescription}
        </p>
        <div className="absolute flex flex-wrap gap-4 right-5 bottom-5">
          <button
            className="px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-300"
            onClick={onClickAddToCard}
          >
            Add to Cart
          </button>
          <button
            className="px-4 py-2 ml-4 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-300"
            onClick={() => onClickBuyNow()}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchDetailCard;
