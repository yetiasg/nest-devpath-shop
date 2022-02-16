import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe.only('UsersController', () => {
  let controller: UsersController;

  const mockUsers = [
    {
      id: 'd03269cd-623a-48f9-a541-02616ffba4d7',
      active: true,
      email: 'mateuszzupa22@gmail.com',
    },
    {
      id: '53832c34-5592-4faa-8cdc-b4bcf56c6275',
      active: false,
      email: 'yetiasgii@gmail.com',
    },
    {
      id: 'c6aca291-2231-4ceb-8f0b-790ad758736c',
      active: true,
      email: 'm.zupa@selleo.com',
    },
  ];

  const mockUsersService = {
    getAllUsers: jest.fn(() => {
      return mockUsers;
    }),
    getUserById: jest.fn((id) => {
      return mockUsers.find((user) => user.id === id) ?? null;
    }),
    updateUser: jest.fn((id, user) => {
      const userInDb = mockUsers.find((user) => user.id === id);
      return Object.assign(userInDb, user);
    }),
    inviteUserByEmail: jest.fn((email) => {
      const userInDb = mockUsers.find((user) => user.email === email);
      if (userInDb) throw new BadRequestException('User already exists');
      else return true;
    }),
    removeUserById: jest.fn((id) => {
      return mockUsers.find((user) => user.id === id);
    }),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = moduleRef.get<UsersController>(UsersController);
  });

  describe('Methods returning users', () => {
    it('should return all users', async () => {
      expect(await controller.getAllUsers()).toEqual(mockUsers);
    });

    it('should return user with given id', async () => {
      expect(await controller.getUserById(mockUsers[0].id)).toEqual(
        mockUsers[0],
      );
    });

    it('should return null if user does not exist', async () => {
      expect(await controller.getUserById('5')).toEqual(null);
    });
  });

  describe('Modifying users', () => {
    it('should return updated user', async () => {
      expect(
        await controller.updateUser(mockUsers[2].id, {
          email: 'mati1234@selleo.com',
        }),
      ).toEqual({
        id: 'c6aca291-2231-4ceb-8f0b-790ad758736c',
        active: true,
        email: 'mati1234@selleo.com',
      });
    });

    it('should remove given user', async () => {
      expect(await controller.removeUserById(mockUsers[1].id)).toBe(
        mockUsers[1],
      );
    });
  });

  describe('Handle sending invitation email', () => {
    it('should return true after invitation not existing user', async () => {
      expect(await controller.inviteUser('aaa@aaa.pl')).toBe(true);
    });

    it('should throw an error - User already exists - if invitated user already exists in db', async () => {
      try {
        await controller.inviteUser(mockUsers[1].email);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
