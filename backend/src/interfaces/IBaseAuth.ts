interface IBaseAuth {
  saltRounds: number;
  password: string;
  hash: string;

  generateHash(): string;
  compare(): boolean;
}

export default IBaseAuth;
