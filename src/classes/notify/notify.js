/**
 * A class that creates mobile first notifications.
 *
 * @class notify
 */
export class Notify {
  /**
   * Private Properties
   */
  #backdropTimeout;

  /**
   * Static Properties
   */
  static backdropId = window.URL.createObjectURL(new Blob([])).split("/").pop();
  static loaderId = window.URL.createObjectURL(new Blob([])).split("/").pop();
  static xmlns = "http://www.w3.org/2000/svg";

  /**
   * Class Constructor
   *
   * @param {Object} options
   */
  constructor(options) {
    if (!options || (options && options.backDrop !== false)) {
      this.#createNotifyBackdrop(options);
    }
    if (!options || (options && !options.timeout)) {
      this.#backdropTimeout = 150;
    } else {
      this.#backdropTimeout = options.timeout;
    }
  }

  /**
   * Create backdrop for notifications
   */
  #createNotifyBackdrop(options) {
    const backDrop = document.createElement("div");
    backDrop.classList.add("notify-backdrop");
    backDrop.addEventListener("click", function (e) {
      e.preventDefault();
    });
    if (!options || (options && options.blur)) {
      backDrop.classList.add("blur");
    }
    backDrop.id = Notify.backdropId;
    document.body.appendChild(backDrop);
  }

  /**
   * Small Notification with timeout (Custom text, icon and color)
   *
   * @param {Object} options
   */
  small(options) {
    const notificationId = window.URL.createObjectURL(new Blob([]))
      .split("/")
      .pop();
    const notification = document.createElement("div");
    notification.className = "notify-small";
    notification.id = notificationId;
    // Add custom classes if passed in options
    if (options.class) {
      if (Array.isArray(options.class)) {
        options.class.map((c) => notification.classList.add(c));
      } else {
        notification.classList.add(options.class);
      }
    }
    const onClickHandler = (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      if (
        options &&
        options.onclick &&
        typeof options.onclick === "function" &&
        e
      ) {
        options.onclick();
      }
      const notification = document.getElementById(notificationId);
      if (notification) {
        notification.classList.remove("active");
        setTimeout(function () {
          notification.parentNode.removeChild(notification);
          document.getElementById(Notify.backdropId).classList.remove("active");
          document.body.classList.remove("notify-body-no-scroll");
        }, backdropTimeout);
      }
    };
    notification.addEventListener("click", onClickHandler);
    // Create icon container
    const iconContainer = document.createElement("h1");
    iconContainer.className = "text-center fa-5x mt-2 pt-3 pb-0";
    const icon = document.createElement("i");
    if (!options.solid) {
      icon.classList.add("fas");
    } else {
      icon.classList.add("far");
    }
    if (options.icon) {
      icon.classList.add(options.icon);
    } else {
      icon.classList.add("fa-flag");
    }
    if (options.color) {
      icon.classList.add(`color-${options.color}`);
    } else {
      icon.classList.add("color-primary");
    }
    // Create text
    const text = document.createElement("h2");
    text.className = "text-center";
    if (options.text) {
      text.innerText = options.text;
    } else {
      text.innerText = "Message";
    }
    // Assemble notification
    iconContainer.appendChild(icon);
    notification.appendChild(iconContainer);
    notification.appendChild(text);
    document.body.appendChild(notification);
    // Notification timeout
    let notifyTimeout = 1000;
    let backdropTimeout = this.#backdropTimeout;
    if (options.timeout) {
      notifyTimeout = options.timeout;
    }
    // Show notification
    document.body.classList.add("notify-body-no-scroll");
    document.getElementById(Notify.backdropId).classList.add("active");
    setTimeout(function () {
      document.getElementById(notificationId).classList.add("active");
      setTimeout(function () {
        onClickHandler();
      }, notifyTimeout);
    }, backdropTimeout);
  }

  /**
   * Large Notification with timeout (Custom icon + caption, title, text, date)
   *
   * @param {Object} options
   */
  large(options) {
    const notificationId = window.URL.createObjectURL(new Blob([]))
      .split("/")
      .pop();
    const notification = document.createElement("div");
    notification.className = "notify-large";
    notification.id = notificationId;
    // Add custom classes if passed in options
    if (options.class) {
      if (Array.isArray(options.class)) {
        options.class.map((c) => notification.classList.add(c));
      } else {
        notification.classList.add(options.class);
      }
    }
    const onClickHandler = (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      if (
        options &&
        options.onclick &&
        typeof options.onclick === "function" &&
        e
      ) {
        options.onclick();
      }
      const notification = document.getElementById(notificationId);
      if (notification) {
        notification.classList.remove("active");
        setTimeout(function () {
          if (notification) {
            notification.parentNode.removeChild(notification);
          }
          document.getElementById(Notify.backdropId).classList.remove("active");
          document.body.classList.remove("notify-body-no-scroll");
        }, backdropTimeout);
      }
    };
    notification.addEventListener("click", onClickHandler);
    // Notification Header
    const header = document.createElement("div");
    header.className = "notify-header";
    const iconContainer = document.createElement("div");
    iconContainer.className = "notify-icon";
    const icon = document.createElement("i");
    icon.classList.add("fas");
    if (options && options.icon) {
      icon.classList.add(options.icon);
    } else {
      icon.classList.add("fa-bell");
    }
    const title = document.createElement("div");
    title.className = "notify-title";
    if (options && options.title) {
      title.innerText = options.title;
    } else {
      title.innerText = document.title;
    }
    const date = document.createElement("div");
    date.className = "notify-date";
    if (options && options.date) {
      date.innerText = options.date;
    } else {
      date.innerText = "now";
    }
    iconContainer.appendChild(icon);
    header.appendChild(iconContainer);
    header.appendChild(title);
    header.appendChild(date);
    // Notification Content
    const content = document.createElement("div");
    content.className = "notify-content";
    const subtitle = document.createElement("div");
    subtitle.className = "notify-subtitle";
    if (options && options.subtitle) {
      subtitle.innerText = options.subtitle;
    } else {
      subtitle.innerText = "Notification";
    }
    const text = document.createElement("div");
    text.className = "notify-text";
    if (options && options.text) {
      text.innerText = options.text;
    } else if (typeof options === "string") {
      text.innerText = options;
    } else {
      text.innerText = "< Empty >";
    }
    content.appendChild(subtitle);
    content.appendChild(text);
    // Assemble Notification
    notification.appendChild(header);
    notification.appendChild(content);
    document.body.appendChild(notification);
    document.body.classList.add("notify-body-no-scroll");
    // Notification timeout
    let notifyTimeout = 3000;
    let backdropTimeout = this.#backdropTimeout;
    if (options.timeout) {
      notifyTimeout = options.timeout;
    }
    // Show notification
    document.getElementById(Notify.backdropId).classList.add("active");
    setTimeout(function () {
      document.getElementById(notificationId).classList.add("active");
      setTimeout(function () {
        onClickHandler();
      }, notifyTimeout);
    }, backdropTimeout / 2);
  }

  /**
   * Loader notification (Custom text, loader style and color)
   *
   * @param {Object} options
   */
  loader(options) {
    let backdropTimeout = this.#backdropTimeout;
    if (document.getElementById(Notify.loaderId) || options === false) {
      const loader = document.getElementById(Notify.loaderId);
      if (loader) {
        loader.classList.remove("active");
        setTimeout(function () {
          document.body.classList.remove("notify-body-no-scroll");
          loader.parentNode.removeChild(loader);
          document.getElementById(Notify.backdropId).classList.remove("active");
        }, backdropTimeout);
      }
      return;
    }
    const loader = document.createElement("div");
    loader.className = "notify-loader";
    loader.id = Notify.loaderId;
    // Add custom classes if passed in options
    if (options && options.class) {
      if (Array.isArray(options.class)) {
        options.class.map((c) => loader.classList.add(c));
      } else {
        loader.classList.add(options.class);
      }
    }
    // Create text
    const text = document.createElement("h3");
    text.className = "text-center";
    if (options && options.text) {
      text.innerText = options.text;
    } else if (typeof options === "string") {
      text.innerText = options;
    } else {
      text.innerText = "Loading...";
    }
    // Create spinner
    let spinner;
    if (options && options.style && options.style.toLowerCase() === "android") {
      spinner = document.createElementNS(Notify.xmlns, "svg");
      spinner.setAttributeNS(null, "class", "android-spinner");
      const circle = document.createElementNS(Notify.xmlns, "circle");
      circle.setAttributeNS(null, "cx", "20");
      circle.setAttributeNS(null, "cy", "20");
      circle.setAttributeNS(null, "r", "15");
      spinner.appendChild(circle);
    } else if (
      options &&
      options.style &&
      options.style.toLowerCase() === "modern"
    ) {
      spinner = document.createElement("div");
      spinner.className = "modern-spinner";
    } else if (
      options &&
      options.style &&
      options.style.toLowerCase() === "slider"
    ) {
      spinner = document.createElement("div");
      spinner.className = "slider-spinner";
      const ball = document.createElement("div");
      ball.className = "ball";
      spinner.appendChild(ball);
    } else {
      spinner = document.createElement("div");
      spinner.className = "ios-spinner";
      for (var i = 0; i < 8; i++) {
        const blade = document.createElement("div");
        blade.className = "blade";
        spinner.appendChild(blade);
      }
    }
    // Assemble loader
    loader.appendChild(text);
    loader.appendChild(spinner);
    document.body.appendChild(loader);
    // Show loader
    document.body.classList.add("notify-body-no-scroll");
    document.getElementById(Notify.backdropId).classList.add("active");
    setTimeout(function () {
      document.getElementById(Notify.loaderId).classList.add("active");
    }, backdropTimeout);
  }

  /**
   * Alert message with one button (Custom text, color)
   *
   * @param {Object} options
   */
  alert(options) {
    return new Promise((resolve) => {
      const alertId = window.URL.createObjectURL(new Blob([])).split("/").pop();
      const alert = document.createElement("div");
      alert.className = "notify-alert";
      alert.id = alertId;
      // Add custom classes if passed in options
      if (options.class) {
        if (Array.isArray(options.class)) {
          options.class.map((c) => alert.classList.add(c));
        } else {
          alert.classList.add(options.class);
        }
      }
      const onClickHandler = (e) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
        const alert = document.getElementById(alertId);
        if (alert) {
          alert.classList.remove("active");
          setTimeout(function () {
            alert.parentNode.removeChild(alert);
            document
              .getElementById(Notify.backdropId)
              .classList.remove("active");
            document.body.classList.remove("notify-body-no-scroll");
          }, backdropTimeout);
        }
        resolve(true);
      };
      // Add Alert header
      const header = document.createElement("div");
      header.className = "notify-header";
      const title = document.createElement("div");
      title.className = "notify-title";
      if (options && options.title) {
        title.innerText = options.title;
      } else {
        title.innerText = document.title;
      }
      const text = document.createElement("div");
      text.className = "notify-text";
      if (options && options.text) {
        text.innerText = options.text;
      } else if (typeof options === "string") {
        text.innerText = options;
      } else {
        text.innerText = "< Empty >";
      }
      header.appendChild(title);
      header.appendChild(text);
      // Add Alert button
      const buttons = document.createElement("div");
      buttons.className = "notify-buttons";
      const button = document.createElement("a");
      button.className = "notify-button";
      button.addEventListener("click", onClickHandler);
      if (options && options.button) {
        button.innerText = options.button;
      } else {
        button.innerText = "OK";
      }
      buttons.appendChild(button);
      // Assemble alert
      alert.appendChild(header);
      alert.appendChild(buttons);
      document.body.appendChild(alert);
      document.body.classList.add("notify-body-no-scroll");
      let backdropTimeout = this.#backdropTimeout;
      // Show notification
      document.getElementById(Notify.backdropId).classList.add("active");
      setTimeout(function () {
        document.getElementById(alertId).classList.add("active");
      }, backdropTimeout / 2);
    });
  }

  /**
   * Confirm message with 2 buttons (Custom text, color, buttons)
   *
   * @param {Object} options
   * @returns
   */
  confirm(options) {
    return new Promise((resolve, reject) => {
      const alertId = window.URL.createObjectURL(new Blob([])).split("/").pop();
      const alert = document.createElement("div");
      alert.className = "notify-confirm";
      alert.id = alertId;
      // Add custom classes if passed in options
      if (options.class) {
        if (Array.isArray(options.class)) {
          options.class.map((c) => alert.classList.add(c));
        } else {
          alert.classList.add(options.class);
        }
      }
      const onCancelClickHandler = (e) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
        const alert = document.getElementById(alertId);
        if (alert) {
          alert.classList.remove("active");
          setTimeout(function () {
            alert.parentNode.removeChild(alert);
            document
              .getElementById(Notify.backdropId)
              .classList.remove("active");
            document.body.classList.remove("notify-body-no-scroll");
          }, backdropTimeout);
        }
        reject(false);
      };
      const onOKClickHandler = (e) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
        const alert = document.getElementById(alertId);
        if (alert) {
          alert.classList.remove("active");
          setTimeout(function () {
            alert.parentNode.removeChild(alert);
            document
              .getElementById(Notify.backdropId)
              .classList.remove("active");
            document.body.classList.remove("notify-body-no-scroll");
          }, backdropTimeout);
        }
        resolve(true);
      };
      // Add Alert header
      const header = document.createElement("div");
      header.className = "notify-header";
      const title = document.createElement("div");
      title.className = "notify-title";
      if (options && options.title) {
        title.innerText = options.title;
      } else {
        title.innerText = document.title;
      }
      const text = document.createElement("div");
      text.className = "notify-text";
      if (options && options.text) {
        text.innerText = options.text;
      } else if (typeof options === "string") {
        text.innerText = options;
      } else {
        text.innerText = "< Empty >";
      }
      header.appendChild(title);
      header.appendChild(text);
      // Add Alert button
      const buttons = document.createElement("div");
      buttons.className = "notify-buttons";
      const cancel = document.createElement("a");
      cancel.className = "notify-button";
      cancel.addEventListener("click", onCancelClickHandler);
      if (options && options.cancel) {
        cancel.innerText = options.cancel;
      } else {
        cancel.innerText = "Cancel";
      }
      const ok = document.createElement("a");
      ok.className = "notify-button";
      ok.addEventListener("click", onOKClickHandler);
      if (options && options.ok) {
        ok.innerText = options.ok;
      } else {
        ok.innerText = "OK";
      }
      buttons.appendChild(cancel);
      buttons.appendChild(ok);
      // Assemble alert
      alert.appendChild(header);
      alert.appendChild(buttons);
      document.body.appendChild(alert);
      document.body.classList.add("notify-body-no-scroll");
      let backdropTimeout = this.#backdropTimeout;
      // Show notification
      document.getElementById(Notify.backdropId).classList.add("active");
      setTimeout(function () {
        document.getElementById(alertId).classList.add("active");
      }, backdropTimeout / 2);
    });
  }

  /**
   * Action sheet with custom title and buttons
   *
   * @param {Object} options
   */
  actions(options) {
    return new Promise((resolve, reject) => {
      const actionsId = window.URL.createObjectURL(new Blob([]))
        .split("/")
        .pop();
      const actions = document.createElement("div");
      actions.className = "notify-actions";
      actions.id = actionsId;
      // Add custom classes if passed in options
      if (options.class) {
        if (Array.isArray(options.class)) {
          options.class.map((c) => actions.classList.add(c));
        } else {
          actions.classList.add(options.class);
        }
      }
      // Add actions group with buttons
      const buttons = document.createElement("div");
      buttons.className = "notify-actions-group";
      const label = document.createElement("div");
      label.className = "notify-label";
      if (options && options.title && options.title.length) {
        label.innerText = options.title;
        buttons.appendChild(label);
      }
      if (options && options.buttons && options.buttons.length) {
        for (var i = 0; i < options.buttons.length; i++) {
          const button = document.createElement("div");
          button.className = "notify-button";
          button.dataset.button = i;
          button.addEventListener("click", function (e) {
            e.preventDefault();
            const actions = document.getElementById(actionsId);
            if (actions) {
              actions.classList.remove("active");
              setTimeout(function () {
                actions.parentNode.removeChild(actions);
                document
                  .getElementById(Notify.backdropId)
                  .classList.remove("active");
                document.body.classList.remove("notify-body-no-scroll");
              }, backdropTimeout);
            }
            resolve(parseInt(e.target.dataset.button));
          });
          const text = document.createElement("div");
          text.className = "notify-text";
          text.innerText = options.buttons[i];
          text.dataset.button = i;
          button.appendChild(text);
          buttons.appendChild(button);
        }
      }
      // Add actions group with cancel button
      const cancel = document.createElement("div");
      cancel.className = "notify-actions-group";
      const cancelButton = document.createElement("div");
      cancelButton.className = "notify-button";
      cancelButton.addEventListener("click", function (e) {
        e.preventDefault();
        const actions = document.getElementById(actionsId);
        if (actions) {
          actions.classList.remove("active");
          setTimeout(function () {
            actions.parentNode.removeChild(actions);
            document
              .getElementById(Notify.backdropId)
              .classList.remove("active");
            document.body.classList.remove("notify-body-no-scroll");
          }, backdropTimeout);
        }
        reject();
      });
      const cancelText = document.createElement("div");
      cancelText.className = "notify-text cancel";
      if (options && options.cancel) {
        cancelText.innerText = options.cancel;
      } else {
        cancelText.innerText = "Cancel";
      }
      cancelButton.appendChild(cancelText);
      cancel.appendChild(cancelButton);
      // Assemble action sheet
      actions.appendChild(buttons);
      actions.appendChild(cancel);
      document.body.appendChild(actions);
      document.body.classList.add("notify-body-no-scroll");
      let backdropTimeout = this.#backdropTimeout;
      // Show action sheet
      document.getElementById(Notify.backdropId).classList.add("active");
      setTimeout(function () {
        document.getElementById(actionsId).classList.add("active");
      }, backdropTimeout / 2);
    });
  }

  /**
   * Snackbar notification
   *
   * @param {Object} options
   */
  snackbar(options) {
    console.log(options);
  }
}
