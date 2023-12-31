import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Project Service')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @Post('createProject')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }
}
