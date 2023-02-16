import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductHistory{

    @PrimaryGeneratedColumn()
    id:number ;

    @Column()
    productName:string;

    @Column({type:"decimal" ,precision:8,scale:2})
    price:number;

    @Column()
    discount?:number=0;

    @ManyToOne(()=>User,(user)=>user.productHistory)
    user:User

}