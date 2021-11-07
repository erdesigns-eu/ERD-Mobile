<template>
  <div :class="listGroupClass">
    <slot name="header"></slot>
    <erd-list-group-item
      v-for="(item, index) in items"
      :key="index"
      :small="small"
      :boxed="boxed"
      :size="iconSize"
      :color="item.color"
      :icon="item.icon"
      :solid="item.solid"
      :badge="item.badge"
      :text="item.text"
      :sub-text="item.subText"
      :item-index="index"
      :box-icon="item.boxIcon"
      :box-text="item.boxText"
      :box-color="item.boxColor"
      @click="onItemClick"
    ></erd-list-group-item>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import erdListGroupItem from "./erd-list-group-item.vue";

export default {
  name: "erd-list-group",
  components: {
    erdListGroupItem,
  },
  props: {
    small: {
      type: Boolean,
      default: false,
    },
    boxed: {
      type: Boolean,
      default: false,
    },
    iconSize: {
      type: [String, Number],
      default: 14,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    listGroupClass() {
      let vm = this;
      return vm.boxed
        ? "list-group list-boxes"
        : vm.small
        ? "list-group list-custom-small"
        : "list-group list-custom-large";
    },
    hasHeaderSlot() {
      return !!this.$slots.header;
    },
    hasFooterSlot() {
      return !!this.$slots.footer;
    },
  },
  methods: {
    onItemClick(index, e) {
      this.$emit("item-click", index, e);
    },
  },
};
</script>
