"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/_lib/supabaseClient";
import { AiFillLinkedin } from "react-icons/ai";
import Link from "next/link";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handlerLogin(e) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }
    console.log("Login success", data);
    router.push("/");
  }
  return (
    <div className="flex flex-col gap-24">
      <p className="w-1/3 text-xl font-light">
        Hello! <br />
        Please log in or create a new account to use this application.
      </p>

      <form
        className="m-auto mt-20 flex h-1/4 w-1/4 flex-col rounded-xl bg-card-background p-8"
        onSubmit={handlerLogin}
      >
        <label className="mb-2 text-lg font-bold" htmlFor="email">
          Email
        </label>
        <input
          className="mb-5 rounded-md border border-primary-text bg-transparent px-2.5 py-3.5 text-primary-text"
          type="email"
          placeholder="Enter your email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="mb-2 text-lg font-bold" htmlFor="password">
          Password
        </label>
        <input
          className="mb-5 rounded-md border border-primary-text bg-transparent px-2.5 py-4 text-primary-text"
          type="password"
          placeholder="Enter your Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn m-auto mt-7 w-2/3"
          type="submit"
          // disabled={isLogin}
        >
          {/*{isLogin ? "Logging in..." : "Log in"}*/}
          Log In
        </button>
        <span className="m-auto mt-4">
          or{" "}
          <Link href="/signin" className="text-accent-color-900 underline">
            Create Account
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Page;
