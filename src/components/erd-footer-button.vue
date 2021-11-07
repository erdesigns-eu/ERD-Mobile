<template>
  <router-link
    :class="[{ 'active-nav': active }, buttonClass]"
    @click="buttonClick"
    :to="button.to"
    v-if="buttonIsLink"
  >
    <i :class="icon"></i>
    <span>{{ text }}</span>
    <strong v-if="active"></strong>
    <em class="badge" :class="badgeClass" v-if="hasBadge">{{ badgeText }}</em>
  </router-link>
  <a
    :class="[{ 'active-nav': active }, buttonClass]"
    @click="buttonClick"
    v-else
  >
    <i :class="icon"></i>
    <span>{{ text }}</span>
    <strong v-if="active"></strong>
    <em class="badge" :class="badgeClass" v-if="hasBadge">{{ badgeText }}</em>
  </a>
</template>

<script>
export default {
  name: "erd-footer-button",
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
    text: {
      type: String,
      default: "",
    },
    badge: {
      type: Object,
    },
    active: {
      type: Boolean,
      default: false,
    },
    buttonClass: {
      type: String,
      default: "",
    },
  },
  computed: {
    buttonIsLink() {
      let vm = this;
      return vm.to && vm.to.length > 0;
    },
    hasBadge() {
      let vm = this;
      return vm.badge && vm.badge.text && vm.badge.class;
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
