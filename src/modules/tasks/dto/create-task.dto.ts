import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum} from 'class-validator';
import { TaskStatus } from '../entities/enum.values';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  taskName: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  taskDescription: string;
  @ApiProperty({ enum: TaskStatus })
  @IsEnum(TaskStatus)
  @IsString()
  @IsNotEmpty()
  taskState:TaskStatus
}
