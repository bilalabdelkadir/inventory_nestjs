import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(data: CreateUserDto) {
    // generate the hash
    const hash = await bcrypt.hash(data.password, 10);

    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: hash,
          role: data.role,
        },
      });

      delete user.password;

      return { data };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email Already in use');
        }
      }
      throw error;
    }
  }
}
