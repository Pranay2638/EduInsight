import SignupForm from "@/components/auth/signupForm";
import PublicRoute from "@/components/auth/PublicRoute";
export default function SignupPage() {
  return (
    <PublicRoute>
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
         <SignupForm />
        </div>
    </PublicRoute>
  );
}