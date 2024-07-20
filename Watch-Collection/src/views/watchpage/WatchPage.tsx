import DataRenderer from "@/components/dataRender";
import useFetch from "@/hooks/useFetch";
import { Response, Watches } from "@/models";
import React, { useCallback, useMemo, useState } from "react";
import SearchFilter from "./SearchFilter";
import WatchList from "./WatchList";
interface WatchListProps {}

export interface ParamsSearcHFilter {
  watchName: string;
  brandName: string;
}

const WatchPage: React.FC<WatchListProps> = () => {
  const [searchFilter, setSearchFilter] = useState<ParamsSearcHFilter>({
    watchName: "",
    brandName: "",
  });

  const fetchOptions = useMemo(
    () => ({ params: searchFilter }),
    [searchFilter]
  );

  const {
    data: watchList,
    loading,
    error,
  } = useFetch<Response<Watches>>("/watches", fetchOptions);

  const handleSearchFilter = useCallback((searchFilter: ParamsSearcHFilter) => {
    setSearchFilter(searchFilter);
  }, []);

  return (
    <div className="container py-4">
      <div className="mb-4">
        <SearchFilter onChange={handleSearchFilter} />
      </div>
      <DataRenderer error={error} isLoading={loading}>
        <WatchList dataList={watchList?.data} />
      </DataRenderer>
    </div>
  );
};

export default WatchPage;
