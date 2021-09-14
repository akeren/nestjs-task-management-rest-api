import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '@src/auth/users.repository';
import { AuthCredentialsDto } from '@src/auth/dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;

    const user = await this.usersRepository.findOne({ username });

    if (
      !user ||
      !(await this.usersRepository.isCorrectPassword(password, user))
    ) {
      throw new UnauthorizedException('Invalid login credentials.');
    }

    return 'success';
  }
}
