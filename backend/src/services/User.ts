import IBaseService from '../interfaces/IBaseService';

class UserService implements IBaseService {
  private exclude = ['password'];
  private database;
  private authService;
  private error

  constructor(database, authService, HttpError) {
    this.database = database;
    this.authService = authService;
    this.error = HttpError;
  }

  async create(body: { email: string; password: string }) {
    const { User } = this.database;
    const { email, password } = body;
    const hash = this.authService.generateHash(password);
    const { id } = await User.create({ email, password: hash });

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

  async readAll() {
    const { User } = this.database;

    return await User.findAll({
      attributes: {
        exclude: this.exclude,
      },
      include: 'groceryListItems',
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
