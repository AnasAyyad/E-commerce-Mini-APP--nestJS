import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe, Request, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from 'src/auth/utils/puplic decorator/puplic.decorator';
import { Role } from 'src/utils/role.enum';
import { Roles } from 'src/utils/ROLE/role.metadata';

@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @Roles(Role.SELLER)
  create(@Request() req ,@Body(ValidationPipe) createProductDto: CreateProductDto) {
    return this.productsService.create(req.user.id,createProductDto);
  }

  @Get('find')
  @Public()
  findAll() {
    return this.productsService.findAll();
  }


  @Get('find/:id')
  @Public()
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.SELLER)
  update(@Param('id',ParseIntPipe) id: number,
 @Body(ValidationPipe) updateProductDto: UpdateProductDto,
 @Request() req) {
  
    return this.productsService.update(req.user.id,id, updateProductDto);
  }

  @Delete(':id')
  @Roles(Role.SELLER)
  remove(@Param('id',ParseIntPipe) id: number,
  @Request() req) {
    return this.productsService.remove(req.user.id,id);
  }


  @Post('buy/:id')
  async buyProduct(@Param('id',ParseIntPipe) id: number,
  @Request() req,
  @Query('discount') discount?: number
  ) {
  return this.productsService.buyProduct(req.user.id,id,discount)

  }

  @Get("history")
  showHistory(@Request () req){
    return this.productsService.getHistory(req.user.id)
  }
  }
