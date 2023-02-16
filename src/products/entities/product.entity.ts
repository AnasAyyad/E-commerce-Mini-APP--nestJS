import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";


@Entity()
export class Product {

@PrimaryGeneratedColumn()
id:number;

@Column()
productName:string;

@Column({type:"decimal" ,precision:8,scale:2})
price:number;

@Column()
 quantity:number;

@Column()
 dateCreated:Date =new Date();

@ManyToOne(()=>User, (user)=>user.products,{eager:true})
seller:User

@ManyToOne(()=>Category,(category)=>category.products)
category:Category

}
