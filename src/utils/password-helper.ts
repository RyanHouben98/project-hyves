import bcrypt from "bcrypt";

const saltRounds: number = 10;
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
