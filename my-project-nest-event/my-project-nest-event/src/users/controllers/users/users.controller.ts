import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { LoginDto } from 'src/users/dtos/Login.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { UsersService } from 'src/users/services/users/users.service';


@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {}

  @Get()
  async getUsers() {
    const users = await this.userService.findUsers();
    return users;
  }

  @Post('/create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return user;  
  }

  @Put('/update/:id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto, 
  ) {
    try {
      const updatedUser = await this.userService.updateUser(id, updateUserDto);

      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return { message: 'User updated successfully', user: updatedUser };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete('/delete/:id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully' }; 
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.userService.login(user);
  }

  @UseGuards(AuthGuard)  
  @Put('profile/:id')
  async updateProfile(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
