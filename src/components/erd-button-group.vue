<template>
  <div :class="buttonClass" :role="buttonGroupRole">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "erd-button-group",
  props: {
    toolbar: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "",
    },
  },
  computed: {
    buttonGroupRole() {
      let vm = this;
      return vm.toolbar ? "toolbar" : "group";
    },
    buttonSizeClass() {
      let vm = this;
      return vm.size.length ? `btn-group-${vm.size}` : "";
    },
    buttonClass() {
      let vm = this;
      return (
        (vm.toolbar
          ? "btn-toolbar "
          : vm.vertical
          ? "btn-group-vertical "
          : "btn-group ") + vm.buttonSizeClass
      );
    },
  },
};
</script>
