import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService,
        private jwtService:JwtService){}
    
    /**
     * Method to validate user
     * @param name email
     * @param  pass password
     */
    async validateUser(name:string,pass:string){
         const user = await this.userService.getUser(name);
         if(user && bcrypt.compareSync(pass,user.password)) {
            const {password,...result}=user;
            return result;
         };
         return null;
    }

    async login(user){
        const payload= {username:user.name,sub:user._id}
        const options={
            expiresIn:'30d'
        }
        return this.jwtService.sign(payload,options);
    }
}
