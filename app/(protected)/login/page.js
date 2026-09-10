"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/_lib/supabaseClient";
import Link from "next/link";
import Spinner from "@/components/Spinner";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function handlerLogin(e) {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      alert(error.message);
      return;
    }
    router.push("/");
  }

  return (
    <div className="flex w-full max-w-md flex-col items-center">
      {/* Brand & Greetings */}
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-3xl font-extrabold text-accent-color-900">
          MovieNoah
        </h1>
        <p className="text-sm sm:text-base text-secondary-text">
          Hello! Please log in to your account.
        </p>
      </div>

      {/* Login Card */}
      <form
        className="flex w-full flex-col rounded-xl border border-[rgba(217,217,217,0.15)] bg-card-background p-6 sm:p-8 shadow-2xl"
        onSubmit={handlerLogin}
      >
        <label className="mb-1.5 text-sm sm:text-base font-bold" htmlFor="email">
          Email
        </label>
        <input
          className="mb-4 rounded-md border border-[rgba(217,217,217,0.3)] bg-transparent px-3 py-2.5 text-sm sm:text-base text-primary-text focus:border-accent-color-900 focus:outline-none transition-colors"
          type="email"
          placeholder="Enter your email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="mb-1.5 text-sm sm:text-base font-bold" htmlFor="password">
          Password
        </label>
        <input
          className="mb-6 rounded-md border border-[rgba(217,217,217,0.3)] bg-transparent px-3 py-2.5 text-sm sm:text-base text-primary-text focus:border-accent-color-900 focus:outline-none transition-colors"
          type="password"
          placeholder="Enter your password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn w-full py-2.5 sm:py-3 text-sm sm:text-base font-bold text-center shadow-md disabled:opacity-50"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner size="sm" color="current" inline text="Logging in..." />
          ) : (
            "Log In"
          )}
        </button>

        <span className="mt-5 text-center text-xs sm:text-sm text-secondary-text">
          Don&apos;t have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-accent-color-900 underline hover:text-accent-color-500"
          >
            Create Account
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Page;
