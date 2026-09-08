import React from "react";
import ProfileForm from "@/components/ProfileForm";

function Page() {
  return (
    <div>
      <p className="w-1/3 text-xl font-light">
        Hello! <br />
        Please log in or create a new account to use this application.
      </p>
      <ProfileForm type="signin" />
    </div>
  );
}

export default Page;
