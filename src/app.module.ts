import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './modules/tasks/tasks.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { AuthModule } from './modules/auth/auth.module';
import { MONGO_URI } from './config';


@Module({
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TasksModule,
    ProjectsModule,
    MongooseModule.forRoot(MONGO_URI),
    AuthModule,
  ],
})
export class AppModule {}
