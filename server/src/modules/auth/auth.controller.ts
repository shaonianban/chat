// 这段代码是一个 NestJS 的控制器，主要包括两个路由 login 和 register，使用了 @UseGuards 装饰器来应用认证守卫，确保只有授权用户可以访问这些路由。具体解释如下：

// import { Controller, Post, Request, UseGuards } from '@nestjs/common';: 引入 NestJS 框架中的一些基础模块和装饰器，包括控制器、路由、请求对象和认证守卫。
// import { AuthGuard } from '@nestjs/passport';: 引入 NestJS 中用于实现基于 Passport 的认证守卫的模块。
// import { AuthService } from './auth.service';: 引入一个自定义的 AuthService 类。
// @Controller('auth'): 使用 @Controller 装饰器来定义控制器，其中 'auth' 参数表示路由前缀为 '/auth'。
// constructor(private readonly authService: AuthService) {}: 通过依赖注入的方式注入一个 AuthService 实例，用于在控制器中调用该服务中的方法。
// @UseGuards(AuthGuard('local')): 使用 @UseGuards 装饰器应用 AuthGuard 认证守卫，确保只有经过身份验证的用户才能访问该路由。
// @Post('/login'): 使用 @Post 装饰器定义路由方法，其中 '/login' 参数表示完整路由路径为 '/auth/login'。
// async login(@Request() req): 定义一个异步方法 login，该方法接受一个 @Request() 装饰器注入的请求对象作为参数，表示该方法处理 POST /auth/login 路由的请求。该方法调用了 authService 中的 login 方法，并将 req.user 作为参数传递给 login 方法。
// async register(@Request() req): 定义一个异步方法 register，该方法接受一个 @Request() 装饰器注入的请求对象作为参数，表示该方法处理 POST /auth/register 路由的请求。该方法调用了 authService 中的 register 方法，并将 req.user 作为参数传递给 register 方法。

import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // 注册
  @UseGuards(AuthGuard('local'))
  @Post('/register')
  async register(@Request() req) {
    return this.authService.register(req.user);
  }
}
