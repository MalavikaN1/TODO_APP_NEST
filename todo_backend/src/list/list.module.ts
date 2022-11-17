import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { List } from './entities/list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([List, User])],
  controllers: [ListController],
  providers: [ListService, UserService],
})
export class ListModule {}
