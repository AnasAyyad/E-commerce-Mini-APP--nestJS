import * as bcrypt from "bcrypt";

const hashRounds=12;


export async function hashPassword(rawPassword: string){
    const SALT =await  bcrypt.genSalt(hashRounds)
    return bcrypt.hash(rawPassword,SALT)
}

export  function comparePassword(rawPassword:string,hashedPasswords:string){
return bcrypt.compare(rawPassword,hashedPasswords)
}