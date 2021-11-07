<template>
  <div>
    <erd-button
      v-if="button"
      :class="collapseClass"
      :color="buttonColor"
      type="button"
      data-bs-toggle="collapse"
      :data-bs-target="dataBsTarget"
    >
      <slot name="collapse"></slot>
    </erd-button>
    <a
      v-else
      data-bs-toggle="collapse"
      :href="dataBsTarget"
      :class="collapseClass"
    >
      <slot name="collapse"></slot>
    </a>
    <div class="collapse" :class="[{ show: show }, collapseBodyClass]" :id="id">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "erd-collapse",
  props: {
    id: {
      type: String,
      default: function () {
        return `collapse-${this.$uniqueId.id}`;
      },
    },
    show: {
      type: Boolean,
      default: false,
    },
    button: {
      type: Boolean,
      default: false,
    },
    buttonColor: {
      type: String,
      default: "primary",
    },
    collapseClass: {
      type: String,
      default: "",
    },
    collapseBodyClass: {
      type: String,
      default: "",
    },
  },
  computed: {
    dataBsTarget() {
      let vm = this;
      return `#${vm.id}`;
    },
  },
};
</script>
