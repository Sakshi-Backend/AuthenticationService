import { Controller, Post, UseGuards,Request, Get } from '@nestjs/common';
import { Public } from 'src/general/decorators/public/public.decorator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    
    @UseGuards(LocalAuthGuard)
    @Public()
    @Post('login')
    async login(@Request() req){
        const accessToken = await this.authService.login(req.user)
        return {
            user:req.user,
            access_token:accessToken
        };
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req){
        return req.user;
    }
}
