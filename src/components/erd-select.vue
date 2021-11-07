<template>
  <div class="input-style" :class="inputClass">
    <select class="form-control" v-model="model" :id="id" @change="onChange">
      <option
        v-for="(option, index) in options"
        :value="option.value"
        :disabled="option.disabled"
        :key="index"
      >
        {{ option.text }}
      </option>
    </select>
    <label :for="id" :class="labelColor">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "erd-select",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number],
    },
    id: {
      type: String,
      default: function () {
        return `input-${this.$uniqueId.id}`;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "default",
    },
    border: {
      type: Boolean,
      default: false,
    },
    alwaysActive: {
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
    labelColor() {
      let vm = this;
      return `color-${vm.color}`;
    },
    inputClass() {
      let vm = this;
      let border = vm.border ? "has-borders" : "no-borders";
      let icon = vm.hasIcon ? "has-icon" : "no-icon";
      let active = vm.alwaysActive ? "input-style-always-active" : "";
      let disabled = vm.disabled ? "input-disabled" : "";
      return `${border} ${icon} ${active} ${disabled}`;
    },
    iconClass() {
      let vm = this;
      let solid = vm.solid ? "fas" : "far";
      let color = vm.border ? `color-${vm.color}` : "";
      return `${solid} ${vm.icon} ${color}`;
    },
  },
  methods: {
    onChange(event) {
      this.$emit("change", event);
    },
  },
};
</script>
