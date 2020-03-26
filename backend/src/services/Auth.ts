import * as bcrypt from 'bcrypt';

import IBaseAuth from '../interfaces/IBaseAuth';

class Auth implements IBaseAuth {
  saltRounds = 10;
  password: string;
  hash: string;

  constructor(password: string, hash: string) {
    this.password = password;
    this.hash = hash;
  }

  generateHash() {
    return bcrypt.hashSync(this.password, this.saltRounds);
  }

  compare() {
    return true;
  }
}

export default Auth;
