import React from "react";
import ProfileForm from "@/components/ProfileForm";
import Link from "next/link";

function Page() {
  return (
    <div className="flex w-full max-w-md flex-col items-center">
      <div className="mb-2 text-center">
        <h1 className="mb-2 text-3xl font-extrabold text-accent-color-900">
          MovieNoah
        </h1>
        <p className="text-sm sm:text-base text-secondary-text">
          Create an account to build your movie watchlists.
        </p>
      </div>

      <ProfileForm type="signin" />

      <p className="mt-4 text-center text-xs sm:text-sm text-secondary-text">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-accent-color-900 underline hover:text-accent-color-500"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}

export default Page;
