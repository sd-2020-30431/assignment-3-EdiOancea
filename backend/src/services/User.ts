import IBaseService from '../interfaces/IBaseService';

class UserService implements IBaseService {
  private exclude = ['password'];
  private model;
  private authService;
  private error

  constructor(model, authService, HttpError) {
    this.model = model;
    this.authService = authService;
    this.error = HttpError;
  }

  async create(body: { email: string; password: string }) {
    const { email, password } = body;
    const hash = this.authService.generateHash(password);
    const { id } = await this.model.create({ email, password: hash });

    return await this.model.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: this.exclude,
      },
    });
  }

  async readOne(id: number) {
    return await this.model.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: this.exclude,
      },
    });
  }

  async readAll() {
    return await this.model.findAll({
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
