import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';

@Injectable()
export class ListService {
  constructor(@InjectRepository(List) private listRepo: Repository<List>) {}

  async create(createListDto: CreateListDto, userData: CreateUserDto) {
    return await this.listRepo.save({
      item: createListDto.item,
      user: userData,
    });
  }

  findAll() {
    return this.listRepo.find();
  }

  findOne(id: number) {
    return this.listRepo.findOneBy({ id: id });
  }

  findUserList(data: User) {
    return this.listRepo.find({ where: { user: data } });
  }

  update(id: number, updateListDto: UpdateListDto) {
    return this.listRepo.update({ id: id }, { item: updateListDto.item });
  }

  remove(id: number) {
    return this.listRepo.delete({ id: id });
  }
}
