/**
 * HTTP Base Class working with Fetch API
 *
 * @class baseHttp
 */
class baseHttp {
  /* eslint-disable */
    /**
     * HTTP Methods
     */
    static methods = {
        GET     : 'GET',
        HEAD    : 'HEAD',
        POST    : 'POST',
        PUT     : 'PUT',
        DELETE  : 'DELETE',
        CONNECT : 'CONNECT',
        OPTIONS : 'OPTIONS',
        TRACE   : 'TRACE',
        PATCH   : 'PATCH'
    };

    /**
     * Most Common Used Content-Type Headers
     */
    static contentType = {
        application: {
            JAVA_ARCHIVE        : 'application/java-archive',
            EDI_X12             : 'application/EDI-X12',
            EDIFACT             : 'application/EDIFACT',
            JAVASCRIPT          : 'application/javascript',
            OCTET_STREAM        : 'application/octet-stream',
            OGG                 : 'application/ogg',
            PDF                 : 'application/pdf',
            XHTML_XML           : 'application/xhtml+xml',
            FLASH               : 'application/x-shockwave-flash',
            JSON                : 'application/json',
            LD_JSON             : 'application/ld+json',
            XML                 : 'application/xml',
            ZIP                 : 'application/zip',
            WWW_FORM_URLENCODED : 'application/x-www-form-urlencoded'
        },
        audio: {
            MPEG                : 'audio/mpeg',
            X_MS_WMA            : 'audio/x-ms-wma',
            VND_RN_REALAUDIO    : 'vnd.rn-realaudio',
            X_WAV               : 'x-wav',
        },
        image: {
            GIF                 : 'image/gif',
            JPEG                : 'image/jpeg',
            PNG                 : 'image/png',
            TIFF                : 'image/tiff',
            BMP                 : 'image/bmp',
            EMF                 : 'image/emf',
            VND_MICROSOFT_ICON  : 'image/vnd.microsoft.icon',
            X_ICON              : 'image/x-icon',
            VND_DJVU            : 'image/vnd.djvu',
            SVG_XML             : 'image/svg+xml'
        },
        multipart:{
            MIXED               : 'multipart/mixed',
            ALTERNATIVE         : 'multipart/alternative',
            RELATED             : 'multipart/related',
            FORM_DATA           : 'multipart/form-data'
        },
        text: {
            CSS                 : 'text/css',
            CSV                 : 'text/csv',
            HTML                : 'text/html',
            JAVASCRIPT          : 'text/javascript',
            PLAIN               : 'text/plain',
            XML                 : 'text/xml'
        },
        video: {
            MPEG                : 'video/mpeg',
            MP4                 : 'video/mp4',
            QUICKTIME           : 'video/quicktime',
            X_MS_WMV            : 'video/x-ms-wmv',
            X_MSVIDEO           : 'video/x-msvideo',
            X_FLV               : 'video/x-flv',
            WEBM                : 'video/webm'
        }
    }
    /* eslint-enable */

  /**
   * Private Properties
   */
  #url = "";
  #headers = {};
  #user = null;
  #handler;

  /**
   * HTTP CLass Constructor
   *
   * @constructor
   * @param {Object} options
   */
  constructor(options) {
    let vm = this;
    if (options && options.url) {
      vm.#url = options.url;
    }
    if (options && options.headers) {
      vm.#headers = options.headers;
    }
    if (options && options.user) {
      vm.#user = options.user;
    }
    if (options && options.handler) {
      vm.#handler = options.handler;
    } else {
      vm.#handler = vm.#handleResponse;
    }
  }

