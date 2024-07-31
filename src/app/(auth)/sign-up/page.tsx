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
import SignUpForm from "./(forms)/sign-up-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
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
            <CardTitle>Create a new personal account</CardTitle>
            <CardDescription>
              Creating a new account is quick and easy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
          <CardFooter>
            <CardDescription>
              Already created an account?{" "}
              <Link href="/sign-in">Sign in here</Link>
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
