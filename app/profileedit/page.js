import React from "react";
import ProfileForm from "@/components/ProfileForm";

function Page() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mb-12 text-2xl font-bold">ویرایش پروفایل</h2>
        <p
          // onClick={() => watchlistDelete({ watchlistId })}
          className="mb-10 cursor-pointer text-accent-color-900 underline transition duration-200 hover:text-accent-color-500"
        >
          خروج
        </p>
      </div>

      <ProfileForm />
    </div>
  );
}

export default Page;
