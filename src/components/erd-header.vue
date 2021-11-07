<template>
  <div class="header" :class="headerLogoClass">
    <router-link
      v-if="hasTitle"
      to="/"
      class="header-title"
      :class="titleClass"
      >{{ title }}</router-link
    >
    <router-link
      v-if="hasLogo"
      to="/"
      class="header-logo"
      :class="logoClass"
    ></router-link>
    <erd-header-button
      v-for="(button, index) in buttons"
      :button-index="index"
      :to="button.to"
      :icon="button.icon"
      :badge="button.badge"
      :key="index"
      @click="buttonClick"
    ></erd-header-button>
    <slot></slot>
  </div>
</template>

<script>
import ErdHeaderButton from "@/components/erd-header-button.vue";

export default {
  name: "erd-header",
  components: {
    ErdHeaderButton,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    titleClass: {
      type: String,
      default: "",
    },
    logo: {
      type: String,
      default: "app",
    },
    logoClass: {
      type: String,
      default: "",
    },
    buttons: {
      type: Array,
      default: () => [],
    },
    transparent: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    headerLogoClass() {
      let vm = this;
      let transparent = vm.transparent ? "transparent" : "";
      return vm.logo && vm.logo.length
        ? `header-logo-${vm.logo} ${transparent}`
        : `${transparent}`;
    },
    hasTitle() {
      let vm = this;
      return vm.title && vm.title.length > 0;
    },
    hasLogo() {
      let vm = this;
      return vm.logo && vm.logo.length > 0 && vm.logo.toLowerCase() !== "app";
    },
  },
  methods: {
    buttonTo(button) {
      return button.to && button.to.length ? button.to : "";
    },
    buttonIcon(button) {
      return button.icon && button.icon.length ? button.icon : "";
    },
    buttonBadge(button) {
      return button.badge ? button.badge : null;
    },
    buttonClick(index, elem) {
      let vm = this;
      vm.$emit("button-click", index, elem);
    },
  },
};
</script>
