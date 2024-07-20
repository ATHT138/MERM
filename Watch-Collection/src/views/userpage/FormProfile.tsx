import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "@/schemas";
import { ProfileEdit } from "./ProfilePage";
import React from "react";
import { axiosInstance } from "../../configs";
import { toast } from "react-toastify";
import { setItem } from "../../lib/localStorage";

const generateYears = (startYear: number, endYear: number) => {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return years;
};

interface FromProfileProps {
  userProfile: ProfileEdit;
  setEditProfile: React.Dispatch<React.SetStateAction<number>>;
  onProfileUpdate: () => void;
}

const FormProfile: React.FC<FromProfileProps> = ({
  userProfile,
  setEditProfile,
  onProfileUpdate,
}) => {
  const years = generateYears(1950, new Date().getFullYear());

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: userProfile.name || "",
      YOB: userProfile.YOB?.toString() || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
    await axiosInstance
      .put<{ token: string }>("/members/profile", {
        name: values.name,
        YOB: parseInt(values.YOB),
      })
      .then((res) => {
        setItem("token", res.data.token);
        setEditProfile(0);
        onProfileUpdate();
        toast.success("Profile updated successfully");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <Input {...field} placeholder="Your name" />
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="YOB"
              render={({ field }) => {
                return (
                  <FormItem className="mt-5">
                    <FormLabel>Year of birthday</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {years.map((year, index) => (
                          <SelectItem key={index} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default FormProfile;
