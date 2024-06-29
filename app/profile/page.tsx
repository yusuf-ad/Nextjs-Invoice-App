import { CameraIcon } from "lucide-react";
import ProfileInfoForm from "../_components/ProfileInfoForm";
import { getMyInfo } from "@/server/data-service";
import { UploadButton } from "@/app/api/uploadthing/uploadthing";

async function ProfilePage() {
  const profileInfo = await getMyInfo();

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1 mr-2 py-4">
        <form className="relative">
          <div className="flex flex-col items-center justify-center gap-4">
            <img
              className="h-24 w-24 rounded-full"
              src={profileInfo?.photo}
              alt={`profile image`}
            />
            {/* <div className="absolute -bottom-2 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-skin-mirage2">
              <CameraIcon
                className="h-6 w-6 text-white hover:opacity-85"
                strokeWidth={"2px"}
              />
            </div> */}

            <UploadButton endpoint="imageUploader" />
          </div>

          {/* <input className="hidden" type="file" name="photo" id="photo" /> */}
        </form>
      </div>

      <div className="col-span-3 p-4 pt-0">
        <ProfileInfoForm profile={profileInfo} />
      </div>
    </div>
  );
}

export default ProfilePage;
