import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
// import { EmailUserDto } from './dto/email-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepo.create(createUserDto);
      await this.userRepo.save(user);
      return { flag: true };
    } catch (e) {
      return { flag: false };
    }
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id: id });
  }

  async findEmail(email: string, password: string) {
    const userData = await this.userRepo.findOneBy({ email: email });
    if (!User) return false;
    if (userData.password != password) return false;
    return { status: true, id: userData.id, userName: userData.userName };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update({ id: id }, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
