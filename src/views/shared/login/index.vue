<template>
  <div><a-button @click="login">login</a-button></div>
</template>

<script lang="ts" setup>
import cookie from "@/utils/cookie"

const login = () => {
  cookie.set("token", Math.random().toString())
}
</script>
