"use client";

import { UploadButton } from "../api/uploadthing/uploadthing";

function ProfileImageForm({ profileImg }: string) {
  return (
    <form className="relative">
      <div className="flex flex-col items-center justify-center gap-4">
        <img
          className="h-24 w-24 rounded-full"
          src={profileImg}
          alt={`profile image`}
        />

        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={([data]) => {
            localStorage.setItem("profileImg", data.serverData.fileUrl);
          }}
        />
      </div>
    </form>
  );
}

export default ProfileImageForm;
