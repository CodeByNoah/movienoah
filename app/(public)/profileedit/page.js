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
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mb-12 text-2xl font-bold">Edit Profile</h2>
        <p
          onClick={handleLogout}
          className="mb-10 cursor-pointer text-accent-color-900 underline transition duration-200 hover:text-accent-color-500"
        >
          Log Out
        </p>
      </div>

      <ProfileForm type="edit" />
    </div>
  );
}

export default Page;
