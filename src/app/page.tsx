"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }
  return (
    <h1>
      Welcome, {session?.user?.name} {session?.user?.email} {session?.expires}
    </h1>
  );
}
