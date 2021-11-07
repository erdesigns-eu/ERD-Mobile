<template>
  <div class="accordion" :id="id">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "erd-accordion",
  props: {
    id: {
      type: String,
      default: function () {
        return `accordion-${this.$uniqueId.id}`;
      },
    },
  },
};
</script>
