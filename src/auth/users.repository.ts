import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@src/auth/user.entity';
import { AuthCredentialsDto } from '@src/auth/dto/auth-credentials.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  private async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async isCorrectPassword(password: string, user: User): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const hashedPassword = await this.hashedPassword(password);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already in use!');
      }

      throw new InternalServerErrorException();
    }
  }
}
