import { WEB_DOMAIN } from "@/config"
import Cookies from "js-cookie"
import _ from "lodash"

export const access_token = Cookies.get("token")
const createCookie = () => {
  const path = "/"
  class JsCookie {
    set(key: string, value: any) {
      try {
        const stringData = JSON.stringify({
          value
        })
        console.log("WEB_DOMAIN", WEB_DOMAIN)

        Cookies.set(key, stringData, { domain: `.${WEB_DOMAIN}`, path: path })
      } catch (error) {
        console.log(error)
      }
    }

    get(key: string) {
      try {
        const strData = Cookies.get(key)
        if (strData) {
          const JsonData = JSON.parse(strData)
          return JsonData.value
        }
      } catch (error) {
        console.log(error)
      }
    }

    remove(key: string) {
      Cookies.remove(key, { domain: `.${WEB_DOMAIN}`, path: path })
    }
    // removeAll() {
    //   Cookies.remove()
    // }
  }

  return new JsCookie()
}

export const cookie = createCookie()

export default cookie
