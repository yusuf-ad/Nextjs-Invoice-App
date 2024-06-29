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
          <label
            className="flex flex-col items-center justify-center gap-4"
            htmlFor="photo"
          >
            <img
              className="h-24 w-24 cursor-pointer rounded-full hover:opacity-85"
              src={
                "https://utfs.io/f/aee6c32a-77f7-40b8-ad4b-43d5e3ceba8c-vuqsxi.jpg"
              }
              alt={`profile image`}
            />
            {/* <div className="absolute -bottom-2 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-skin-mirage2">
              <CameraIcon
                className="h-6 w-6 text-white hover:opacity-85"
                strokeWidth={"2px"}
              />
            </div> */}

            <UploadButton endpoint="imageUploader" />
          </label>

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
