import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '@src/auth/users.repository';
import { AuthCredentialsDto } from '@src/auth/dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@src/auth/jwt-payload.interface';
import { User } from '@src/auth/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signJwt(payload: JwtPayload): Promise<string> {
    const { id } = payload;
    return await this.jwtService.sign({ id });
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;

    const user: User = await this.usersRepository.findOne({ username });

    if (
      !user ||
      !(await this.usersRepository.isCorrectPassword(password, user))
    ) {
      throw new UnauthorizedException('Invalid login credentials.');
    }

    const accessToken: string = await this.signJwt({ id: user.id });

    return { accessToken };
  }
}
