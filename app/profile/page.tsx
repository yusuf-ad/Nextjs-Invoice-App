import { getMyInfo } from "@/server/data-service";
import ProfileInfo from "@/components/custom/ProfileInfo";

async function ProfilePage() {
  const profileInfo = await getMyInfo();

  return (
    <div className="grid grid-cols-4">
      <ProfileInfo profile={profileInfo} />
    </div>
  );
}

export default ProfilePage;
