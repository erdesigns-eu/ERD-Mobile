<template>
  <div class="page-content" :class="`header-${header}`">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "erd-page-wrapper",
  props: {
    header: {
      type: String,
      default: "clear",
    },
  },
};
</script>
