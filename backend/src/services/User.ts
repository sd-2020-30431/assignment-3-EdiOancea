import IUserService from '../interfaces/IUserService';
import IDatabase from '../interfaces/IDatabase';

class UserService implements IUserService {
  private exclude = ['password'];
  private database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  async create(body: { email: string; password: string }) {
    try {
      const { User } = this.database;
      const { email, password } = body;
      const { id } = await User.create({ email, password });

      return await User.findByPk(id, {
        attributes: {
          exclude: this.exclude,
        },
      });
    } catch (e) {
      return {
        errors: e.errors.map((error: any) => error.message),
      }
    }
  }

  async getMe(id: number) {
    const { User } = this.database;

    return await User.findByPk(id, {
      attributes: {
        exclude: this.exclude,
      },
      include: 'groceryListItems',
    });
  }
};

export default UserService;
