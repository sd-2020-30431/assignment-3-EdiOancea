import IBaseEncryption from '../interfaces/IBaseEncryption';

class EncryptionService implements IBaseEncryption {
  private saltRounds = 10;
  private bcrypt;

  constructor(bcrypt) {
    this.bcrypt = bcrypt;
  }

  public generateHash = (password: string): string => {
    return this.bcrypt.hashSync(password, this.saltRounds);
  }

  public compare = (password: string, hash: string): boolean => {
    return this.bcrypt.compareSync(password, hash);
  }
}

export default EncryptionService;
