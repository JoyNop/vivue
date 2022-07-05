<script setup lang="ts">
import { useAppStore } from "@/store/modules/app"
import { message } from "ant-design-vue"
import { onMounted, ref } from "vue"

const visible = ref<boolean>(false)
const showModal = () => {
  visible.value = true
}

const handleOk = (e: MouseEvent) => {
  console.log(e)
  visible.value = false
}
defineProps<{ msg: string }>()
onMounted(() => {
  console.log(1111)
  message.success("hello world")
})

const count = ref(0)
</script>

<template>
  <a-button type="primary" @click="showModal">Open Modal</a-button>
  <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Docs </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
