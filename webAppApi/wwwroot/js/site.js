﻿/******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
            /******/
        }
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
            /******/
        };
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
        /******/
    }
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
            /******/
        }
        /******/
    };
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function (exports) {
/******/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            /******/
        }
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
        /******/
    };
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function (value, mode) {
/******/ 		if (mode & 1) value = __webpack_require__(value);
/******/ 		if (mode & 8) return value;
/******/ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
        /******/
    };
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
        /******/
    };
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
    /******/
})
/************************************************************************/
/******/({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

            /***/
        }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
            var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
            var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
            var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
            var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
            var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
            var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
            var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
            var transitionalDefaults = __webpack_require__(/*! ../defaults/transitional */ "./node_modules/axios/lib/defaults/transitional.js");
            var Cancel = __webpack_require__(/*! ../cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

            module.exports = function xhrAdapter(config) {
                return new Promise(function dispatchXhrRequest(resolve, reject) {
                    var requestData = config.data;
                    var requestHeaders = config.headers;
                    var responseType = config.responseType;
                    var onCanceled;
                    function done() {
                        if (config.cancelToken) {
                            config.cancelToken.unsubscribe(onCanceled);
                        }

                        if (config.signal) {
                            config.signal.removeEventListener('abort', onCanceled);
                        }
                    }

                    if (utils.isFormData(requestData)) {
                        delete requestHeaders['Content-Type']; // Let the browser set it
                    }

                    var request = new XMLHttpRequest();

                    // HTTP basic authentication
                    if (config.auth) {
                        var username = config.auth.username || '';
                        var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
                        requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
                    }

                    var fullPath = buildFullPath(config.baseURL, config.url);
                    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

                    // Set the request timeout in MS
                    request.timeout = config.timeout;

                    function onloadend() {
                        if (!request) {
                            return;
                        }
                        // Prepare the response
                        var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
                        var responseData = !responseType || responseType === 'text' || responseType === 'json' ?
                            request.responseText : request.response;
                        var response = {
                            data: responseData,
                            status: request.status,
                            statusText: request.statusText,
                            headers: responseHeaders,
                            config: config,
                            request: request
                        };

                        settle(function _resolve(value) {
                            resolve(value);
                            done();
                        }, function _reject(err) {
                            reject(err);
                            done();
                        }, response);

                        // Clean up request
                        request = null;
                    }

                    if ('onloadend' in request) {
                        // Use onloadend if available
                        request.onloadend = onloadend;
                    } else {
                        // Listen for ready state to emulate onloadend
                        request.onreadystatechange = function handleLoad() {
                            if (!request || request.readyState !== 4) {
                                return;
                            }

                            // The request errored out and we didn't get a response, this will be
                            // handled by onerror instead
                            // With one exception: request that using file: protocol, most browsers
                            // will return status as 0 even though it's a successful request
                            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
                                return;
                            }
                            // readystate handler is calling before onerror or ontimeout handlers,
                            // so we should call onloadend on the next 'tick'
                            setTimeout(onloadend);
                        };
                    }

                    // Handle browser request cancellation (as opposed to a manual cancellation)
                    request.onabort = function handleAbort() {
                        if (!request) {
                            return;
                        }

                        reject(createError('Request aborted', config, 'ECONNABORTED', request));

                        // Clean up request
                        request = null;
                    };

                    // Handle low level network errors
                    request.onerror = function handleError() {
                        // Real errors are hidden from us by the browser
                        // onerror should only fire if it's a network error
                        reject(createError('Network Error', config, null, request));

                        // Clean up request
                        request = null;
                    };

                    // Handle timeout
                    request.ontimeout = function handleTimeout() {
                        var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
                        var transitional = config.transitional || transitionalDefaults;
                        if (config.timeoutErrorMessage) {
                            timeoutErrorMessage = config.timeoutErrorMessage;
                        }
                        reject(createError(
                            timeoutErrorMessage,
                            config,
                            transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
                            request));

                        // Clean up request
                        request = null;
                    };

                    // Add xsrf header
                    // This is only done if running in a standard browser environment.
                    // Specifically not if we're in a web worker, or react-native.
                    if (utils.isStandardBrowserEnv()) {
                        // Add xsrf header
                        var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
                            cookies.read(config.xsrfCookieName) :
                            undefined;

                        if (xsrfValue) {
                            requestHeaders[config.xsrfHeaderName] = xsrfValue;
                        }
                    }

                    // Add headers to the request
                    if ('setRequestHeader' in request) {
                        utils.forEach(requestHeaders, function setRequestHeader(val, key) {
                            if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
                                // Remove Content-Type if data is undefined
                                delete requestHeaders[key];
                            } else {
                                // Otherwise add header to the request
                                request.setRequestHeader(key, val);
                            }
                        });
                    }

                    // Add withCredentials to request if needed
                    if (!utils.isUndefined(config.withCredentials)) {
                        request.withCredentials = !!config.withCredentials;
                    }

                    // Add responseType to request if needed
                    if (responseType && responseType !== 'json') {
                        request.responseType = config.responseType;
                    }

                    // Handle progress if needed
                    if (typeof config.onDownloadProgress === 'function') {
                        request.addEventListener('progress', config.onDownloadProgress);
                    }

                    // Not all browsers support upload events
                    if (typeof config.onUploadProgress === 'function' && request.upload) {
                        request.upload.addEventListener('progress', config.onUploadProgress);
                    }

                    if (config.cancelToken || config.signal) {
                        // Handle cancellation
                        // eslint-disable-next-line func-names
                        onCanceled = function (cancel) {
                            if (!request) {
                                return;
                            }
                            reject(!cancel || (cancel && cancel.type) ? new Cancel('canceled') : cancel);
                            request.abort();
                            request = null;
                        };

                        config.cancelToken && config.cancelToken.subscribe(onCanceled);
                        if (config.signal) {
                            config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
                        }
                    }

                    if (!requestData) {
                        requestData = null;
                    }

                    // Send the request
                    request.send(requestData);
                });
            };


            /***/
        }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
            var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
            var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
            var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
            var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults/index.js");

            /**
             * Create an instance of Axios
             *
             * @param {Object} defaultConfig The default config for the instance
             * @return {Axios} A new instance of Axios
             */
            function createInstance(defaultConfig) {
                var context = new Axios(defaultConfig);
                var instance = bind(Axios.prototype.request, context);

                // Copy axios.prototype to instance
                utils.extend(instance, Axios.prototype, context);

                // Copy context to instance
                utils.extend(instance, context);

                // Factory for creating new instances
                instance.create = function create(instanceConfig) {
                    return createInstance(mergeConfig(defaultConfig, instanceConfig));
                };

                return instance;
            }

            // Create the default instance to be exported
            var axios = createInstance(defaults);

            // Expose Axios class to allow class inheritance
            axios.Axios = Axios;

            // Expose Cancel & CancelToken
            axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
            axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
            axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
            axios.VERSION = __webpack_require__(/*! ./env/data */ "./node_modules/axios/lib/env/data.js").version;

            // Expose all/spread
            axios.all = function all(promises) {
                return Promise.all(promises);
            };
            axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

            // Expose isAxiosError
            axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

            module.exports = axios;

            // Allow use of default import syntax in TypeScript
            module.exports.default = axios;


            /***/
        }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            /**
             * A `Cancel` is an object that is thrown when an operation is canceled.
             *
             * @class
             * @param {string=} message The message.
             */
            function Cancel(message) {
                this.message = message;
            }

            Cancel.prototype.toString = function toString() {
                return 'Cancel' + (this.message ? ': ' + this.message : '');
            };

            Cancel.prototype.__CANCEL__ = true;

            module.exports = Cancel;


            /***/
        }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

            /**
             * A `CancelToken` is an object that can be used to request cancellation of an operation.
             *
             * @class
             * @param {Function} executor The executor function.
             */
            function CancelToken(executor) {
                if (typeof executor !== 'function') {
                    throw new TypeError('executor must be a function.');
                }

                var resolvePromise;

                this.promise = new Promise(function promiseExecutor(resolve) {
                    resolvePromise = resolve;
                });

                var token = this;

                // eslint-disable-next-line func-names
                this.promise.then(function (cancel) {
                    if (!token._listeners) return;

                    var i;
                    var l = token._listeners.length;

                    for (i = 0; i < l; i++) {
                        token._listeners[i](cancel);
                    }
                    token._listeners = null;
                });

                // eslint-disable-next-line func-names
                this.promise.then = function (onfulfilled) {
                    var _resolve;
                    // eslint-disable-next-line func-names
                    var promise = new Promise(function (resolve) {
                        token.subscribe(resolve);
                        _resolve = resolve;
                    }).then(onfulfilled);

                    promise.cancel = function reject() {
                        token.unsubscribe(_resolve);
                    };

                    return promise;
                };

                executor(function cancel(message) {
                    if (token.reason) {
                        // Cancellation has already been requested
                        return;
                    }

                    token.reason = new Cancel(message);
                    resolvePromise(token.reason);
                });
            }

            /**
             * Throws a `Cancel` if cancellation has been requested.
             */
            CancelToken.prototype.throwIfRequested = function throwIfRequested() {
                if (this.reason) {
                    throw this.reason;
                }
            };

            /**
             * Subscribe to the cancel signal
             */

            CancelToken.prototype.subscribe = function subscribe(listener) {
                if (this.reason) {
                    listener(this.reason);
                    return;
                }

                if (this._listeners) {
                    this._listeners.push(listener);
                } else {
                    this._listeners = [listener];
                }
            };

            /**
             * Unsubscribe from the cancel signal
             */

            CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
                if (!this._listeners) {
                    return;
                }
                var index = this._listeners.indexOf(listener);
                if (index !== -1) {
                    this._listeners.splice(index, 1);
                }
            };

            /**
             * Returns an object that contains a new `CancelToken` and a function that, when called,
             * cancels the `CancelToken`.
             */
            CancelToken.source = function source() {
                var cancel;
                var token = new CancelToken(function executor(c) {
                    cancel = c;
                });
                return {
                    token: token,
                    cancel: cancel
                };
            };

            module.exports = CancelToken;


            /***/
        }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            module.exports = function isCancel(value) {
                return !!(value && value.__CANCEL__);
            };


            /***/
        }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
            var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
            var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
            var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
            var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
            var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/axios/lib/helpers/validator.js");

            var validators = validator.validators;
            /**
             * Create a new instance of Axios
             *
             * @param {Object} instanceConfig The default config for the instance
             */
            function Axios(instanceConfig) {
                this.defaults = instanceConfig;
                this.interceptors = {
                    request: new InterceptorManager(),
                    response: new InterceptorManager()
                };
            }

            /**
             * Dispatch a request
             *
             * @param {Object} config The config specific for this request (merged with this.defaults)
             */
            Axios.prototype.request = function request(configOrUrl, config) {
                /*eslint no-param-reassign:0*/
                // Allow for axios('example/url'[, config]) a la fetch API
                if (typeof configOrUrl === 'string') {
                    config = config || {};
                    config.url = configOrUrl;
                } else {
                    config = configOrUrl || {};
                }

                config = mergeConfig(this.defaults, config);

                // Set config.method
                if (config.method) {
                    config.method = config.method.toLowerCase();
                } else if (this.defaults.method) {
                    config.method = this.defaults.method.toLowerCase();
                } else {
                    config.method = 'get';
                }

                var transitional = config.transitional;

                if (transitional !== undefined) {
                    validator.assertOptions(transitional, {
                        silentJSONParsing: validators.transitional(validators.boolean),
                        forcedJSONParsing: validators.transitional(validators.boolean),
                        clarifyTimeoutError: validators.transitional(validators.boolean)
                    }, false);
                }

                // filter out skipped interceptors
                var requestInterceptorChain = [];
                var synchronousRequestInterceptors = true;
                this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
                    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
                        return;
                    }

                    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

                    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
                });

                var responseInterceptorChain = [];
                this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
                    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
                });

                var promise;

                if (!synchronousRequestInterceptors) {
                    var chain = [dispatchRequest, undefined];

                    Array.prototype.unshift.apply(chain, requestInterceptorChain);
                    chain = chain.concat(responseInterceptorChain);

                    promise = Promise.resolve(config);
                    while (chain.length) {
                        promise = promise.then(chain.shift(), chain.shift());
                    }

                    return promise;
                }


                var newConfig = config;
                while (requestInterceptorChain.length) {
                    var onFulfilled = requestInterceptorChain.shift();
                    var onRejected = requestInterceptorChain.shift();
                    try {
                        newConfig = onFulfilled(newConfig);
                    } catch (error) {
                        onRejected(error);
                        break;
                    }
                }

                try {
                    promise = dispatchRequest(newConfig);
                } catch (error) {
                    return Promise.reject(error);
                }

                while (responseInterceptorChain.length) {
                    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
                }

                return promise;
            };

            Axios.prototype.getUri = function getUri(config) {
                config = mergeConfig(this.defaults, config);
                return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
            };

            // Provide aliases for supported request methods
            utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
                /*eslint func-names:0*/
                Axios.prototype[method] = function (url, config) {
                    return this.request(mergeConfig(config || {}, {
                        method: method,
                        url: url,
                        data: (config || {}).data
                    }));
                };
            });

            utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
                /*eslint func-names:0*/
                Axios.prototype[method] = function (url, data, config) {
                    return this.request(mergeConfig(config || {}, {
                        method: method,
                        url: url,
                        data: data
                    }));
                };
            });

            module.exports = Axios;


            /***/
        }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

            function InterceptorManager() {
                this.handlers = [];
            }

            /**
             * Add a new interceptor to the stack
             *
             * @param {Function} fulfilled The function to handle `then` for a `Promise`
             * @param {Function} rejected The function to handle `reject` for a `Promise`
             *
             * @return {Number} An ID used to remove interceptor later
             */
            InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
                this.handlers.push({
                    fulfilled: fulfilled,
                    rejected: rejected,
                    synchronous: options ? options.synchronous : false,
                    runWhen: options ? options.runWhen : null
                });
                return this.handlers.length - 1;
            };

            /**
             * Remove an interceptor from the stack
             *
             * @param {Number} id The ID that was returned by `use`
             */
            InterceptorManager.prototype.eject = function eject(id) {
                if (this.handlers[id]) {
                    this.handlers[id] = null;
                }
            };

            /**
             * Iterate over all the registered interceptors
             *
             * This method is particularly useful for skipping over any
             * interceptors that may have become `null` calling `eject`.
             *
             * @param {Function} fn The function to call for each interceptor
             */
            InterceptorManager.prototype.forEach = function forEach(fn) {
                utils.forEach(this.handlers, function forEachHandler(h) {
                    if (h !== null) {
                        fn(h);
                    }
                });
            };

            module.exports = InterceptorManager;


            /***/
        }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
            var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

            /**
             * Creates a new URL by combining the baseURL with the requestedURL,
             * only when the requestedURL is not already an absolute URL.
             * If the requestURL is absolute, this function returns the requestedURL untouched.
             *
             * @param {string} baseURL The base URL
             * @param {string} requestedURL Absolute or relative URL to combine
             * @returns {string} The combined full path
             */
            module.exports = function buildFullPath(baseURL, requestedURL) {
                if (baseURL && !isAbsoluteURL(requestedURL)) {
                    return combineURLs(baseURL, requestedURL);
                }
                return requestedURL;
            };


            /***/
        }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

            /**
             * Create an Error with the specified message, config, error code, request and response.
             *
             * @param {string} message The error message.
             * @param {Object} config The config.
             * @param {string} [code] The error code (for example, 'ECONNABORTED').
             * @param {Object} [request] The request.
             * @param {Object} [response] The response.
             * @returns {Error} The created error.
             */
            module.exports = function createError(message, config, code, request, response) {
                var error = new Error(message);
                return enhanceError(error, config, code, request, response);
            };


            /***/
        }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
            var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
            var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
            var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults/index.js");
            var Cancel = __webpack_require__(/*! ../cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

            /**
             * Throws a `Cancel` if cancellation has been requested.
             */
            function throwIfCancellationRequested(config) {
                if (config.cancelToken) {
                    config.cancelToken.throwIfRequested();
                }

                if (config.signal && config.signal.aborted) {
                    throw new Cancel('canceled');
                }
            }

            /**
             * Dispatch a request to the server using the configured adapter.
             *
             * @param {object} config The config that is to be used for the request
             * @returns {Promise} The Promise to be fulfilled
             */
            module.exports = function dispatchRequest(config) {
                throwIfCancellationRequested(config);

                // Ensure headers exist
                config.headers = config.headers || {};

                // Transform request data
                config.data = transformData.call(
                    config,
                    config.data,
                    config.headers,
                    config.transformRequest
                );

                // Flatten headers
                config.headers = utils.merge(
                    config.headers.common || {},
                    config.headers[config.method] || {},
                    config.headers
                );

                utils.forEach(
                    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
                    function cleanHeaderConfig(method) {
                        delete config.headers[method];
                    }
                );

                var adapter = config.adapter || defaults.adapter;

                return adapter(config).then(function onAdapterResolution(response) {
                    throwIfCancellationRequested(config);

                    // Transform response data
                    response.data = transformData.call(
                        config,
                        response.data,
                        response.headers,
                        config.transformResponse
                    );

                    return response;
                }, function onAdapterRejection(reason) {
                    if (!isCancel(reason)) {
                        throwIfCancellationRequested(config);

                        // Transform response data
                        if (reason && reason.response) {
                            reason.response.data = transformData.call(
                                config,
                                reason.response.data,
                                reason.response.headers,
                                config.transformResponse
                            );
                        }
                    }

                    return Promise.reject(reason);
                });
            };


            /***/
        }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            /**
             * Update an Error with the specified config, error code, and response.
             *
             * @param {Error} error The error to update.
             * @param {Object} config The config.
             * @param {string} [code] The error code (for example, 'ECONNABORTED').
             * @param {Object} [request] The request.
             * @param {Object} [response] The response.
             * @returns {Error} The error.
             */
            module.exports = function enhanceError(error, config, code, request, response) {
                error.config = config;
                if (code) {
                    error.code = code;
                }

                error.request = request;
                error.response = response;
                error.isAxiosError = true;

                error.toJSON = function toJSON() {
                    return {
                        // Standard
                        message: this.message,
                        name: this.name,
                        // Microsoft
                        description: this.description,
                        number: this.number,
                        // Mozilla
                        fileName: this.fileName,
                        lineNumber: this.lineNumber,
                        columnNumber: this.columnNumber,
                        stack: this.stack,
                        // Axios
                        config: this.config,
                        code: this.code,
                        status: this.response && this.response.status ? this.response.status : null
                    };
                };
                return error;
            };


            /***/
        }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

            /**
             * Config-specific merge-function which creates a new config-object
             * by merging two configuration objects together.
             *
             * @param {Object} config1
             * @param {Object} config2
             * @returns {Object} New object resulting from merging config2 to config1
             */
            module.exports = function mergeConfig(config1, config2) {
                // eslint-disable-next-line no-param-reassign
                config2 = config2 || {};
                var config = {};

                function getMergedValue(target, source) {
                    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
                        return utils.merge(target, source);
                    } else if (utils.isPlainObject(source)) {
                        return utils.merge({}, source);
                    } else if (utils.isArray(source)) {
                        return source.slice();
                    }
                    return source;
                }

                // eslint-disable-next-line consistent-return
                function mergeDeepProperties(prop) {
                    if (!utils.isUndefined(config2[prop])) {
                        return getMergedValue(config1[prop], config2[prop]);
                    } else if (!utils.isUndefined(config1[prop])) {
                        return getMergedValue(undefined, config1[prop]);
                    }
                }

                // eslint-disable-next-line consistent-return
                function valueFromConfig2(prop) {
                    if (!utils.isUndefined(config2[prop])) {
                        return getMergedValue(undefined, config2[prop]);
                    }
                }

                // eslint-disable-next-line consistent-return
                function defaultToConfig2(prop) {
                    if (!utils.isUndefined(config2[prop])) {
                        return getMergedValue(undefined, config2[prop]);
                    } else if (!utils.isUndefined(config1[prop])) {
                        return getMergedValue(undefined, config1[prop]);
                    }
                }

                // eslint-disable-next-line consistent-return
                function mergeDirectKeys(prop) {
                    if (prop in config2) {
                        return getMergedValue(config1[prop], config2[prop]);
                    } else if (prop in config1) {
                        return getMergedValue(undefined, config1[prop]);
                    }
                }

                var mergeMap = {
                    'url': valueFromConfig2,
                    'method': valueFromConfig2,
                    'data': valueFromConfig2,
                    'baseURL': defaultToConfig2,
                    'transformRequest': defaultToConfig2,
                    'transformResponse': defaultToConfig2,
                    'paramsSerializer': defaultToConfig2,
                    'timeout': defaultToConfig2,
                    'timeoutMessage': defaultToConfig2,
                    'withCredentials': defaultToConfig2,
                    'adapter': defaultToConfig2,
                    'responseType': defaultToConfig2,
                    'xsrfCookieName': defaultToConfig2,
                    'xsrfHeaderName': defaultToConfig2,
                    'onUploadProgress': defaultToConfig2,
                    'onDownloadProgress': defaultToConfig2,
                    'decompress': defaultToConfig2,
                    'maxContentLength': defaultToConfig2,
                    'maxBodyLength': defaultToConfig2,
                    'transport': defaultToConfig2,
                    'httpAgent': defaultToConfig2,
                    'httpsAgent': defaultToConfig2,
                    'cancelToken': defaultToConfig2,
                    'socketPath': defaultToConfig2,
                    'responseEncoding': defaultToConfig2,
                    'validateStatus': mergeDirectKeys
                };

                utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
                    var merge = mergeMap[prop] || mergeDeepProperties;
                    var configValue = merge(prop);
                    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
                });

                return config;
            };


            /***/
        }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

            /**
             * Resolve or reject a Promise based on response status.
             *
             * @param {Function} resolve A function that resolves the promise.
             * @param {Function} reject A function that rejects the promise.
             * @param {object} response The response.
             */
            module.exports = function settle(resolve, reject, response) {
                var validateStatus = response.config.validateStatus;
                if (!response.status || !validateStatus || validateStatus(response.status)) {
                    resolve(response);
                } else {
                    reject(createError(
                        'Request failed with status code ' + response.status,
                        response.config,
                        null,
                        response.request,
                        response
                    ));
                }
            };


            /***/
        }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
            var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults/index.js");

            /**
             * Transform the data for a request or a response
             *
             * @param {Object|String} data The data to be transformed
             * @param {Array} headers The headers for the request or response
             * @param {Array|Function} fns A single function or Array of functions
             * @returns {*} The resulting transformed data
             */
            module.exports = function transformData(data, headers, fns) {
                var context = this || defaults;
                /*eslint no-param-reassign:0*/
                utils.forEach(fns, function transform(fn) {
                    data = fn.call(context, data, headers);
                });

                return data;
            };


            /***/
        }),

