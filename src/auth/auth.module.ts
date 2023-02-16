import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { localStrategy } from './utils/strategies/local.startegy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtStrategy } from './utils/strategies/jwt.strtaegy';
import { jwtAuth } from './utils/guards/jwt.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[forwardRef(()=> UsersModule),PassportModule,
    ConfigModule.forRoot(),
    JwtModule.register({
    secret:process.env.JWT_SECRET,
    signOptions:{
      expiresIn: 3,
    }
    
  })],
  controllers: [AuthController],
  providers: [AuthService,localStrategy,jwtStrategy],
  exports:[AuthService]
 
  
})
export class AuthModule {}
