import { CameraIcon } from "lucide-react";
import ProfileInfoForm from "../_components/ProfileInfoForm";
import { getMyInfo } from "@/server/data-service";

async function ProfilePage() {
  const profileInfo = await getMyInfo();

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1 py-4 pl-2">
        <form className="relative">
          <label htmlFor="photo">
            <img
              className="h-24 w-24 cursor-pointer rounded-full hover:opacity-85"
              src={
                "https://avatars.mds.yandex.net/i?id=330af41273106bca8572b59d7b643c611d32d2ee-12496338-images-thumbs&n=13"
              }
              alt={`profile image`}
            />
            <div className="absolute -bottom-2 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-skin-mirage2">
              <CameraIcon
                className="h-6 w-6 text-white hover:opacity-85"
                strokeWidth={"2px"}
              />
            </div>
          </label>

          <input className="hidden" type="file" name="photo" id="photo" />
        </form>
      </div>

      <div className="col-span-3 p-4 pt-0">
        <ProfileInfoForm profile={profileInfo} />
      </div>
    </div>
  );
}

export default ProfilePage;
