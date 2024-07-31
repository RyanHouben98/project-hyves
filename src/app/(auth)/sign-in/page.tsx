"use server";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import SignInForm from "./(forms)/sign-in-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <main className="bg-gray-200 w-full h-screen">
      <div className="container mx-auto h-full flex flex-col gap-4 items-center justify-center">
        <h1 className="text-3xl">Project Hyves</h1>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Sign in with your personal account</CardTitle>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
          <CardFooter>
            <CardDescription>
              No account yet? <Link href="/sign-up">Create one here</Link>
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