/***/ "./node_modules/axios/lib/defaults/index.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/defaults/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";
/* WEBPACK VAR INJECTION */(function (process) {

                var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");
                var normalizeHeaderName = __webpack_require__(/*! ../helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");
                var enhanceError = __webpack_require__(/*! ../core/enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");
                var transitionalDefaults = __webpack_require__(/*! ./transitional */ "./node_modules/axios/lib/defaults/transitional.js");

                var DEFAULT_CONTENT_TYPE = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                };

                function setContentTypeIfUnset(headers, value) {
                    if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
                        headers['Content-Type'] = value;
                    }
                }

                function getDefaultAdapter() {
                    var adapter;
                    if (typeof XMLHttpRequest !== 'undefined') {
                        // For browsers use XHR adapter
                        adapter = __webpack_require__(/*! ../adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
                    } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
                        // For node use HTTP adapter
                        adapter = __webpack_require__(/*! ../adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
                    }
                    return adapter;
                }

                function stringifySafely(rawValue, parser, encoder) {
                    if (utils.isString(rawValue)) {
                        try {
                            (parser || JSON.parse)(rawValue);
                            return utils.trim(rawValue);
                        } catch (e) {
                            if (e.name !== 'SyntaxError') {
                                throw e;
                            }
                        }
                    }

                    return (encoder || JSON.stringify)(rawValue);
                }

                var defaults = {

                    transitional: transitionalDefaults,

                    adapter: getDefaultAdapter(),

                    transformRequest: [function transformRequest(data, headers) {
                        normalizeHeaderName(headers, 'Accept');
                        normalizeHeaderName(headers, 'Content-Type');

                        if (utils.isFormData(data) ||
                            utils.isArrayBuffer(data) ||
                            utils.isBuffer(data) ||
                            utils.isStream(data) ||
                            utils.isFile(data) ||
                            utils.isBlob(data)
                        ) {
                            return data;
                        }
                        if (utils.isArrayBufferView(data)) {
                            return data.buffer;
                        }
                        if (utils.isURLSearchParams(data)) {
                            setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
                            return data.toString();
                        }
                        if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
                            setContentTypeIfUnset(headers, 'application/json');
                            return stringifySafely(data);
                        }
                        return data;
                    }],

                    transformResponse: [function transformResponse(data) {
                        var transitional = this.transitional || defaults.transitional;
                        var silentJSONParsing = transitional && transitional.silentJSONParsing;
                        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
                        var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

                        if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
                            try {
                                return JSON.parse(data);
                            } catch (e) {
                                if (strictJSONParsing) {
                                    if (e.name === 'SyntaxError') {
                                        throw enhanceError(e, this, 'E_JSON_PARSE');
                                    }
                                    throw e;
                                }
                            }
                        }

                        return data;
                    }],

                    /**
                     * A timeout in milliseconds to abort a request. If set to 0 (default) a
                     * timeout is not created.
                     */
                    timeout: 0,

                    xsrfCookieName: 'XSRF-TOKEN',
                    xsrfHeaderName: 'X-XSRF-TOKEN',

                    maxContentLength: -1,
                    maxBodyLength: -1,

                    validateStatus: function validateStatus(status) {
                        return status >= 200 && status < 300;
                    },

                    headers: {
                        common: {
                            'Accept': 'application/json, text/plain, */*'
                        }
                    }
                };

                utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
                    defaults.headers[method] = {};
                });

                utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
                    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
                });

                module.exports = defaults;

                /* WEBPACK VAR INJECTION */
            }.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "./node_modules/process/browser.js")))

            /***/
        }),

