"use client";

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h2 className="text-[28px] font-medium tracking-[-0.02em] text-[var(--ink)]">
        Something went wrong
      </h2>
      <p className="mt-3 max-w-md text-[15px] text-[var(--ink-secondary)]">
        An unexpected error occurred. Please try again, or contact us at{" "}
        <a
          href="mailto:contact@o3xs.com"
          className="font-medium text-[var(--indigo)] hover:underline"
        >
          contact@o3xs.com
        </a>{" "}
        if the issue persists.
      </p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="mt-8 inline-flex rounded-full bg-[var(--indigo)] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[var(--indigo-deep)]"
      >
        Try again
      </button>
    </div>
  );
}
