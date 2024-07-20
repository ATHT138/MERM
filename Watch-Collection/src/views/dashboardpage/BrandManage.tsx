import { Button } from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { Brand, Response } from "@/models";
import React, { useState } from "react";
import DialogCustom from "./dialog";
import FormBrand from "./form/FormBrand";
import { DataTable } from "./table/DataTable";
import brandColumns from "./table/brandColumns";

interface BrandListProps {}

const BrandList: React.FC<BrandListProps> = () => {
  const { data: brands, refetch } = useFetch<Response<Brand>>(`/brands`);

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleEditBrand = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedBrand(null);
  };

  const handleCreateBrand = () => {
    setSelectedBrand(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-18">
      <div className="flex items-center justify-between py-4">
        <Button
          variant="outline"
          className="text-white bg-black"
          onClick={handleCreateBrand}
        >
          Create
        </Button>
      </div>
      {brands && (
        <DataTable
          columns={brandColumns(refetch, handleEditBrand)}
          data={brands.data}
        />
      )}
      <DialogCustom
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        children={
          <FormBrand
            reFresh={refetch}
            brand={selectedBrand}
            onClose={handleCloseDialog}
          />
        }
      />
    </div>
  );
};

export default BrandList;
