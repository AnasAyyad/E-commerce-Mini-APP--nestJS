import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { ProductHistory } from './entities/produc_history.entity';
@Injectable()
export class ProductsService {
constructor( @InjectRepository(Product) private productRepo:Repository<Product>,
@InjectRepository(Category) private categoryRepo:Repository<Category>,
 private usersService: UsersService,
 @InjectRepository(ProductHistory) private historyRepo:Repository<ProductHistory>,
 ){}

  


 private async createCategory(name:string){
const category= await this.categoryRepo.findOne({where:{name}})

if(!category){
  const category=this.categoryRepo.create({name})
  return this.categoryRepo.save(category)}
return category;
 }



  async create(id:number ,createProductDto: CreateProductDto) {
    const seller=await this.usersService.findOne(id)
    if(!seller){throw new NotFoundException('Seller not found')}

    const category=await this.createCategory(createProductDto.type)
    
    const product=this.productRepo.create({...createProductDto,seller,category})
    return this.productRepo.save(product)

  }

  findAll() {
    return this.productRepo.find()
  }

 async findOne(id: number) {
  const product= await this.productRepo.findOneBy({id})
  
  if(!product) {throw new NotFoundException('Item not found')}
    return product
  }


  private async userCheck(sellerId:number , itemId:number,message:string) {
    const product = await this.findOne(itemId)
  if(product.seller.id!==sellerId) throw new UnauthorizedException(`Not authorized to ${message} this item`)
   return product
  }

  


 async update(sellerId :number,id: number, updateProductDto: UpdateProductDto) {
  const product= await this.userCheck(sellerId, id, "Update")

  
  return this.productRepo.save({...product,...updateProductDto})

  }

  async remove(sellerId:number,id: number) {
    const product = await this.findOne(id)
    console.log(sellerId);
    if (product.seller.id!==sellerId) throw new UnauthorizedException("Not authorized to Delete this item")
 
    return this.productRepo.remove(product)
}


async buyProduct(userId:number,ids:number,discount?:number) {
  const user= await this.usersService.findOne(userId)
  const {id,...product} = await this.findOne(ids)
  if(discount){ product.price-=(discount*product.price/100)}
  const history = await this.historyRepo.create({...product,user,discount})
  
  await this.historyRepo.insert(history)
  product.quantity--
  await this.productRepo.update({id},product)
  return history
}

async getHistory(id:number){
  const user = await this.usersService.findOne(id)
  const productHistory= await this.historyRepo.find({where: {user}})
  return productHistory
}


}