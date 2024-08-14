import { getMyInfo } from "@/server/data-service";
import ProfileInfo from "@/components/custom/ProfileInfo";

export const metadata = {
  title: "Profile",
};

async function ProfilePage() {
  const profileInfo = await getMyInfo();

  if ("status" in profileInfo) {
    return <div>{profileInfo.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4">
      <ProfileInfo profile={profileInfo} />
    </div>
  );
}

export default ProfilePage;
