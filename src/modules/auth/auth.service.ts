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
import { SALT_ROUNDS, SECRET_JWT } from '../../config/constants';
import * as bcrypt from 'bcrypt';

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
      const saltToNumber = parseInt(SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(
        createUserDto.userPassword,
        saltToNumber,
      );

      return new this.userModel({
        userEmail: createUserDto.userEmail,
        userPassword: hashedPassword,
      }).save();
    }
  }

  async logIn(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
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
        const accessToken = this.jwtService.sign(payload, {
          secret: SECRET_JWT,
          expiresIn: '1d',
        });
        return { accessToken };
      } else {
        throw new UnauthorizedException('Invalid Password.');
      }
    }
  }

  async validateUser(payload: any): Promise<any> {
    const { user_id } = payload;
    const user = await this.userModel.findOne(user_id);
    if (!user) {
      return 'Something whent wrong with User validation.';
    }
    return user;

    throw new UnauthorizedException();
  }
}
