import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { User } from '../user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: User) {
    const user = this.userRepository.findOne({
      userId: payload.userId,
      password: payload.password,
    });
    if (!user) {
      return false;
    }
    return { username: payload.username, password: payload.password };
  }
}

// 这段代码是一个 NestJS 的 Passport 模块的策略类 JwtStrategy，用于验证通过 JWT（JSON Web Token）身份验证的用户。

// 代码中使用了 @nestjs/common 和 @nestjs/passport 模块的注入装饰器 @Injectable 和 @InjectRepository。同时也引入了需要的外部模块：passport-jwt 和 typeorm。在类中使用了 Passport 模块的 PassportStrategy 类，并传入了 Strategy 类作为参数。

// 在构造函数中，使用了 @InjectRepository(User) 装饰器将 User 对象注入到该类中，作为与数据库进行交互的存储库。

// super() 调用了基础类的构造函数，并传入了一个对象作为参数，该对象包含了一些 JWT 验证所需的信息。包括从请求头中提取 JWT 的方法、是否忽略 JWT 过期时间和用于签名和验证 JWT 的密钥等。

// validate() 方法是 Passport 模块中的一个必需方法，用于验证 JWT 有效性，并返回一个表示验证结果的对象。在该方法中，使用传入的 payload 对象查询数据库中是否存在与该用户相关的信息。如果用户存在，则将用户的用户名和密码放在返回的对象中。

// 如果在数据库中没有找到相应的用户，则返回 false，这将阻止用户访问受保护的路由。
