<template>
  <div id="app">
    <erd-header
      title="some title"
      :buttons="headerButtons"
      @button-click="headerButtonClick"
    ></erd-header>
    <erd-page-wrapper></erd-page-wrapper>
    <erd-footer
      :buttons="footerButtons"
      :active-index="2"
      bar-style="1"
      scroll
    ></erd-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerButtons: [
        { icon: "fa fa-home" },
        { icon: "fa fa-envelope" },
        { icon: "fa fa-cog" },
      ],
      footerButtons: [
        { icon: "fa fa-home", text: "Angle" },
        { icon: "fa fa-star", text: "Music" },
        { icon: "fa fa-search", text: "TV" },
        {
          icon: "fa fa-heart",
          text: "Back",
          badge: { class: "bg-primary", text: "5" },
        },
        { icon: "fa fa-chevron-left", text: "Ambulance" },
        { icon: "fa fa-phone", text: "Camping" },
        { icon: "fa fa-envelope", text: "Coffee" },
        { icon: "fa fa-cog", text: "Settings" },
      ],
    };
  },
  methods: {
    headerButtonClick(index, elem) {
      console.log("headerButtonClick", index, elem);
    },
  },
};
</script>
