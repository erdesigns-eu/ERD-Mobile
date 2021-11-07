/**
 * A class that detects the operating system,
 * so you can render components based on OS,
 * and other usefull functions.
 *
 * @class device
 */
export class Device {
  /**
   * Private Variables
   */
  #useragent;
  #onlineText;
  #offlineText;
  #wakeLock;

  /**
   * Static Properties
   */
  static winmob = "windows";
  static android = "android";
  static ios = "ios";
  static other = "other";

  static onlineMessageId = window.URL.createObjectURL(new Blob([]))
    .split("/")
    .pop();
  static offlineMessageId = window.URL.createObjectURL(new Blob([]))
    .split("/")
    .pop();

  /**
   * Class Constructor
   */
  constructor(options) {
    // Set Useragent String
    this.#useragent = navigator.userAgent || navigator.vendor || window.opera;
    // Localization
    this.#onlineText =
      options && options.onlineText
        ? options.onlineText
        : "You are back online";
    this.#offlineText =
      options && options.offlineText
        ? options.offlineText
        : "No internet connection detected";
    // Create Online/Offline messages
    this.#createMessages();
    // Add event listeners
    window.addEventListener("online", this.#updateOnline);
    window.addEventListener("offline", this.#updateOffline);
    // Initialize wakelock
    this.#initializeWakelock();
    // Initialize Notch
    this.#initializeNotch();
  }

  /**
   * Get Operating System
   */
  get os() {
    if (/windows phone/i.test(this.#useragent)) {
      return Device.winmob;
    }
    if (/android/i.test(this.#useragent)) {
      return Device.android;
    }
    if (
      (/iPad|iPhone|iPod/.test(this.#useragent) && !window.MSStream) ||
      (navigator.platform === "MacIntel" &&
        navigator.maxTouchPoints > 1 &&
        !window.MSStream)
    ) {
      return Device.ios;
    }
    return Device.other;
  }

  /**
   * Get Android / IOS version
   */
  get version() {
    if (this.os === Device.android) {
      // eslint-disable-next-line no-useless-escape
      return this.#useragent.match(/android\s([0-9\.]*)/i)[1] || false;
    }
    if (this.os === Device.ios) {
      var v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
      return [
        parseInt(v[1], 10),
        parseInt(v[2], 10),
        parseInt(v[3] || 0, 10),
      ].join(".");
    }
    return false;
  }

  /**
   * Is device online
   */
  get online() {
    return navigator.onLine;
  }

  /**
   * Can this device vibrate?
   */
  get canVibrate() {
    return "vibrate" in navigator || "mozVibrate" in navigator;
  }

  /**
   * Does this device have native WakeLock?
   */
  get hasWakelock() {
    return "wakeLock" in navigator;
  }

  /**
   * Does this device have a notch/cut-out (currently iPhone X, XS, XR, XS Max and Google Pixel 3)
   */
  get hasNotch() {
    let root = document.documentElement;
    let style = window.getComputedStyle(root);
    return {
      top: parseInt(style.getPropertyValue("--notch-top") || "-1", 10) > 0,
      right: parseInt(style.getPropertyValue("--notch-right") || "-1", 10) > 0,
      bottom:
        parseInt(style.getPropertyValue("--notch-bottom") || "-1", 10) > 0,
      left: parseInt(style.getPropertyValue("--notch-left") || "-1", 10) > 0,
    };
  }

  /**
   * Does this device have the native GEO api?
   */
  get hasGeo() {
    return "geolocation" in navigator;
  }

  /**
   * Does this device prefer "Dark" mode?
   */
  get darkMode() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  /**
   * Vibrate device
   *
   * @param {Number, Array} pattern
   */
  vibrate(pattern) {
    // Vibrate
    if (this.canVibrate) {
      if (!("vibrate" in navigator)) {
        return navigator.mozVibrate(pattern);
      } else {
        return navigator.vibrate(pattern);
      }
    }
    return null;
  }

  /**
   * Activate/Deactivate native Wakelock
   *
   * @param {Boolean} on
   */
  wakelock(on) {
    if (this.hasWakelock) {
      if (on === true) {
        this.#enableWakelock();
      } else {
        this.#disableWakelock();
      }
    }
  }

  /**
   * Create Online / Offline messages
   */
  // eslint-disable-next-line no-dupe-class-members
  #createMessages() {
    const onlineMsg = document.createElement("p");
    const offlineMsg = document.createElement("p");
    onlineMsg.className = "online-message message-green color-white";
    onlineMsg.textContent = this.#onlineText;
    onlineMsg.id = Device.onlineMessageId;
    offlineMsg.className = "offline-message message-red color-white";
    offlineMsg.textContent = this.#offlineText;
    offlineMsg.id = Device.offlineMessageId;
    document.getElementsByTagName("body")[0].appendChild(offlineMsg);
    document.getElementsByTagName("body")[0].appendChild(onlineMsg);
  }

  /**
   * Device is Online
   */
  // eslint-disable-next-line no-dupe-class-members
  #updateOnline() {
    var msg = document.getElementById(Device.onlineMessageId);
    msg.classList.add("active");
    setTimeout(function () {
      msg.classList.remove("active");
    }, 2500);
  }

  /**
   * Device is Offline
   */
  // eslint-disable-next-line no-dupe-class-members
  #updateOffline() {
    var msg = document.getElementById(Device.offlineMessageId);
    msg.classList.add("active");
    setTimeout(function () {
      msg.classList.remove("active");
    }, 2500);
  }

  /**
   * Enable native Wakelock
   */
  // eslint-disable-next-line no-dupe-class-members
  #enableWakelock() {
    var vm = this;
    return navigator.wakeLock
      .request("screen")
      .then((wakeLock) => {
        vm.#wakeLock = wakeLock;
      })
      .catch((err) => {
        vm.#wakeLock = null;
        console.error(`${err.name}, ${err.message}`);
      });
  }

  /**
   * Disable native Wakelock
   */
  // eslint-disable-next-line no-dupe-class-members
  #disableWakelock() {
    if (this.#wakeLock) {
      this.#wakeLock.release();
    }
  }

  /**
   * Initialize native WakeLock API
   */
  // eslint-disable-next-line no-dupe-class-members
  #initializeWakelock() {
    var vm = this;
    if (vm.hasWakelock) {
      vm.#wakeLock = null;
      const handleVisibilityChange = () => {
        if (vm.#wakeLock !== null && document.visibilityState === "visible") {
          vm.#enableWakelock();
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);
      document.addEventListener("fullscreenchange", handleVisibilityChange);
    }
  }

  /**
   * Initialize root properties for Notch detection
   */
  // eslint-disable-next-line no-dupe-class-members
  #initializeNotch() {
    const onBodyLoaded = () => {
      let root = document.documentElement;
      // add CSS variables so we can read them back
      root.style.setProperty("--notch-top", "env(safe-area-inset-top)");
      root.style.setProperty("--notch-right", "env(safe-area-inset-right)");
      root.style.setProperty("--notch-bottom", "env(safe-area-inset-bottom)");
      root.style.setProperty("--notch-left", "env(safe-area-inset-left)");
    };
    window.addEventListener("load", onBodyLoaded);
  }
}
