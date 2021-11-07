<template>
  <button
    :type="type"
    :value="value"
    :class="buttonClass"
    :disabled="disabled"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "erd-button",
  props: {
    type: {
      type: String,
      default: "button",
    },
    value: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "primary",
    },
    outline: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "",
    },
    center: {
      type: Boolean,
      default: false,
    },
    upperCase: {
      type: Boolean,
      default: false,
    },
    "3d": {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: String,
      default: "",
    },
  },
  computed: {
    buttonClass() {
      let vm = this;
      let cl = "btn ";
      if (vm.outline) {
        cl += `btn-outline-${vm.color} `;
      } else {
        cl += `btn-${vm.color} `;
      }
      if (vm.size.length) {
        cl += `btn-${vm.size} `;
      }
      if (vm.size.length && vm.center) {
        cl += `btn-center-${vm.size} `;
      }
      if (vm.upperCase) {
        cl += "btn-uppercase ";
      }
      if (vm["3d"]) {
        cl += "btn-3d ";
      }
      if (vm.rounded.length) {
        cl += `rounded-${vm.rounded} `;
      }
      return cl;
    },
  },
  methods: {
    onClick(e) {
      this.$emit("click", e);
    },
  },
};
</script>
