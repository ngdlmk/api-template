import bcrypt from "bcrypt";
import userRepository from "../repositories/user-repository";
import { LoginPlatform } from "../types/user";

async function createUser(
  email: string,
  password: string,
) {
  const existUser = await userRepository.getUser(email);
  if (existUser) {
    return { success: true, user: existUser };
  } else {
    const pass = password ? password : "asdf1234";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);
    const user = await userRepository.createUser(
      email,
      hashedPassword,
    );
    return { success: true, user };
  }
}

async function login(email: string, platform: string, password?: string) {
  try {
    const user = await userRepository.getUser(email);

    if (!user) {
      return { success: false, message: "User not found" };
    }

    if (password) {
      const isPasswordMatch =
        password && user.password
          ? bcrypt.compareSync(password, user.password)
          : false;

      if (!isPasswordMatch && platform === LoginPlatform.EMAIL) {
        return { success: false, message: "Invalid email or password" };
      }
    }

    //const token = jwt.sign({ id: user._id }, "secretkey");

    return user;
  } catch (error) {
    return { error: "Internal Error", success: false };
  }
}

export default { createUser, login };
