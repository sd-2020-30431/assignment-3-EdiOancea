interface IBaseService {
  create(body: any): Promise<User>;
  readOne(id: number): Promise<User>;
  readAll(): Promise<User[]>;
  update(id: number, body!: any): any;
  delete(id: number): any;
};

export default IBaseService;
