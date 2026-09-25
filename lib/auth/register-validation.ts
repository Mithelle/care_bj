import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "Le prénom doit contenir au moins 2 caractères"),

    lastName: z
      .string()
      .trim()
      .min(2, "Le nom doit contenir au moins 2 caractères"),

    email: z
      .string()
      .trim()
      .email("Veuillez entrer une adresse e-mail valide"),

    phone: z
      .string()
      .trim()
      .min(8, "Veuillez entrer un numéro de téléphone valide"),

    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),

    confirmPassword: z
      .string()
      .min(1, "Veuillez confirmer votre mot de passe"),

    acceptTerms: z
      .boolean()
      .refine((value) => value === true, {
        message: "Vous devez accepter les conditions d'utilisation",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;