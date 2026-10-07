import { z } from "zod";
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    displayName: z.ZodString;
    university: z.ZodString;
    major: z.ZodString;
    yearLevel: z.ZodString;
    phone: z.ZodString;
    bio: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    displayName: string;
    university: string;
    major: string;
    yearLevel: string;
    phone: string;
    bio?: string | undefined;
}, {
    email: string;
    password: string;
    displayName: string;
    university: string;
    major: string;
    yearLevel: string;
    phone: string;
    bio?: string | undefined;
}>;
export declare const newsPostSchema: z.ZodObject<{
    title: z.ZodString;
    body: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    body?: string | undefined;
}, {
    title: string;
    body?: string | undefined;
}>;
export declare const eventSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    event_date: z.ZodString;
    event_time: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    category: z.ZodDefault<z.ZodEnum<["social", "academic", "media", "sports"]>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    event_date: string;
    category: "social" | "academic" | "media" | "sports";
    description?: string | undefined;
    event_time?: string | undefined;
    location?: string | undefined;
}, {
    title: string;
    event_date: string;
    description?: string | undefined;
    event_time?: string | undefined;
    location?: string | undefined;
    category?: "social" | "academic" | "media" | "sports" | undefined;
}>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type NewsPostInput = z.infer<typeof newsPostSchema>;
export type EventInput = z.infer<typeof eventSchema>;
//# sourceMappingURL=schemas.d.ts.map