/***/ "./node_modules/axios/lib/defaults/transitional.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/defaults/transitional.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            module.exports = {
                silentJSONParsing: true,
                forcedJSONParsing: true,
                clarifyTimeoutError: false
            };


            /***/
        }),

/***/ "./node_modules/axios/lib/env/data.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function (module, exports) {

            module.exports = {
                "version": "0.26.1"
            };

            /***/
        }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            module.exports = function bind(fn, thisArg) {
                return function wrap() {
                    var args = new Array(arguments.length);
                    for (var i = 0; i < args.length; i++) {
                        args[i] = arguments[i];
                    }
                    return fn.apply(thisArg, args);
                };
            };


            /***/
        }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

            function encode(val) {
                return encodeURIComponent(val).
                    replace(/%3A/gi, ':').
                    replace(/%24/g, '$').
                    replace(/%2C/gi, ',').
                    replace(/%20/g, '+').
                    replace(/%5B/gi, '[').
                    replace(/%5D/gi, ']');
            }

            /**
             * Build a URL by appending params to the end
             *
             * @param {string} url The base of the url (e.g., http://www.google.com)
             * @param {object} [params] The params to be appended
             * @returns {string} The formatted url
             */
            module.exports = function buildURL(url, params, paramsSerializer) {
                /*eslint no-param-reassign:0*/
                if (!params) {
                    return url;
                }

                var serializedParams;
                if (paramsSerializer) {
                    serializedParams = paramsSerializer(params);
                } else if (utils.isURLSearchParams(params)) {
                    serializedParams = params.toString();
                } else {
                    var parts = [];

                    utils.forEach(params, function serialize(val, key) {
                        if (val === null || typeof val === 'undefined') {
                            return;
                        }

                        if (utils.isArray(val)) {
                            key = key + '[]';
                        } else {
                            val = [val];
                        }

                        utils.forEach(val, function parseValue(v) {
                            if (utils.isDate(v)) {
                                v = v.toISOString();
                            } else if (utils.isObject(v)) {
                                v = JSON.stringify(v);
                            }
                            parts.push(encode(key) + '=' + encode(v));
                        });
                    });

                    serializedParams = parts.join('&');
                }

                if (serializedParams) {
                    var hashmarkIndex = url.indexOf('#');
                    if (hashmarkIndex !== -1) {
                        url = url.slice(0, hashmarkIndex);
                    }

                    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
                }

                return url;
            };


            /***/
        }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            /**
             * Creates a new URL by combining the specified URLs
             *
             * @param {string} baseURL The base URL
             * @param {string} relativeURL The relative URL
             * @returns {string} The combined URL
             */
            module.exports = function combineURLs(baseURL, relativeURL) {
                return relativeURL
                    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
                    : baseURL;
            };


            /***/
        }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

            module.exports = (
                utils.isStandardBrowserEnv() ?

                    // Standard browser envs support document.cookie
                    (function standardBrowserEnv() {
                        return {
                            write: function write(name, value, expires, path, domain, secure) {
                                var cookie = [];
                                cookie.push(name + '=' + encodeURIComponent(value));

                                if (utils.isNumber(expires)) {
                                    cookie.push('expires=' + new Date(expires).toGMTString());
                                }

                                if (utils.isString(path)) {
                                    cookie.push('path=' + path);
                                }

                                if (utils.isString(domain)) {
                                    cookie.push('domain=' + domain);
                                }

                                if (secure === true) {
                                    cookie.push('secure');
                                }

                                document.cookie = cookie.join('; ');
                            },

                            read: function read(name) {
                                var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
                                return (match ? decodeURIComponent(match[3]) : null);
                            },

                            remove: function remove(name) {
                                this.write(name, '', Date.now() - 86400000);
                            }
                        };
                    })() :

                    // Non standard browser env (web workers, react-native) lack needed support.
                    (function nonStandardBrowserEnv() {
                        return {
                            write: function write() { },
                            read: function read() { return null; },
                            remove: function remove() { }
                        };
                    })()
            );


            /***/
        }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            /**
             * Determines whether the specified URL is absolute
             *
             * @param {string} url The URL to test
             * @returns {boolean} True if the specified URL is absolute, otherwise false
             */
            module.exports = function isAbsoluteURL(url) {
                // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
                // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
                // by any combination of letters, digits, plus, period, or hyphen.
                return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
            };


            /***/
        }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

            /**
             * Determines whether the payload is an error thrown by Axios
             *
             * @param {*} payload The value to test
             * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
             */
            module.exports = function isAxiosError(payload) {
                return utils.isObject(payload) && (payload.isAxiosError === true);
            };


            /***/
        }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

            module.exports = (
                utils.isStandardBrowserEnv() ?

                    // Standard browser envs have full support of the APIs needed to test
                    // whether the request URL is of the same origin as current location.
                    (function standardBrowserEnv() {
                        var msie = /(msie|trident)/i.test(navigator.userAgent);
                        var urlParsingNode = document.createElement('a');
                        var originURL;

                        /**
                      * Parse a URL to discover it's components
                      *
                      * @param {String} url The URL to be parsed
                      * @returns {Object}
                      */
                        function resolveURL(url) {
                            var href = url;

                            if (msie) {
                                // IE needs attribute set twice to normalize properties
                                urlParsingNode.setAttribute('href', href);
                                href = urlParsingNode.href;
                            }

                            urlParsingNode.setAttribute('href', href);

                            // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
                            return {
                                href: urlParsingNode.href,
                                protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
                                host: urlParsingNode.host,
                                search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
                                hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
                                hostname: urlParsingNode.hostname,
                                port: urlParsingNode.port,
                                pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                                    urlParsingNode.pathname :
                                    '/' + urlParsingNode.pathname
                            };
                        }

                        originURL = resolveURL(window.location.href);

                        /**
                      * Determine if a URL shares the same origin as the current location
                      *
                      * @param {String} requestURL The URL to test
                      * @returns {boolean} True if URL shares the same origin, otherwise false
                      */
                        return function isURLSameOrigin(requestURL) {
                            var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
                            return (parsed.protocol === originURL.protocol &&
                                parsed.host === originURL.host);
                        };
                    })() :

                    // Non standard browser envs (web workers, react-native) lack needed support.
                    (function nonStandardBrowserEnv() {
                        return function isURLSameOrigin() {
                            return true;
                        };
                    })()
            );


            /***/
        }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

            module.exports = function normalizeHeaderName(headers, normalizedName) {
                utils.forEach(headers, function processHeader(value, name) {
                    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
                        headers[normalizedName] = value;
                        delete headers[name];
                    }
                });
            };


            /***/
        }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

            // Headers whose duplicates are ignored by node
            // c.f. https://nodejs.org/api/http.html#http_message_headers
            var ignoreDuplicateOf = [
                'age', 'authorization', 'content-length', 'content-type', 'etag',
                'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
                'last-modified', 'location', 'max-forwards', 'proxy-authorization',
                'referer', 'retry-after', 'user-agent'
            ];

            /**
             * Parse headers into an object
             *
             * ```
             * Date: Wed, 27 Aug 2014 08:58:49 GMT
             * Content-Type: application/json
             * Connection: keep-alive
             * Transfer-Encoding: chunked
             * ```
             *
             * @param {String} headers Headers needing to be parsed
             * @returns {Object} Headers parsed into an object
             */
            module.exports = function parseHeaders(headers) {
                var parsed = {};
                var key;
                var val;
                var i;

                if (!headers) { return parsed; }

                utils.forEach(headers.split('\n'), function parser(line) {
                    i = line.indexOf(':');
                    key = utils.trim(line.substr(0, i)).toLowerCase();
                    val = utils.trim(line.substr(i + 1));

                    if (key) {
                        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
                            return;
                        }
                        if (key === 'set-cookie') {
                            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
                        } else {
                            parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
                        }
                    }
                });

                return parsed;
            };


            /***/
        }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            /**
             * Syntactic sugar for invoking a function and expanding an array for arguments.
             *
             * Common use case would be to use `Function.prototype.apply`.
             *
             *  ```js
             *  function f(x, y, z) {}
             *  var args = [1, 2, 3];
             *  f.apply(null, args);
             *  ```
             *
             * With `spread` this example can be re-written.
             *
             *  ```js
             *  spread(function(x, y, z) {})([1, 2, 3]);
             *  ```
             *
             * @param {Function} callback
             * @returns {Function}
             */
            module.exports = function spread(callback) {
                return function wrap(arr) {
                    return callback.apply(null, arr);
                };
            };


            /***/
        }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var VERSION = __webpack_require__(/*! ../env/data */ "./node_modules/axios/lib/env/data.js").version;

            var validators = {};

            // eslint-disable-next-line func-names
            ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (type, i) {
                validators[type] = function validator(thing) {
                    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
                };
            });

            var deprecatedWarnings = {};

            /**
             * Transitional option validator
             * @param {function|boolean?} validator - set to false if the transitional option has been removed
             * @param {string?} version - deprecated version / removed since version
             * @param {string?} message - some message with additional info
             * @returns {function}
             */
            validators.transitional = function transitional(validator, version, message) {
                function formatMessage(opt, desc) {
                    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
                }

                // eslint-disable-next-line func-names
                return function (value, opt, opts) {
                    if (validator === false) {
                        throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
                    }

                    if (version && !deprecatedWarnings[opt]) {
                        deprecatedWarnings[opt] = true;
                        // eslint-disable-next-line no-console
                        console.warn(
                            formatMessage(
                                opt,
                                ' has been deprecated since v' + version + ' and will be removed in the near future'
                            )
                        );
                    }

                    return validator ? validator(value, opt, opts) : true;
                };
            };

            /**
             * Assert object's properties type
             * @param {object} options
             * @param {object} schema
             * @param {boolean?} allowUnknown
             */

            function assertOptions(options, schema, allowUnknown) {
                if (typeof options !== 'object') {
                    throw new TypeError('options must be an object');
                }
                var keys = Object.keys(options);
                var i = keys.length;
                while (i-- > 0) {
                    var opt = keys[i];
                    var validator = schema[opt];
                    if (validator) {
                        var value = options[opt];
                        var result = value === undefined || validator(value, opt, options);
                        if (result !== true) {
                            throw new TypeError('option ' + opt + ' must be ' + result);
                        }
                        continue;
                    }
                    if (allowUnknown !== true) {
                        throw Error('Unknown option ' + opt);
                    }
                }
            }

            module.exports = {
                assertOptions: assertOptions,
                validators: validators
            };


            /***/
        }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

            // utils is a library of generic helper functions non-specific to axios

            var toString = Object.prototype.toString;

            /**
             * Determine if a value is an Array
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is an Array, otherwise false
             */
            function isArray(val) {
                return Array.isArray(val);
            }

            /**
             * Determine if a value is undefined
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if the value is undefined, otherwise false
             */
            function isUndefined(val) {
                return typeof val === 'undefined';
            }

            /**
             * Determine if a value is a Buffer
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is a Buffer, otherwise false
             */
            function isBuffer(val) {
                return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
                    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
            }

            /**
             * Determine if a value is an ArrayBuffer
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is an ArrayBuffer, otherwise false
             */
            function isArrayBuffer(val) {
                return toString.call(val) === '[object ArrayBuffer]';
            }

            /**
             * Determine if a value is a FormData
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is an FormData, otherwise false
             */
            function isFormData(val) {
                return toString.call(val) === '[object FormData]';
            }

            /**
             * Determine if a value is a view on an ArrayBuffer
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
             */
            function isArrayBufferView(val) {
                var result;
                if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
                    result = ArrayBuffer.isView(val);
                } else {
                    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
                }
                return result;
            }

            /**
             * Determine if a value is a String
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is a String, otherwise false
             */
            function isString(val) {
                return typeof val === 'string';
            }

            /**
             * Determine if a value is a Number
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is a Number, otherwise false
             */
            function isNumber(val) {
                return typeof val === 'number';
            }

            /**
             * Determine if a value is an Object
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is an Object, otherwise false
             */
            function isObject(val) {
                return val !== null && typeof val === 'object';
            }

            /**
             * Determine if a value is a plain Object
             *
             * @param {Object} val The value to test
             * @return {boolean} True if value is a plain Object, otherwise false
             */
            function isPlainObject(val) {
                if (toString.call(val) !== '[object Object]') {
                    return false;
                }

                var prototype = Object.getPrototypeOf(val);
                return prototype === null || prototype === Object.prototype;
            }

            /**
             * Determine if a value is a Date
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is a Date, otherwise false
             */
            function isDate(val) {
                return toString.call(val) === '[object Date]';
            }

            /**
             * Determine if a value is a File
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is a File, otherwise false
             */
            function isFile(val) {
                return toString.call(val) === '[object File]';
            }

            /**
             * Determine if a value is a Blob
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is a Blob, otherwise false
             */
            function isBlob(val) {
                return toString.call(val) === '[object Blob]';
            }

            /**
             * Determine if a value is a Function
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is a Function, otherwise false
             */
            function isFunction(val) {
                return toString.call(val) === '[object Function]';
            }

            /**
             * Determine if a value is a Stream
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is a Stream, otherwise false
             */
            function isStream(val) {
                return isObject(val) && isFunction(val.pipe);
            }

            /**
             * Determine if a value is a URLSearchParams object
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is a URLSearchParams object, otherwise false
             */
            function isURLSearchParams(val) {
                return toString.call(val) === '[object URLSearchParams]';
            }

            /**
             * Trim excess whitespace off the beginning and end of a string
             *
             * @param {String} str The String to trim
             * @returns {String} The String freed of excess whitespace
             */
            function trim(str) {
                return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
            }

            /**
             * Determine if we're running in a standard browser environment
             *
             * This allows axios to run in a web worker, and react-native.
             * Both environments support XMLHttpRequest, but not fully standard globals.
             *
             * web workers:
             *  typeof window -> undefined
             *  typeof document -> undefined
             *
             * react-native:
             *  navigator.product -> 'ReactNative'
             * nativescript
             *  navigator.product -> 'NativeScript' or 'NS'
             */
            function isStandardBrowserEnv() {
                if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                    navigator.product === 'NativeScript' ||
                    navigator.product === 'NS')) {
                    return false;
                }
                return (
                    typeof window !== 'undefined' &&
                    typeof document !== 'undefined'
                );
            }

            /**
             * Iterate over an Array or an Object invoking a function for each item.
             *
             * If `obj` is an Array callback will be called passing
             * the value, index, and complete array for each item.
             *
             * If 'obj' is an Object callback will be called passing
             * the value, key, and complete object for each property.
             *
             * @param {Object|Array} obj The object to iterate
             * @param {Function} fn The callback to invoke for each item
             */
            function forEach(obj, fn) {
                // Don't bother if no value provided
                if (obj === null || typeof obj === 'undefined') {
                    return;
                }

                // Force an array if not already something iterable
                if (typeof obj !== 'object') {
                    /*eslint no-param-reassign:0*/
                    obj = [obj];
                }

                if (isArray(obj)) {
                    // Iterate over array values
                    for (var i = 0, l = obj.length; i < l; i++) {
                        fn.call(null, obj[i], i, obj);
                    }
                } else {
                    // Iterate over object keys
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key)) {
                            fn.call(null, obj[key], key, obj);
                        }
                    }
                }
            }

            /**
             * Accepts varargs expecting each argument to be an object, then
             * immutably merges the properties of each object and returns result.
             *
             * When multiple objects contain the same key the later object in
             * the arguments list will take precedence.
             *
             * Example:
             *
             * ```js
             * var result = merge({foo: 123}, {foo: 456});
             * console.log(result.foo); // outputs 456
             * ```
             *
             * @param {Object} obj1 Object to merge
             * @returns {Object} Result of all merge properties
             */
            function merge(/* obj1, obj2, obj3, ... */) {
                var result = {};
                function assignValue(val, key) {
                    if (isPlainObject(result[key]) && isPlainObject(val)) {
                        result[key] = merge(result[key], val);
                    } else if (isPlainObject(val)) {
                        result[key] = merge({}, val);
                    } else if (isArray(val)) {
                        result[key] = val.slice();
                    } else {
                        result[key] = val;
                    }
                }

                for (var i = 0, l = arguments.length; i < l; i++) {
                    forEach(arguments[i], assignValue);
                }
                return result;
            }

            /**
             * Extends object a by mutably adding to it the properties of object b.
             *
             * @param {Object} a The object to be extended
             * @param {Object} b The object to copy properties from
             * @param {Object} thisArg The object to bind function to
             * @return {Object} The resulting value of object a
             */
            function extend(a, b, thisArg) {
                forEach(b, function assignValue(val, key) {
                    if (thisArg && typeof val === 'function') {
                        a[key] = bind(val, thisArg);
                    } else {
                        a[key] = val;
                    }
                });
                return a;
            }

            /**
             * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
             *
             * @param {string} content with BOM
             * @return {string} content value without BOM
             */
            function stripBOM(content) {
                if (content.charCodeAt(0) === 0xFEFF) {
                    content = content.slice(1);
                }
                return content;
            }

            module.exports = {
                isArray: isArray,
                isArrayBuffer: isArrayBuffer,
                isBuffer: isBuffer,
                isFormData: isFormData,
                isArrayBufferView: isArrayBufferView,
                isString: isString,
                isNumber: isNumber,
                isObject: isObject,
                isPlainObject: isPlainObject,
                isUndefined: isUndefined,
                isDate: isDate,
                isFile: isFile,
                isBlob: isBlob,
                isFunction: isFunction,
                isStream: isStream,
                isURLSearchParams: isURLSearchParams,
                isStandardBrowserEnv: isStandardBrowserEnv,
                forEach: forEach,
                merge: merge,
                extend: extend,
                trim: trim,
                stripBOM: stripBOM
            };


            /***/
        }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function (module, exports) {

            // shim for using process in browser
            var process = module.exports = {};

            // cached from whatever global is present so that test runners that stub it
            // don't break things.  But we need to wrap it in a try catch in case it is
            // wrapped in strict mode code which doesn't define any globals.  It's inside a
            // function because try/catches deoptimize in certain engines.

            var cachedSetTimeout;
            var cachedClearTimeout;

            function defaultSetTimout() {
                throw new Error('setTimeout has not been defined');
            }
            function defaultClearTimeout() {
                throw new Error('clearTimeout has not been defined');
            }
            (function () {
                try {
                    if (typeof setTimeout === 'function') {
                        cachedSetTimeout = setTimeout;
                    } else {
                        cachedSetTimeout = defaultSetTimout;
                    }
                } catch (e) {
                    cachedSetTimeout = defaultSetTimout;
                }
                try {
                    if (typeof clearTimeout === 'function') {
                        cachedClearTimeout = clearTimeout;
                    } else {
                        cachedClearTimeout = defaultClearTimeout;
                    }
                } catch (e) {
                    cachedClearTimeout = defaultClearTimeout;
                }
            }())
            function runTimeout(fun) {
                if (cachedSetTimeout === setTimeout) {
                    //normal enviroments in sane situations
                    return setTimeout(fun, 0);
                }
                // if setTimeout wasn't available but was latter defined
                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                    cachedSetTimeout = setTimeout;
                    return setTimeout(fun, 0);
                }
                try {
                    // when when somebody has screwed with setTimeout but no I.E. maddness
                    return cachedSetTimeout(fun, 0);
                } catch (e) {
                    try {
                        // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                        return cachedSetTimeout.call(null, fun, 0);
                    } catch (e) {
                        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                        return cachedSetTimeout.call(this, fun, 0);
                    }
                }


            }
            function runClearTimeout(marker) {
                if (cachedClearTimeout === clearTimeout) {
                    //normal enviroments in sane situations
                    return clearTimeout(marker);
                }
                // if clearTimeout wasn't available but was latter defined
                if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                    cachedClearTimeout = clearTimeout;
                    return clearTimeout(marker);
                }
                try {
                    // when when somebody has screwed with setTimeout but no I.E. maddness
                    return cachedClearTimeout(marker);
                } catch (e) {
                    try {
                        // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                        return cachedClearTimeout.call(null, marker);
                    } catch (e) {
                        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                        // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                        return cachedClearTimeout.call(this, marker);
                    }
                }



            }
            var queue = [];
            var draining = false;
            var currentQueue;
            var queueIndex = -1;

            function cleanUpNextTick() {
                if (!draining || !currentQueue) {
                    return;
                }
                draining = false;
                if (currentQueue.length) {
                    queue = currentQueue.concat(queue);
                } else {
                    queueIndex = -1;
                }
                if (queue.length) {
                    drainQueue();
                }
            }

            function drainQueue() {
                if (draining) {
                    return;
                }
                var timeout = runTimeout(cleanUpNextTick);
                draining = true;

                var len = queue.length;
                while (len) {
                    currentQueue = queue;
                    queue = [];
                    while (++queueIndex < len) {
                        if (currentQueue) {
                            currentQueue[queueIndex].run();
                        }
                    }
                    queueIndex = -1;
                    len = queue.length;
                }
                currentQueue = null;
                draining = false;
                runClearTimeout(timeout);
            }

            process.nextTick = function (fun) {
                var args = new Array(arguments.length - 1);
                if (arguments.length > 1) {
                    for (var i = 1; i < arguments.length; i++) {
                        args[i - 1] = arguments[i];
                    }
                }
                queue.push(new Item(fun, args));
                if (queue.length === 1 && !draining) {
                    runTimeout(drainQueue);
                }
            };

            // v8 likes predictible objects
            function Item(fun, array) {
                this.fun = fun;
                this.array = array;
            }
            Item.prototype.run = function () {
                this.fun.apply(null, this.array);
            };
            process.title = 'browser';
            process.browser = true;
            process.env = {};
            process.argv = [];
            process.version = ''; // empty string to avoid regexp issues
            process.versions = {};

            function noop() { }

            process.on = noop;
            process.addListener = noop;
            process.once = noop;
            process.off = noop;
            process.removeListener = noop;
            process.removeAllListeners = noop;
            process.emit = noop;
            process.prependListener = noop;
            process.prependOnceListener = noop;

            process.listeners = function (name) { return [] }

            process.binding = function (name) {
                throw new Error('process.binding is not supported');
            };

            process.cwd = function () { return '/' };
            process.chdir = function (dir) {
                throw new Error('process.chdir is not supported');
            };
            process.umask = function () { return 0; };


            /***/
        }),

