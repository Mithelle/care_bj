import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-sm">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Créer un compte
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Créez votre compte pour commencer
          </p>
        </div>

        <RegisterForm />

      </div>
    </div>
  );
}