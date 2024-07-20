import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { DeleteBrand } from "@/features/brandAPI";
import { FormatType, formatFromISOString } from "@/lib/formatDate";
import { Brand } from "@/models";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PencilLine, Trash2 } from "lucide-react";

const brandColumns = (
  refetch: () => void,
  handleEditBrand: (brand: Brand) => void
): ColumnDef<Brand>[] => [
  {
    header: "No.",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "brandName",
    header: "Brand Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return formatFromISOString(createdAt, FormatType.DATETIME);
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const updatedAt = row.original.updatedAt;
      return formatFromISOString(updatedAt, FormatType.DATETIME);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleEditBrand(brand)}>
              <PencilLine className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const success = await DeleteBrand(brand._id);
                if (success) {
                  refetch();
                }
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Detele
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default brandColumns;
