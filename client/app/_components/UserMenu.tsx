import { logout } from "@/lib/actions";
import { forwardRef, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const UserMenu = forwardRef(
  (
    {
      isActive,
      setIsActive,
    }: {
      isActive: boolean;
      setIsActive: (isOpen: boolean) => void;
    },
    ref,
  ) => {
    const logOutButton = useRef(null);
    const profileButton = useRef(null);

    async function handleLogout() {
      logout();

      toast.success("Logged out succesfully");
    }

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          profileButton.current &&
          !profileButton.current?.contains(event.target) &&
          logOutButton.current &&
          !logOutButton.current?.contains(event.target) &&
          !ref.current?.contains(event.target)
        ) {
          setIsActive(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div
        className={`${
          isActive
            ? "pointer-events-auto translate-y-8 opacity-100 xl:translate-x-8"
            : "pointer-events-none -translate-y-0 opacity-0 xl:-translate-x-0"
        } absolute right-5 top-[40px] z-30 flex w-40 flex-col overflow-hidden rounded-md bg-white px-3 text-sm font-bold transition-all duration-200 dark:bg-skin-mirage xl:-right-32 xl:-top-5 xl:translate-y-0`}
      >
        <button
          className="border-b-[1px] border-b-gray-400 py-4 text-center hover:underline hover:decoration-skin-purple hover:decoration-1 hover:underline-offset-4"
          ref={profileButton}
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          Profile
        </button>
        <button
          className="py-4 hover:underline hover:decoration-skin-purple hover:decoration-1 hover:underline-offset-4"
          ref={logOutButton}
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    );
  },
);

UserMenu.displayName = "UserMenu";

export default UserMenu;

// function UserMenu({
//   isActive,
//   setIsActive,
// }: {
//   isActive: boolean;
//   setIsActive: (isOpen: boolean) => void;
// }) {
//   const logOutButton = useRef(null);
//   const profileButton = useRef(null);

//   async function handleLogout() {
//     logout();

//     toast.success("Logged out succesfully");
//   }

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (
//         profileButton.current &&
//         !profileButton.current?.contains(event.target) &&
//         logOutButton.current &&
//         !logOutButton.current?.contains(event.target) &&
//         !avatar.current?.contains(event.target)
//       ) {
//         setIsActive(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div
//       className={`${
//         isActive
//           ? "pointer-events-auto translate-y-8 opacity-100 xl:translate-x-8"
//           : "pointer-events-none -translate-y-0 opacity-0 xl:-translate-x-0"
//       } absolute right-5 top-[40px] z-30 flex w-40 flex-col overflow-hidden rounded-md bg-white px-3 text-sm font-bold transition-all duration-200 dark:bg-skin-mirage xl:-right-32 xl:-top-5 xl:translate-y-0`}
//     >
//       <button
//         className="border-b-[1px] border-b-gray-400 py-4 text-center hover:underline hover:decoration-skin-purple hover:decoration-1 hover:underline-offset-4"
//         ref={profileButton}
//         onClick={() => {
//           setIsActive(!isActive);
//         }}
//       >
//         Profile
//       </button>
//       <button
//         className="py-4 hover:underline hover:decoration-skin-purple hover:decoration-1 hover:underline-offset-4"
//         ref={logOutButton}
//         onClick={handleLogout}
//       >
//         Log out
//       </button>
//     </div>
//   );
// }

// export default UserMenu;
