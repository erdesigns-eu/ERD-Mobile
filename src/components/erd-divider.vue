<template>
  <div :class="dividerClass">
    <slot v-if="icon"></slot>
  </div>
</template>

<script>
export default {
  name: "erd-divider",
  props: {
    icon: {
      type: Boolean,
      default: false,
    },
    margins: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: "",
    },
  },
  computed: {
    dividerClass() {
      let vm = this;
      let cl = vm.icon ? "divider-icon " : "divider ";
      if (vm.margins) {
        cl += "divider-margins ";
      }
      if (vm.color && vm.color.length) {
        cl += `bg-${vm.color} `;
      }
      return cl;
    },
  },
};
</script>
