import type { RouteRecordRaw } from "vue-router"

import BaseLogin from "@/layout/BaseLogin.vue"

const routeName = "func"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/func",
    name: routeName,
    redirect: "/func/tour",
    component: BaseLogin,
    meta: {
      title: "多邦汇德统一身份认证登录",
      icon: "block-outlined"
    },
    children: [
      {
        path: "tour",
        name: `${routeName}-tour`,
        meta: {
          title: "多邦汇德统一身份认证登录",
          icon: "bars-outlined"
        },
        component: () => import("@/views/func/TourView.vue")
      }
    ]
  }
]

export default routes
