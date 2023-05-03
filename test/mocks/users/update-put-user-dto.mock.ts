import { Role } from "../../../src/enums/roles.enum";
import { UpdatePutUserDTO } from "../../../src/user/dto/update-put-user-dto";


export const updatePutUserDTO: UpdatePutUserDTO = {
  birthAt: '2000-01-01',
  email: 'joao@hcode.com.br',
  name: 'Joao Rangel',
  password: '123456',
  role: Role.User,
};