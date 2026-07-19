"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { login } from "@/services/authService";
import { GoogleLogin } from "@react-oauth/google";

import { googleLogin } from "@/services/googleAuthService";
import { saveAuth } from "@/utils/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (
  e: React.FormEvent
    ) => {
    e.preventDefault();

    try {
        setLoading(true);

        const response = await login(
        email,
        password
        );

        saveAuth(response)

        toast.success(
        "Welcome back! 👋"
        );

        router.push("/dashboard");

    } catch (error: any) {

        toast.error(
        error.response?.data?.message ||
        "Login failed."
        );

    } finally {

        setLoading(false);

    }
    };

  const handleGoogleLogin = async (
    credentialResponse: any
  ) => {

    try {

      const response =
        await googleLogin(
          credentialResponse.credential
        );

      saveAuth(response)

      toast.success(
        "Welcome back!"
      );

      router.push("/dashboard");

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Google login failed."
      );

    }

  };

  return (
    <div
      className="
        w-full
        max-w-md
        bg-white
        rounded-3xl
        shadow-lg
        p-8
        text-slate-900
      "
    >
      {/* Header */}

      <div className="text-center">

        <h1 className="text-4xl font-bold text-slate-900">
          EduInsight
        </h1>

        <p className="text-slate-500 mt-3">
          Welcome back 👋
        </p>

        <p className="text-slate-400 text-sm mt-1">
          Continue your learning journey.
        </p>

      </div>

      {/* Form */}

      <form
        className="mt-10 space-y-6"
        onSubmit={handleSubmit}
      >

        <div>

          <label className="block mb-2 text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

        </div>

        <div>

          <label className="block mb-2 text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter your password"
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            transition
            text-white
            py-3
            rounded-xl
            font-semibold
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex items-center my-6">

          <div className="flex-1 border-t border-slate-300" />

          <span className="px-4 text-slate-400 text-sm">
            OR
          </span>

          <div className="flex-1 border-t border-slate-300" />

        </div>

        <div className="flex justify-center">

          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() =>
              toast.error(
                "Google Sign-In failed."
              )
            }
            useOneTap={false}
          />

        </div>

      </form>

      {/* Footer */}

      <div className="mt-8 text-center">

        <p className="text-slate-500">

          Don't have an account?{" "}

          <Link
            href="/signup"
            className="
              text-blue-600
              font-semibold
              hover:underline
            "
          >
            Create Account
          </Link>

        </p>

      </div>

    </div>
  );
}