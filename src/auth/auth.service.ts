import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
config();
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private userModel: Model<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({
      userEmail: createUserDto.userEmail,
    });
    if (user) {
      throw new NotFoundException('User is already exist.');
    }
    if (!user) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createUserDto.userPassword,
        saltRounds,
      );
      return new this.userModel({
        userEmail: createUserDto.userEmail,
        userPassword: hashedPassword,
      });
    }
  }

  async logIn(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({
      userEmail: createUserDto.userEmail,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    } else {
      const checkPass = await bcrypt.compare(
        createUserDto.userPassword,
        user.userPassword,
      );
      if (checkPass) {
        const payload = {
          user_id: user._id,
          userEmail: createUserDto.userEmail,
        };
        const token = this.jwtService.sign(payload, {
          secret: 'r3@wr_w2',
          expiresIn: '1d',
        });
        return token;
      } else {
        throw new NotFoundException('Invalid Password.');
      }
    }
  }
}
