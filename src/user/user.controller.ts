import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/general/decorators/public/public.decorator';
import { CreateUserDTO } from './dto/create.user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}
    
    @Public()
    @Post()
    async createUser(@Body() user:CreateUserDTO){
       return this.userService.createUser(user);
    }
}
