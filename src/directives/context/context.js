let menuItems;

class ContextMenu {
  constructor(container, items) {
    this.container = container;
    this.dom = null;
    this.shown = false;
    this.root = true;
    this.parent = null;
    this.submenus = [];
    this.items = items;

    this._onclick = (e) => {
      if (
        this.dom &&
        e.target != this.dom &&
        e.target.parentElement != this.dom &&
        !e.target.classList.contains("context-item") &&
        !e.target.parentElement.classList.contains("context-item")
      ) {
        this.hideAll();
      }
    };

    this._oncontextmenu = (e) => {
      e.preventDefault();
      if (
        e.target != this.dom &&
        e.target.parentElement != this.dom &&
        !e.target.classList.contains("context-item") &&
        !e.target.parentElement.classList.contains("context-item")
      ) {
        this.hideAll();
        this.show(e.clientX, e.clientY);
      }
    };

    this._oncontextmenu_keydown = (e) => {
      if (e.keyCode != 93) return;
      e.preventDefault();

      this.hideAll();
      this.show(e.clientX, e.clientY);
    };

    this._onblur = () => {
      this.hideAll();
    };
  }

  getContexMenuElement() {
    const menu = document.createElement("div");
    menu.classList.add("context-menu");

    for (const item of this.items) {
      menu.appendChild(this.getMenuItemElement(item));
    }

    return menu;
  }

  getMenuItemElement(data) {
    const item = document.createElement("div");

    if (data === null) {
      item.classList = "context-separator";
      return item;
    }

    if (
      Object.prototype.hasOwnProperty.call(data, "color") &&
      /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(data.color.toString())
    ) {
      item.style.cssText = `color: ${data.color}`;
    }

    item.classList.add("context-item");

    const label = document.createElement("span");
    label.classList = "label";
    label.innerText = Object.prototype.hasOwnProperty.call(data, "text")
      ? data["text"].toString()
      : "";
    item.appendChild(label);

    if (
      Object.prototype.hasOwnProperty.call(data, "disabled") &&
      data["disabled"]
    ) {
      item.classList.add("disabled");
    } else {
      item.classList.add("enabled");
    }

    const hotkey = document.createElement("span");
    hotkey.classList = "hotkey";
    if (
      Object.prototype.hasOwnProperty.call(data, "subitems") &&
      Array.isArray(data["subitems"]) &&
      data["subitems"].length > 0
    ) {
      hotkey.innerHTML = "<i class='fas fa-chevron-right'></i>";
    } else {
      hotkey.innerText = Object.prototype.hasOwnProperty.call(data, "hotkey")
        ? data["hotkey"].toString()
        : "";
    }
    item.appendChild(hotkey);

    if (
      Object.prototype.hasOwnProperty.call(data, "subitems") &&
      Array.isArray(data["subitems"]) &&
      data["subitems"].length > 0
    ) {
      const menu = new ContextMenu(this.container, data["subitems"]);
      menu.root = false;
      menu.parent = this;

      const openSubItems = () => {
        if (
          Object.prototype.hasOwnProperty.call(data, "disabled") &&
          data["disabled"] == true
        )
          return;

        this.hideSubMenus();

        const x = this.dom.offsetLeft + this.dom.clientWidth + item.offsetLeft;
        const y = this.dom.offsetTop + item.offsetTop;

        if (!menu.shown) {
          menu.show(x, y);
        } else {
          menu.hide();
        }
      };

      this.submenus.push(menu);

      item.classList.add("has-subitems");
      item.addEventListener("click", openSubItems);
      item.addEventListener("mousemove", openSubItems);
    } else {
      item.addEventListener("click", () => {
        this.hideSubMenus();

        if (item.classList.contains("disabled")) return;

        if (
          Object.prototype.hasOwnProperty.call(data, "onclick") &&
          typeof data["onclick"] === "function"
        ) {
          const event = {
            handled: false,
            item: item,
            label: label,
            hotkey: hotkey,
            items: this.items,
            data: data,
          };

          data["onclick"](event);

          if (!event.handled) {
            this.hide();
          }
        } else {
          this.hide();
        }
      });

      item.addEventListener("mousemove", () => {
        this.hideSubMenus();
      });
    }

    return item;
  }

  hideAll() {
    if (this.root && !this.parent) {
      if (this.shown) {
        this.hideSubMenus();

        this.shown = false;
        this.container.removeChild(this.dom);

        if (this.parent && this.parent.shown) {
          this.parent.hide();
        }
      }

      return;
    }

    this.parent.hide();
  }

  hide() {
    if (this.dom && this.shown) {
      this.shown = false;
      this.hideSubMenus();
      this.container.removeChild(this.dom);

      if (this.parent && this.parent.shown) {
        this.parent.hide();
      }
    }
  }

  hideSubMenus() {
    for (const menu of this.submenus) {
      if (menu.shown) {
        menu.shown = false;
        menu.container.removeChild(menu.dom);
      }
      menu.hideSubMenus();
    }
  }

  show(x, y) {
    this.dom = this.getContexMenuElement();

    this.dom.style.left = `${x}px`;
    this.dom.style.top = `${y}px`;

    this.shown = true;
    this.container.appendChild(this.dom);
  }

  install() {
    this.container.addEventListener("contextmenu", this._oncontextmenu);
    this.container.addEventListener("keydown", this._oncontextmenu_keydown);
    this.container.addEventListener("click", this._onclick);
    window.addEventListener("blur", this._onblur);
  }

  uninstall() {
    this.dom = null;
    this.container.removeEventListener("contextmenu", this._oncontextmenu);
    this.container.removeEventListener("keydown", this._oncontextmenu_keydown);
    this.container.removeEventListener("click", this._onclick);
    window.removeEventListener("blur", this._onblur);
  }
}

/**
 * Context Menu reference
 */
let contextmenu;

/**
 * Context Menu Directive
 *
 * @param {Element} el
 * @param {Object} binding
 */
const directive = (el, binding) => {
  // Check that the value is a array
  if (!Array.isArray(binding.value)) {
    console.error("Value of v-context needs to be a array!", el);
    return;
  }

  // Set menuItems so we can compare in update
  menuItems = binding.value;

  // Create new contextmenu
  contextmenu = new ContextMenu(el, binding.value);
  contextmenu.install();
};

/**
 * Recreate Context Menu
 *
 * @param {Element} el
 * @param {Object} binding
 */
const update = (el, binding) => {
  // Check that the value is a array
  if (!Array.isArray(binding.value)) {
    console.error("Value of v-context needs to be a array!", el);
    return;
  }

  if (contextmenu && binding.value != menuItems) {
    contextmenu.uninstall();
    contextmenu = new ContextMenu(el, binding.value);
    contextmenu.install();
  }
};

/**
 * Unbind Context Menu Directive
 */
const unbind = () => {
  if (contextmenu) {
    contextmenu.uninstall();
  }
};

/**
 * Context Menu Directive
 */
export const context = {
  bind: directive,
  update: update,
  unbind: unbind,
};
