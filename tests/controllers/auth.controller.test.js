/* eslint-disable global-require */
/* eslint-disable no-undef */
const mockDB = require('../mockDB');
const { SignIn, SignUp } = require('../../src/controllers/auth.controller');

describe('Testing Auth Controller', () => {
  beforeAll(async () => {
    await mockDB.connect();
  });

  afterAll(async () => {
    await mockDB.clearDatabase();
    await mockDB.closeDatabase();
  });

  describe("Test the 'SignUp' function", () => {
    it('Use: valid data | Should: register User | Return: object ', async (done) => {
      SignUp('user@mail.com', 'password').then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toBe(201);
        expect(res.success).toBeTruthy();

        done();
      });
    });

    it('Use: duplicate data | Should: return error | Return: object ', async (done) => {
      SignUp('user@mail.com', 'password').catch((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toBe(409);
        expect(res.success).toBeFalsy();

        done();
      });
    });
  });

  describe("Test the 'SignIn' function", () => {
    it('Use: valid data | Should: login User | Return: object ', async (done) => {
      SignIn('user@mail.com', 'password').then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toBe(202);
        expect(res.success).toBeTruthy();

        done();
      });
    });

    it('Use: wrong email | Should: return error | Return: object ', async (done) => {
      SignIn('user1@mail.com', 'password').catch((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toBe(401);
        expect(res.success).toBeFalsy();

        done();
      });
    });

    it('Use: wrong password | Should: return error | Return: object ', async (done) => {
      SignIn('user@mail.com', 'pass').catch((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toBe(401);
        expect(res.success).toBeFalsy();

        done();
      });
    });
  });
});
