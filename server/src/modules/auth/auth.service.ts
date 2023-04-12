import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { nameVerify, passwordVerify } from 'src/common/tool/utils';
import { RCode } from 'src/common/constant/rcode';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: User): Promise<any> {
    const user = await this.userRepository.findOne({
      username: data.username,
      password: data.password,
    });
    if (!user) {
      return { code: 1, msg: '密码错误', data: '' };
    }
    if (!passwordVerify(data.password) || !nameVerify(data.username)) {
      return { code: RCode.FAIL, msg: '注册校验不通过', data: '' };
    }
    user.password = data.password;
    const payload = { userId: user.userId, password: data.password };
    return {
      msg: '登录成功',
      data: {
        user,
        token: this.jwtService.sign(payload),
      },
    };
  }

  async register(user: User): Promise<any> {
    const isHave = await this.userRepository.find({ username: user.username });
    if (isHave.length) {
      return { code: RCode.FAIL, msg: '用户名重复', data: '' };
    }
    user.avatar = `api/avatar/avatar(${Math.round(
      Math.random() * 19 + 1,
    )}).png`;
    user.role = 'user';
    const newUser = await this.userRepository.save(user);
    const payload = { userId: newUser.userId, password: newUser.password };
    return {
      msg: '注册成功',
      data: {
        user: newUser,
        token: this.jwtService.sign(payload),
      },
    };
  }
}
