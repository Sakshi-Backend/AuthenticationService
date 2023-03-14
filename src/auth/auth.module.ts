import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt/jwt.strategy';

@Module({
  imports:[
    UserModule,
    PassportModule,
  JwtModule.registerAsync({
    useFactory:()=>({
      secret:process.env.JWT_AUTH_SECRET
    })
  })],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
