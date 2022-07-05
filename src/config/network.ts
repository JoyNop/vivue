/**
 * @description 导出默认网路配置
 **/

import { getAppEnvConfig } from "@/utils/env"

const env = getAppEnvConfig()
export const CLIENT_ID = env.VITE_USE_CLIENT_ID
export const AUTH_API = "auth"
export const BLAST_API = "blast"
export const WEB_DOMAIN = env.VITE_USE_WEB_DOMAIN
export const WEB_API = `//api.${WEB_DOMAIN}`

const getApiUrl = () => {
  let baseUrl = "/"
  if (env.VITE_USE_PROXY === "false") {
    baseUrl = WEB_API
  } else {
    baseUrl = "/api/"
  }

  return baseUrl
}

export const network = {
  // 默认的接口地址
  baseURL: getApiUrl(),
  //配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: "application/json;charset=UTF-8",
  //消息框消失时间
  messageDuration: 3000,
  //最长请求时间
  requestTimeout: 5000,
  //操作正常code，支持String、Array、int多种类型
  successCode: [200, 0],
  //登录失效code
  invalidCode: 402,
  //无权限code
  noPermissionCode: 401
}
