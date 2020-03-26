import IBaseService from '../interfaces/IBaseService';
import User from '../models/User';
import AuthService from './Auth';

class UserService implements IBaseService {
  private exclude = ['password'];

  async create(body: { email: string; password: string }) {
    const { email, password } = body;
    const auth = new AuthService(password, '');
    const hash = auth.generateHash();
    const { id } = await User.create({ email, password: hash });

    return await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: this.exclude,
      },
    });
  }

  async readOne(id: number) {
    return await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: this.exclude,
      },
    });
  }

  async readAll() {
    return await User.findAll({
      attributes: {
        exclude: this.exclude,
      },
    });
  }

  async update(id: number, body: { email: string; password: string }) {}

  async delete(id: number) {}
};

export default UserService;
