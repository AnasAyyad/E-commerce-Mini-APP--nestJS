import { Injectable, } from '@nestjs/common';
import { ConflictException, InternalServerErrorException, NotFoundException, UnauthorizedException ,} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/bycrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>){}

 
  async create(createUserDto: CreateUserDto) {
    
    const password=await hashPassword(createUserDto.password);
    const newUser=this.userRepo.create({...createUserDto, password})
    
    try {
    
    const user=await this.userRepo.save(newUser)
    return user

  }catch (error) {
    
    
    if(error.code==="ER_DUP_ENTRY")
    {throw new ConflictException('Email already exists')
  }else{throw new InternalServerErrorException()}
}
 }

  findAll() {
    const users=this.userRepo.find();
    return users
  }

  async findOne(id: number):Promise<User> {
   const user = await this.userRepo.findOneBy({id});
   if(!user) throw new NotFoundException("User not found")
   
   return user
  }

 


  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
     
    return this.userRepo.save({...user,...updateUserDto})
  }

  async remove(id: number) {

    const user = await this.findOne(id);
   return this.userRepo.remove(user)
   
    
  }

   async findUserByEmail(email: string){
    const user = await this.userRepo.findOneBy({email})
    console.log(user);
    
    return user
  }


  async findUserJwt(token: string){
    const user = await this.userRepo.findOneBy({token})
    return user
  }
}
