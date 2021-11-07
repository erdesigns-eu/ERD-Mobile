<template>
  <div
    :class="cardClass"
    :style="cardStyle"
    tabindex="0"
    @focus="setEffect(true)"
    @blur="setEffect(false)"
  >
    <img :src="src" :class="imageClass" />
    <div class="card-top ms-3" v-if="hasTopSlot">
      <slot name="top"></slot>
    </div>
    <div class="card-center ms-3" v-if="hasCenterSlot">
      <slot name="center"></slot>
    </div>
    <div class="card-bottom ms-3" v-if="hasBottomSlot">
      <slot name="bottom"></slot>
    </div>
    <div :class="overlayClass" v-if="overlay"></div>
  </div>
</template>

<script>
export default {
  name: "erd-image-card",
  data() {
    return {
      effectActive: false,
    };
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    overlay: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "black",
    },
    opacity: {
      type: [String, Number],
      default: 70,
    },
    effect: {
      type: String,
      default: "scale",
    },
    height: {
      type: String,
      default: "180px",
    },
  },
  computed: {
    overlayClass() {
      let vm = this;
      return `card-overlay bg-${vm.color} opacity-${vm.opacity}`;
    },
    cardClass() {
      let vm = this;
      return `card card-style card-${vm.effect}`;
    },
    hasTopSlot() {
      let vm = this;
      return !!vm.$slots.top;
    },
    hasCenterSlot() {
      let vm = this;
      return !!vm.$slots.center;
    },
    hasBottomSlot() {
      let vm = this;
      return !!vm.$slots.bottom;
    },
    cardStyle() {
      let vm = this;
      return `height: ${vm.height};`;
    },
    imageClass() {
      let vm = this;
      return vm.effectActive
        ? `card-image card-${vm.effect}-image`
        : "card-image";
    },
  },
  methods: {
    setEffect(val) {
      let vm = this;
      vm.effectActive = val;
    },
  },
};
</script>