/***/ "./node_modules/uuid/dist/esm-browser/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/index.js ***!
  \*****************************************************/
/*! exports provided: v1, v3, v4, v5, NIL, version, validate, stringify, parse */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v1.js */ "./node_modules/uuid/dist/esm-browser/v1.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v1", function () { return _v1_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _v3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v3.js */ "./node_modules/uuid/dist/esm-browser/v3.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v3", function () { return _v3_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _v4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./v4.js */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v4", function () { return _v4_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _v5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v5.js */ "./node_modules/uuid/dist/esm-browser/v5.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v5", function () { return _v5_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _nil_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nil.js */ "./node_modules/uuid/dist/esm-browser/nil.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NIL", function () { return _nil_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./version.js */ "./node_modules/uuid/dist/esm-browser/version.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "version", function () { return _version_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validate", function () { return _validate_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringify", function () { return _stringify_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./parse.js */ "./node_modules/uuid/dist/esm-browser/parse.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parse", function () { return _parse_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });











            /***/
        }),

/***/ "./node_modules/uuid/dist/esm-browser/md5.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/md5.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /*
             * Browser-compatible JavaScript MD5
             *
             * Modification of JavaScript MD5
             * https://github.com/blueimp/JavaScript-MD5
             *
             * Copyright 2011, Sebastian Tschan
             * https://blueimp.net
             *
             * Licensed under the MIT license:
             * https://opensource.org/licenses/MIT
             *
             * Based on
             * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
             * Digest Algorithm, as defined in RFC 1321.
             * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
             * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
             * Distributed under the BSD License
             * See http://pajhome.org.uk/crypt/md5 for more info.
             */
            function md5(bytes) {
                if (typeof bytes === 'string') {
                    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

                    bytes = new Uint8Array(msg.length);

                    for (var i = 0; i < msg.length; ++i) {
                        bytes[i] = msg.charCodeAt(i);
                    }
                }

                return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
            }
            /*
             * Convert an array of little-endian words to an array of bytes
             */


            function md5ToHexEncodedArray(input) {
                var output = [];
                var length32 = input.length * 32;
                var hexTab = '0123456789abcdef';

                for (var i = 0; i < length32; i += 8) {
                    var x = input[i >> 5] >>> i % 32 & 0xff;
                    var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
                    output.push(hex);
                }

                return output;
            }
            /**
             * Calculate output length with padding and bit length
             */


            function getOutputLength(inputLength8) {
                return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
            }
            /*
             * Calculate the MD5 of an array of little-endian words, and a bit length.
             */


            function wordsToMd5(x, len) {
                /* append padding */
                x[len >> 5] |= 0x80 << len % 32;
                x[getOutputLength(len) - 1] = len;
                var a = 1732584193;
                var b = -271733879;
                var c = -1732584194;
                var d = 271733878;

                for (var i = 0; i < x.length; i += 16) {
                    var olda = a;
                    var oldb = b;
                    var oldc = c;
                    var oldd = d;
                    a = md5ff(a, b, c, d, x[i], 7, -680876936);
                    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
                    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
                    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
                    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
                    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
                    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
                    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
                    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
                    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
                    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
                    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
                    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
                    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
                    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
                    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
                    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
                    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
                    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
                    b = md5gg(b, c, d, a, x[i], 20, -373897302);
                    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
                    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
                    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
                    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
                    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
                    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
                    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
                    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
                    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
                    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
                    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
                    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
                    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
                    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
                    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
                    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
                    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
                    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
                    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
                    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
                    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
                    d = md5hh(d, a, b, c, x[i], 11, -358537222);
                    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
                    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
                    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
                    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
                    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
                    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
                    a = md5ii(a, b, c, d, x[i], 6, -198630844);
                    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
                    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
                    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
                    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
                    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
                    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
                    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
                    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
                    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
                    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
                    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
                    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
                    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
                    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
                    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
                    a = safeAdd(a, olda);
                    b = safeAdd(b, oldb);
                    c = safeAdd(c, oldc);
                    d = safeAdd(d, oldd);
                }

                return [a, b, c, d];
            }
            /*
             * Convert an array bytes to an array of little-endian words
             * Characters >255 have their high-byte silently ignored.
             */


            function bytesToWords(input) {
                if (input.length === 0) {
                    return [];
                }

                var length8 = input.length * 8;
                var output = new Uint32Array(getOutputLength(length8));

                for (var i = 0; i < length8; i += 8) {
                    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
                }

                return output;
            }
            /*
             * Add integers, wrapping at 2^32. This uses 16-bit operations internally
             * to work around bugs in some JS interpreters.
             */


            function safeAdd(x, y) {
                var lsw = (x & 0xffff) + (y & 0xffff);
                var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                return msw << 16 | lsw & 0xffff;
            }
            /*
             * Bitwise rotate a 32-bit number to the left.
             */


            function bitRotateLeft(num, cnt) {
                return num << cnt | num >>> 32 - cnt;
            }
            /*
             * These functions implement the four basic operations the algorithm uses.
             */


            function md5cmn(q, a, b, x, s, t) {
                return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
            }

            function md5ff(a, b, c, d, x, s, t) {
                return md5cmn(b & c | ~b & d, a, b, x, s, t);
            }

            function md5gg(a, b, c, d, x, s, t) {
                return md5cmn(b & d | c & ~d, a, b, x, s, t);
            }

            function md5hh(a, b, c, d, x, s, t) {
                return md5cmn(b ^ c ^ d, a, b, x, s, t);
            }

            function md5ii(a, b, c, d, x, s, t) {
                return md5cmn(c ^ (b | ~d), a, b, x, s, t);
            }

/* harmony default export */ __webpack_exports__["default"] = (md5);

            /***/
        }),

