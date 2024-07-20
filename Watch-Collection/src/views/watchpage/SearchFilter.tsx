import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { Brand, ResponseSingle } from "@/models";
import DataRenderer from "../../components/dataRender";
import { Search } from "lucide-react";
import { memo, useState } from "react";

type SearchFilterProps = {
  onChange: (filters: { brandName: string; watchName: string }) => void;
};

/*eslint-disable*/
const SearchFilter: React.FC<SearchFilterProps> = ({ onChange }) => {
  const [brandName, setBrandName] = useState<string>("");
  const [watchName, setWatchName] = useState<string>("");
  const {
    data: brands,
    error,
    loading,
  } = useFetch<ResponseSingle<Brand[]>>("/brands");

  const handleSubmit = () => {
    const selectedBrand = brandName === "all-brands" ? "" : brandName;
    onChange({ brandName: selectedBrand, watchName });
  };

  const handleBrandChange = (value: string) => {
    setBrandName(value);
  };

  return (
    <div className="flex flex-col items-start justify-start gap-2 sm:flex-row sm:items-center">
      <Input
        className="w-full sm:w-[400px]"
        placeholder="Search watch"
        value={watchName}
        onChange={(e) => setWatchName(e.target.value)}
      />
      <Select onValueChange={handleBrandChange}>
        <SelectTrigger className="w-full sm:w-[260px]">
          <SelectValue placeholder="Select a brand" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all-brands">All Brand</SelectItem>
            <DataRenderer error={error} isLoading={loading}>
              {brands?.data?.map((brand) => (
                <SelectItem key={brand._id} value={brand.brandName}>
                  {brand.brandName}
                </SelectItem>
              ))}
            </DataRenderer>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button className="w-full sm:w-auto" onClick={handleSubmit}>
        <Search className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default memo(SearchFilter);
