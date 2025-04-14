"use client";

import { useAuth } from "@/app/context/authContext";

export default function Home() {
  const { currentUser } = useAuth();

  console.log("currentUser", currentUser);
  return (
    <main className="flex min-h-screen flex-col p-24">
      {currentUser ? (
        <div className="w-full items-center justify-between font-mono text-sm ">
          <p className="text-xl">Hello and welcome back</p>
          <div className="flex flex-col gap-2">
            <p className="text-lg">{currentUser?.displayName}</p>
            <p className="text-lg">{currentUser?.email}</p>
          </div>
        </div>
      ) : (
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          hello and welcome to the app
        </div>
      )}
    </main>
  );
}
