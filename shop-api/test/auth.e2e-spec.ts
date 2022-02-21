import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Role } from 'src/role/role.type';
import { UserProfileI } from 'src/users/interfaces/user.interface';
import { DatabaseModule } from 'src/database/database.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { UpdatePasswordDto } from 'src/users/dto/user.dto';

describe('Authentication system (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<UserEntity>;

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
      imports: [
        AppModule,
        DatabaseModule,
        TypeOrmModule.forFeature([UserEntity]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get(getRepositoryToken(UserEntity));
    await app.init();
  });

  it('POST /auth/register - handles registering', async () => {
    return await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: mockUser.email,
        password: mockUser.password,
        passwordConfirmation: mockUser.passwordConfirmation,
      })
      .expect(201)
      .then((res) => {
        console.log(res.body);
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

  it('POST /auth/login - handles login request', async () => {
    return await request(app.getHttpServer())
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

  it('POST /auth/activate/:token - actvates and returns user profile ', async () => {
    let activationToken: string;
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: mockUser.email, password: mockUser.password })
      .then(async (res) => {
        const { userId }: UserProfileI = res.body;
        const user = await userRepository.findOne({ id: userId });
        activationToken = user.activationToken;
      });

    return await request(app.getHttpServer())
      .post(`/auth/activate/${activationToken}`)
      .expect(201)
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
        expect(active).toBe(true);
        expect(firstName).toBe(null);
        expect(lastName).toBe(null);
        expect(email).toBe(mockUser.email);
      });
  });

  it('POST /auth/password/reset - handle password resetting', async () => {
    let userID: string;
    let accessToken: string;
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: mockUser.email, password: mockUser.password })
      .then(async (res) => {
        const { access_token, userId }: UserProfileI = res.body;
        userID = userId;
        accessToken = access_token;
      });

    const bearerToken = `Bearer ${accessToken}`;

    await request(app.getHttpServer())
      .post('/auth/password/reset')
      .send({ email: mockUser.email })
      .set('Authorization', bearerToken)
      .expect(201)
      .then((res) => {
        expect(Boolean(res.text)).toBe(true);
      });

    const currenUser = await userRepository.findOne({ id: userID });
    const resetPasswordToken = currenUser.resetPasswordToken;

    return await request(app.getHttpServer())
      .post(`/auth/password/reset/${resetPasswordToken}`)
      .send({
        password: 'Secret123456!@',
        passwordConfirmation: 'Secret123456!@',
      } as UpdatePasswordDto)
      .expect(201)
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
        expect(active).toBe(true);
        expect(firstName).toBe(null);
        expect(lastName).toBe(null);
        expect(email).toBe(mockUser.email);
      });
  });

  it('POST /auth/password/forgot - returns true if password wass assigned to reset', async () => {
    let token: string;
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: mockUser.email, password: 'Secret123456!@' })
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
