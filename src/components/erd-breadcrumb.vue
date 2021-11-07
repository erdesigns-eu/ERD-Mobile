<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="breadcrumb-item"
        :class="{ active: lastItem == index }"
        aria-current="page"
      >
        <a v-if="itemIsLink(item, index)" :href="item.link">
          <i v-if="itemHasIcon(item)" :class="item.icon"></i>
          {{ item.name }}
        </a>
        <router-link v-if="itemIsRouterLink(item, index)" :to="item.to">
          <i v-if="itemHasIcon(item)" :class="item.icon"></i>
          {{ item.name }}
        </router-link>
        <span v-if="itemIsText(item, index)">
          <i v-if="itemHasIcon(item)" :class="item.icon"></i>
          {{ item.name }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: "erd-breadcrumb",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    lastItem() {
      let vm = this;
      return vm.items.length - 1;
    },
  },
  methods: {
    itemHasIcon(item) {
      return item.icon && item.icon.length > 0;
    },
    itemIsLink(item, index) {
      let vm = this;
      return index !== vm.lastItem && item.link;
    },
    itemIsRouterLink(item, index) {
      let vm = this;
      return index !== vm.lastItem && item.to;
    },
    itemIsText(item, index) {
      let vm = this;
      return index === vm.lastItem || (!item.link && !item.to);
    },
  },
};
</script>
