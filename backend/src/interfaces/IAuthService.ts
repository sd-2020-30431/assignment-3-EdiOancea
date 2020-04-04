interface IAuthService = {
  auth: async (body: { email: string; password: string; }) => string | null;
}

export default IAuthService;
