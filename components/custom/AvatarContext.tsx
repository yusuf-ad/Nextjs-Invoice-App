import { ReactNode, createContext, useContext, useState } from "react";

const initialValue = {
  avatar: "",
  updateAvatar: (newAvatar: string) => {},
  clearAvatar: () => {},
};

const AvatarContext = createContext(initialValue);

function useAvatar() {
  const context = useContext(AvatarContext);

  if (context === undefined) {
    throw new Error("useAvatar must be used within a AvatarProvider");
  }

  return context;
}

function AvatarProvider({ children }: { children: ReactNode }) {
  const [avatar, setAvatar] = useState("");

  function updateAvatar(newAvatar: string) {
    setAvatar(newAvatar);
  }

  function clearAvatar() {
    setAvatar("");
  }

  return (
    <AvatarContext.Provider
      value={{
        avatar,
        updateAvatar,
        clearAvatar,
      }}
    >
      {children}
    </AvatarContext.Provider>
  );
}

export { AvatarProvider, useAvatar };
