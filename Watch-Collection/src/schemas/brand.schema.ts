import { z } from "zod";

export const BrandSchema = z.object({
  brandName: z.string().min(3, "Name is required").max(40),
});
