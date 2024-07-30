import { z } from "zod";

const hasUpperCase = /[A-Z]/;
const hasNumber = /[0-9]/;
const hasSpecialChar = /[!@#$%^&*]/;

const currentYear = new Date().getFullYear();
const minYear = currentYear - 50;

export const LoginShema = z.object({
  memberName: z
    .string()
    .min(3, "Member Name must be at least 3 characters")
    .max(40, "Member Name must be at most 40 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must be at most 40 characters"),
});

export const RegisterSchema = z.object({
  memberName: z.string().min(3, "Member Name is required").max(40),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(40, "Password must be at most 40 characters long")
    .superRefine((value, ctx) => {
      if (!hasUpperCase.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least one uppercase letter",
        });
      }
      if (!hasNumber.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least one number",
        });
      }
      if (!hasSpecialChar.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least one special character",
        });
      }
    }),
  YOB: z.string().refine(
    (val) => {
      const year = parseInt(val, 10);
      return !isNaN(year) && year >= minYear;
    },
    {
      message: `Year of birth must be at least ${minYear}`,
    }
  ),
  name: z.string().min(3, "Name is required").max(40),
});

export const ProfileSchema = z.object({
  name: z.string().min(3, "Name is required").max(40),
  YOB: z.string(),
});

export const PasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(40, "Password must be at most 40 characters long")
      .refine((value) => hasUpperCase.test(value), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((value) => hasNumber.test(value), {
        message: "Password must contain at least one number",
      })
      .refine((value) => hasSpecialChar.test(value), {
        message: "Password must contain at least one special character",
      }),
    newPassword: z
      .string()
      .min(6, "New Password must be at least 6 characters long")
      .max(40, "New Password must be at most 40 characters long")
      .refine((value) => hasUpperCase.test(value), {
        message: "New Password must contain at least one uppercase letter",
      })
      .refine((value) => hasNumber.test(value), {
        message: "New Password must contain at least one number",
      })
      .refine((value) => hasSpecialChar.test(value), {
        message: "New Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long")
      .max(40, "Confirm Password must be at most 40 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Confirm Password must match New Password",
    path: ["confirmPassword"],
  });
