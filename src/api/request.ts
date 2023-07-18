import { stringify } from 'qs';;
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
type Result<T> = {
  code: number;
  message: string;
  data: T;
};
class Request {
  instance: AxiosInstance
  baseConfig: AxiosRequestConfig = { baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'http://localhost:7003/api', timeout: 60000 }
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config))
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token") as string
        if (token) {
          config.headers!.Authorization = 'Bearer ' + token;
        }
        return config
      },
      (err: any) => {
        return Promise.reject(err)
      },
    )
    this.instance.interceptors.response.use((response: AxiosResponse) => {
      const code = response.status
      if (code == 200) {
        return Promise.resolve(response.data)
      }
      return Promise.reject('服务器异常')
    }, (error: any) => {
      console.log(error, 'error');
      return Promise.reject(error.response)
    })
  }
  public get<T = any>(
    url: string,
    params: any
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance({
      method: 'GET',
      url, params
    });
  }
  public post<T = any>(
    url: string,
    data?: any,
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance({
      method: 'POST',
      url, data: stringify(data), headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    });
  }
  public postJson<T = any>(
    url: string,
    data?: any,
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance({
      method: 'POST',
      url, data: stringify(data), headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public upload<T = any>(
    url: string,
    data?: any,
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance({
      url, data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
}
export default new Request({})