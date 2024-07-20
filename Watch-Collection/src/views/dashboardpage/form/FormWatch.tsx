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
  Switch,
  Textarea,
} from "@/components/ui";
import { axiosInstance } from "@/configs";
import { ResponseSingle, WatchForm, Watches } from "@/models";
import { WatchSchema } from "@/schemas/watch.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface WatchFormProps {
  reFresh: () => void;
  watch?: Watches | null;
  onClose: () => void;
}

const FormWatch: React.FC<WatchFormProps> = ({ reFresh, watch, onClose }) => {
  const form = useForm<z.infer<typeof WatchSchema>>({
    resolver: zodResolver(WatchSchema),
    defaultValues: {
      watchName: watch?.watchName || "",
      brandName: watch?.brand.brandName || "",
      price: watch?.price.toString() || "",
      image: watch?.image || "",
      watchDescription: watch?.watchDescription || "",
      Automatic: watch?.Automatic || false,
    },
  });

  const onSubmit = async (values: z.infer<typeof WatchSchema>) => {
    try {
      if (watch) {
        const newWatch: WatchForm = {
          watchName: values.watchName,
          brandName: values.brandName,
          price: parseInt(values.price),
          image: values.image,
          watchDescription: values.watchDescription,
          Automatic: values.Automatic,
        };
        await axiosInstance.put(`/watches/${watch._id}`, newWatch);
        toast.success("Watch updated successfully");
      } else {
        const res = await axiosInstance.post<ResponseSingle<{ id: string }>>(
          "/watches",
          values
        );
        console.log(res.data.data?.id);
        toast.success("Watch created successfully");
      }
      reFresh(); // Refresh data on success
      onClose(); // Close dialog on success
    } catch (err) {
      console.error(err);
      toast.error("Failed to update or create watch");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-bold">
            {watch ? "Edit watch" : "Create new watch"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <FormField
              control={form.control}
              name="watchName"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Watch</FormLabel>
                  <FormControl>
                    <Input placeholder="Watch name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Brand name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Price..." {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Automatic"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-6">
                    <FormLabel className="mb-3">Automatic</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-6">
                  <FormLabel className="mb-3">Image</FormLabel>
                  <FormControl>
                    <Input placeholder="Image URL..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="watchDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-6">
                  <FormLabel className="mb-3">Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-5">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit">{watch ? "Update" : "Submit"}</Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default FormWatch;
