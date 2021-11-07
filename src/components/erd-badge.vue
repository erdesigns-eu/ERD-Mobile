<template>
  <span :class="badgeClass">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "erd-bagde",
  props: {
    color: {
      type: String,
      default: "primary",
    },
    pill: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    badgeClass() {
      let vm = this;
      let cl = `badge bg-${vm.color} `;
      return vm.pill ? cl + "rounded-pill" : cl;
    },
  },
};
</script>
