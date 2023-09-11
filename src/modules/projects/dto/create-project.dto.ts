import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  projectName: string;
  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  tasks:string[];
}