/***/ "./node_modules/uuid/dist/esm-browser/nil.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/nil.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ('00000000-0000-0000-0000-000000000000');

            /***/
        }),

/***/ "./node_modules/uuid/dist/esm-browser/parse.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/parse.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");


            function parse(uuid) {
                if (!Object(_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
                    throw TypeError('Invalid UUID');
                }

                var v;
                var arr = new Uint8Array(16); // Parse ########-....-....-....-............

                arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
                arr[1] = v >>> 16 & 0xff;
                arr[2] = v >>> 8 & 0xff;
                arr[3] = v & 0xff; // Parse ........-####-....-....-............

                arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
                arr[5] = v & 0xff; // Parse ........-....-####-....-............

                arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
                arr[7] = v & 0xff; // Parse ........-....-....-####-............

                arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
                arr[9] = v & 0xff; // Parse ........-....-....-....-############
                // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

                arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
                arr[11] = v / 0x100000000 & 0xff;
                arr[12] = v >>> 24 & 0xff;
                arr[13] = v >>> 16 & 0xff;
                arr[14] = v >>> 8 & 0xff;
                arr[15] = v & 0xff;
                return arr;
            }

/* harmony default export */ __webpack_exports__["default"] = (parse);

            /***/
        }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

            /***/
        }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function () { return rng; });
            // Unique ID creation requires a high quality random # generator. In the browser we therefore
            // require the crypto API and do not support built-in fallback to lower quality random number
            // generators (like Math.random()).
            var getRandomValues;
            var rnds8 = new Uint8Array(16);
            function rng() {
                // lazy load so that environments that need to polyfill have a chance to do so
                if (!getRandomValues) {
                    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
                    // find the complete implementation of crypto (msCrypto) on IE11.
                    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

                    if (!getRandomValues) {
                        throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
                    }
                }

                return getRandomValues(rnds8);
            }

            /***/
        }),

