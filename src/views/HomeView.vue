<template>
<<<<<<< HEAD
  <div class="container">
    <canvas ref="canvas" class="c"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { fabric } from "fabric"
import { onMounted, reactive, ref } from "vue"

let fabricRef: fabric.Canvas
// const fabricRef = ref<fabric.Canvas>()
const canvas = ref<HTMLCanvasElement | null>(null)
const ratio = 0.8

const updateCanvasContext = () => {
  if (canvas.value) {
    // 比例宽高
    canvas.value.width = window.screen.width * ratio
    canvas.value.height = window.screen.height! * ratio
  }
}

const init = () => {
  if (canvas.value) {
    const options = {
      backgroundColor: "rgba(238, 238, 255, 0.458)",
      originX: "center",

      originY: "center",
      enableRetinaScaling: true,
      preserveObjectStacking: true
      // centeredRotation: true,
      // centeredScaling: true
    }
    fabricRef = new fabric.Canvas(canvas.value, options)

    fabricRef.on("mouse:wheel", function (opt) {
      var delta = opt.e.deltaY
      var zoom = fabricRef?.getZoom()
      if (zoom) {
        zoom *= 0.999 ** delta
        if (zoom > 20) zoom = 20
        if (zoom < 0.01) zoom = 0.01
        fabricRef?.setZoom(zoom)
        opt.e.preventDefault()
        opt.e.stopPropagation()
      }
    })

    // make the fabric.Canvas instance available to your app
    // updateCanvasContext(canvas)
  }
  // window.requestAnimationFrame()
  // window.requestAnimationFrame(init1)
}

const draw = () => {
  // console.log(f_config)
  // const rect = new fabric.Rect({
  //   width: 100,
  //   height: 100,
  //   fill: "#f55"
  // })
  // fabricRef.add(rect)

  const path = new fabric.Path("M0 0 L100 100 L200 0 z")
  path.set({
    fill: "transparent",
    stroke: "red",
    strokeWidth: 2 
  }) // 设置线条颜色
  fabricRef.add(path)
}
onMounted(() => {
  updateCanvasContext()
  init()

  draw()
})
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  width: 100%;
  background-color: rgb(154, 204, 247);
}

.c {
  // background-color:
}
</style>
=======
  <div>hello</div>
</template>
>>>>>>> dea3104898f2a2592a9f91ace36e2b6ba55591cb
