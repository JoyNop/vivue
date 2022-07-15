<template>
  <div ref="canvas"></div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, onUnmounted } from "vue"
import * as PIXI from "pixi.js"

const canvas = ref<HTMLDivElement | null>(null)
const ratio = 0.8

let app: PIXI.Application

let rootContainer: PIXI.Container

// const updateCanvasContext = () => {
//   if (canvas.value) {
//     // 比例宽高
//     canvas.value.width = window.screen.width * ratio
//     canvas.value.height = window.screen.height! * ratio
//   }
// }

const init = () => {
  if (canvas.value) {
    app = new PIXI.Application({
      backgroundColor: 0x78c9ffd9,
      antialias: true,
      resolution: devicePixelRatio
    })

    canvas.value.appendChild(app.view)
    app.start()

    rootContainer = new PIXI.Container()

    app.stage.addChild(rootContainer)

    const basicText = new PIXI.Text("Basic text in pixi")
    basicText.x = 50
    basicText.y = 100

    rootContainer.addChild(basicText)
  }
}
const onMouseWheel = (e: any) => {
  zoom(e.clientX, e.clientY, e.deltaY < 0)
}
const getGraphCoordinates = (x: number, y: number) => {
  const ctx = {
    global: { x: x, y: y }
  }
  return PIXI.InteractionData.prototype.getLocalPosition.call(ctx, rootContainer)
}

const zoom = (x: number, y: number, isZoomIn: boolean) => {
  const direction = isZoomIn ? 1 : -1
  const factor = 1 + direction * 0.1
  rootContainer.scale.x *= factor
  rootContainer.scale.y *= factor

  const beforeTransform = getGraphCoordinates(x, y)
  rootContainer.updateTransform()
  const afterTransform = getGraphCoordinates(x, y)

  rootContainer.position.x += (afterTransform.x - beforeTransform.x) * rootContainer.scale.x
  rootContainer.position.y += (afterTransform.y - beforeTransform.y) * rootContainer.scale.y
  rootContainer.updateTransform()
}

onMounted(() => {
  // updateCanvasContext()
  init()
  app.view.addEventListener("mousewheel", onMouseWheel, false)
})

onUnmounted(() => {
  app.stop()
})
</script>
<style></style>
