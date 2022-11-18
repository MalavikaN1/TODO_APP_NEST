import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async validateUser(email: string, password: string) {
    const userData = await this.userService.findEmail(email);
    if (userData) {
      const matched = comparePasswords(password, userData.password);
      if (matched) {
        return { status: true, id: userData.id, userName: userData.userName };
      } else {
        {
          return { status: false };
        }
      }
    } else {
      return { status: false };
    }
  }
}
