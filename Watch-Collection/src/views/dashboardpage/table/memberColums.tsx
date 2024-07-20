import { FormatType, formatFromISOString } from "@/lib/formatDate";
import { User } from "@/models";
import { ColumnDef } from "@tanstack/react-table";

const memberColums: ColumnDef<User>[] = [
  {
    header: "No.",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "memberName",
    header: "Username",
  },
  {
    accessorKey: "YOB",
    header: "Year Of Birth",
  },
  {
    accessorKey: "name",
    header: "Full Name",
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
];

export default memberColums;
