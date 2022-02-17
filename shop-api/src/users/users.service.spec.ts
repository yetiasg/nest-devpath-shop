/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthService } from '../auth/auth.service';
import { MailService } from '../mail/mail.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { UserProfileI } from './interfaces/user.interface';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from './dto/user.dto';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('UsersService', () => {
  let usersService: UsersService;

  const mockNewUser = {
    id: 'a03269cd-623a-48f9-a541-02616fsba0',
    role: 'USER',
    active: false,
    firstName: 'Kinny',
    lastName: 'Zimmer',
    email: 'test@gmail.com',
    activationToken: 'dfsagerhgedgwegwerwrg',
    resetPasswordToken: 'efwgetghergwerger',
  };

  const mockUsers = [
    {
      id: 'd03269cd-623a-48f9-a541-02616ffba4d7',
      role: 'USER',
      active: true,
      firstName: 'Matt',
      lastName: 'Soup',
      email: 'mateuszzupa22@gmail.com',
      activationToken: 'dfgdfgdfg',
      resetPasswordToken: 'efwgetghergwerger',
    },
    {
      id: 'df3269cd-623a-48f9-a541-02616ffba4b9',
      role: 'ADMIN',
      active: true,
      firstName: 'Mati',
      lastName: 'Żupa',
      email: 'm.zupa@selleo.com',
      activationToken: 'dfsagerhgedgghdsfhsdwegwerwrg',
      resetPasswordToken: 'efwgetghhfhergwerger',
    },
  ];

  const mockUserProfile = (mockUser): UserProfileI => ({
    userId: mockUser.id,
    role: mockUser.role,
    active: mockUser.active,
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
    email: mockUser.email,
  });

  beforeEach(async () => {
    const mockAuthService: Partial<AuthService> = {
      hashPassword: (password: string) => Promise.resolve('sddfwegfeghegh'),
    };

    const mockRepository = jest.fn(() => ({
      find: () => Promise.resolve(mockUsers),
      findOne: (field: string) => {
        switch (Object.keys(field)[0]) {
          case 'id':
            return {
              ...mockUsers.find((el) => el.id === field['id']),
              save: async () => await Promise.resolve(),
            };

          case 'email':
            return mockUsers.find((el) => el.email === field['email']);

          case 'activationToken':
            return {
              ...mockUsers.find(
                (el) => el.activationToken === field['activationToken'],
              ),
              save: async () => await Promise.resolve(),
            };

          case 'resetPasswordToken':
            return {
              ...mockUsers.find(
                (el: typeof mockUsers[0]) =>
                  el.resetPasswordToken === field['resetPasswordToken'],
              ),
              save: async () => await Promise.resolve(),
            };
        }
      },

      create: () => ({
        ...mockNewUser,
        save: async () => await Promise.resolve(),
      }),

      save: async (user: typeof mockUsers[0]) => await Promise.resolve(user),

      delete: async (id: string) => mockUsers.find((el) => el.id === id),
    }));

    const mockMailService: Partial<MailService> = {
      newAccountMail: (
        _email: string,
        _activationToken: string,
      ): Promise<boolean> => Promise.resolve(true),

      setNewPasswordPasswordMail: (
        _email: string,
        _resetPasswordToken: string,
      ): Promise<boolean> => Promise.resolve(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
        { provide: getRepositoryToken(UserEntity), useClass: mockRepository },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('Return user/s', () => {
    it('returns all users', async () => {
      expect(await usersService.getAllUsers()).toBe(mockUsers);
    });

    it('returns user by given id', async () => {
      const { save, ...result } = await usersService.getUserById(
        mockUsers[0].id,
      );
      expect(result).toEqual(mockUsers[0]);
    });

    it('returns user by given email', async () => {
      expect(await usersService.getUserByEmail(mockUsers[0].email)).toBe(
        mockUsers[0],
      );
    });

    it('returns user by given activationToken', async () => {
      const { save, ...result } = await usersService.getUserByActivationToken(
        mockUsers[0].activationToken,
      );
      expect(result).toEqual(mockUsers[0]);
    });

    it('returns user by resetPasswordToken', async () => {
      const { save, ...result } =
        await usersService.getUserByResetPasswordToken(
          mockUsers[0].resetPasswordToken,
        );
      expect(result).toEqual(mockUsers[0]);
    });
  });

  describe('Return user profile', () => {
    it('returns user profile by given id', async () => {
      expect(await usersService.getUserProfile(mockUsers[0].id)).toEqual(
        mockUserProfile(mockUsers[0]),
      );
    });
  });

  describe('Create user', () => {
    it('returns new user if given email is not used', async () => {
      const { save, ...result } = await usersService.createUser({
        email: mockNewUser.email,
        password: 'Secret1234!@',
      } as CreateUserDto);
      expect(result).toEqual(mockNewUser);
    });

    it('throw an error if email is taken', async () => {
      try {
        await usersService.createUser({
          email: mockUsers[0].email,
          password: 'Secret1234',
        } as CreateUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('Activate account', () => {
    it('returns user profile by given id', async () => {
      expect(
        await usersService.activateAccount(mockUsers[0].activationToken),
      ).toEqual(mockUserProfile(mockUsers[0]));
    });

    it('throw an error if user does not exist', async () => {
      try {
        await usersService.activateAccount(mockNewUser.activationToken);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Invite user by email', () => {
    it('throws an error if email already exists in db', async () => {
      try {
        await usersService.inviteUserByEmail(mockUsers[0].email);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('throws an exception if invited user was not saved ', async () => {
      try {
        await usersService.inviteUserByEmail(mockNewUser.email);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('Update user', () => {
    it('returns updaed user', async () => {
      const { save, ...result } = await usersService.updateUser(
        mockUsers[0].id,
        {
          firstName: 'Olek',
        } as UpdateUserDto,
      );
      const updated = Object.assign(mockUsers[0], { firstName: 'Olek' });
      expect(result).toStrictEqual(updated);
    });

    it('throws an error if user was not found', async () => {
      try {
        const { save, ...result } = await usersService.updateUser(
          mockUsers[0].id,
          {
            firstName: 'Olek',
          } as UpdateUserDto,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Delete user by given id', () => {
    it('deletes user', async () => {
      expect(await usersService.removeUserById(mockUsers[0].id)).toEqual(
        mockUsers[0],
      );
    });
  });

  describe('User forgot password', () => {
    it('returns true if password was resetted successfully', async () => {
      expect(await usersService.resetPassword(mockUsers[0].id)).toBe(true);
    });

    it('throws an error if user was not found', async () => {
      try {
        await usersService.resetPassword(mockNewUser.id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Handle password resetting', () => {
    it('returns user profile', async () => {
      expect(
        await usersService.handleResettingPassword(
          mockUsers[0].resetPasswordToken,
          {
            password: 'Secret123456!@',
            passwordConfirmation: 'Secret123456!@',
          } as UpdatePasswordDto,
        ),
      ).toEqual(mockUserProfile(mockUsers[0]));
    });

    it('throws an error if user was not found', async () => {
      try {
        await usersService.handleResettingPassword(
          mockNewUser.resetPasswordToken,
          {
            password: 'Secret123456!@',
            passwordConfirmation: 'Secret123456!@',
          } as UpdatePasswordDto,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Generate activation token', () => {
    it('returns token string', async () => {
      expect(await usersService.generateActivationToken()).toEqual(
        expect.any(String),
      );
    });
  });

  describe('Generate password', () => {
    it('returns token string', async () => {
      expect(await usersService.genPassword()).toEqual(expect.any(String));
    });
  });
});
