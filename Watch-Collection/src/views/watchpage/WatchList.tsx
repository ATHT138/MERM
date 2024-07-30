import { Watches } from "@/models/watch";
import WatchCard from "./WatchCard";

interface WatchListProps {
  dataList?: Watches[];
  maxItems?: number;
}

const WatchList = ({ dataList, maxItems }: WatchListProps) => {
  if (!dataList || dataList.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full text-5xl font-bold text-gray-500 p-28">
        No watches found
      </div>
    );
  }

  const limitedDataList = maxItems ? dataList.slice(0, maxItems) : dataList;

  return (
    <div className="flex flex-wrap justify-center gap-4 md:justify-start">
      {limitedDataList.map((watch) => (
        <WatchCard key={watch._id} watch={watch} />
      ))}
    </div>
  );
};

export default WatchList;
