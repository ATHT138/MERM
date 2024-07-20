import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { DeleteWatch } from "@/features";
import { Watches } from "@/models";
import { ColumnDef } from "@tanstack/react-table";
import {
  CircleCheck,
  MoreHorizontal,
  OctagonX,
  PencilLine,
  Trash2,
} from "lucide-react";

const WatchColumns = (
  refetch: () => void,
  handleEditWatch: (watch: Watches) => void
): ColumnDef<Watches>[] => [
  {
    header: "No.",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "watchName",
    header: "Watch Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.price;
      return <span className="p-2 bg-blue-300 rounded-md">$ {price}</span>;
    },
  },
  {
    accessorKey: "brand.brandName",
    header: "Brand",
  },
  {
    accessorKey: "Automatic",
    header: "Automatic",
    cell: ({ row }) => {
      const isAutomatic = row.original.Automatic;
      return isAutomatic ? (
        <CircleCheck className="text-green-500" />
      ) : (
        <OctagonX className="text-red-500" />
      );
    },
  },
  {
    accessorKey: "watchDescription",
    header: "Description",
    cell: ({ row }) => {
      const description = row.original.watchDescription;
      const maxLength = 50; // Độ dài tối đa của description
      const truncatedDescription =
        description.length > maxLength
          ? `${description.substring(0, maxLength)}...`
          : description;

      return <span title={description}>{truncatedDescription}</span>;
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const watchImageUrl = row.original.image;
      return (
        <img
          src={watchImageUrl}
          alt="Watch"
          className="object-cover w-32 h-32 rounded-md"
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const watch = row.original;

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
            <DropdownMenuItem
              onClick={(data) => {
                handleEditWatch(watch);
              }}
            >
              <PencilLine className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const success = await DeleteWatch(watch._id);
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

export default WatchColumns;
