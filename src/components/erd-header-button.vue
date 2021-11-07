<template>
  <router-link
    class="header-icon"
    :class="buttonClass"
    :to="button.to"
    v-if="buttonIsLink"
  >
    <i :class="icon"></i>
    <span class="badge" :class="badgeClass" v-if="hasBadge">{{
      badgeText
    }}</span>
  </router-link>
  <button class="header-icon" :class="buttonClass" @click="buttonClick" v-else>
    <i :class="icon"></i>
    <span class="badge" :class="badgeClass" v-if="hasBadge">{{
      badgeText
    }}</span>
  </button>
</template>

<script>
export default {
  name: "erd-header-button",
  props: {
    buttonIndex: {
      type: [String, Number],
      required: true,
    },
    to: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    badge: {
      type: [null, Object],
      default: null,
    },
  },
  computed: {
    buttonClass() {
      let vm = this;
      return `header-icon-${vm.buttonIndex + 1}`;
    },
    buttonIsLink() {
      let vm = this;
      return vm.to && vm.to.length > 0;
    },
    hasBadge() {
      let vm = this;
      return vm.badge && vm.badge !== null;
    },
    badgeText() {
      let vm = this;
      return vm.hasBadge ? vm.badge.text : "";
    },
    badgeClass() {
      let vm = this;
      return vm.hasBadge ? vm.badge.class : "";
    },
  },
  methods: {
    buttonClick() {
      let vm = this;
      vm.$emit("click", vm.buttonIndex, vm);
    },
  },
};
</script>
