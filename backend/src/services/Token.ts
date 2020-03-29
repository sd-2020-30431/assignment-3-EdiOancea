class TokenService {
  private jwt;

  constructor(jwt) {
    this.jwt = jwt;
  }

  public generateToken = (body: any): string => {
    return this.jwt.sign(body, process.env.SECRET_KEY);
  }
}

export default TokenService;
