import { z, ZodType } from "zod";
import { Profession } from "../enum/enum";
import { FormData } from "../interface/interface";

const employeeSchema: ZodType<FormData> = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(2, { message: "Minimum 2 characters required" }),
    building: z
        .string()
        .min(1, { message: "This field is required" }),
    profession: z
        .enum([Profession.DESIGNER, Profession.DEVELOPER, Profession.HR, Profession.MANAGER, Profession.MANAGER, Profession.MARKETING]),
    city: z
        .string()
        .min(1, { message: "This field is required" }),
    state: z
        .string({ required_error: "state is required" })
        .min(1, { message: "This field is required" }),
    pincode: z
        .string()
        .min(6, { message: "Invalid Pincode" })
        .max(6, { message: "Invalid Pincode" }),
    email: z
        .string()
        .email({ message: "Invalid email" })
});

export default employeeSchema;