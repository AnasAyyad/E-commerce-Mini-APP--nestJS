import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Product } from 'src/products/entities/product.entity';

import { APP_GUARD } from '@nestjs/core';
import { RoleGaurd } from 'src/utils/ROLE/Role.guard';
import { jwtAuth } from 'src/auth/utils/guards/jwt.guard';
import { Category } from 'src/products/entities/category.entity';
import { ProductHistory } from 'src/products/entities/produc_history.entity';
import { PasswordModule } from 'src/password/password.module';
@Module({
  imports: [ConfigModule.forRoot(),
    UsersModule,
     ProductsModule,  
     AuthModule,
     PasswordModule,
     TypeOrmModule.forRoot({
      type:process.env.DB_TYPE,
      host:process.env.DB_HOST,
      port:process.env.DB_PORT,
      username:process.env.DB_USERNAME,
      password:process.env.DB_PASS,
      database:process.env.DB_NAME,
      entities:[User,Product,Category,ProductHistory],
      synchronize:true
  })],
  controllers: [AppController],
  providers: [AppService
    ,{
    provide:APP_GUARD,
    useClass:jwtAuth
  }
  ,{
    provide:APP_GUARD,
    useClass:RoleGaurd
  }],
})
export class AppModule {}
