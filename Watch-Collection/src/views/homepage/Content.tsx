import DataRenderer from "@/components/dataRender";
import { Button } from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { Response, Watches } from "@/models";
import { Link } from "react-router-dom";
import WatchList from "../watchpage/WatchList";

const Content = () => {
  const {
    data: watches,
    error,
    loading,
  } = useFetch<Response<Watches>>("/watches");

  return (
    <div className="container flex flex-col items-center gap-6 p-4 mx-auto mt-4 mb-4">
      <h1 className="text-3xl font-bold text-center md:text-5xl">
        More popular watch
      </h1>
      <DataRenderer isLoading={loading} error={error}>
        <WatchList dataList={watches?.data} maxItems={3} />
      </DataRenderer>
      <Link to="/watches">
        <Button className="px-6 py-2 mt-4">See More</Button>
      </Link>
    </div>
  );
};

export default Content;
