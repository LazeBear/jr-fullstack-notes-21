const supertest = require('supertest');
const app = require('../../src/app');
const Student = require('../../src/models/student.model');
const mongoose = require('mongoose');
const { generateToken } = require('../../src/common/utils/jwt');

// fetch, axios, request
// axios.get()
const request = supertest(app);
const TOKEN = generateToken({ test: 'test' });

beforeAll(async () => {
  await mongoose.connect(global.__MONGO_URI__);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('/v1/students', () => {
  beforeEach(async () => {
    await Student.deleteMany({}).exec();
  });

  describe('POST /v1/students', () => {
    const validStudent = {
      firstName: 'john',
      lastName: 'doe',
      email: 'john@doe.com',
    };

    it('should save the student if request payload is valid', async () => {
      const res = await request
        .post('/v1/students')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(validStudent);

      expect(res.statusCode).toBe(201);
      const student = await Student.findOne(validStudent).exec();
      expect(student).not.toBeNull();
    });

    it.each`
      property       | value
      ${'firstName'} | ${''}
      ${'lastName'}  | ${''}
      ${'lastName'}  | ${undefined}
      ${'email'}     | ${'invalid'}
      ${'email'}     | ${'invalid@'}
      ${'email'}     | ${'invalid@a.c'}
    `(
      'should return 400 if request payload is invalid when $property is $value',
      async ({ property, value }) => {
        const invalidStudent = {
          ...validStudent,
          [property]: value,
        };

        const res = await request
          .post('/v1/students')
          .set('Authorization', `Bearer ${TOKEN}`)
          .send(invalidStudent);

        expect(res.statusCode).toBe(400);
        const student = await Student.findOne(invalidStudent).exec();
        expect(student).toBeNull();
      }
    );
  });

  // describe('GET /v1/students', ()=>{})
});