  /**
   * Is String valid JSON
   *
   * @param {String} data
   * @returns
   */
  // eslint-disable-next-line no-dupe-class-members
  #isJson(data) {
    try {
      JSON.parse(data);
    } catch (e) {
      return false;
    }
    return true;
  }

  /**
   * Format Authorization Header
   *
   * @returns Object
   */
  // eslint-disable-next-line no-dupe-class-members
  #formatAuthHeader() {
    let user = this.#user;
    if (user && user.token) {
      return {
        Authorization: "Bearer " + user.token,
      };
    } else {
      return {};
    }
  }

  /**
   * Format Headers
   *
   * @param {Object} header
   * @returns Object
   */
  // eslint-disable-next-line no-dupe-class-members
  #formatHeader(header) {
    let vm = this;
    return {
      ...vm.#headers,
      ...vm.#formatAuthHeader,
      ...header,
    };
  }

  /**
   * Add content-type header if not present
   *
   * @param {Object} header
   * @param {String} contentType
   */
  // eslint-disable-next-line no-dupe-class-members
  #formatContentTypeHeader(header, contentType) {
    if (contentType && contentType.length) {
      if (
        !("Content-type" in header) ||
        header["Content-Type"] !== contentType
      ) {
        header = {
          ...header,
          ...{ "Content-Type": contentType },
        };
      }
    }
  }

  /**
   * Handle Response
   *
   * @param {Fetch Repsponse} response
   * @returns Response data
   */
  // eslint-disable-next-line no-dupe-class-members
  #handleResponse(response) {
    return response.text().then((text) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        return text;
      }
    });
  }

  /**
   * Execute HTTP Request
   *
   * @param {String} method
   * @param {String} url
   * @param {Object / String} data
   * @param {Object} header
   * @returns Fetch API Response
   */
  httpRequest(method, url, data, header) {
    let vm = this;

    const requestOptions = {
      method: method,
      headers: this.#formatHeader(header),
    };

    if (data) {
      if (data instanceof FormData) {
        Object.defineProperty(requestOptions, "body", data);
        vm.#formatContentTypeHeader(
          requestOptions.headers,
          baseHttp.contentType.application.WWW_FORM_URLENCODED
        );
      } else if (typeof data === "string" && vm.#isJson(data)) {
        Object.defineProperty(requestOptions, "body", data);
        vm.#formatContentTypeHeader(
          requestOptions.headers,
          baseHttp.contentType.application.JSON
        );
      } else {
        Object.defineProperty(requestOptions, "body", JSON.stringify(data));
        vm.#formatContentTypeHeader(
          requestOptions.headers,
          baseHttp.contentType.application.JSON
        );
      }
    }

    if (vm.#url && vm.#url !== "") {
      url = vm.#url + "/" + url;
    }

    return fetch(url, requestOptions).then(vm.#handler);
  }

  /**
   * URL Setter/Getter
   */
  get url() {
    return this.#url;
  }

  set url(url) {
    this.#url = url;
  }

  /**
   * Headers Setter/Getter
   */
  get headers() {
    return this.#headers;
  }

  set headers(headers) {
    this.#headers = headers;
  }

  /**
   * User Setter/Getter
   */
  get user() {
    return this.#user;
  }

  set user(user) {
    this.#user = user;
  }

  /**
   * Request Handler Setter/Getter
   */
  get handler() {
    return this.#handler;
  }

  set handler(handler) {
    this.#handler = handler;
  }
}

/**
 * HTTP Class
 *
 * @extends baseHttp
 */
export class Http extends baseHttp {
  /**
   * Object to FormData
   *
   * @param {Object} data
   * @returns FormData filled with data
   */
  static toFormData(data) {
    var formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    return formData;
  }

  /**
   * Promise.all with position callback function
   *
   * @param {Fetch API Request} requests
   * @param {Callback Function} progress
   * @returns Promise.all
   */
  static all(requests, progress) {
    let position = 0;
    progress(0);
    for (const request of requests) {
      request.then(() => {
        position++;
        progress((position * 100) / requests.length);
      });
    }
    return Promise.all(requests);
  }

  /**
   * HTTP Request Methods
   *
   * @param {String} url
   * @param {Object} data
   * @param {Object} header
   */
  get(url, header) {
    return this.httpRequest(baseHttp.methods.GET, url, null, header);
  }
  head(url, header) {
    return this.httpRequest(baseHttp.methods.HEAD, url, null, header);
  }
  post(url, data, header) {
    return this.httpRequest(baseHttp.methods.POST, url, data, header);
  }
  put(url, data, header) {
    return this.httpRequest(baseHttp.methods.PUT, url, data, header);
  }
  delete(url, header) {
    return this.httpRequest(baseHttp.methods.DELETE, url, null, header);
  }
  connect(url, header) {
    return this.httpRequest(baseHttp.methods.CONNECT, url, null, header);
  }
  options(url, header) {
    return this.httpRequest(baseHttp.methods.OPTIONS, url, null, header);
  }
  trace(url, header) {
    return this.httpRequest(baseHttp.methods.TRACE, url, null, header);
  }
  patch(url, header) {
    return this.httpRequest(baseHttp.methods.PATCH, url, null, header);
  }
}
