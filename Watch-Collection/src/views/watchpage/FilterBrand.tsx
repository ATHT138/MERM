import React, { useState } from "react";
import DataRenderer from "@/components/dataRender";
import { Checkbox } from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { Brand, ResponseSingle } from "@/models";
import { cn } from "@/lib/utils";
import { CheckedState } from "@radix-ui/react-checkbox";

interface FilterBrandProps {
  className?: string;
  handleBrand: (brandName: string[]) => void;
}

const FilterBrand: React.FC<FilterBrandProps> = ({
  className,
  handleBrand,
}) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const {
    data: brandList,
    loading,
    error,
  } = useFetch<ResponseSingle<Brand[]>>("/brands");

  const handleCheckedChange = (brandName: string, checked: CheckedState) => {
    const updatedBrands = checked
      ? [...selectedBrands, brandName]
      : selectedBrands.filter((name) => name !== brandName);
    setSelectedBrands(updatedBrands);
    handleBrand(updatedBrands);
  };

  return (
    <div className={cn("px-6 py-4 bg-gray-100 rounded-xl h-full", className)}>
      <h3 className="w-full px-20 py-1 text-lg font-bold text-center bg-gray-300 rounded-xl">
        Brand
      </h3>
      <DataRenderer error={error} isLoading={loading}>
        <div className="flex flex-col gap-3 px-2 py-10">
          {brandList?.data?.map((brand, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                value={brand.brandName}
                onCheckedChange={(checked: CheckedState) =>
                  handleCheckedChange(brand.brandName, checked)
                }
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {brand.brandName}
              </label>
            </div>
          ))}
        </div>
      </DataRenderer>
    </div>
  );
};

export default FilterBrand;
