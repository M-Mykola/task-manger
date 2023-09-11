import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './entities/task.entity';
import { Model } from 'mongoose';
import { TaskStatus } from './entities/enum.values';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto) {
    const createTask = await this.taskModel.create(createTaskDto);
    return createTask.save();
  }

  async findOne(id: string) {
    const findOneById = await this.taskModel.findById({ _id: id });
    if (findOneById) {
      return findOneById;
    } else {
      return 'Task has no found!';
    }
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

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const updateTask = await this.taskModel.findOneAndUpdate(
      { _id: id },
      updateTaskDto,
      { new: true },
    );
    if (updateTask) {
      return updateTask;
    } else {
      return 'Task has no found!';
    }
  }

  async remove(id: string) {
    const remove = await this.taskModel.findByIdAndRemove({ _id: id });
    if (remove) {
      return `Task '${id}' has been removed`;
    } else {
      return 'Task has no found!';
    }
  }

  async findAll() {
    const remove = await this.taskModel.find();
    if (remove) {
      return remove;
    } else {
      return 'Tasks has no found!';
    }
  }
}
