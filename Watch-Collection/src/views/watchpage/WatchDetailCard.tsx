import { WatchDetail } from "@/models";
import RatingRender from "../../components/ratingRender";
import { FormatType, formatFromISOString } from "../../lib/formatDate";

interface WatchDetailCardProps {
  data?: WatchDetail;
}

const WatchDetailCard = ({ data }: WatchDetailCardProps) => {
  return (
    <div className="relative grid grid-cols-1 gap-4 mt-4 overflow-hidden bg-white rounded-lg shadow-md sm:grid-cols-2">
      <div className="overflow-hidden">
        <img
          className="object-cover object-center w-full h-auto"
          src={data?.watch.image}
          alt={data?.watch.watchName}
        />
      </div>
      <div className="p-6 pb-16">
        <h1 className="mb-2 text-6xl font-bold">{data?.watch.watchName}</h1>
        <div className="flex items-center">
          <RatingRender rating={data?.totalRate} />
          &nbsp;
          <div className="font-semibold text-gray-500">
            ({data?.watch.comments.length} comments)
          </div>
        </div>
        <div className="ml-1 font-semibold text-gray-500">
          {formatFromISOString(
            data?.watch.createdAt ?? "",
            FormatType.DATETIME
          )}
        </div>
        <p className="mt-5 mb-4 text-gray-700">
          Brand: <span className="font-semibold">{data?.nameBrand}</span>
        </p>
        <p className="mb-4 text-gray-700">
          Price: <span className="font-semibold">$ {data?.watch.price}</span>
        </p>
        <p>Description:</p>
        <p className="p-2 mt-4 mb-4 text-gray-700 rounded-md bg-slate-200">
          {data?.watch.watchDescription}
        </p>
        <div className="absolute flex gap-4 right-5 bottom-5">
          <button className="px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-300">
            Add to Cart
          </button>
          <button className="px-4 py-2 ml-4 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-300">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchDetailCard;
