import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from '../../../src/auth/auth.controller'
import { authServiceMock } from '../../mocks/auth/auth-service.mock'
import { fileServiceMock } from '../../mocks/file/file-service.mock'
import { AuthGuard } from '../../../src/guards/auth.guards'
import { guardMock } from '../../mocks/guard.mock'
import { authLoginDTO } from '../../mocks/auth/auth-login-dto.mock'
import { accessToken } from '../../mocks/token/access-token.mock'
import { authRegisterDTO } from '../../mocks/auth/auth-register-dto.mock'
import { authForgetDTO } from '../../mocks/auth/auth-forget-dto.mock'
import { authResetDTO } from '../../mocks/auth/auth-reset-dto.mock'
import { userEntityList } from '../../mocks/users/user-entity-list.mock'
import { getPhoto } from '../../mocks/file/get-photo.mock'

describe('AuthController', () => {
  let authController: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock]
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile()

    authController = module.get<AuthController>(AuthController)
  })

  test('Validar a definição', () => {
    expect(authController).toBeDefined()
  })

  describe('Fluxo de autenticação', () => {
    test('login method', async () => {
      const result = await authController.login(authLoginDTO)
      expect(result).toEqual({ accessToken })
    })
    test('register method', async () => {
      const result = await authController.register(authRegisterDTO)
      expect(result).toEqual({ accessToken })
    })
    test('forget method', async () => {
      const result = await authController.forget(authForgetDTO)
      expect(result).toEqual({ success: true })
    })
    test('reset method', async () => {
      const result = await authController.reset(authResetDTO)
      expect(result).toEqual({ accessToken })
    })
  })

  describe('Rotas autenticadas', () => {
    test('me method', async () => {
      const result = await authController.me(userEntityList[0])
      expect(result).toEqual(userEntityList[0])
    })

    test('uploadPhoto method', async () => {
      const photo = await getPhoto()
      const result = await authController.uploadPhoto(userEntityList[0], photo)
      expect(result).toEqual(photo)
    })
  })
})
