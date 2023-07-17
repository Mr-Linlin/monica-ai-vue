import request from "./request";
export default {
  register(data: any) { //注册
    return request.post('/auth/register', data)
  },
  login(data: any) { //登陆
    return request.post('/auth/login', data)
  },
  upload(data: any) { //文件上传
    return request.post('/common/upload', data)
  },
}