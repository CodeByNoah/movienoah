"use client";

import React, { useState } from "react";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/_lib/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import useAddToWatchlist from "@/hooks/useAddTowatchlist";
import useAddProfile from "@/hooks/useAddProfile";
import { addToUserId } from "@/redux/slices/userSlice";

function ProfileForm({ type }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const dispatch = useDispatch();

  const preName = useSelector((state) => state.userStore.user.name);
  const preEmail = useSelector((state) => state.userStore.user.email);

  const { addToProfiles } = useAddProfile();

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      },
    );

    if (signUpError) {
      alert(signUpError.message);
      return;
    }
    if (signUpData) {
      addToProfiles({
        userId: signUpData.user.id,
        name,
        profile_picture: undefined,
      });

      dispatch(addToUserId(signUpData.user.id));
      console.log(signUpData.user.id);

      router.push("/login");
    }
    console.log(signUpData);
  };

  return (
    <div>
      <form
        onSubmit={handlerSubmit}
        className="m-auto mt-20 flex h-1/4 w-1/4 flex-col rounded-xl bg-card-background p-8"
      >
        <img
          className="m-auto w-1/3 rounded-full"
          src={
            // (profileData && profileData.profile_picture) ||
            "https://ykhxkcfzqggpcaciqnen.supabase.co/storage/v1/object/public/userfiles/avatars/user.jpg"
          }
          alt=""
        />
        <div className="m-auto mt-2 flex items-center gap-2.5">
          <Camera />
          <input
            // ref={fileInputRef}
            type="file"
            style={{ display: "none" }}

            // onChange={handleFileChange}
          />
          <button
            className="text-accent-color-900 underline hover:text-accent-color-500"
            // onClick={handleButtonClick}
          >
            {/*{type === "signin" || !profileData.profile_picture*/}
            {/*  ? "Add an avatar"*/}
            {/*  : "Remove Avatar"}*/}
            اضافه کردن آواتار
          </button>
        </div>
        <label className="mb-2 text-lg font-bold" htmlFor="name">
          نام
        </label>
        <input
          value={name}
          className="mb-5 rounded-md border border-primary-text bg-transparent px-2.5 py-3 text-primary-text"
          type="text"
          placeholder={preName ? preName : `نام خود را وارد کنید‍`}
          id="name"
          onChange={(e) => setName(e.target.value)}
        />{" "}
        <label className="mb-2 text-lg font-bold" htmlFor="email">
          ایمیل
        </label>
        <input
          value={email}
          className="mb-5 rounded-md border border-primary-text bg-transparent px-2.5 py-3 text-primary-text"
          type="email"
          placeholder={preEmail ? preEmail : `ایمیل خود را وارد کنید‍`}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <label className="mb-2 text-lg font-bold" htmlFor="password">
          رمز ورود
        </label>
        <input
          className="mb-5 rounded-md border border-primary-text bg-transparent px-2.5 py-3 text-primary-text"
          type="password"
          placeholder="رمز ورود خود را وارد کنید "
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn gen-form-button m-auto mt-5 w-2/3"
          type="submit"
          // onClick={handlerSubmit}
        >
          {type === "signin" ? "ثبت نام" : "ویرایش"}
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;
