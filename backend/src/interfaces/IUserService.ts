interface IUserService {
  create: (body: { email: string; password: string }) => any;
  getMe: (id: number) => any;
}

export default IUserService;
