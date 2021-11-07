<template>
  <a :class="itemClass" @click.prevent="onClick">
    <i :class="iconClass"></i>
    <span>{{ text }}</span>
    <strong v-if="hasSubtext">{{ subText }}</strong>
    <span :class="badgeClass" v-if="hasBadge">{{ badge.text }}</span>
    <slot></slot>
    <i class="far fa-angle-right" v-if="!boxed"></i>
    <template v-if="boxed">
      <u :class="boxTextColor">{{ boxText }}</u>
      <i :class="boxIconClass"></i>
    </template>
  </a>
</template>

<script>
export default {
  name: "erd-list-group-item",
  props: {
    itemIndex: {
      type: Number,
      default: 0,
    },
    small: {
      type: Boolean,
      default: false,
    },
    boxed: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [String, Number],
      default: 14,
    },
    color: {
      type: String,
      default: "default",
    },
    icon: {
      type: String,
      default: "fas fa-check",
    },
    solid: {
      type: Boolean,
      default: false,
    },
    badge: {
      type: Object,
    },
    text: {
      type: String,
      default: "",
    },
    subText: {
      type: String,
      default: "",
    },
    boxIcon: {
      type: String,
      default: "fas fa-check",
    },
    boxText: {
      type: String,
      default: "",
    },
    boxColor: {
      type: String,
      default: "default",
    },
  },
  computed: {
    itemClass() {
      let vm = this;
      return vm.boxed ? `border border-${vm.boxColor} rounded-s shadow-xs` : "";
    },
    iconClass() {
      let vm = this;
      let color = vm.solid
        ? `rounded-sm bg-${vm.color} color-white`
        : `color-${vm.color}`;
      return `font-${vm.size} ${color} ${vm.icon}`;
    },
    hasBadge() {
      let vm = this;
      return vm.badge && vm.badge.text && vm.badge.color && !vm.hasDefaultSlot;
    },
    badgeClass() {
      let vm = this;
      return `badge bg-${vm.badge.color}`;
    },
    hasSubtext() {
      let vm = this;
      return !vm.small;
    },
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
    boxTextColor() {
      let vm = this;
      return `color-${vm.boxColor}`;
    },
    boxIconClass() {
      let vm = this;
      return `color-${vm.boxColor} ${vm.boxIcon}`;
    },
  },
  methods: {
    onClick(e) {
      let vm = this;
      vm.$emit("click", vm.itemIndex, e);
    },
  },
};
</script>
