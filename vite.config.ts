import { fileURLToPath } from "url"
import pkg from "./package.json"
import dayjs from "dayjs"
import { defineConfig, loadEnv } from "vite"
import type { ConfigEnv } from "vite"
import { wrapperEnv } from "./framework_config/utils"
import { createVitePlugins } from "./framework_config/vite/plugin"
import { createProxy } from "./framework_config/vite/proxy"
import { createBuild } from "./framework_config/vite/build"

const { dependencies, devDependencies, name, version } = pkg
// 应用信息
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
}
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  // console.log('command', command)
  const root = process.cwd() // 当前工作目录
  const isBuild = command === "build" // 是否是构建 serve
  const env = loadEnv(mode, root) // 加载env环境
  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env)
  // console.log('viteEnv', viteEnv)

  const { VITE_PUBLIC_PATH, VITE_OUTPUT_DIR } = viteEnv
  return {
    base: VITE_PUBLIC_PATH,
    root,
    plugins: createVitePlugins(viteEnv, isBuild),
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          charset: false,
          javascriptEnabled: true,
          additionalData: `@import "./src/styles/antd-variables.less";`
          // modifyVars: {
          //   // "@primary-color": "red",
          // },
        }
      }
    },
    server: {
      host: true,
      cors: true,
      // headers: { "Access-Control-Allow-Origin": "*" },
      proxy: createProxy()
    },
    build: createBuild(viteEnv) as any,
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  }
})
