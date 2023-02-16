import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDto {

@IsNotEmpty()
productName: string;

@IsNotEmpty()
@IsNumber()
price:number;

@IsNotEmpty()
@IsNumber()
quantity:number;

@IsNotEmpty()
type:string;

}
