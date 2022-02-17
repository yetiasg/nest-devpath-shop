import { AuthService } from '@App/auth/auth.service';
import { MailService } from '@App/mail/mail.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

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

  beforeEach(async () => {
    const mockAuthService: Partial<AuthService> = {
      hashPassword: (password: string) => Promise.resolve('sddfwegfeghegh'),
    };

    const mockMailService: Partial<MailService> = {
      newAccountMail: (
        email: string,
        activationToken: string,
      ): Promise<boolean> => Promise.resolve(true),
      setNewPasswordPasswordMail: (
        email: string,
        resetPasswordToken: string,
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
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
