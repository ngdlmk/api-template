import userRepository from '../repositories/user-repository';

async function getUser(email: string, password: string) {
  return await userRepository.getUser(email);
}

export default {
  getUser,
};
