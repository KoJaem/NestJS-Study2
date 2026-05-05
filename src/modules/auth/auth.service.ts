import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(username: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ username });

    if (existingUser) {
      throw new BadRequestException('이미 존재하는 사용자입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userRepository.save({
      username,
      password: hashedPassword,
    });
  }
}
