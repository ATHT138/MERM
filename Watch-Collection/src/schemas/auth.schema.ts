import { z } from "zod";

export const LoginShema = z.object({
  memberName: z
    .string()
    .min(1, "Member Name is required") // Kiểm tra không bỏ trống
    .min(3, "Member Name must be at least 3 characters")
    .max(40, "Member Name must be at most 40 characters"),
  password: z
    .string()
    .min(1, "Password is required") // Kiểm tra không bỏ trống
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must be at most 40 characters"),
});

export const RegisterSchema = z.object({
  memberName: z.string().min(3, "MemberName is required").max(40),
  password: z.string().min(6, "Password is required").max(40),
  YOB: z.string(),
  name: z.string().min(3, "Name is required").max(40),
});

export const ProfileSchema = z.object({
  name: z.string().min(3, "Name is required").max(40),
  YOB: z.string(),
});

export const PasswordSchema = z.object({
  password: z.string().min(6, "Password is required").max(40),
  newPassword: z.string().min(6, "Password is required").max(40),
  confirmPassword: z.string().min(6, "Password is required").max(40),
});
