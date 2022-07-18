<template>
  <div class="container">
    <button @click="getScene">click</button>
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
const getScene = (pointer?: any) => {
  if (canvas.value && fabricRef) {
    const r = Math.random()
    fabricRef.add(
      new fabric.Rect({
        top: pointer ? pointer.y : 100 * r,
        left: pointer ? pointer.x : 100 * r,
        width: 10,
        height: 10,
        fill: "#f55"
      })
    )
  }
}

const updateCanvasContext = () => {
  if (canvas.value) {
    // 比例宽高
    canvas.value.width = window.screen.width * ratio
    canvas.value.height = window.screen.height! * ratio
  }
}

const init1 = () => {
  if (canvas.value) {
    const options = {
      backgroundColor: "rgba(238, 238, 255, 0.458)",
      enableRetinaScaling: true,
      preserveObjectStacking: true
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
    fabricRef.on("mouse:up", (e) => {
      console.log(e)
      // let active = e.target
      // if (active) {
      //   active.set({ fill: "blue" })

      //   fabricRef.renderAll()
      // }
      const { absolutePointer, currentSubTargets } = e
      const active = currentSubTargets ? currentSubTargets[0] : null

      // getScene(absolutePointer)
      if (active) {
        active.set({ fill: "blue" })
        fabricRef.renderAll()
      }
    })
    // const circle = new fabric.Circle({
    //   radius: 100,
    //   fill: "#eef",
    //   scaleY: 0.5,
    //   originX: "center",
    //   originY: "center"
    // })

    // const text = new fabric.Text("hello world", {
    //   fontSize: 30,
    //   originX: "center",
    //   originY: "center"
    // })
    const aa: any[] = []
    // const path = new fabric.Path("M 20 20 A 20 20 0 0 1 60 20 z")
    // const path2 = new fabric.Path("M 20 20 A 10 20 0 0 0 10 40 L 40 40  L 40 20 z")
    // const path3 = new fabric.Path("M  40 20 L 40 40 L 70 40 A  10 20 0 0 0 60 20 z")
    const path = new fabric.Path("M 0 0 L 40 0  L 40 40 L0 40  z")

    const path4 = new fabric.Path("M 40 40  A 60 60 0 0 1 120 40")

    aa.push(path)
    // aa.push(path2)
    // aa.push(path3)
    aa.push(path4)

    for (const a of aa) {
      a.set({
        fill: "#F4D06F",
        stroke: "#FF8811",
        opacity: 0.5
      })
    }
    const group = new fabric.Group(aa, {
      left: 150,
      top: 100,
      // angle: -10,
      subTargetCheck: true,
      transparentCorners: false,
      centeredRotation: true,
      centeredScaling: true,
      evented: true
    })

    group.setControlVisible("mt", false)
    // group.setControlVisible("tr", false)
    group.setControlVisible("mr", false)
    // lr.setControlVisible("br", false)
    group.setControlVisible("mb", false)
    // group.setControlVisible("bl", false)
    group.setControlVisible("ml", false)
    // lr.setControlVisible("mtr", false)

    fabricRef.add(group)

    // make the fabric.Canvas instance available to your app
    // updateCanvasContext(canvas)
  }
  // window.requestAnimationFrame()
  // window.requestAnimationFrame(init1)
}
onMounted(() => {
  updateCanvasContext()
  init1()

  // drawRuler()
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
