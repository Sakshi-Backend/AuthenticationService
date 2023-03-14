import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { LoggerModule } from './logger/logger.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION_URL),
    LoggerModule,
    UserModule,
    AuthModule],
  controllers: [AppController],
  providers: [
    {
      provide:APP_GUARD,
      useClass:JwtAuthGuard
    }
  ],
})
export class AppModule {}
