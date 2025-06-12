import React from "react";
import ProfileForm from "@/components/ProfileForm";

function Page() {
  return (
    <div>
      <p className="w-1/3 text-xl font-light">
        سلام! <br />
        لطفاً وارد حساب کاربری خود شوید یا یک حساب جدید ایجاد کنید تا بتوانید از
        قابلیت‌های این برنامه استفاده کنید.
      </p>
      <ProfileForm />
    </div>
  );
}

export default Page;
