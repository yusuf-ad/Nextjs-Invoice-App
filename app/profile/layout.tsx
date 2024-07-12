import type { ReactNode } from "react";
import BackButton from "@/components/custom/BackButton";
import ProfileTabs from "@/components/custom/ProfileTabs";

function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container max-w-2xl py-12">
      <header>
        <BackButton />
      </header>

      <section>
        <div className="mt-8 w-full justify-between rounded-md bg-white px-2 py-8 text-sm text-skin-baliHai dark:bg-skin-mirage sm:px-6">
          <div className="mb-10 flex flex-col items-center justify-between gap-8 md:flex-row">
            <h1 className="text-2xl font-bold text-skin-black">Your profile</h1>

            <ProfileTabs />
          </div>

          {/* tabs */}
          {children}
        </div>
      </section>
    </div>
  );
}

export default ProfileLayout;
