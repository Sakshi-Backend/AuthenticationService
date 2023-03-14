import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps:true})
export class User{
    @Prop({required:true})
    name:string;
    
    @Prop({required:true,unique:true})
    email:string;
    
    @Prop({required:true,select:false})
    password?:string;
    
    @Prop()
    createdAt:Date;

    @Prop()
    updatedAt:Date;
}

export const UserSchema= SchemaFactory.createForClass(User);

UserSchema.pre('save',function(next){
    var user = this;
    //hash password if it has been modified or null
    if(!user.isModified('password')) return next();
    //generate salt
    bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS),function(err,salt){
        if(err) return next(err);
        //hash password
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err);
            user.password=hash;
            next();
        })
    })
})
