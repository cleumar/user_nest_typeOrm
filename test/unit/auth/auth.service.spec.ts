import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../src/auth/auth.service';
import { userRepositoryMock } from '../../mocks/users/user-repository.mock';
import { jwtServiceMock } from '../../mocks/jwt/jwt-service.mock';
import { userServiceMock } from '../../mocks/users/user-service.mock';
import { mailerServiceMock } from '../../mocks/mailer-service.mock';
import { userEntityList } from '../../mocks/users/user-entity-list.mock';
import { accessToken } from '../../mocks/token/access-token.mock';
import { jwtPayload } from '../../mocks/jwt/jwt-payload.mock';
import { resetToken } from '../../mocks/token/reset-token.mock';
import { authRegisterDTO } from '../../mocks/auth/auth-register-dto.mock';


describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRepositoryMock,
        jwtServiceMock,
        userServiceMock,
        mailerServiceMock,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  test('Validar a definição', () => {
    expect(authService).toBeDefined();
  });

  describe('Token', () => {
    test('createToken method', () => {
      const result = authService.createToken(userEntityList[0]);

      console.log(result);

      expect(result).toEqual({ accessToken });
    });

    test('checkToken method', () => {
      const result = authService.checkToken(accessToken);

      expect(result).toEqual(jwtPayload);
    });

    test('isValidToken method', () => {
      const result = authService.isValidToken(accessToken);

      expect(result).toEqual(true);
    });
  });

  describe('Autenticação', () => {
    test('login method', async () => {
      const result = await authService.login('joao@hcode.com.br', '123456');

      expect(result).toEqual({ accessToken });
    });

    test('forget method', async () => {
      const result = await authService.forget('joao@hcode.com.br');

      expect(result).toEqual({ success: true });
    });

    test('reset method', async () => {
      const result = await authService.reset('654321', resetToken);

      expect(result).toEqual({ accessToken });
    });

    test('register method', async () => {
      const result = await authService.register(authRegisterDTO);

      expect(result).toEqual({ accessToken });
    });
  });
});