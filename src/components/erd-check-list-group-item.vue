<template>
  <a>
    <i :class="iconClass"></i>
    <span>{{ text }}</span>
    <strong v-if="hasSubtext">{{ subText }}</strong>
    <div class="custom-control scale-switch" :class="switchClass">
      <input
        type="checkbox"
        class="ios-input"
        :id="id"
        :value="value"
        v-model="model"
        :disabled="disabled"
      />
      <label class="custom-control-label" :for="id"></label>
      <template v-if="switchHasIcon">
        <i class="font-11 color-white" :class="switchIconOn"></i>
        <i class="font-11 color-white" :class="switchIconOff"></i>
      </template>
    </div>
  </a>
</template>

<script>
export default {
  name: "erd-check-list-group-item",
  props: {
    value: {
      type: [String, Number, Boolean],
    },
    id: {
      type: String,
      default: function () {
        return `check-list-group-item-${this.$uniqueId.id}`;
      },
    },
    small: {
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
    text: {
      type: String,
      default: "",
    },
    subText: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    android: {
      type: Boolean,
      default: false,
    },
    switchIconOn: {
      type: String,
      default: "",
    },
    switchIconOff: {
      type: String,
      default: "",
    },
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    iconClass() {
      let vm = this;
      let color = vm.solid
        ? `rounded-sm bg-${vm.color} color-white`
        : `color-${vm.color}`;
      return `font-${vm.size} ${color} ${vm.icon}`;
    },
    hasSubtext() {
      let vm = this;
      return !vm.small;
    },
    switchClass() {
      let vm = this;
      let style = vm.android ? "android-switch" : "ios-switch";
      let icon = vm.switchHasIcon ? "ios-switch-icon" : "";
      return `${style} ${icon}`;
    },
    switchHasIcon() {
      let vm = this;
      return (
        !vm.android &&
        vm.switchIconOn &&
        vm.switchIconOn.length &&
        vm.switchIconOff &&
        vm.switchIconOff.length
      );
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
