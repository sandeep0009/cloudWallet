import z from "zod";


export const userSignUpSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6)
});



export const userSingInSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6)
});