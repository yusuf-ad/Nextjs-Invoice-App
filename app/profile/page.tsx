import ProfileInfoForm from "../_components/ProfileInfoForm";
import { getMyInfo } from "@/server/data-service";
import ProfileImageForm from "../_components/ProfileImageForm";
import ProfileInfo from "../_components/ProfileInfo";

async function ProfilePage() {
  const profileInfo = await getMyInfo();

  return (
    <div className="grid grid-cols-4">
      <ProfileInfo profile={profileInfo} />
      {/* <div className="col-span-1 mr-2 py-4">
        <ProfileImageForm profileImg={profileInfo?.photo} />
      </div>

      <div className="col-span-3 p-4 pt-0">
        <ProfileInfoForm profile={profileInfo} />
      </div> */}
    </div>
  );
}

export default ProfilePage;
