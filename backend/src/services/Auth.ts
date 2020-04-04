import IAuthService from '../interfaces/IAuthService';
import IEncryptionService from '../interfaces/IEncryptionService';
import ITokenService from '../interfaces/ITokenService';
import IDatabase from '../interfaces/IDatabase';

class AuthService implements IAuthService {
  private exclude = ['password'];
  private database: IDatabase;
  private encryptionService: IEncryptionService;
  private tokenService: ITokenService;

  constructor(
    database: IDatabase,
    encryptionService: IEncryptionService,
    tokenService: ITokenService
  ) {
    this.database = database;
    this.encryptionService = encryptionService;
    this.tokenService = tokenService;
  }

  async auth(body: { email: string; password: string; }) {
    const { User } = this.database;
    const { email, password } = body;
    const { password: hash, id } = await User.findOne({ where: { email } });

    return this.encryptionService.compare(password, hash) ? {
      // @ts-ignore
      token: this.tokenService.generateToken(id),
    } : null;
  }
};

export default AuthService;
