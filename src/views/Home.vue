<template>
  <div class="home">
    <div class="content">
      <div class="reading-time">
        <!-- FILTERS -->
        {{ "reading time of text:" | capitalize(true) }}
        {{ text | readingTime }} minute
      </div>
      <div class="read-more">
        <!-- FILTERS -->
        {{ text | readMore(25) }}
      </div>
      <div class="at-index">
        <!-- FILTERS -->
        At Index (2): {{ filterItems | at(2) }}
      </div>
      <div class="first">
        <!-- FILTERS -->
        First: {{ filterItems | first }}
      </div>
      <div class="last">
        <!-- FILTERS -->
        Last: {{ filterItems | last }}
      </div>
      <div class="contains">
        <!-- FILTERS -->
        Contains Item 2: {{ filterItems | contains("Item 2", "Yes", "No") }}
      </div>
      <div class="min">
        <!-- FILTERS -->
        Min: {{ [1, 2, 3, 4, 5] | min }}
      </div>
      <div class="max">
        <!-- FILTERS -->
        Max: {{ [1, 2, 3, 4, 5] | max }}
      </div>
      <div class="total">
        <!-- FILTERS -->
        Total: {{ [1, 2, 3, 4, 5] | total }}
      </div>
      <div class="unique">
        <!-- FILTERS -->
        Unique: {{ ["Nancy", "Ernst", "Nancy", "Nancy", "Ernst"] | unique }}
      </div>
      <div class="get">
        <!-- FILTERS -->
        GET("personal.phone"):
        {{
          {
            business: { phone: "0123456789", email: "some@email.com" },
            personal: { phone: "987654321", email: "other@email.com" },
          } | get("personal.phone")
        }}
      </div>
      <img alt="Vue logo" src="../assets/logo.png" />
      <erd-button-group>
        <erd-button color="warning" class="btn-full" @click="notifySmall"
          >Notify Small<erd-badge color="secondary" pill
            >12</erd-badge
          ></erd-button
        >
        <erd-button color="danger" class="btn-full" @click="doloader"
          >Loader</erd-button
        >
        <erd-button color="primary" class="btn-full" @click="notifyLarge"
          >Notify Large</erd-button
        >
      </erd-button-group>
      <erd-button-group class="mt-2">
        <erd-button color="warning" class="btn-full" @click="notifyAlert"
          >Alert</erd-button
        >
        <erd-button color="danger" class="btn-full" @click="notifyConfirm"
          >Confirm</erd-button
        >
        <erd-button color="info" class="btn-full" @click="notifyActions"
          >Actions</erd-button
        >
      </erd-button-group>
      <br />
      <br />
      <erd-chip bg="secondary" icon="fa fa-star">ABC</erd-chip>
      <erd-accordion>
        <erd-accordion-item title="Collapse 1"
          >Some content here</erd-accordion-item
        >
        <erd-accordion-item title="Collapse 2"
          >Some content here too</erd-accordion-item
        >
      </erd-accordion>
      <erd-alert
        color="secondary"
        text="Some text"
        title="Some title"
        can-close
      ></erd-alert>
      <erd-alert
        color="primary"
        text="Some text"
        title="Some title"
        can-close
        solid
      ></erd-alert>
      <erd-breadcrumb :items="breadcrumbItems"></erd-breadcrumb>
      <erd-card>
        <h4>Some title</h4>
        <p>Some body text</p>
      </erd-card>
      <erd-collapse
        button
        button-color="info"
        collapse-body-class="some-body-class"
      >
        <template v-slot:collapse>Some Text as collapse title</template>
        <div>COLAPSE BODY</div>
      </erd-collapse>
      <erd-collapse collapse-body-class="some-body-class">
        <template v-slot:collapse>Some Text as collapse title</template>
        <div>COLAPSE BODY</div>
      </erd-collapse>
      <erd-divider color="primary"></erd-divider>
      <erd-checkbox v-model="checkbox1" solid>Some checkbox here</erd-checkbox>
      <erd-radiobutton v-model="radio" radio-value="1"
        >Some radio 1</erd-radiobutton
      >
      <erd-radiobutton v-model="radio" radio-value="2" color="warning"
        >Some radio 2</erd-radiobutton
      >
      <erd-radiobutton v-model="radio" radio-value="3" color="secondary"
        >Some radio 3</erd-radiobutton
      >
    </div>
    <erd-card>
      <erd-input
        v-model="input1"
        type="name"
        label="Some Label"
        icon="fa-user"
        color="info"
        always-active
      ></erd-input>
      <erd-input
        v-model="input1"
        type="name"
        label="Some Label"
        icon="fa-user"
        validate
        :is-valid="false"
        always-active
      ></erd-input>
      <erd-input
        v-model="input1"
        type="name"
        label="Readlony"
        icon="fa-user"
        read-only
        always-active
      ></erd-input>
      <erd-input
        v-model="inputDate"
        type="date"
        label="Date"
        icon="fa-user"
        always-active
      ></erd-input>
      <erd-input
        v-model="inputDate"
        type="number"
        label="Number"
        icon="fa-user"
        always-active
      ></erd-input>
      <erd-input
        v-model="inputDate"
        type="phone"
        label="Some Label"
        icon="fa-user"
        always-active
      ></erd-input>
      <erd-select
        v-model="select1"
        label="Select"
        :options="selectItems"
        always-active
      ></erd-select>
    </erd-card>
    <div class="content">
      <erd-input
        v-model="input1"
        type="name"
        label="Some Label"
        icon="fa-heart"
        placeholder="Some Input"
        color="primary"
        required="(Vereist)"
        border
      ></erd-input>
      <erd-input
        v-model="input1"
        type="name"
        label="Some Label"
        icon="fa-heart"
        placeholder="Some Input"
        color="secondary"
        required="(Vereist)"
        border
      ></erd-input>
      <erd-input
        v-model="input1"
        type="name"
        label="Some Label"
        icon="fa-heart"
        placeholder="Some Input"
        color="info"
        required="(Vereist)"
        border
      ></erd-input>
      <erd-select
        v-model="select1"
        label="Select"
        :options="selectItems"
        border
      ></erd-select>
      <erd-textarea v-model="input1" border></erd-textarea>
    </div>
    <erd-card>
      <erd-stepper v-model="stepper" color="info" rounded></erd-stepper>
      <erd-icon
        size="xs"
        icon="fab fa-facebook"
        color="facebook"
        rounded="l"
        class="mt-2 me-1"
      ></erd-icon>
      <erd-icon
        size="xs"
        icon="fab fa-twitter"
        color="twitter"
        rounded="l"
        class="mt-2 me-1"
      ></erd-icon>
      <erd-icon
        size="xs"
        icon="fab fa-youtube"
        color="google"
        rounded="l"
        class="mt-2"
      ></erd-icon>
    </erd-card>
    <erd-card>
      <p>Group List Large</p>
      <erd-list-group :items="groupListItems" @item-click="onGroupItemClick">
        <template v-slot:footer>
          <erd-check-list-group-item
            v-model="checkbox1"
            text="Icon toggle"
            sub-text="Click here"
            color="primary"
            switch-icon-on="fas fa-check"
            switch-icon-off="fas fa-exclamation"
            solid
          ></erd-check-list-group-item>
        </template>
      </erd-list-group>
    </erd-card>
    <erd-card>
      <p>Group List Small</p>
      <erd-list-group
        :items="groupListItems"
        small
        @item-click="onGroupItemClick"
      >
        <template v-slot:header>
          <erd-check-list-group-item
            v-model="checkbox1"
            text="IOS Toggle"
            color="primary"
            solid
          ></erd-check-list-group-item>
          <erd-check-list-group-item
            v-model="checkbox1"
            text="Android toggle"
            color="primary"
            solid
            android
          ></erd-check-list-group-item>
          <erd-check-list-group-item
            v-model="checkbox1"
            text="Icon toggle"
            color="primary"
            switch-icon-on="fas fa-check"
            switch-icon-off="fas fa-exclamation"
            solid
          ></erd-check-list-group-item>
        </template>
      </erd-list-group>
    </erd-card>
    <erd-card>
      <p>Group List Boxed</p>
      <erd-list-group
        :items="boxedGroupListItems"
        boxed
        @item-click="onGroupItemClick"
      ></erd-list-group>
    </erd-card>
    <erd-image-card
      src="https://www.enableds.com/products/sticky/v481/images/pictures/29.jpg"
      overlay
    >
      <template v-slot:center>
        <h1 class="color-white mb-0">Image Card</h1>
        <p class="color-white mt-n2 mb-0">With slots</p>
      </template>
    </erd-image-card>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      breadcrumbItems: [
        { name: "Some", to: "/some" },
        { name: "Other", to: "/other" },
        { name: "Path", to: "/path" },
      ],
      selectItems: [
        { text: "Disabled", value: "", disabled: true },
        { text: "Option 1", value: "1" },
        { text: "Option 2", value: "2" },
        { text: "Option 3", value: "3" },
      ],
      groupListItems: [
        {
          text: "Some item heart",
          subText: "Some subtext here",
          icon: "fas fa-heart",
          color: "info",
          solid: true,
          badge: { color: "info", text: "€123" },
        },
        {
          text: "Some item clock",
          subText: "Some subtext here",
          icon: "fas fa-clock",
          color: "secondary",
          solid: true,
        },
        {
          text: "Some item heart",
          subText: "Some subtext here",
          icon: "fas fa-heart",
          color: "primary",
        },
      ],
      boxedGroupListItems: [
        {
          text: "Some item heart",
          subText: "Some subtext here",
          icon: "fas fa-heart",
          color: "danger",
          boxText: "Online",
          boxIcon: "fas fa-comment",
          boxColor: "success",
        },
        {
          text: "Some item clock",
          subText: "Some subtext here",
          icon: "fas fa-clock",
          color: "secondary",
          boxText: "Offline",
          boxIcon: "fas fa-times",
          boxColor: "danger",
        },
        {
          text: "Some item heart",
          subText: "Some subtext here",
          icon: "fas fa-heart",
          color: "primary",
          boxText: "Some",
          boxIcon: "fas fa-heart",
          boxColor: "primary",
        },
      ],
      checkbox1: true,
      radio: "1",
      input1: "",
      inputDate: "",
      select1: "",
      stepper: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dui nibh, vehicula sed faucibus a, vestibulum non ipsum. Pellentesque gravida fringilla felis, ullamcorper semper arcu congue vehicula. Vivamus vitae convallis ante. Pellentesque nec sapien et erat porta hendrerit vel ut dui. Nulla ut elit efficitur, maximus mi vitae, laoreet metus. Aliquam sollicitudin risus at metus hendrerit fringilla. Integer tortor nunc, aliquet sit amet odio eu, malesuada elementum elit. Duis sodales pharetra enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros orci, luctus a dapibus tincidunt, egestas ac sem.",
      filterItems: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
    };
  },
  computed: {
    hasWakelock() {
      return this.$device.hasWakelock;
    },
  },
  methods: {
    onGroupItemClick(index, e) {
      console.log("group item clicked", index, e);
    },
    noSleep(val) {
      this.$device.wakelock(val);
    },
    notifyAlert() {
      this.$notify
        .alert({
          class: "primary",
          title: "You got a new message",
          text: "Hello!",
        })
        .then(() => {
          console.log("dismissed alert");
        });
    },
    notifyConfirm() {
      this.$notify
        .confirm({
          class: "primary",
          title: "Please confirm",
          text: "We will erase your phone if you click yes!",
          ok: "Yes",
          cancel: "No",
        })
        .then(() => {
          console.log("You clicked YES");
        })
        .catch(() => {
          console.log("You clicked NO");
        });
    },
    notifySmall() {
      this.$notify.small({
        icon: "fa-comments",
        color: "primary",
        text: "Hello!",
      });
    },
    notifyLarge() {
      this.$notify.large({
        icon: "fa-comments",
        subtitle: "Some message",
        text: "You received a message from someone called someone!",
        onclick: function () {
          console.log("you clicked in the message");
        },
      });
    },
    notifyActions() {
      this.$notify
        .actions({
          class: "primary",
          title: "Some actions",
          buttons: ["Action 1", "Action 2", "Action 3", "Action 4"],
        })
        .then((i) => {
          console.log(`Clicked action ${i}`);
        })
        .catch(() => {
          console.log("Canceled actions");
        });
    },
    doloader() {
      let vm = this;
      vm.$notify.loader({ style: "ios", class: "primary" });
      setTimeout(function () {
        vm.$notify.loader(false);
      }, 3000);
    },
  },
};
</script>
