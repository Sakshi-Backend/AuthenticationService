import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { LoggerModule } from './logger/logger.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION_URL),
    LoggerModule,
    UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
