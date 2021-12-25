import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { AccessToken } from './access-token.interface';
import { AuthCredentialsDTO } from './dtos/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    await this.usersRepository.createUser(authCredentialsDTO);
  }

  async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<AccessToken> {
    const { password, username } = authCredentialsDTO;
    const user = await this.usersRepository.getUserByUsername(username);

    if (!user) {
      throw new BadRequestException(`Username/password is incorrect`);
    }

    const passwordMatches = await compare(password, await user.password);

    if (!passwordMatches) {
      throw new BadRequestException(`Username/password is incorrect`);
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
