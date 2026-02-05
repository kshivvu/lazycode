"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-900/40 via-black to-pink-900/40 animate-pulse" />

      {/* Glass card */}
      <div className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-10 max-w-md text-center shadow-2xl">
        <h1 className="text-6xl font-extrabold bg-linear-to-r from-pink-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          500
        </h1>

        <p className="mt-4 text-xl font-semibold">Something went wrong 😵‍💫</p>

        <p className="mt-2 text-sm text-gray-400">
          Our backend tripped over its own logic. Not your fault. Promise.
        </p>

        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2 rounded-lg bg-linear-to-r from-pink-500 to-purple-600 hover:opacity-90 transition font-medium"
          >
            Try Again
          </button>

          <a
            href="/"
            className="px-5 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition font-medium"
          >
            Go Home
          </a>
        </div>

        {error?.digest && (
          <p className="mt-6 text-xs text-gray-500">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
