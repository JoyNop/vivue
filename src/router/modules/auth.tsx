import type { RouteRecordRaw } from "vue-router"
// import BaseRouterTransition from "@/layout/BaseRouterTransition.vue";
// import OrgView from "@/views/control/OrgView.vue";
// import UserView from "@/views/control/UserView.vue";
import BaseLogin from "@/layout/BaseLogin.vue"
import LoginView from "@/views/auth/LoginView.vue"
import PhoneView from "@/views/auth/PhoneView.vue"
import SigninView from "@/views/auth/SigninView.vue"
import ForgotView from "@/views/auth/ForgotView.vue"

const routeName = "auth"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/auth",
    name: routeName,
    redirect: "/auth/login",
    component: BaseLogin,
    meta: {
      title: "多邦汇德统一身份认证登录",
      icon: "block-outlined"
    },
    children: [
      {
        path: "login",
        name: `${routeName}-login`,
        meta: {
          title: "多邦汇德统一身份认证登录",
          icon: "bars-outlined"
        },
        component: () => import("@/views/auth/LoginView.vue")
      }
    ]
  }
]

export default routes