/***/ "./node_modules/uuid/dist/esm-browser/sha1.js":
/*!****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/sha1.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            // Adapted from Chris Veness' SHA1 code at
            // http://www.movable-type.co.uk/scripts/sha1.html
            function f(s, x, y, z) {
                switch (s) {
                    case 0:
                        return x & y ^ ~x & z;

                    case 1:
                        return x ^ y ^ z;

                    case 2:
                        return x & y ^ x & z ^ y & z;

                    case 3:
                        return x ^ y ^ z;
                }
            }

            function ROTL(x, n) {
                return x << n | x >>> 32 - n;
            }

            function sha1(bytes) {
                var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
                var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

                if (typeof bytes === 'string') {
                    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

                    bytes = [];

                    for (var i = 0; i < msg.length; ++i) {
                        bytes.push(msg.charCodeAt(i));
                    }
                } else if (!Array.isArray(bytes)) {
                    // Convert Array-like to Array
                    bytes = Array.prototype.slice.call(bytes);
                }

                bytes.push(0x80);
                var l = bytes.length / 4 + 2;
                var N = Math.ceil(l / 16);
                var M = new Array(N);

                for (var _i = 0; _i < N; ++_i) {
                    var arr = new Uint32Array(16);

                    for (var j = 0; j < 16; ++j) {
                        arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
                    }

                    M[_i] = arr;
                }

                M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
                M[N - 1][14] = Math.floor(M[N - 1][14]);
                M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

                for (var _i2 = 0; _i2 < N; ++_i2) {
                    var W = new Uint32Array(80);

                    for (var t = 0; t < 16; ++t) {
                        W[t] = M[_i2][t];
                    }

                    for (var _t = 16; _t < 80; ++_t) {
                        W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
                    }

                    var a = H[0];
                    var b = H[1];
                    var c = H[2];
                    var d = H[3];
                    var e = H[4];

                    for (var _t2 = 0; _t2 < 80; ++_t2) {
                        var s = Math.floor(_t2 / 20);
                        var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
                        e = d;
                        d = c;
                        c = ROTL(b, 30) >>> 0;
                        b = a;
                        a = T;
                    }

                    H[0] = H[0] + a >>> 0;
                    H[1] = H[1] + b >>> 0;
                    H[2] = H[2] + c >>> 0;
                    H[3] = H[3] + d >>> 0;
                    H[4] = H[4] + e >>> 0;
                }

                return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
            }

/* harmony default export */ __webpack_exports__["default"] = (sha1);

            /***/
        }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

            /**
             * Convert array of 16 byte values to UUID string format of the form:
             * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
             */

            var byteToHex = [];

            for (var i = 0; i < 256; ++i) {
                byteToHex.push((i + 0x100).toString(16).substr(1));
            }

            function stringify(arr) {
                var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                // Note: Be careful editing this code!  It's been tuned for performance
                // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
                var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
                // of the following:
                // - One or more input array values don't map to a hex octet (leading to
                // "undefined" in the uuid)
                // - Invalid input values for the RFC `version` or `variant` fields

                if (!Object(_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
                    throw TypeError('Stringified UUID is invalid');
                }

                return uuid;
            }

/* harmony default export */ __webpack_exports__["default"] = (stringify);

            /***/
        }),

