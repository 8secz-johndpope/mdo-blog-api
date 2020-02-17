/* eslint-disable global-require */
/* eslint-disable no-undef */
const request = require('supertest');
const server = require('../../src/app');
const mockDB = require('../mockDB');

describe('Testing Auth EndPoints', () => {
  beforeAll(async () => {
    await mockDB.connect();
  });

  afterAll(async () => {
    await mockDB.clearDatabase();
    await mockDB.closeDatabase();
  });

  describe('Post @ /api/auth/signup', () => {
    it('Send: valid data | Should: register User | Return: jwToken | Response: 201', async (done) => {
      request(server)
        .post('/api/auth/signup')
        .send({
          email: 'user@mail.com',
          password: 'password',
        })
        .then((res) => {
          expect(res.status).toBe(201);
          done();
        });
    });

    it('Send: no data | Should: get error | Return: errors | Response: 401', async (done) => {
      request(server)
        .post('/api/auth/signup')
        .send({})
        .then((res) => {
          expect(res.status).toBe(400);
          done();
        });
    });

    it('Send: duplicate data | Should: get error | Return: errors | Response: 409', async (done) => {
      request(server)
        .post('/api/auth/signup')
        .send({
          email: 'user@mail.com',
          password: 'password',
        })
        .then((res) => {
          expect(res.status).toBe(409);
          done();
        });
    });
  });

  describe('Post @ /api/auth/signin', () => {
    it('Send: valid data | Should: login User | Return: jwToken | Response: 200', async (done) => {
      request(server)
        .post('/api/auth/signin')
        .send({
          email: 'user@mail.com',
          password: 'password',
        })
        .then((res) => {
          expect(res.status).toBe(200);
          done();
        });
    });

    it('Send: no data | Should: get error | Return: errors | Response: 401', async (done) => {
      request(server)
        .post('/api/auth/signin')
        .send({})
        .then((res) => {
          expect(res.status).toBe(400);
          done();
        });
    });

    it('Send: wrong password | Should: get error | Return: error | Response: 401', async (done) => {
      request(server)
        .post('/api/auth/signin')
        .send({
          email: 'user@mail.com',
          password: 'password123',
        })
        .then((res) => {
          expect(res.status).toBe(400);
          done();
        });
    });

    it('Send: wrong email | Should: get error | Return: error | Response: 401', async (done) => {
      request(server)
        .post('/api/auth/signin')
        .send({
          email: 'user1@mail.com',
          password: 'password',
        })
        .then((res) => {
          expect(res.status).toBe(400);
          done();
        });
    });
  });
});
