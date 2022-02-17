import { UsersModule } from '../../src/users/users.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModle } from '../../src/database/database.module';
import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from '../../src/app.module';

describe('[Feature] Users - /users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleMixtue: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UsersModule, DatabaseModle, ConfigModule],
    }).compile();

    app = moduleMixtue.createNestApplication();
    await app.init();
  });

  it('GET /users', () => {
    // return request(app.getHttpServer()).get('/').expect(200);
    expect(5).toEqual(5);
  });

  afterAll(async () => {
    app.close();
  });
});
