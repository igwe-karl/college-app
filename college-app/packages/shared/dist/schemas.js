import { z } from "zod";
export const loginSchema = z.object({
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
export const registerSchema = z
    .object({
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    displayName: z.string().min(2, "Display name is required"),
    university: z.string().min(2, "University / school is required"),
    major: z.string().min(2, "Major or program is required"),
    yearLevel: z.string().min(1, "Year level is required"),
    phone: z
        .string()
        .min(10, "Enter a valid phone number")
        .max(20, "Phone number is too long"),
    bio: z.string().max(500, "Bio must be 500 characters or less").optional(),
    isRep: z.boolean().default(false),
})
    .superRefine((data, ctx) => {
    if (data.isRep && !data.university.trim()) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Campus reps must select their school / university",
            path: ["university"],
        });
    }
});
export const newsPostSchema = z.object({
    title: z.string().min(1),
    body: z.string().optional(),
});
export const eventSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    event_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
    event_time: z.string().optional(),
    location: z.string().optional(),
    category: z.enum(["social", "academic", "media", "sports"]).default("social"),
});
