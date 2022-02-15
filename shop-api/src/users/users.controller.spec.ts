import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe.only('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const result = [] as UserEntity[];
      jest
        .spyOn(usersService, 'getAllUsers')
        .mockImplementation(() => result as any);

      expect(await usersController.getAllUsers()).toBe(result);
    });
  });
});
