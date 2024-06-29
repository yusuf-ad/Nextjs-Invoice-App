import type { ReactNode } from "react";
import BackButton from "../_components/BackButton";
import ProfileTabs from "../_components/ProfileTabs";

function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container max-w-2xl">
      <header>
        <BackButton />
      </header>

      <section>
        <div className="mt-8 w-full justify-between rounded-md bg-white px-6 py-8 text-sm text-skin-baliHai dark:bg-skin-mirage">
          <div className="mb-10 flex items-center justify-between">
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
