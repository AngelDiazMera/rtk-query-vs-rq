import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todos.dto';


@Controller('todos')
export class TodosController {
  constructor(
    private readonly todoService: TodoService,
  ) {}

  @Get()
  async index(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOneById(parseInt(id));
  }

  @Post()
  async create(@Body() { text }: { text: string }): Promise<Todo> {
    return this.todoService.create(text);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Todo): Promise<Todo> {
    return this.todoService.updateOneById(parseInt(id), data);
  }

  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param('id') id: string): Promise<number> {
    return this.todoService.deleteOneById(parseInt(id));
  }
}
