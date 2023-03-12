import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDTO } from './dto/create.user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('user') private userModel:Model<UserDocument>){}

    async createUser(user:CreateUserDTO):Promise<User>{
        const newUser = new this.userModel(user);
        return newUser.save();
    }
}
