import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Role } from 'src/role/role.type';
import { UserProfileI } from 'src/users/interfaces/user.interface';

describe('Authentication system (e2e)', () => {
  let app: INestApplication;

  const mockUser = {
    email: 'mateuszzupa22@gmail.com',
    password: 'Secret1234!@',
    passwordConfirmation: 'Secret1234!@',
    role: Role.USER,
    firstName: 'Kinny',
    lastName: 'Zimmer',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /auth/register - handles registering', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: mockUser.email,
        password: mockUser.password,
        passwordConfirmation: mockUser.passwordConfirmation,
      })
      .expect(201)
      .then((res) => {
        const {
          userId,
          role,
          active,
          firstName,
          lastName,
          email,
          access_token,
        }: UserProfileI = res.body;
        expect(userId).toBeDefined();
        expect(role).toBe(Role.USER);
        expect(active).toBe(false);
        expect(firstName).toBe(null);
        expect(lastName).toBe(null);
        expect(email).toBe(mockUser.email);
        expect(access_token).toBeDefined();
      });
  });

  it('POST /auth/login - handles login request', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: mockUser.email, password: mockUser.password })
      .expect(201)
      .then((res) => {
        const {
          userId,
          role,
          active,
          firstName,
          lastName,
          email,
          access_token,
        }: UserProfileI = res.body;
        expect(userId).toBeDefined();
        expect(role).toBe(Role.USER);
        expect(active).toBe(false);
        expect(firstName).toBe(null);
        expect(lastName).toBe(null);
        expect(email).toBe(mockUser.email);
        expect(access_token).toBeDefined();
      });
  });

  it('POST /auth/profile - returns current user profile', async () => {
    let token: string;
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: mockUser.email, password: mockUser.password })
      .then((res) => {
        const { access_token }: UserProfileI = res.body;
        token = access_token;
      });

    const bearerToken = `Bearer ${token}`;

    return await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', bearerToken)
      .expect(200)
      .then((res) => {
        const {
          userId,
          role,
          active,
          firstName,
          lastName,
          email,
        }: UserProfileI = res.body;
        expect(userId).toBeDefined();
        expect(role).toBe(Role.USER);
        expect(active).toBe(false);
        expect(firstName).toBe(null);
        expect(lastName).toBe(null);
        expect(email).toBe(mockUser.email);
      });
  });

  it('POST /auth/password/reset - returns true if password wass assigned to reset', async () => {
    let token: string;
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: mockUser.email, password: mockUser.password })
      .then((res) => {
        const { access_token }: UserProfileI = res.body;
        token = access_token;
      });

    const bearerToken = `Bearer ${token}`;

    return await request(app.getHttpServer())
      .post('/auth/password/reset')
      .send({ email: mockUser.email })
      .set('Authorization', bearerToken)
      .expect(201)
      .then((res) => {
        expect(Boolean(res.text)).toBe(true);
      });
  });

  it('POST /auth/password/forgot - returns true if password wass assigned to reset', async () => {
    let token: string;
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: mockUser.email, password: mockUser.password })
      .then((res) => {
        const { access_token }: UserProfileI = res.body;
        token = access_token;
      });

    const bearerToken = `Bearer ${token}`;

    return await request(app.getHttpServer())
      .post('/auth/password/forgot')
      .send({ email: mockUser.email })
      .set('Authorization', bearerToken)
      .expect(201)
      .then((res) => {
        expect(Boolean(res.text)).toBe(true);
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
