import { Button } from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { Response, Watches } from "@/models";
import { useCallback, useMemo, useState } from "react";
import SearchFilter from "../watchpage/SearchFilter";
import { ParamsSearcHFilter } from "../watchpage/WatchPage";
import DialogCustom from "./dialog";
import FormWatch from "./form/FormWatch";
import { DataTable } from "./table/DataTable";
import WatchColumns from "./table/watchColumns";

const WatchManage = () => {
  const [searchFilter, setSearchFilter] = useState<ParamsSearcHFilter>({
    watchName: "",
    brandName: "",
  });

  const [selectedWatch, setSelectedWatch] = useState<Watches | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchOptions = useMemo(
    () => ({ params: searchFilter }),
    [searchFilter]
  );

  const { data: watches, refetch } = useFetch<Response<Watches>>(
    "/watches",
    fetchOptions
  );

  const handleSearchFilter = useCallback((searchFilter: ParamsSearcHFilter) => {
    setSearchFilter(searchFilter);
  }, []);

  const handleEditWatch = (watch: Watches) => {
    setSelectedWatch(watch);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedWatch(null);
  };

  const handleCreateWatch = () => {
    setSelectedWatch(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="container py-10 mx-auto">
      <div className="flex items-center justify-between py-4">
        <SearchFilter onChange={handleSearchFilter} />
        <Button
          variant="outline"
          className="text-white bg-black"
          onClick={handleCreateWatch}
        >
          Create
        </Button>
      </div>
      {watches && (
        <DataTable
          columns={WatchColumns(refetch, handleEditWatch)}
          data={watches.data}
        />
      )}
      <DialogCustom
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        children={
          <FormWatch
            reFresh={refetch}
            watch={selectedWatch}
            onClose={handleCloseDialog}
          />
        }
      />
    </div>
  );
};

export default WatchManage;
