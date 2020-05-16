class GetMeQuery {
    private database;
  
    constructor(database) {
      this.database = database;
    }
  
    async handle(id: number) {
      const { User } = this.database;
  
      return await User.findByPk(id, {
        attributes: { exclude: ['password'] },
        include: 'groceryListItems',
      });
    }
  };
  
  export default GetMeQuery;
  