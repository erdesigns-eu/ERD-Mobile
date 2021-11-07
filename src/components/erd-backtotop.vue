<template>
  <a class="back-to-top" @click.prevent="backToTop">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: "erd-back-to-top",
  methods: {
    backToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>
