import { z } from "zod";

export const WatchSchema = z.object({
  watchName: z.string().min(3, "Name is required").max(40),
  brandName: z.string().min(3, "Brand is required").max(40),
  price: z.string().min(1, "Price is required"),
  image: z.string().min(1, "Image is required"),
  watchDescription: z.string().min(1, "Description is required"),
  Automatic: z.boolean(),
});
