import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './entities/project.entity';
import { Model } from 'mongoose';
import mongoose from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel('Project') private projectModel: Model<Project>) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const taskIds = createProjectDto.tasks;
    const newProject = new this.projectModel({
      projectName: createProjectDto.projectName,
      tasks: taskIds,
    });

    return await newProject.save();
  }

}
