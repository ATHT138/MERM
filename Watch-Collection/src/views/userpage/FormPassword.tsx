import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import { axiosInstance } from "@/configs";
import { PasswordSchema } from "@/schemas";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";

interface ResponsePassword {
  password: string;
  newPassword: string;
}

interface FormPasswordProps {
  setEditProfile: React.Dispatch<React.SetStateAction<number>>;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormPassword: React.FC<FormPasswordProps> = ({
  setEditProfile,
  setDialogOpen,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PasswordSchema>) => {
    const data: ResponsePassword = {
      password: values.password,
      newPassword: values.newPassword,
    };
    await axiosInstance
      .put("/members/change-password", data)
      .then(() => {
        setEditProfile(0);
        setDialogOpen(true);
      })
      .catch((err) => {
        toast.error("Password change failed");
        console.log(err);
      });
  };

  const togglePasswordVisibility = (fieldName: string) => {
    switch (fieldName) {
      case "password":
        setShowPassword((prev) => !prev);
        break;
      case "newPassword":
        setShowNewPassword((prev) => !prev);
        break;
      case "confirmPassword":
        setShowConfirmPassword((prev) => !prev);
        break;
      default:
        break;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <Input
                      placeholder="Old Password"
                      {...field}
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("password")}
                      className="absolute inset-y-0 right-0 flex items-center px-2"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5 text-gray-500" />
                      ) : (
                        <EyeIcon className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>New Password</FormLabel>
                  <div className="relative">
                    <Input
                      placeholder="Password"
                      {...field}
                      type={showNewPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("newPassword")}
                      className="absolute inset-y-0 right-0 flex items-center px-2"
                    >
                      {showNewPassword ? (
                        <EyeOffIcon className="w-5 h-5 text-gray-500" />
                      ) : (
                        <EyeIcon className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Confirm Password</FormLabel>
                  <div className="relative">
                    <Input
                      placeholder="Password"
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                      className="absolute inset-y-0 right-0 flex items-center px-2"
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="w-5 h-5 text-gray-500" />
                      ) : (
                        <EyeIcon className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">
              <span>Submit</span>
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default FormPassword;
