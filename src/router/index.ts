/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-08-02 10:58:51
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2022-02-22 16:55:22
 * @Description: file content
 * @FilePath: /blast-web-2_x/src/router/index.ts
 */

import type { App } from "vue"
import type { RouteRecordRaw } from "vue-router"
import { createRouter, createWebHistory } from "vue-router"
// import { createRouterGuards } from "./router-guards";
import common from "@/router/common"
import bizRoute from "@/router/biz"
// import control from "@/router/modules/control";
import shared from "./modules/shared"
import { errorRoutes, notFound } from "./modules/error"
import HomeView from "@/views/HomeView.vue"
import PixiView from "@/views/PixiView.vue"
import { createRouterGuards } from "./router-guards"

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    redirect: "/home",
    meta: {
      title: "首页"
    }
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      title: "首页"
    },
    component: HomeView
  },
  {
    path: "/pixi",
    name: "pixi",
    meta: {
      title: "首页"
    },
    component: PixiView
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/HomeView.vue"),
    meta: {
      title: "个人中心"
    }
  },
  ...common,
  // ...control,
  ...bizRoute,
  ...shared,
  errorRoutes,
  notFound
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})
export function setupRouter(app: App<Element>) {
  app.use(router)

  // 创建路由守卫
  // createRouterGuards()
}
export default router
