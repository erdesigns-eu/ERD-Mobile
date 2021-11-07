<template>
  <div
    class="footer-bar"
    :class="[
      { 'footer-bar-scroll': scroll, transparent: transparent },
      footerBarClass,
    ]"
  >
    <erd-footer-button
      v-for="(button, index) in filteredButtons"
      :to="buttonTo(button)"
      :icon="buttonIcon(button)"
      :text="buttonText(button)"
      :badge="buttonBadge(button)"
      :active="buttonIsActive(index)"
      :key="index"
      :button-index="index"
      @click="buttonClick"
    ></erd-footer-button>
    <slot></slot>
  </div>
</template>

<script>
import ErdFooterButton from "@/components/erd-footer-button";

export default {
  name: "erd-footer",
  components: {
    ErdFooterButton,
  },
  props: {
    activeIndex: {
      type: [Number, String],
      default: 0,
    },
    scroll: {
      type: Boolean,
      default: false,
    },
    barStyle: {
      type: [Number, String],
      default: "1",
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
  data() {
    return {
      buttonIndex: 0,
    };
  },
  computed: {
    filteredButtons() {
      let vm = this;
      return vm.scroll ? vm.buttons : vm.buttons.slice(0, 5);
    },
    footerBarClass() {
      let vm = this;
      return `footer-bar-${vm.barStyle}`;
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
    buttonText(button) {
      return button.text && button.text.length ? button.text : "";
    },
    buttonClick(index, elem) {
      let vm = this;
      vm.buttonIndex = index;
      vm.$emit("button-click", index, elem);
    },
    buttonIsActive(index) {
      let vm = this;
      return parseInt(vm.buttonIndex) === index;
    },
  },
  beforeMount() {
    let vm = this;
    vm.buttonIndex = vm.activeIndex;
  },
};
</script>
