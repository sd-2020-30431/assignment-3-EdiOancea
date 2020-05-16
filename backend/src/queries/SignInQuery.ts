class SignInQuery {
    private database;
    private encryptionService;
    private tokenService;
  
    constructor(database, encryptionService, tokenService) {
      this.database = database;
      this.encryptionService = encryptionService;
      this.tokenService = tokenService;
    }
  
    async handle(body: { email: string; password: string; }) {
      const { User } = this.database;
      const { email, password } = body;
      const { password: hash, id } = await User.findOne({ where: { email } });
  
      return this.encryptionService.compare(password, hash) ? {
        // @ts-ignore
        token: this.tokenService.generateToken(id),
      } : null;
    }
  };
  
  export default SignInQuery;
  