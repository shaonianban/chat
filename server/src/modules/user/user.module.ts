import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
// 此模块使用forFeature()来定义在当前范围内注册了那些存储库，此时将可以使用装饰器将 UsersRepository 注入到`UsersService @InjectRepository().
