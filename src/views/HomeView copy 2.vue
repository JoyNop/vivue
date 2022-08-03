<template>
  <div class="container">
    <button @click="getScene">click</button>
    <canvas ref="canvas" class="c"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { fabric } from "fabric"
import { onMounted, reactive, ref } from "vue"
import { f_config } from "./config"

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

const init = () => {
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

    // make the fabric.Canvas instance available to your app
    // updateCanvasContext(canvas)
  }
  // window.requestAnimationFrame()
  // window.requestAnimationFrame(init1)
}

const draw = () => {
  // console.log(f_config)
  const group: any[] = []
  for (const area of f_config) {
    let paramStr = ""
    console.log(area.computedParam)
    const { computedParam } = area
    for (let index = 0; index < computedParam.length; index++) {
      const param = computedParam[index]

      let pathStr = ""
      if (param.type === "ARC") {
        const obj = {
          rx: param.radius,
          ry: param.radius,
          "x-axis-rotation": 0,
          "large-arc-flag": 0,
          "sweep-flag": 0,
          sX: param.startPoint?.x || 0,
          sY: param.startPoint?.y || 0,
          eX: param.endPoint?.x || 0,
          eY: param.endPoint?.y || 0
        }
        pathStr = `
        M ${obj.sX} ${obj.sY}
        A ${obj.rx} ${obj.ry}
        ${obj["x-axis-rotation"]}
        ${obj["large-arc-flag"]}
        ${obj["sweep-flag"]}
        ${obj.eX}
        ${obj.eY}
        `
        paramStr += ` ${pathStr}`
        // const path = new fabric.Path(pathStr)
        // group.push(path)
      }
      if (param.type === "LINE" && index < 9) {
        // pathStr = `
        // M ${param.p1?.x || 0} ${param.p1?.y || 0}
        // L ${param.p2?.x || 0} ${param.p2?.y || 0}
        // Z
        // `

        pathStr = `
        L ${param.p2?.x || 0} ${param.p2?.y || 0}
        `
        paramStr += ` ${pathStr}`
      }
    }
    paramStr += " Z"
    console.log(paramStr)

    const path = new fabric.Path(paramStr)
    group.push(path)
    // const path= new fabric.Path("")
  }

  for (const g of group) {
    g.set({
      fill: "#F4D06F",
      stroke: "#FF8811",
      opacity: 0.5
    })
  }

  // const point = new fabric.Rect({
  //   top: 439.5700000000003,
  //   left: 867.7043685897426,
  //   width: 30,
  //   height: 30,
  //   fill: "#f55"
  // })
  const point = new fabric.Circle({
    radius: 20,
    top: 439,
    left: 867,
    width: 30,
    height: 30,
    fill: "#f55",
    originX: "center",
    originY: "center"
  })
  group.push(point)
  const fabricGroup = new fabric.Group(group, {
    // left: 150,
    // top: 100,
    // angle: -10,

    subTargetCheck: true,
    transparentCorners: false,
    centeredRotation: true,
    centeredScaling: true,
    evented: true,
    lockScalingY: true,
    lockScalingX: true
  })
  fabricRef.add(fabricGroup)

  const rect = new fabric.Rect({
    top: 100,
    left: 100,
    width: 100,
    height: 100,
    fill: "#f55"
  })
  fabricRef.add(rect)
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
