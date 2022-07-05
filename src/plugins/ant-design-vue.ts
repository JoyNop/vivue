/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-08-02 11:05:25
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-10-21 14:55:36
 * @Description: file content
 * @FilePath: /blast-web-2_x/src/plugins/ant-design-vue.ts
 */
import type { App } from "vue"
import Antd from "ant-design-vue"

import "@/styles/antd-variables.less"
export function setupAntd(app: App<Element>) {
  // app.component('AButton', AButton)

  app.use(Antd)
}
