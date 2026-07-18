import LoginForm from "@/components/auth/loginForm";
import PublicRoute from "@/components/auth/PublicRoute";

export default function LoginPage() {
  return (
    <PublicRoute>
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <LoginForm />
      </div>
    </PublicRoute>
  );
}