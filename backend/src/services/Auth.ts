class AuthService {
  private exclude = ['password'];
  private database;
  private encryptionService;
  private tokenService;

  constructor(database, encryptionService, tokenService) {
    this.database = database;
    this.encryptionService = encryptionService;
    this.tokenService = tokenService;
  }

  async auth(body: { email: string; password: string }) {
    const { User } = this.database;
    const { email, password } = body;
    const { password: hash, id } = await User.findOne({
      where: {
        email,
      },
    });

    if (this.encryptionService.compare(password, hash)) {
      return {
        token: this.tokenService.generateToken({ id }),
      };
    }

    return null;
  }
};

export default AuthService;
