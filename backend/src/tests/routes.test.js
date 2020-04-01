const request = require('supertest');
const app = require('../server');

describe('User Registration', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        email: 'oancea.eduard65@gmail.com',
        password: '123123123123',
      });

      expect(res.statusCode).toEqual(200);
  });

  it ('should fetch all users', async () => {
    const res = await request(app)
      .get('/users')
      expect(res.statusCode).toEqual(200);
      expect(res.body[0].email).toEqual('oancea.eduard65@gmail.com');
  });
});
