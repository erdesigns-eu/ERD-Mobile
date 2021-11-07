<template>
  <div class="stepper" :class="{ 'rounded-s': rounded }">
    <a class="stepper-sub" @click.prevent="sub"
      ><i :class="iconMinClass"></i
    ></a>
    <input
      type="number"
      min="1"
      max="99"
      :readonly="readOnly"
      :disabled="disabled"
      v-model="model"
    />
    <a class="stepper-add" @click.prevent="add"
      ><i :class="iconPlusClass"></i
    ></a>
  </div>
</template>

<script>
export default {
  name: "erd-stepper",
  props: {
    value: {
      type: [String, Number],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    min: {
      type: [String, Number],
      default: 0,
    },
    max: {
      type: [String, Number],
      default: 999,
    },
    iconPlus: {
      type: String,
      default: "fa-plus",
    },
    iconMin: {
      type: String,
      default: "fa-minus",
    },
    increment: {
      type: [String, Number],
      default: 1,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "primary",
    },
    solid: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [String, Number],
      default: "10",
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
    iconMinClass() {
      let vm = this;
      let solid = vm.solid ? "fas" : "far";
      return `font-${vm.size} ${solid} ${vm.iconMin} color-${vm.color}`;
    },
    iconPlusClass() {
      let vm = this;
      let solid = vm.solid ? "fas" : "far";
      return `font-${vm.size} ${solid} ${vm.iconPlus} color-${vm.color}`;
    },
  },
  methods: {
    onChange(event) {
      this.$emit("change", event);
    },
    add() {
      let vm = this;
      if (vm.model + vm.increment <= parseInt(vm.max)) {
        vm.model = vm.model + vm.increment;
      } else {
        vm.model = parseInt(vm.max);
      }
    },
    sub() {
      let vm = this;
      if (vm.model - vm.increment >= parseInt(vm.min)) {
        vm.model = vm.model - vm.increment;
      } else {
        vm.model = parseInt(vm.min);
      }
    },
  },
};
</script>
