import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Connexion
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Connectez-vous à votre compte
          </p>
        </div>

        {/* Formulaire */}
        <LoginForm />

        {/* Inscription */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Vous n'avez pas encore de compte ?{" "}
          <Link
            href="/register"
            className="font-semibold text-slate-900 hover:underline"
          >
            Créer un compte
          </Link>
        </p>

      </div>
    </div>
  );
}