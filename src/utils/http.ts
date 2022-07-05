/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-10-19 14:07:20
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2022-03-22 09:50:32
 * @Description: file content
 * @FilePath: /blast-web-2_x/src/utils/http.ts
 */
import axios from "axios"
import type { AxiosResponse } from "axios"
// import { useUserStore } from "@/store/modules/user"
// import {
//   blast_baseURL,
//   blast_tokenName,
//   blast_orgId,
//   blast_requestTimeout,
// } from "@/config";
// // import store from "@/store";
import { message as Message } from "ant-design-vue"
import { storage } from "./storage"
import { network } from "@/config"

const handleCode = (code: number, message: string) => {
  switch (code) {
    case 40100:
      Message.warn(message || `后端接口${code}异常`)
      break
    default:
      Message.warn(message || `后端接口${code}异常`)
      break
  }
  // return Promise.reject(message)
}

const http = axios.create({
  baseURL: network.baseURL,
  timeout: network.requestTimeout,
  withCredentials: true // send cookies when cross-domain requests
  // headers: {
  //   "Content-Type": contentType,
  // },
})

http.interceptors.request.use(
  (config) => {
    // const userState = useUserStore()

    // const token = userState.getToken

    // if (token && config.headers) {
    //   config.headers["token"] = token
    // }
    // if (store.getters["user/currentOrg"] && config.headers) {
    //   const org = store.getters["user/currentOrg"];

    //   config.headers[blast_orgId] = org.id;
    // }a
    return config
  },
  (error) => {
    console.log("http.interceptors.request", error)

    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, config } = response

    const { code, message } = data
    if (code >= 40000) {
      handleCode(code, message)
      const err = { url: config.url, code, message }
      return Promise.reject(err || "Error")
    } else {
      return data
    }

    // const { code, msg } = data;
    // 操作正常Code数组
    // 操作正常Code数组
    // const codeVerificationArray = isArray(successCode) ? [...successCode] : [...[successCode]]
    // // 是否操作正常
    // if (codeVerificationArray.includes(code)) {
    //   return data
    // } else {
    //   handleCode(code, msg)
    //   return Promise.reject(
    //     "vue-admin-beautiful请求异常拦截:" + JSON.stringify({ url: config.url, code, msg }) ||
    //       "Error"
    //   )
    // }
  },
  (error) => {
    const { response, message } = error
    if (error.response && error.response.data) {
      const { status, data } = response
      console.log(data)

      if (data.message) {
        Message.error(data.message)
      } else {
        Message.error(data.error)
      }
      if (data.msg) {
        Message.error(data.msg)
      }

      return Promise.reject(error)
    } else {
      let { message } = error
      if (message === "Network Error") {
        message = "后端接口连接异常"
      }
      if (message.includes("timeout")) {
        message = "后端接口请求超时"
      }
      if (message.includes("Request failed with status code")) {
        const code = message.substr(message.length - 3)
        message = "后端接口" + code + "异常"
      }
      console.log(message || `后端接口未知异常`, "error")
      Message.error(message)
      return Promise.reject(error)
    }
  }
)

export default http
