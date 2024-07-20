import {
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
import { getItem, removeItem, setItem } from "@/lib/localStorage";
import { checkToken } from "@/models";
import { LoginShema } from "@/schemas";
import { useUserZustand } from "@/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const redirectPath = getItem("redirectPath");
  const setUser = useUserZustand((state) => state.setUser);
  const form = useForm<z.infer<typeof LoginShema>>({
    resolver: zodResolver(LoginShema),
    defaultValues: {
      memberName: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginShema>) => {
    await axiosInstance
      .post("/auth/login", values)
      .then((res) => {
        //set token to local storage
        setItem("token", res.data.token);

        //decode token
        const user: checkToken = jwtDecode(res.data.token);
        setUser(user);

        //check if user is admin
        // if (user.isAdmin) {
        //   toast.success("Login successfully");
        //   return navigate("/dashboard");
        // }

        if (redirectPath) {
          toast.success("Login successfully");
          removeItem("redirectPath");
          return navigate(`${redirectPath}`);
        }

        toast.success("Login successfully");
        return navigate("/");
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 400) {
          setError("Invalid username or password !!");
        }
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="memberName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-2 "
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <div className="text-red-600">{error}</div>}
        <Button
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
