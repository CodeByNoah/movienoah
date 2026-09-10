"use client";

import React, { useState } from "react";
import { Camera, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/_lib/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import useAddProfile from "@/hooks/useAddProfile";
import { addToUserId } from "@/redux/slices/userSlice";
import Spinner from "@/components/Spinner";

function ProfileForm({ type }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();

  const preName = useSelector((state) => state.userStore.user.name);
  const preEmail = useSelector((state) => state.userStore.user.email);

  const { addToProfiles } = useAddProfile();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
        {
          email,
          password,
        },
      );

      if (signUpError) {
        alert(signUpError.message);
        setIsSubmitting(false);
        return;
      }
      if (signUpData) {
        addToProfiles({
          userId: signUpData.user.id,
          name,
          profile_picture: undefined,
        });

        dispatch(addToUserId(signUpData.user.id));
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handlerSubmit}
        className="mx-auto my-4 sm:my-8 flex w-full max-w-md flex-col rounded-xl border border-[rgba(217,217,217,0.15)] bg-card-background p-5 sm:p-8 shadow-xl"
      >
        <div className="mx-auto flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border border-[rgba(217,217,217,0.2)] bg-[#1a1a1a]">
          <UserRound size={44} className="text-[rgba(217,217,217,0.7)]" />
        </div>
        <div className="mx-auto mt-3 mb-6 flex items-center gap-2">
          <Camera size={18} className="text-secondary-text" />
          <input type="file" style={{ display: "none" }} />
          <button
            type="button"
            className="text-xs sm:text-sm text-accent-color-900 underline hover:text-accent-color-500"
          >
            Add Avatar
          </button>
        </div>

        <label className="mb-1.5 text-sm sm:text-base font-bold" htmlFor="name">
          Name
        </label>
        <input
          value={name}
          className="mb-4 rounded-md border border-[rgba(217,217,217,0.3)] bg-transparent px-3 py-2.5 text-sm sm:text-base text-primary-text focus:border-accent-color-900 focus:outline-none transition-colors"
          type="text"
          placeholder={preName ? preName : "Enter your name"}
          id="name"
          onChange={(e) => setName(e.target.value)}
        />

        <label className="mb-1.5 text-sm sm:text-base font-bold" htmlFor="email">
          Email
        </label>
        <input
          value={email}
          className="mb-4 rounded-md border border-[rgba(217,217,217,0.3)] bg-transparent px-3 py-2.5 text-sm sm:text-base text-primary-text focus:border-accent-color-900 focus:outline-none transition-colors"
          type="email"
          placeholder={preEmail ? preEmail : "Enter your email"}
          id="email"
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
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn w-full py-2.5 sm:py-3 text-sm sm:text-base font-bold shadow-md text-center disabled:opacity-50"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Spinner
              size="sm"
              color="current"
              inline
              text={type === "signin" ? "Signing Up..." : "Updating Profile..."}
            />
          ) : (
            type === "signin" ? "Sign Up" : "Update Profile"
          )}
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;
