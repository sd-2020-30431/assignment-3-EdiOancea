class TokenService {
  private jwt;

  constructor(jwt) {
    this.jwt = jwt;
  }

  public generateToken = (id: string): string => {
    return this.jwt.sign(id, process.env.SECRET_KEY);
  }

  public verifyToken = (token: string): string => {
    return token ? this.jwt.verify(token, process.env.SECRET_KEY): '';
  }
}

export default TokenService;