/***/ "./node_modules/uuid/dist/esm-browser/v1.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v1.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");

            // **`v1()` - Generate time-based UUID**
            //
            // Inspired by https://github.com/LiosK/UUID.js
            // and http://docs.python.org/library/uuid.html

            var _nodeId;

            var _clockseq; // Previous uuid creation time


            var _lastMSecs = 0;
            var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

            function v1(options, buf, offset) {
                var i = buf && offset || 0;
                var b = buf || new Array(16);
                options = options || {};
                var node = options.node || _nodeId;
                var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
                // specified.  We do this lazily to minimize issues related to insufficient
                // system entropy.  See #189

                if (node == null || clockseq == null) {
                    var seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

                    if (node == null) {
                        // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
                        node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
                    }

                    if (clockseq == null) {
                        // Per 4.2.2, randomize (14 bit) clockseq
                        clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
                    }
                } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
                // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
                // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
                // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


                var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
                // cycle to simulate higher resolution clock

                var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

                var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

                if (dt < 0 && options.clockseq === undefined) {
                    clockseq = clockseq + 1 & 0x3fff;
                } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
                // time interval


                if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
                    nsecs = 0;
                } // Per 4.2.1.2 Throw error if too many uuids are requested


                if (nsecs >= 10000) {
                    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
                }

                _lastMSecs = msecs;
                _lastNSecs = nsecs;
                _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

                msecs += 12219292800000; // `time_low`

                var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
                b[i++] = tl >>> 24 & 0xff;
                b[i++] = tl >>> 16 & 0xff;
                b[i++] = tl >>> 8 & 0xff;
                b[i++] = tl & 0xff; // `time_mid`

                var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
                b[i++] = tmh >>> 8 & 0xff;
                b[i++] = tmh & 0xff; // `time_high_and_version`

                b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

                b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

                b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

                b[i++] = clockseq & 0xff; // `node`

                for (var n = 0; n < 6; ++n) {
                    b[i + n] = node[n];
                }

                return buf || Object(_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b);
            }

/* harmony default export */ __webpack_exports__["default"] = (v1);

            /***/
        }),

/***/ "./node_modules/uuid/dist/esm-browser/v3.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v3.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _md5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./md5.js */ "./node_modules/uuid/dist/esm-browser/md5.js");


            var v3 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v3', 0x30, _md5_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (v3);

            /***/
        }),

/***/ "./node_modules/uuid/dist/esm-browser/v35.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v35.js ***!
  \***************************************************/
/*! exports provided: DNS, URL, default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DNS", function () { return DNS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL", function () { return URL; });
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse.js */ "./node_modules/uuid/dist/esm-browser/parse.js");



            function stringToBytes(str) {
                str = unescape(encodeURIComponent(str)); // UTF8 escape

                var bytes = [];

                for (var i = 0; i < str.length; ++i) {
                    bytes.push(str.charCodeAt(i));
                }

                return bytes;
            }

            var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
            var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
/* harmony default export */ __webpack_exports__["default"] = (function (name, version, hashfunc) {
                function generateUUID(value, namespace, buf, offset) {
                    if (typeof value === 'string') {
                        value = stringToBytes(value);
                    }

                    if (typeof namespace === 'string') {
                        namespace = Object(_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"])(namespace);
                    }

                    if (namespace.length !== 16) {
                        throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
                    } // Compute hash of namespace and value, Per 4.3
                    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
                    // hashfunc([...namespace, ... value])`


                    var bytes = new Uint8Array(16 + value.length);
                    bytes.set(namespace);
                    bytes.set(value, namespace.length);
                    bytes = hashfunc(bytes);
                    bytes[6] = bytes[6] & 0x0f | version;
                    bytes[8] = bytes[8] & 0x3f | 0x80;

                    if (buf) {
                        offset = offset || 0;

                        for (var i = 0; i < 16; ++i) {
                            buf[offset + i] = bytes[i];
                        }

                        return buf;
                    }

                    return Object(_stringify_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bytes);
                } // Function#name is not settable on some platforms (#270)


                try {
                    generateUUID.name = name; // eslint-disable-next-line no-empty
                } catch (err) { } // For CommonJS default export support


                generateUUID.DNS = DNS;
                generateUUID.URL = URL;
                return generateUUID;
            });

            /***/
        }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");



            function v4(options, buf, offset) {
                options = options || {};
                var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

                rnds[6] = rnds[6] & 0x0f | 0x40;
                rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

                if (buf) {
                    offset = offset || 0;

                    for (var i = 0; i < 16; ++i) {
                        buf[offset + i] = rnds[i];
                    }

                    return buf;
                }

                return Object(_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
            }

/* harmony default export */ __webpack_exports__["default"] = (v4);

            /***/
        }),

/***/ "./node_modules/uuid/dist/esm-browser/v5.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v5.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _sha1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sha1.js */ "./node_modules/uuid/dist/esm-browser/sha1.js");


            var v5 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v5', 0x50, _sha1_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (v5);

            /***/
        }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


            function validate(uuid) {
                return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
            }

/* harmony default export */ __webpack_exports__["default"] = (validate);

            /***/
        }),

/***/ "./node_modules/uuid/dist/esm-browser/version.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/version.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");


            function version(uuid) {
                if (!Object(_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
                    throw TypeError('Invalid UUID');
                }

                return parseInt(uuid.substr(14, 1), 16);
            }

/* harmony default export */ __webpack_exports__["default"] = (version);

            /***/
        }),

/***/ "./src/scripts/components/_forms.ts":
/*!******************************************!*\
  !*** ./src/scripts/components/_forms.ts ***!
  \******************************************/
/*! exports provided: showCreateForm, closeCreateForm, createFile, showUploadForm, closeUploadForm, uploadFile, showUpdateForm, closeUpdateForm, updateFile, deleteFile */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showCreateForm", function () { return showCreateForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeCreateForm", function () { return closeCreateForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFile", function () { return createFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showUploadForm", function () { return showUploadForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeUploadForm", function () { return closeUploadForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uploadFile", function () { return uploadFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showUpdateForm", function () { return showUpdateForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeUpdateForm", function () { return closeUpdateForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateFile", function () { return updateFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteFile", function () { return deleteFile; });
/* harmony import */ var _models_file__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/file */ "./src/scripts/models/file.ts");
/* harmony import */ var _models_folder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/folder */ "./src/scripts/models/folder.ts");



            const {
                v4: uuidv4
            } = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");

            const axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js").default;

            let idRow;
            function showCreateForm() {
                const createBtn = document.getElementById("createFormBtn");

                if (createBtn) {
                    createBtn.addEventListener("click", function (e) {
                        e.preventDefault();
                        document.getElementById('formCreateFolder').style.display = 'block';
                        document.getElementById('createFormButton').disabled = true;
                    }, true);
                }
            }
            function closeCreateForm() {
                const createBtnClose = document.getElementById("closeCreateFormBtn");

                if (createBtnClose) {
                    createBtnClose.addEventListener("click", function (e) {
                        e.preventDefault;
                        document.getElementById('formCreateFolder').style.display = 'none';
                    }, true);
                }
            }
            function createFile(a) {
                const createBtn = document.getElementById("createFormButton");
                let dateTime = new Date();

                if (createBtn) {
                    createBtn.addEventListener("click", function (e) {
                        e.preventDefault();
                        let uploadFileName = document.getElementById('createFormInput');

                        if (uploadFileName) {
                            //console.log(uploadFileName);
                            const element = uploadFileName;
                            const newFile = new _models_folder__WEBPACK_IMPORTED_MODULE_1__["Folder"](uuidv4(), uploadFileName.value, '', dateTime, "Admin", dateTime, "Admin");
                            a.upload(newFile);
                            document.getElementById('formCreateFolder').style.display = 'none';
                        } //window.location.reload();

                    }, true);
                }
            } //upload form

            function showUploadForm() {
                const uploadBtn = document.getElementById("uploadFormBtn");

                if (uploadBtn) {
                    uploadBtn.addEventListener("click", function (e) {
                        e.preventDefault();
                        document.getElementById('formUploadFolder').style.display = 'block';
                        document.getElementById('uploadFormButton').disabled = true;
                    }, true);
                }
            }
            function closeUploadForm() {
                const uploadBtn = document.getElementById("closeUploadFormBtn");

                if (uploadBtn) {
                    uploadBtn.addEventListener("click", function (e) {
                        e.preventDefault();
                        document.getElementById('formUploadFolder').style.display = 'none';
                    }, true);
                }
            }

            function getExtension(fileName) {
                const [file, extesion] = fileName.split(".");
                return extesion;
            }

            function uploadFile(a) {
                const uploadBtn = document.getElementById("uploadFormButton");
                let dateTime = new Date();

                if (uploadBtn) {
                    uploadBtn.addEventListener("click", function (e) {
                        e.preventDefault();
                        let uploadFileName = document.getElementById('uploadFormInput').files;

                        if (uploadFileName) {
                            //console.log(uploadFileName);
                            for (let index = 0; index < uploadFileName.length; index++) {
                                const element = uploadFileName[index];
                                const newFile = new _models_file__WEBPACK_IMPORTED_MODULE_0__["File"](uuidv4(), element.name, getExtension(element.name), dateTime, "Admin", dateTime, "Admin");
                                a.upload(newFile);
                                document.getElementById('formUploadFolder').style.display = 'none';
                            }
                        } //window.location.reload();               

                    }, true);
                }
            } //update form

            function showUpdateForm(a) {
                a.forEach((item, index) => {
                    let updateBtn = document.getElementById(`editFileBtn-${index}`);
                    updateBtn.addEventListener("click", () => {
                        idRow = item.fileId;
                        console.log(idRow);
                        document.getElementById('formUpdateFolder').style.display = 'block';
                        let tmp = item.name.split(".");
                        document.getElementById('updateFormInput').value = tmp[0];
                    });
                });
            }
            function closeUpdateForm() {
                const uploadBtn = document.getElementById("closeUpdateFormBtn");

                if (uploadBtn) {
                    uploadBtn.addEventListener("click", function (e) {
                        e.preventDefault();
                        document.getElementById('formUpdateFolder').style.display = 'none';
                    }, true);
                }
            }
            function updateFile(a) {
                let updateBtn = document.getElementById("updateFormButton");
                const input = document.querySelector("#updateFormInput");

                if (updateBtn) {
                    updateBtn.addEventListener("click", function (e) {
                        e.preventDefault();

                        if (input && idRow) {
                            console.log("start update");
                            a.edit(idRow, input.value);
                        } //setTimeout(window.location.reload, 10)
                        //window.location.reload();


                        document.getElementById('formUpdateFolder').style.display = 'none';
                    }, true);
                }
            }
            function deleteFile(a) {
                console.log("Join Delete file");
                let deleteBtn = document.getElementById("deleteFormButton");

                if (deleteBtn) {
                    deleteBtn.addEventListener("click", function (e) {
                        e.preventDefault();

                        if (idRow) {
                            console.log(idRow);
                            a.delete(idRow);
                        }

                        window.location.reload();
                        document.getElementById('formUpdateFolder').style.display = 'none';
                    }, true);
                }
            }

            /***/
        }),

