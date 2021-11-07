<template>
  <div :class="chipClass" v-if="block">
    <i v-if="hasIcon" :class="iconClass"></i>
    <img v-if="hasImage" :src="image" alt="img" />
    <slot></slot>
  </div>
  <span :class="chipClass" v-else>
    <i v-if="hasIcon" :class="iconClass"></i>
    <img v-if="hasImage" :src="image" alt="img" />
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "erd-chip",
  props: {
    block: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "small",
    },
    color: {
      type: String,
      default: "primary",
    },
    bg: {
      type: String,
      default: "bg-gray-light",
    },
    icon: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
  },
  computed: {
    hasIcon() {
      let vm = this;
      return vm.icon.length > 0;
    },
    hasImage() {
      let vm = this;
      return vm.image.length > 0;
    },
    chipClass() {
      let vm = this;
      return `chip chip-${vm.size} bg-${vm.bg}`;
    },
    iconClass() {
      let vm = this;
      return `bg-${vm.color} ${vm.icon}`;
    },
  },
};
</script>
