import { model } from 'mongoose';
import { UserSchema } from './schemas/user';

const User = model('users', UserSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email: email });
    return user;
  }

  async findByNicName(nickName) {
    const user = await User.findOne({ nickName: nickName });
    return user;
  }

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findAll() {
    const users = await User.find({});
    return users;
  }
}

const userModel = new UserModel();

export { userModel };
