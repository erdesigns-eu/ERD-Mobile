/**
 * Import Vue
 */
import Vue from "vue";

/**
 * Unique ID Generator
 */
import UniqueId from "./uniqueid";
Vue.use(UniqueId);

/**
 * GEO Location
 */
import GeoLocation from "./geo";
import { GeoOptions } from "@/constants/config";
Vue.use(GeoLocation, GeoOptions);

/**
 * Session
 */
import Session from "./session";
import { SessionOptions } from "@/constants/config";
Vue.use(Session, SessionOptions);

/**
 * HTTP
 */
import Http from "./http";
import { HttpOptions } from "@/constants/config";
Vue.use(Http, HttpOptions);

/**
 * Device
 */
import Device from "@/classes/device";
import { DeviceOptions } from "@/constants/config";
Vue.use(Device, DeviceOptions);

/**
 * Notifications
 */
import Notify from "./notify";
Vue.use(Notify);
