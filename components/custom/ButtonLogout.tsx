"use client";

import { logout } from "@/server/actions";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useTransition } from "react";
import { LogOutIcon } from "lucide-react";

function ButtonLogout() {
  const [isPending, startTransition] = useTransition();

  async function handleLogout() {
    startTransition(async () => {
      await logout();

      toast.success("Logged out succesfully");
    });
  }

  return (
    <Button className="px-8 py-6" onClick={handleLogout} variant={"default"}>
      {" "}
      {isPending ? (
        "Logging out..."
      ) : (
        <div className="flex items-center gap-2">
          <span>Logout</span> <LogOutIcon />
        </div>
      )}{" "}
    </Button>
  );
}

export default ButtonLogout;
