import { sign, verify } from "jsonwebtoken";

export const jwtGenerate = (object: object) => {
  return sign(object, process.env.JWT_SECRET!);
};

export const jwtValidate = <T>(token: string): T => {
  try {
    return verify(token, process.env.JWT_SECRET!) as T;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("Validation Failed");
  }
};
