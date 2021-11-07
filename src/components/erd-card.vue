<template>
  <div class="card" :class="cardClass">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "erd-card",
  props: {
    full: {
      type: Boolean,
      default: false,
    },
    depth: {
      type: [String, Number],
      default: 1,
    },
    shadowBg: {
      type: [String, Number],
      default: "",
    },
    shadow: {
      type: [String, Number],
      default: "",
    },
  },
  computed: {
    cardClass() {
      let vm = this;
      let cl = !vm.full
        ? `card-style depth-${vm.depth} `
        : `depth-${vm.depth} `;
      if (vm.shadowBg) {
        cl += vm.shadowBg.length ? `shadow-bg-${vm.shadowBg}` : "shadow-bg";
      }
      if (vm.shadow) {
        cl += vm.shadow.length ? `shadow-card-${vm.shadow}` : "shadow-card";
      }
      return cl;
    },
  },
};
</script>
