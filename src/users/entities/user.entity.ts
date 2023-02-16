import { Exclude } from "class-transformer";
import { Product } from "src/products/entities/product.entity";
import { ProductHistory } from "src/products/entities/produc_history.entity";
import { Role } from "src/utils/role.enum";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

@PrimaryGeneratedColumn()
id:number;

@Column({unique:true})
email:string;

@Column()
@Exclude()
password:string;

@Column()
firstName:string;

@Column()
lastName:string;

@Column()
dateOfBirth:Date;

@Column({})
role:Role

@Column({nullable:true})
token?:string;

@Column({nullable:true})
tokenDate?:Date; 

@OneToMany(()=>Product,(product)=>product.seller)
products:Product[]

@OneToMany(()=>ProductHistory,(productHistory)=>productHistory.user)
productHistory:ProductHistory[]

constructor(partial:Partial<User>){
   
    Object.assign(this,partial)

}

}
