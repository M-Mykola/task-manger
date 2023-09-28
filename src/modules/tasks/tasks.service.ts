import {
  Injectable,
  BadRequestException,
  // UnauthorizedException,
  // HttpException,
  // HttpStatus,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './entities/task.entity';
import { Model } from 'mongoose';
import { TaskStatus } from './entities/enum.values';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task | null> {
    return await this.taskModel.create(createTaskDto);
  }

  async findOne(id: string): Promise<Task | null> {
    return await this.taskModel.findById({ _id: id });
  }

  async findTasksByCriteria(query: any): Promise<Task[]> {
    const aggregationPipeline = [];
    if (!query.taskState && !query.startDate && !query.endDate) {
      throw new BadRequestException('Must be some filter parameters!.');
    }
    if (
      query.taskState &&
      Object.values(TaskStatus).includes(query.taskState)
    ) {
      aggregationPipeline.push({
        $match: { taskState: query.taskState },
      });
    }
    if (query.startDate || query.endDate) {
      const dateFilter: any = {};
      if (query.startDate) {
        dateFilter.$gte = new Date(query.startDate);
      }
      if (query.endDate) {
        dateFilter.$lte = new Date(query.endDate);
      }
      aggregationPipeline.push({
        $match: { createdAt: dateFilter },
      });
    }
    if (aggregationPipeline.length > 0) {
      const result = await this.taskModel.aggregate(aggregationPipeline).exec();
      return result;
    }
    if (query.taskState != Object.values(TaskStatus)) {
      throw new BadRequestException(
        `taskState must be: ${Object.keys(TaskStatus)}`,
      );
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> | null {
    return await this.taskModel.findOneAndUpdate({ _id: id }, updateTaskDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Task> {
    return await this.taskModel.findByIdAndRemove({ _id: id });
  }

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find();
  }
}
