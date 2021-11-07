<template>
  <div class="accordion-item-container">
    <button
      class="btn accordion-btn"
      data-bs-toggle="collapse"
      :data-bs-target="dataBsTarget"
    >
      <i v-if="icon.length" :class="icon"></i>
      {{ title }}
      <i class="accordion-icon" :class="collapseIcon"></i>
    </button>
    <div
      :id="id"
      class="collapse"
      :class="{ show: show }"
      :data-bs-parent="dataBsParent"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "erd-accordion-item",
  props: {
    id: {
      type: String,
      default: function () {
        return `accordion-item-${this.$uniqueId.id}`;
      },
    },
    collapseIcon: {
      type: String,
      default: "fa fa-chevron-down",
    },
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "Collapse",
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    parent() {
      let vm = this;
      return vm.$parent.id;
    },
    dataBsTarget() {
      let vm = this;
      return `#${vm.id}`;
    },
    dataBsParent() {
      let vm = this;
      return `#${vm.parent}`;
    },
  },
};
</script>
