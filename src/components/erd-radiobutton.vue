<template>
  <div class="form-check icon-check" :class="{ 'input-disabled': disabled }">
    <input
      class="form-check-input"
      type="radio"
      :id="id"
      :value="radioValue"
      v-model="model"
      :disabled="disabled"
    />
    <label class="form-check-label" :for="id" :style="labelStyle"
      ><slot></slot
    ></label>
    <i :class="icon1Class"></i>
    <i :class="icon2Class"></i>
  </div>
</template>

<script>
export default {
  name: "erd-checkbox",
  props: {
    radioValue: {
      type: [String, Number],
      default: 0,
    },
    value: {
      type: [String, Number, Boolean],
    },
    id: {
      type: String,
      default: function () {
        return `radio-${this.$uniqueId.id}`;
      },
    },
    color: {
      type: String,
      default: "primary",
    },
    offColor: {
      type: String,
      default: "default",
    },
    icon1: {
      type: String,
      default: "fa-circle",
    },
    icon2: {
      type: String,
      default: "fa-check-circle",
    },
    iconSize: {
      type: [String, Number],
      default: "16",
    },
    solid: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
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
    icon1Class() {
      let vm = this;
      let fa = vm.solid ? "fas" : "far";
      return `icon-check-1 font-${vm.iconSize} color-${vm.offColor} ${fa} ${vm.icon1}`;
    },
    icon2Class() {
      let vm = this;
      let fa = vm.solid ? "fas" : "far";
      return `icon-check-2 font-${vm.iconSize} color-${vm.color} ${fa} ${vm.icon2}`;
    },
    labelStyle() {
      let vm = this;
      return `padding-left: ${16 + parseInt(vm.iconSize)}px !important;`;
    },
  },
};
</script>
