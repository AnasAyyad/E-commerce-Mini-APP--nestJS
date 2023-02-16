import { Controller, Get, Post, Body, Patch, Param, Delete,Request, UseInterceptors, ClassSerializerInterceptor,Response, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { Public } from 'src/auth/utils/puplic decorator/puplic.decorator';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)

export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService:AuthService) {}

  @Post('signup')
  @Public()

 async create(@Body(ValidationPipe) createUserDto: CreateUserDto,@Response({passthrough:true}) res) {
   const user=await this.usersService.create(createUserDto);
   const tokken=await this.authService.login(user)
   res.cookie("Authorization",tokken,{httponly: true})
  console.log(tokken);
   return user
  }

  @Get("allusers")
  @Public()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch()
  update(@Body(ValidationPipe) updateUserDto: UpdateUserDto,
   @Request() req) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @Delete()
  remove(@Request() req) {
    return this.usersService.remove(req.user.id);
  }
}
