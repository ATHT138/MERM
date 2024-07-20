import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import { axiosInstance } from "@/configs";
import { Brand } from "@/models";
import { BrandSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface FormBrandProps {
  reFresh: () => void;
  brand?: Brand | null;
  onClose: () => void;
}

const FormBrand: React.FC<FormBrandProps> = ({ reFresh, brand, onClose }) => {
  const form = useForm<z.infer<typeof BrandSchema>>({
    resolver: zodResolver(BrandSchema),
    defaultValues: {
      brandName: brand?.brandName || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof BrandSchema>) => {
    if (brand) {
      await axiosInstance
        .put(`/brands/${brand._id}`, values)
        .then(() => {
          toast.success("Brand updated successfully");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Brand name already exists");
        });
      reFresh();
      onClose();
    } else {
      await axiosInstance
        .post("/brands", values)
        .then(() => {
          toast.success("Brand created successfully");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Brand name already exists");
        });
    }
    reFresh();
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-bold">
            Create new brand
          </AlertDialogTitle>
          <AlertDialogDescription>
            <FormField
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Brand </FormLabel>
                  <FormControl>
                    <Input placeholder="Brand name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-5">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit">Submit</Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default FormBrand;
