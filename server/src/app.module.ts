import { Module } from '@nestjs/common';
import { TodosModule } from './modules/todos/todo.module';
import { TodoService } from './modules/todos/todo.service';

@Module({
  imports: [TodosModule],
})
export class AppModule {}