/***/ "./src/scripts/components/_grid.ts":
/*!*****************************************!*\
  !*** ./src/scripts/components/_grid.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            const renderGrid = () => {// TODO: implement code to Render grid
            };

/* harmony default export */ __webpack_exports__["default"] = (renderGrid);

            /***/
        }),

/***/ "./src/scripts/models/FileAndFolderList.ts":
/*!*************************************************!*\
  !*** ./src/scripts/models/FileAndFolderList.ts ***!
  \*************************************************/
/*! exports provided: FileAndFolderList */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileAndFolderList", function () { return FileAndFolderList; });
/* harmony import */ var _components_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/_forms */ "./src/scripts/components/_forms.ts");


            const axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

            var iconForFileType;

            (function (iconForFileType) {
                iconForFileType["xlsx"] = "file-excel";
                iconForFileType["jpeg"] = "file-image";
                iconForFileType["folder"] = "folder";
                iconForFileType["file"] = "file";
                iconForFileType["pdf"] = "file-pdf";
                iconForFileType["doc"] = "file-word";
            })(iconForFileType || (iconForFileType = {}));

            ;
            class FileAndFolderList {
                constructor() {
                    let a = this.setData();
                    this.data = a;
                }

                setData() {
                    //let dataInStorage = localStorage.getItem('fileListData')
                    //console.log("setData ne nhen t vo r a");
                    axios.get('https://localhost:44300/api/Files').then(function (response) {
                        // handle success
                        //console.log("response");
                        //console.log(response.data);
                        return response.data;
                    }).catch(function (error) {
                        // handle error
                        console.log(error);
                    });
                    return [];
                }

                getData() {
                    //console.log("Han han get data");
                    const a = this.data;
                    return a;
                }

                showListForTable() {
                    let tbody = document.getElementById('tbodyDataFileList');
                    let _tr = '';
                    let index = 0;
                    let t = new Array();
                    axios.get('https://localhost:44300/api/Files').then(response => {
                        // handle success
                        this.data = response.data;
                        this.data.forEach(element => {
                            let icon;
                            if (element.extension === 'xlsx') icon = iconForFileType.xlsx; else if (element.extension === 'doc' || element.extension === 'docx') icon = iconForFileType.doc; else if (element.extension === 'jpg' || element.extension === 'jpeg' || element.extension === 'png') icon = iconForFileType.jpeg; else if (element.extension === 'pdf') icon = iconForFileType.pdf; else if (element.extension === '') icon = iconForFileType.folder; else icon = iconForFileType.file;
                            _tr += `
                    <tr id="${element.FileId}">
                        <td data-label="File Type"><i class="fa-solid fa-${icon}"></i></td>
                        <td data-label="Name" class="row-data"><i class="fa-solid fa-pen fa-2xs" id="editFileBtn-${index}" style="color: gray;"></i><span class="new-item"><i
                        class="fa-brands fa-yelp"></i></span> ${element.name} </td>
                        <td data-label="Modified At" class="row-data td-second">${element.modifiedAt}</td>
                        <td data-label="Modified By" class="row-data td-second"> ${element.modifiedBy}</td>
                        <td data-label="Created At" class="row-data td-second">${element.createAt}</td>
                        <td data-label="Created By" class="row-data td-second"> ${element.createBy}</td>
                        <td class="hidden-style"></td>
                    </tr>
                        `;
                            index++;
                        });
                        tbody.innerHTML = _tr;
                        console.log("Show table success");
                        t = this.data;
                    }).catch(function (error) {
                        // handle error
                        console.log(error);
                    }).then(function () {
                        Object(_components_forms__WEBPACK_IMPORTED_MODULE_0__["showUpdateForm"])(t);
                    });
                }

                upload(file) {
                    this.data.push(file); //localStorage.setItem("fileListData", JSON.stringify(this.data))

                    axios.post('https://localhost:44300/api/Files', file).then(function (response) {
                        //console.log("Da thanh cong: response");
                        //console.log(response);
                        window.location.reload();
                    }).catch(function (error) {
                        console.log(error);
                    });
                    this.showListForTable();
                }

                delete(id) {
                    // let index = this.data.findIndex(function (obj) {
                    //     return obj.FileId == id;
                    // })
                    // this.data.splice(index, 1)
                    // let JSONdata = JSON.stringify(this.data);
                    // localStorage.setItem('fileListData', JSONdata)
                    console.log("id");
                    console.log(id);
                    axios.delete('https://localhost:44300/api/Files/' + id).then(function () {
                        // always executed
                        console.log("delete success");
                    });
                    this.showListForTable();
                }

                edit(id, name) {
                    console.log(name);
                    console.log(id);
                    let newFile;
                    axios.get('https://localhost:44300/api/Files/' + id).then(function (response) {
                        //console.log("Da thanh cong: response");
                        console.log(response);
                        newFile = response.data;
                        newFile.name = name;
                        newFile.modifiedAt = new Date();
                    }).then(function () {
                        axios.put('https://localhost:44300/api/Files/' + id, newFile).then(function (response) {
                            //console.log("Da thanh cong: response");
                            console.log("update thanh cong");
                            window.location.reload();
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }).catch(function (error) {
                        console.log(error);
                    });
                }

            }

            /***/
        }),

/***/ "./src/scripts/models/file.ts":
/*!************************************!*\
  !*** ./src/scripts/models/file.ts ***!
  \************************************/
/*! exports provided: File */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "File", function () { return File; });
            class File {
                constructor(id, name, extension, createAt, createBy, modifiedAt, modifiedBy) {
                    this.FileId = id;
                    this.name = name;
                    this.extension = extension;
                    this.createAt = createAt;
                    this.createBy = createBy;
                    this.modifiedAt = modifiedAt;
                    this.modifiedBy = modifiedBy;
                }

            }

            /***/
        }),

/***/ "./src/scripts/models/folder.ts":
/*!**************************************!*\
  !*** ./src/scripts/models/folder.ts ***!
  \**************************************/
/*! exports provided: Folder */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Folder", function () { return Folder; });
            class Folder {
                constructor(id, name, extension, createAt, createBy, modifiedAt, modifiedBy) {
                    this.FileId = id;
                    this.name = name;
                    this.extension = extension;
                    this.createAt = createAt;
                    this.createBy = createBy;
                    this.modifiedAt = modifiedAt;
                    this.modifiedBy = modifiedBy;
                }

            }

            /***/
        }),

/***/ "./src/scripts/pages/home-page.ts":
/*!****************************************!*\
  !*** ./src/scripts/pages/home-page.ts ***!
  \****************************************/
/*! no exports provided */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/_helper */ "./src/scripts/utilities/_helper.ts");
/* harmony import */ var _components_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/_grid */ "./src/scripts/components/_grid.ts");
/* harmony import */ var _components_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/_forms */ "./src/scripts/components/_forms.ts");
/* harmony import */ var _models_FileAndFolderList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/FileAndFolderList */ "./src/scripts/models/FileAndFolderList.ts");






            Object(_utilities_helper__WEBPACK_IMPORTED_MODULE_0__["default"])(() => {
                Object(_components_grid__WEBPACK_IMPORTED_MODULE_1__["default"])(); //listManage

                let a = new _models_FileAndFolderList__WEBPACK_IMPORTED_MODULE_3__["FileAndFolderList"]();
                a.showListForTable(); //create form

                Object(_components_forms__WEBPACK_IMPORTED_MODULE_2__["closeCreateForm"])();
                Object(_components_forms__WEBPACK_IMPORTED_MODULE_2__["showCreateForm"])();
                Object(_components_forms__WEBPACK_IMPORTED_MODULE_2__["createFile"])(a); //upload form

                Object(_components_forms__WEBPACK_IMPORTED_MODULE_2__["closeUploadForm"])();
                Object(_components_forms__WEBPACK_IMPORTED_MODULE_2__["showUploadForm"])();
                Object(_components_forms__WEBPACK_IMPORTED_MODULE_2__["uploadFile"])(a); //update form

                Object(_components_forms__WEBPACK_IMPORTED_MODULE_2__["closeUpdateForm"])();
                Object(_components_forms__WEBPACK_IMPORTED_MODULE_2__["showUpdateForm"])([]);
                Object(_components_forms__WEBPACK_IMPORTED_MODULE_2__["updateFile"])(a);
                Object(_components_forms__WEBPACK_IMPORTED_MODULE_2__["deleteFile"])(a);
            });

            /***/
        }),

/***/ "./src/scripts/utilities/_helper.ts":
/*!******************************************!*\
  !*** ./src/scripts/utilities/_helper.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            const ready = fn => {
                if (document.readyState !== 'loading') {
                    fn();
                } else {
                    document.addEventListener('DOMContentLoaded', fn);
                }
            };

/* harmony default export */ __webpack_exports__["default"] = (ready);

            /***/
        }),

/***/ "./src/styles/pages/home-page.scss":
/*!*****************************************!*\
  !*** ./src/styles/pages/home-page.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            // extracted by mini-css-extract-plugin

            /***/
        }),

/***/ 0:
/*!********************************************************************************!*\
  !*** multi ./src/scripts/pages/home-page.ts ./src/styles/pages/home-page.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            __webpack_require__(/*! ./src/scripts/pages/home-page.ts */"./src/scripts/pages/home-page.ts");
            module.exports = __webpack_require__(/*! ./src/styles/pages/home-page.scss */"./src/styles/pages/home-page.scss");


            /***/
        })

    /******/
});
//# sourceMappingURL=home-page.js.map