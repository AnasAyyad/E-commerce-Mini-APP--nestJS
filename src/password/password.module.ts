import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';

@Module({
  imports:[UsersModule,MailerModule.forRoot({
    transport:{
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    auth:{
      user:process.env.EMAIL_USERNAME,
      pass:process.env.EMAIL_PASSWORD
    }
      
    },
    defaults:{
      from:"anas@anas.com"
    }
  }),
  JwtModule.register({
    secret:process.env.JWT_SECRET,
    signOptions:{
      expiresIn: 300,
    }})],
  controllers: [PasswordController],
  providers: [PasswordService]
})
export class PasswordModule {}
