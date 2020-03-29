class TokenService {
  private jwt;

  constructor(jwt) {
    this.jwt = jwt;
  }

  public generateToken = (body: any): string => {
    return this.jwt.sign(body, 'secretKey');
  }
}

export default TokenService;
