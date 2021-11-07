<template>
  <div class="input-style" :class="inputClass">
    <i v-if="hasIcon" :class="iconClass"></i>
    <input
      :type="type"
      class="form-control"
      :class="color"
      :id="id"
      :placeholder="placeholder"
      :spellcheck="spellcheck"
      :value="value"
      :readonly="readOnly"
      :disabled="disabled"
      v-model="model"
      @change="onChange"
    />
    <label :for="id" :class="labelColor">{{ label }}</label>
    <i v-if="validate" class="invalid color-success" :class="validClass"></i>
    <i v-if="validate" class="valid color-danger" :class="invalidClass"></i>
    <em v-if="isRequired" :class="{ disabled: value.length }">{{
      required
    }}</em>
  </div>
</template>

<script>
export default {
  name: "erd-input",
  props: {
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
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    spellcheck: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "default",
    },
    solid: {
      type: Boolean,
      default: true,
    },
    border: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    validate: {
      type: Boolean,
      default: false,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    required: {
      type: [Boolean, String],
      default: "(required)",
    },
    validIcon: {
      type: String,
      default: "fa-check",
    },
    invalidIcon: {
      type: String,
      default: "fa-times",
    },
    alwaysActive: {
      type: Boolean,
      default: false,
    },
    readOnly: {
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
    hasIcon() {
      let vm = this;
      return vm.icon && vm.icon.length;
    },
    isRequired() {
      let vm = this;
      return vm.required && vm.required.length && vm.type !== "date";
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
    validClass() {
      let vm = this;
      let solid = vm.solid ? "fas" : "far";
      let disabled =
        vm.value.length && vm.validate && vm.isValid ? "" : "disabled";
      return `${disabled} ${solid} ${vm.validIcon}`;
    },
    invalidClass() {
      let vm = this;
      let solid = vm.solid ? "fas" : "far";
      let disabled;
      if (!vm.value.length) {
        disabled = "disabled";
      } else {
        disabled = vm.validate && vm.isValid ? "disabled" : "";
      }
      return `${disabled} ${solid} ${vm.invalidIcon}`;
    },
  },
  methods: {
    onChange(event) {
      this.$emit("change", event);
    },
  },
};
</script>
