export const pwdRegText = "密码长度限制6-30之间";
export const blankSpaceReg = /\s+/;
export const chineseReg = /[\u4e00-\u9fa5]+/;
export const specialCodeReg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“’。，、？]+");

export const nameValidator = (rule, value, callback) => {
  if (value) {
    value = value.trim();
    if (value.length < 2 || value.length > 30) {
      callback("名称长度限制在2~30之间");
    } else if (specialCodeReg.test(value)) {
      callback("名称不能包含特殊字符");
    }
  }
  callback();
};

export const pwdValidator = (rule, value, callback) => {
  if (value) {
    if (value.length < 6 || value.length > 30) {
      callback("密码长度限制6~30之间");
    } 
  }
  callback();
};
