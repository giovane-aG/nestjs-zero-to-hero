import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDTO } from './dtos/auth-credentials.dto';
import { User } from './user.entity';
import { hash, genSalt } from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async getUserByUsername(username: string): Promise<User> {
    return await this.findOne({ username });
  }

  async createUser(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentialsDTO;

    const userAlreadyExists = await this.getUserByUsername(username);

    if (userAlreadyExists) {
      throw new ConflictException(
        `Username ${username} it is not available to use`,
      );
    }

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    const user = new User();
    user.username = username;
    user.password = hashedPassword;

    await this.save(user);
  }
}
