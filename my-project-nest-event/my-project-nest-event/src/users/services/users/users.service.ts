import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }


  async createUser(userDetails: CreateUserParams): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userDetails.password, salt);

    const userRole = userDetails.role || UserRole.USER; 

    const newUser = this.userRepository.create({
      username: userDetails.username,
      email: userDetails.email,
      password: hashedPassword,
      role: userRole, 
      createdAt: new Date(), 
    });

    await this.userRepository.save(newUser);
    return newUser;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }



  async updateUser(id: number, updateUserDetails: UpdateUserParams): Promise<User> {
    if (updateUserDetails.password) {
      const salt = await bcrypt.genSalt();
      updateUserDetails.password = await bcrypt.hash(updateUserDetails.password, salt);
    }

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.update(id, updateUserDetails);
    return this.userRepository.findOne({
      where: { id },
    });
  }


  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
