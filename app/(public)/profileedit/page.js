"use client";
import React from "react";
import ProfileForm from "@/components/ProfileForm";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { infoReset } from "@/redux/slices/watchlistSlice";
import { supabase } from "@/_lib/supabaseClient";

function Page() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
      alert("Error logging out");
    } else {
      dispatch(infoReset());
      router.push("/login");
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-8 flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Edit Profile
        </h1>
        <button
          onClick={handleLogout}
          className="cursor-pointer text-sm sm:text-base font-semibold text-accent-color-900 underline transition duration-200 hover:text-accent-color-500"
        >
          Log Out
        </button>
      </div>

      <ProfileForm type="edit" />
    </div>
  );
}

export default Page;
