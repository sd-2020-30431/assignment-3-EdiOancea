import IBaseAuth from '../interfaces/IBaseAuth';

class Auth implements IBaseAuth {
  private saltRounds = 10;
  private bcrypt;

  constructor(bcrypt) {
    this.bcrypt = bcrypt;
  }

  public generateHash(password) {
    return this.bcrypt.hashSync(password, this.saltRounds);
  }
}

export default Auth;
