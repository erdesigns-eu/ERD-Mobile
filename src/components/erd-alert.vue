<template>
  <div :class="alertClass" role="alert">
    <span><i :class="iconClass" class="font-18"></i></span>
    <h4 class="text-uppercase color-white font-17" v-if="!small">
      {{ title }}
    </h4>
    <strong v-if="hasSlot"><slot></slot></strong>
    <strong v-else>{{ text }}</strong>
    <button
      v-if="canClose"
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
</template>

<script>
export default {
  name: "erd-alert",
  props: {
    color: {
      type: String,
      default: "primary",
    },
    canClose: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    solid: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "fa-bell",
    },
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
  },
  computed: {
    alertClass() {
      let vm = this;
      let small = vm.small ? "alert-small" : "";
      return `rounded-s shadow-xl alert color-white bg-${vm.color} ${small}`;
    },
    iconClass() {
      let vm = this;
      return vm.solid ? `fas ${vm.icon}` : `far ${vm.icon}`;
    },
    hasSlot() {
      return !!this.$slots.default;
    },
  },
};
</script>
