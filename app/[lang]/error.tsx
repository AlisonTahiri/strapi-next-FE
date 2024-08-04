"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  // TODO: Improve esthetics

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        className="underline underline-offset-2"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
      <span> or </span>
      <Link href="/" className="underline-offset-2 underline">
        Go Home
      </Link>
    </div>
  );
}
