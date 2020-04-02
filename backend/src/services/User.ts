import IBaseService from '../interfaces/IBaseService';

class UserService implements IBaseService {
  private exclude = ['password'];
  private database;
  private error;
  private TokenService;

  constructor(database, HttpError, TokenService) {
    this.database = database;
    this.error = HttpError;
    this.TokenService = TokenService;
  }

  async create(body: { email: string; password: string }) {
    const { User } = this.database;
    const { email, password } = body;
    const { id } = await User.create({ email, password });

    return await User.findByPk(id, {
      attributes: {
        exclude: this.exclude,
      },
    });
  }

  async readOne(id: number) {
    const { User } = this.database;

    return await User.findByPk(id, {
      attributes: {
        exclude: this.exclude,
      },
    });
  }

  async getMe(header) {
    const { User } = this.database;
    const token = header.slice(7);
    const id = this.TokenService.verifyToken(token);

    return await User.findByPk(id, {
      attributes: {
        exclude: this.exclude,
      },
      include: 'groceryListItems',
    });
  }

  async readAll() {
    const { User } = this.database;

    return await User.findAll({
      attributes: {
        exclude: this.exclude,
      },
    });
  }

  async update(id: number, body: { email: string; password: string }) {
    throw this.error;
  }

  async delete(id: number) {
    throw this.error;
  }
};

export default UserService;
