<template>
  <div id="app">
    <erd-header
      title="some title"
      :buttons="headerButtons"
      @button-click="headerButtonClick"
    ></erd-header>
    <erd-page-wrapper v-context="contextItems"></erd-page-wrapper>
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
      contextItems: [
        {
          text: "Information Gathering",
          subitems: [
            {
              text: "DNS Analysis",
              subitems: [
                { text: "dnsenum" },
                { text: "dnsrecon" },
                { text: "fierce" },
              ],
            },
            {
              text: "IDS/IPS Identification",
              subitems: [{ text: "lbd" }, { text: "wafw00f" }],
            },
            {
              text: "Live Host Identification",
              subitems: [
                { text: "arping" },
                { text: "fping" },
                { text: "hping3" },
                { text: "masscan" },
                { text: "thcping6" },
              ],
            },
            {
              text: "Network & Port Scanners",
              subitems: [{ text: "masscan" }, { text: "nmap" }],
            },
            {
              text: "OSINT Analysis",
              subitems: [{ text: "maltego" }, { text: "theharvester" }],
            },
            {
              text: "Route Analysis",
              subitems: [{ text: "netdiscover" }, { text: "netmask" }],
            },
            {
              text: "SMB Analysis",
              subitems: [
                { text: "enum4linux" },
                { text: "nbtscan" },
                { text: "smbmap" },
              ],
            },
            {
              text: "SMTP Analysis",
              subitems: [{ text: "swaks" }],
            },
            {
              text: "SNMP Analysis",
              subitems: [{ text: "onesixtyone" }],
            },
            {
              text: "SSL Analysis",
              subitems: [
                { text: "ssldump" },
                { text: "sslh" },
                { text: "sslcan" },
                { text: "sslyze" },
              ],
            },
            { text: "dmitry" },
            { text: "ike-scan" },
            { text: "maltego" },
            { text: "netdiscover" },
            { text: "nmap" },
            { text: "recon-ng" },
            { text: "sparta" },
          ],
        },
        {
          text: "Vulnerability Analysis",
          hotkey: "",
          subitems: [
            {
              text: "Fuzzing Tools",
              subitems: [
                { text: "spike-generic_chunked" },
                { text: "spike-generic_listen_tcp" },
                { text: "spike-generic_send_tcp" },
                { text: "spike-generic_send_udp" },
              ],
            },
            {
              text: "VoIP Tools",
              subitems: [{ text: "voiphopper" }],
            },
            { text: "nikto" },
            { text: "nmap" },
            { text: "sparta" },
            { text: "unix-privesc-check" },
          ],
        },
        null,
        {
          text: "Click here!",
          hotkey: "Ctrl + C + L",
          onclick: (e) => {
            e.handled = true;
            e.label.innerText = "Clicked!";
            e.data.text = e.label.innerText;
          },
        },
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
