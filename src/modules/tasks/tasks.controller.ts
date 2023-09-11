import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Task Service')
@Controller('taskService')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('createTask')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get('findTasksByCriteria/')
  findTasksByCriteria(@Query() query: any) {
    return this.tasksService.findTasksByCriteria(query);
  }

  @Patch('/updateTask/:id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Get('/findTask/:id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Get('all')
  findAll() {
    return this.tasksService.findAll()
  }

  @Delete('/removeTask/:id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
