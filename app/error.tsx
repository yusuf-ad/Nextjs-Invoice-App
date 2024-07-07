"use client"; // Error components must be Client Components

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-3 text-center">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button
        className="btn-md bg-purple-600 text-white"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => router.push("/")
        }
      >
        Try again
      </button>
    </div>
  );
}
