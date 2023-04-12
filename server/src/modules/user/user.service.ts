import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { RCode } from 'src/common/constant/rcode';
import { nameVerify, passwordVerify } from 'src/common/tool/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 获取用户信息
  async getUser(userId: string) {
    try {
      let data;
      if (userId) {
        data = await this.userRepository.findOne({
          where: { userId },
        });
        return { msg: '获取用户成功', data };
      }
    } catch (e) {
      return { code: RCode.ERROR, msg: '获取用户失败', data: e };
    }
  }

  // 批量获取用户信息
  async getUsers(userIds: string) {
    try {
      if (userIds) {
        const userIdArr = userIds.split(',');
        const userArr = [];
        for (const userId of userIdArr) {
          if (userId) {
            const data = await this.userRepository.findOne({
              where: { userId },
            });
            userArr.push(data);
          }
        }
        return { msg: '获取用户信息成功', data: userArr };
      }
      return { code: RCode.FAIL, msg: '获取用户信息失败', data: null };
    } catch (e) {
      return { code: RCode.ERROR, msg: '获取用户信息失败', data: e };
    }
  }

  // 更新用户信息
  async updateUserName(user: User) {
    try {
      const oldUser = await this.userRepository.findOne({
        userId: user.userId,
        password: user.password,
      });
      if (oldUser && nameVerify(user.username)) {
        const isHaveName = await this.userRepository.findOne({
          username: user.username,
        });

        if (isHaveName) {
          return { code: 1, msg: '用户名重复', data: '' };
        }
        const newUser = JSON.parse(JSON.stringify(oldUser));
        newUser.username = user.username;
        newUser.password = user.password;

        await this.userRepository.update(oldUser, newUser);
        return { msg: '用户名更新成功', data: newUser };
      }
      return { code: RCode.FAIL, msg: '更新失败', data: '' };
    } catch (e) {
      return { code: RCode.ERROR, msg: '更新用户名失败', data: e };
    }
  }
}
