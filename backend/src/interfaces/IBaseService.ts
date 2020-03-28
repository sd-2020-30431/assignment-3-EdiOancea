interface IBaseService {
  create(body: any): Promise<User>;
  readOne(id: number): Promise<User>;
  readAll(): Promise<User[]>;
  update(body!: any): any;
  delete(id: number): any;
};

export default IBaseService;
