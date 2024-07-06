"use client";

import { useState } from "react";
import ProfileInfoForm from "./ProfileInfoForm";
import { UploadButton } from "@/app/api/uploadthing/uploadthing";
import Image from "next/image";
import toast from "react-hot-toast";

type ProfileInfoProps = {
  profile: {
    fullName: string;
    username: string;
    email: string;
    photo: string;
  };
};

function ProfileInfo({ profile }: ProfileInfoProps) {
  const [avatar, setAvatar] = useState("");

  function updateAvatar(newAvatar: string) {
    setAvatar(newAvatar);
  }

  function clearAvatar() {
    setAvatar("");
  }

  return (
    <>
      <div className="col-span-1 mr-2 py-4">
        <form className="relative">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              width={96}
              height={96}
              className="h-24 w-24 rounded-full"
              src={avatar ? avatar : profile.photo}
              alt={`profile image`}
            />

            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={([data]) => {
                toast.success("Upload successful!");

                updateAvatar(data.serverData.fileUrl);
              }}
              onUploadError={(data) => {
                toast.error(data.message || "Upload failed!");

                clearAvatar();
              }}
            />
          </div>
        </form>
      </div>

      <div className="col-span-3 p-4 pt-0">
        <h2 className="mb-6 text-lg">Make changes to your account here. </h2>

        <ProfileInfoForm
          newAvatar={avatar}
          profile={profile}
          clearAvatar={clearAvatar}
        />
      </div>
    </>
  );
}

export default ProfileInfo;
