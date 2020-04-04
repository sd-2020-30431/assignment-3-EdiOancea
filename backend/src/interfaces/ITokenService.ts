interface ITokenService = {
  generateToken: (id: string) => string;
  verifyToken: (token: string) => string;
}

export default ITokenService;
