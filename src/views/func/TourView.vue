<template>
  <div>
    <div class="example-css-selector" id="step1">aaaa</div>
    <div class="example-css-selector" id="step2">bbb</div>
    <div class="example-css-selector">ccc</div>
    <div class="example-css-selector">ddd</div>
    <div>3333</div>
    <div><button>ddd</button></div>
  </div>
</template>

<script lang="ts" setup>
import Shepherd from "shepherd.js"
import { onMounted } from "vue"
import "./tour.less"
const tour = new Shepherd.Tour({
  useModalOverlay: true,
  defaultStepOptions: {
    classes: "shepherd-theme-custom",
    scrollTo: true
  }
})

onMounted(() => {
  console.log(333)

  tour.addSteps([
    {
      id: "example-step",
      title: "Creating a Shepherd Tour",
      text: "This step is attached to the bottom of the <code>.example-css-selector</code> element.",
      attachTo: {
        element: "#step1",
        on: "bottom"
      },
      classes: "example-step-extra-class",
      buttons: [
        {
          action: tour.back,
          classes: "shepherd-button-secondary",
          text: "Back"
        },
        {
          text: "下一步",
          action: tour.next
        }
      ]
    },
    {
      id: "example-step",
      title: "Creating a Shepherd Tour",
      text: "This step is attached to the bottom of the <code>.example-css-selector</code> element.",
      attachTo: {
        element: "#step2",
        on: "bottom"
      },
      classes: "example-step-extra-class",
      buttons: [
        {
          action: tour.back,
          classes: "shepherd-button-secondary",
          text: "Back"
        },
        {
          text: "下一步",
          action: tour.next
        }
      ]
    }
  ])

  tour.start()
})
</script>
