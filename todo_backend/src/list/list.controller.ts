import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { UserService } from 'src/user/user.service';

@Controller('list')
export class ListController {
  constructor(
    private readonly listService: ListService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createListDto: CreateListDto) {
    const userData = await this.userService.findOne(createListDto.user);
    return this.listService.create(createListDto, userData);
  }

  @Get()
  findAll() {
    return this.listService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listService.findOne(+id);
  }

  @Get('user/:id')
  async findUserList(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    return this.listService.findUserList(user);
  }

  @Patch('edit/:id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
