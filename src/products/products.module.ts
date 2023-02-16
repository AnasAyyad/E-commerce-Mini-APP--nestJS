import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { ProductHistory } from './entities/produc_history.entity';

@Module({
  imports:[UsersModule,TypeOrmModule.forFeature([Product,Category,ProductHistory])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
