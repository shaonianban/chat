/**
 * 群名/用户名校验
 * @param name
 */
export function nameVerify(name: string): boolean {
  //   这个正则表达式是用来匹配包含中文、英文、数字、下划线的字符串，但是不包含开头和结尾的下划线的字符串。具体来说：
  // ^ 表示匹配字符串的开头
  // (?!_) 表示否定预测先行断言，即匹配后面不跟着下划线的位置
  // (?!.*?_$) 表示否定预测先行断言，即匹配后面不跟着一个或多个任意字符和下划线的组合，再跟着字符串结尾的位置，这个部分保证了字符串结尾不是下划线。
  // [a-zA-Z0-9_\u4e00-\u9fa5]+ 表示匹配一个或多个包含大小写字母、数字、下划线和中文的字符
  // $ 表示匹配字符串的结尾
  // 因此，这个正则表达式可以匹配一个或多个由中文、英文、数字、下划线组成的字符串，但不包含开头和结尾的下划线。
  const nameReg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;

  if (name.length === 0) {
    return false;
  }

  if (!nameReg.test(name)) {
    return false;
  }

  if (name.length > 9) {
    return false;
  }
  return true;
}

/**
 * 密码校验
 * @param password
 */
export function passwordVerify(password: string): boolean {
  //   这个正则表达式是用来匹配由一个或多个单词字符（字母、数字、下划线）组成的字符串的。具体来说：
  // ^ 表示匹配字符串的开头
  // \w 匹配任何单词字符（字母、数字、下划线）
  // + 表示匹配一个或多个前面的元素（即一个或多个单词字符）
  // $ 表示匹配字符串的结尾
  // /g 表示全局匹配，即在整个字符串中寻找所有匹配
  // /i 表示不区分大小写，即匹配时忽略字母大小写
  // /s 表示单行模式，即将整个字符串视为一行，让 ^ 和 $ 匹配行的开头和结尾（而不是整个字符串的开头和结尾）。
  // 因此，这个正则表达式可以匹配一个或多个由单词字符组成的字符串，不区分大小写，且将整个字符串视为单行。
  const passwordReg = /^\w+$/gis;
  if (password.length === 0) {
    return false;
  }
  if (!passwordReg.test(password)) {
    return false;
  }
  if (password.length > 9) {
    return false;
  }
  return true;
}
