/* eslint-disable */

/**
 * Import Vue
 */
import Vue from "vue";

/**
 * List of all components
 */
const components = {
  "erd-page-wrapper"          : () => import("@/components/erd-page-wrapper"),
  "erd-button"                : () => import("@/components/erd-button"),
  "erd-button-group"          : () => import("@/components/erd-button-group"),
  "erd-badge"                 : () => import("@/components/erd-badge"),
  "erd-chip"                  : () => import("@/components/erd-chip"),
  "erd-accordion"             : () => import("@/components/erd-accordion"),
  "erd-accordion-item"        : () => import("@/components/erd-accordion-item"),
  "erd-alert"                 : () => import("@/components/erd-alert"),
  "erd-breadcrumb"            : () => import("@/components/erd-breadcrumb"),
  "erd-back-to-top"           : () => import("@/components/erd-backtotop"),
  "erd-card"                  : () => import("@/components/erd-card"),
  "erd-image-card"            : () => import("@/components/erd-image-card"),
  "erd-collapse"              : () => import("@/components/erd-collapse"),
  "erd-divider"               : () => import("@/components/erd-divider"),
  "erd-header"                : () => import("@/components/erd-header"),
  "erd-footer"                : () => import("@/components/erd-footer"),
  "erd-checkbox"              : () => import("@/components/erd-checkbox"),
  "erd-radiobutton"           : () => import("@/components/erd-radiobutton"),
  "erd-input"                 : () => import("@/components/erd-input"),
  "erd-select"                : () => import("@/components/erd-select"),
  "erd-textarea"              : () => import("@/components/erd-textarea"),
  "erd-stepper"               : () => import("@/components/erd-stepper"),
  "erd-icon"                  : () => import("@/components/erd-icon"),
  "erd-list-group"            : () => import("@/components/erd-list-group"),
  "erd-list-group-item"       : () => import("@/components/erd-list-group-item"),
  "erd-check-list-group-item" : () => import("@/components/erd-check-list-group-item"),
};

/**
 * Register all components globally
 */
Object.entries(components).forEach(([name, component]) =>
  Vue.component(name, component)
);