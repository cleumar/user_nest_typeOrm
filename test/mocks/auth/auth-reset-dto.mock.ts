
import { AuthResetDTO } from '../../../src/auth/dto/auth-reset-dto'
import { resetToken } from '../token/reset-token.mock'

export const authResetDTO: AuthResetDTO = {
  password: '654321',
  token: resetToken
}
