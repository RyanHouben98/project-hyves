"use server";

import { signIn } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

type TFormData = {
  emailAddress: string;
  password: string;
};

const action = async (formData: TFormData) => {
  const { password, emailAddress } = formData;

  const user = await db.query.users.findFirst({
    where: eq(users.emailAddress, emailAddress),
  });

  if (!user) {
    return {
      message: "Invalid credentials",
      status: false,
    };
  }

  const isPasswordMatch = user.password === password;

  if (!isPasswordMatch) {
    return {
      message: "Invalid credentials",
      status: false,
    };
  }

  await signIn("credentials", {
    email: user.emailAddress,
    name: user.firstName + " " + user.lastName,
    id: user.id,
    redirect: true,
    redirectTo: "/",
  });

  return {
    message: "User logged in successfully",
    status: true,
  };
};

export default action;
