"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { hashPassword } from "@/utils/password-helper";

type TFormData = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
};

const action = async (formData: TFormData) => {
  const isAlreadyRegistered = (await db.select().from(users)).find(
    (user) => user.emailAddress === formData.emailAddress
  );

  if (isAlreadyRegistered) {
    return {
      message: "Email already registered",
      status: false,
    };
  }

  formData.password = await hashPassword(formData.password);

  await db.insert(users).values({
    ...formData,
  });

  return {
    message: "User registered successfully",
    status: true,
  };
};

export default action;
