import DataRenderer from "@/components/dataRender";
import useFetch from "@/hooks/useFetch";
import { Response, Watches } from "@/models";
import React, { useCallback, useMemo, useState } from "react";
import SearchFilter from "./SearchFilter";
import WatchList from "./WatchList";
import FilterBrand from "./FilterBrand";
interface WatchListProps {}

export interface ParamsSearcHFilter {
  watchName: string;
  brandName: string;
}

const WatchPage: React.FC<WatchListProps> = () => {
  const [watchName, setWatchName] = useState<string>("");
  const [brandName, setBrandName] = useState<string[]>([]);

  const fetchOptions = useMemo(
    () => ({ params: { watchName, brandName } }),
    [watchName, brandName]
  );

  const {
    data: watchList,
    loading,
    error,
  } = useFetch<Response<Watches>>("/watches", fetchOptions);

  const handleSearch = useCallback((watchName: string) => {
    setWatchName(watchName);
  }, []);

  const handleBrand = useCallback((brandName: string[]) => {
    setBrandName(brandName);
  }, []);

  return (
    <div className="px-20 py-4">
      <div className="flex flex-row flex-1 gap-5">
        <FilterBrand handleBrand={handleBrand} />
        <div className="mb-4 ">
          <SearchFilter className="mb-5" onChange={handleSearch} />
          <DataRenderer error={error} isLoading={loading}>
            <WatchList dataList={watchList?.data} />
          </DataRenderer>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
