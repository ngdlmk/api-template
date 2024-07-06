import { User } from 'models/user';

async function createUser(email: string, password: string) {
  const user = new User({
    email,
    password,
  });
  await user.save();
  return user;
}

async function getUser(email: string) {
  const user = await User.findOne({ email });
  return user;
}

export default {
  createUser,
  getUser,
};
