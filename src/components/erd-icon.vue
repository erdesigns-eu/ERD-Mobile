<template>
  <a v-if="hasLink" class="icon" :class="iconClass">
    <i :class="icon"></i>
  </a>
  <a
    v-else
    :href="href"
    class="icon"
    :class="iconClass"
    @click.prevent="onClick"
  >
    <i :class="icon"></i>
  </a>
</template>

<script>
export default {
  name: "erd-icon",
  props: {
    icon: {
      type: String,
      default: "fas fa-comment",
    },
    color: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
      default: "xs",
    },
    rounded: {
      type: String,
      default: "",
    },
    href: {
      type: String,
      default: "",
    },
  },
  computed: {
    hasLink() {
      let vm = this;
      return vm.href && vm.href.length;
    },
    iconClass() {
      let vm = this;
      let rounded =
        this.rounded && this.rounded.length ? `rounded-${vm.rounded}` : "";
      return `icon-${vm.size} bg-${vm.color} ${rounded}`;
    },
  },
  methods: {
    onClick(e) {
      this.$emit("click", e);
    },
  },
};
</script>
