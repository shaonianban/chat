import { Module } from '@nestjs/common';
// 数据库
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      username: 'root',
      password: 'Pa@ss136985',
      database: 'chat',
      charset: 'utf8mb4',
      authLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
