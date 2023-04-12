/**
 * 这是一个 NestJS 的模块文件示例，NestJS 是一个流行的基于 Node.js 的框架，用于构建可扩展的服务器端应用程序。
 * 在这个模块文件中，我们可以看到几个关键组件：
 * TypeOrmModule：这是一个模块，用于将 TypeORM（一个流行的 Node.js 对象关系映射库）集成到我们的 NestJS 应用程序中。它允许我们指定哪些实体（在这种情况下为 User 和 GroupMap）应由 ORM 管理。
 * JwtModule：这是一个模块，用于生成 JSON Web Tokens（JWT），以在我们的应用程序中对用户进行身份验证和授权。我们可以指定用于签署 JWT 的秘密密钥，以及任何其他选项，例如过期时间。
 * PassportModule：这是一个模块，用于将 Passport（一个流行的 Node.js 身份验证中间件）集成到我们的 NestJS 应用程序中。它允许我们定义不同的身份验证策略（在这种情况下为 LocalStrategy 和 JwtStrategy）以处理不同类型的身份验证。
 * controllers：此属性指定与此模块关联的控制器。在这种情况下，AuthController 将处理与用户身份验证相关的所有路由。
 * providers：此属性指定与此模块关联的服务。在这种情况下，AuthService、LocalStrategy 和 JwtStrategy 服务将处理身份验证逻辑。
 * exports：此属性指定哪个模块或服务应该对其他模块进行导入。在这种情况下，AuthService 服务将可供其他模块使用。
 */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3d' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
