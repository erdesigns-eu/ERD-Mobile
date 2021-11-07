/**
 * Get GEO Location via the Browser/APP or via IP GEO Lookup.
 *
 * @class geoLocation
 */
export class GeoLocation {
  /**
   * Private variables
   */
  #ipstack;
  #browser;

  /**
   * Class Constructor
   *
   * @constructor
   * @param {Object} options
   */
  constructor(options) {
    if (options && options.ipstack) {
      /**
       * IP-Stack API Key
       */
      this.#ipstack = options.ipstack;
    }
    if (options) {
      /**
       * Navigator.Location options
       */
      this.#browser = {
        enableHighAccuracy: options.enableHighAccuracy ? true : false,
        timeout: options.timeout ? options.timeout : 5000,
        maximumAge: options.maximumAge ? options.maximumAge : 0,
      };
    }
  }

  /**
   * Get Browser GEO Location
   *
   * @param {Function} success
   * @param {Function} error
   * @returns GEO location API data
   */
  geo() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by your browser");
      } else {
        const success = (res) => {
          resolve(res);
        };
        const error = (err) => {
          reject(err);
        };
        navigator.geolocation.getCurrentPosition(success, error, this.#browser);
      }
    });
  }

  /**
   * Get GEO Location from IP-Stack API
   */
  ipStack() {
    return new Promise((resolve, reject) => {
      fetch("https://api.ipify.org/?format=json")
        .then((response) => response.json())
        .then((res) => {
          fetch(`http://api.ipstack.com/${res.ip}?access_key=${this.#ipstack}`)
            .then((response) => response.json())
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Get GEO Location from IP-API
   */
  ipApi() {
    return new Promise((resolve, reject) => {
      fetch("https://api.ipify.org/?format=json")
        .then((response) => response.json())
        .then((res) => {
          fetch(`http://ip-api.com/json/${res.ip}`)
            .then((response) => response.json())
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
