"use client";

import Link from "next/link";
import { useState } from "react";
import { loginSchema } from "@/lib/auth/validation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrors({});
    setIsLoading(true);

    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });

      setIsLoading(false);
      return;
    }

    console.log("Données valides :", result.data);

    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

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
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="exemple@email.com"
          autoComplete="email"
          className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
            errors.email
              ? "border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          }`}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      {/* Mot de passe */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700"
          >
            Mot de passe
          </label>

          <Link
            href="/forgot-password"
            className="text-sm font-medium text-slate-900 hover:underline"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
            errors.password
              ? "border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          }`}
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password}
          </p>
        )}
      </div>

      {/* Bouton */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}