import { RoleType } from '../../user/validation/user.dto'

export interface PayloadToken {
  role: RoleType | undefined
  sub: string | undefined
}
