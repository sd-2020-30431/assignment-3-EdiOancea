interface IBaseService {
  create(userId: string, body: any): Promise<any>;
  readOne(id: string): Promise<any>;
  readAll(): Promise<any[]>;
  update(body: any): any;
  delete(id: string): any;
};

export default IBaseService;
