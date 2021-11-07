/**
 * Default Theme
 */
export const DefaultTheme = "orange.light";

/**
 * Available Themes
 */
export const Themes = ["orange.light"];

/**
 * GEO Location Options
 */
export const GeoOptions = {
  ipstack: "d2af32ded8d2f64ed85458907a39df65",
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

/**
 * Session Encoder/Decoder - EXAMPLE ONLY
 */
const reverseString = (str) =>
  str === "" ? "" : reverseString(str.substr(1)) + str.charAt(0);

/**
 * Session Options
 */
export const SessionOptions = {
  persist: true,
  key: "erd-mobile-vue",
  startOnCreate: true,
  encoder: reverseString, // Replace this with a good encoder (This is just an example)
  decoder: reverseString, // Replace this with a good decoder (This is just an example)
};

/**
 * HTTP Options
 */
export const HttpOptions = {
  url: "",
  headers: {},
  // user: Session.user,
  // handler: SomeHandlerFunction
};

/**
 * Device Options
 */
export const DeviceOptions = {
  onlineText: "You are back online",
  offlineText: "No internet connection detected",
};

/**
 * Reading Time Filter Options
 */
export const ReadingTimeOptions = {
  fromId: false,
};

/**
 * Mobile Safari - Listen to events on touch (:active pseudo class)
 */
export const MobileSafariCssFix = true;
