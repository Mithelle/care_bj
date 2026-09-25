"use client";

import Link from "next/link";
import { useState } from "react";
import { registerSchema } from "@/lib/auth/register-validation";

type FormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
};

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrors({});
    setIsLoading(true);

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        firstName: fieldErrors.firstName?.[0],
        lastName: fieldErrors.lastName?.[0],
        email: fieldErrors.email?.[0],
        phone: fieldErrors.phone?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
        acceptTerms: fieldErrors.acceptTerms?.[0],
      });

      setIsLoading(false);
      return;
    }

    console.log("Données d'inscription valides :", result.data);

    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Prénom / Nom */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        <div>
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Prénom
          </label>

          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            autoComplete="given-name"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />

          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Nom
          </label>

          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            autoComplete="family-name"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />

          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.lastName}
            </p>
          )}
        </div>

      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Adresse e-mail
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          placeholder="exemple@email.com"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      {/* Téléphone */}
      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Téléphone
        </label>

        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          autoComplete="tel"
          placeholder="+229 ..."
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
        />

        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Mot de passe */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Mot de passe
        </label>

        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirmation */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Confirmer le mot de passe
        </label>

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
        />

        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Conditions */}
      <div>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-slate-300"
          />

          <span className="text-sm text-slate-600">
            J'accepte les conditions d'utilisation et la politique de
            confidentialité.
          </span>
        </label>

        {errors.acceptTerms && (
          <p className="mt-1 text-sm text-red-500">
            {errors.acceptTerms}
          </p>
        )}
      </div>

      {/* Bouton */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Création du compte..." : "Créer mon compte"}
      </button>

      {/* Connexion */}
      <p className="text-center text-sm text-slate-500">
        Vous avez déjà un compte ?{" "}
        <Link
          href="/login"
          className="font-semibold text-slate-900 hover:underline"
        >
          Se connecter
        </Link>
      </p>
    </form>
  );
}