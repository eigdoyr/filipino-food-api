var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// .wrangler/tmp/bundle-NmcT8D/checked-fetch.js
var require_checked_fetch = __commonJS({
  ".wrangler/tmp/bundle-NmcT8D/checked-fetch.js"() {
    var urls = /* @__PURE__ */ new Set();
    function checkURL(request, init) {
      const url = request instanceof URL ? request : new URL(
        (typeof request === "string" ? new Request(request, init) : request).url
      );
      if (url.port && url.port !== "443" && url.protocol === "https:") {
        if (!urls.has(url.toString())) {
          urls.add(url.toString());
          console.warn(
            `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
          );
        }
      }
    }
    __name(checkURL, "checkURL");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init] = argArray;
        checkURL(request, init);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});

// .wrangler/tmp/bundle-NmcT8D/middleware-loader.entry.ts
var import_checked_fetch36 = __toESM(require_checked_fetch());

// wrangler-modules-watch:wrangler:modules-watch
var import_checked_fetch = __toESM(require_checked_fetch());

// .wrangler/tmp/bundle-NmcT8D/middleware-insertion-facade.js
var import_checked_fetch34 = __toESM(require_checked_fetch());

// packages/api/src/index.ts
var import_checked_fetch31 = __toESM(require_checked_fetch());

// node_modules/hono/dist/index.js
var import_checked_fetch25 = __toESM(require_checked_fetch(), 1);

// node_modules/hono/dist/hono.js
var import_checked_fetch24 = __toESM(require_checked_fetch(), 1);

// node_modules/hono/dist/hono-base.js
var import_checked_fetch12 = __toESM(require_checked_fetch(), 1);

// node_modules/hono/dist/compose.js
var import_checked_fetch2 = __toESM(require_checked_fetch(), 1);
var compose = /* @__PURE__ */ __name((middleware2, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware2[i]) {
        handler = middleware2[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware2.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// node_modules/hono/dist/context.js
var import_checked_fetch9 = __toESM(require_checked_fetch(), 1);

// node_modules/hono/dist/request.js
var import_checked_fetch7 = __toESM(require_checked_fetch(), 1);

// node_modules/hono/dist/http-exception.js
var import_checked_fetch3 = __toESM(require_checked_fetch(), 1);

// node_modules/hono/dist/request/constants.js
var import_checked_fetch4 = __toESM(require_checked_fetch(), 1);
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/hono/dist/utils/body.js
var import_checked_fetch5 = __toESM(require_checked_fetch(), 1);
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");

// node_modules/hono/dist/utils/url.js
var import_checked_fetch6 = __toESM(require_checked_fetch(), 1);
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path = url.slice(start, end);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = class {
  static {
    __name(this, "HonoRequest");
  }
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = /* @__PURE__ */ __name((key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  }, "#cachedBody");
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// node_modules/hono/dist/utils/html.js
var import_checked_fetch8 = __toESM(require_checked_fetch(), 1);
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var escapeRe = /[&<>'"]/;
var stringBufferToString = /* @__PURE__ */ __name(async (buffer, callbacks) => {
  let str = "";
  callbacks ||= [];
  const resolvedBuffer = await Promise.all(buffer);
  for (let i = resolvedBuffer.length - 1; ; i--) {
    str += resolvedBuffer[i];
    i--;
    if (i < 0) {
      break;
    }
    let r = resolvedBuffer[i];
    if (typeof r === "object") {
      callbacks.push(...r.callbacks || []);
    }
    const isEscaped = r.isEscaped;
    r = await (typeof r === "object" ? r.toString() : r);
    if (typeof r === "object") {
      callbacks.push(...r.callbacks || []);
    }
    if (r.isEscaped ?? isEscaped) {
      str += r;
    } else {
      const buf = [str];
      escapeToBuffer(r, buf);
      str = buf[0];
    }
  }
  return raw(str, callbacks);
}, "stringBufferToString");
var escapeToBuffer = /* @__PURE__ */ __name((str, buffer) => {
  const match2 = str.search(escapeRe);
  if (match2 === -1) {
    buffer[0] += str;
    return;
  }
  let escape;
  let index;
  let lastIndex = 0;
  for (index = match2; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        escape = "&quot;";
        break;
      case 39:
        escape = "&#39;";
        break;
      case 38:
        escape = "&amp;";
        break;
      case 60:
        escape = "&lt;";
        break;
      case 62:
        escape = "&gt;";
        break;
      default:
        continue;
    }
    buffer[0] += str.substring(lastIndex, index) + escape;
    lastIndex = index + 1;
  }
  buffer[0] += str.substring(lastIndex, index);
}, "escapeToBuffer");
var resolveCallbackSync = /* @__PURE__ */ __name((str) => {
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return str;
  }
  const buffer = [str];
  const context = {};
  callbacks.forEach((c) => c({ phase: HtmlEscapedCallbackPhase.Stringify, buffer, context }));
  return buffer[0];
}, "resolveCallbackSync");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var createResponseInstance = /* @__PURE__ */ __name((body, init) => new Response(body, init), "createResponseInstance");
var Context = class {
  static {
    __name(this, "Context");
  }
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = /* @__PURE__ */ __name((...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  }, "render");
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = /* @__PURE__ */ __name((layout) => this.#layout = layout, "setLayout");
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = /* @__PURE__ */ __name(() => this.#layout, "getLayout");
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = /* @__PURE__ */ __name((renderer) => {
    this.#renderer = renderer;
  }, "setRenderer");
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = /* @__PURE__ */ __name((name, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  }, "header");
  status = /* @__PURE__ */ __name((status) => {
    this.#status = status;
  }, "status");
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = /* @__PURE__ */ __name((key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  }, "set");
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = /* @__PURE__ */ __name((key) => {
    return this.#var ? this.#var.get(key) : void 0;
  }, "get");
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, { status, headers: responseHeaders });
  }
  newResponse = /* @__PURE__ */ __name((...args) => this.#newResponse(...args), "newResponse");
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = /* @__PURE__ */ __name((data, arg, headers) => this.#newResponse(data, arg, headers), "body");
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = /* @__PURE__ */ __name((text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  }, "text");
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = /* @__PURE__ */ __name((object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  }, "json");
  html = /* @__PURE__ */ __name((html2, arg, headers) => {
    const res = /* @__PURE__ */ __name((html22) => this.#newResponse(html22, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html2 === "object" ? resolveCallback(html2, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html2);
  }, "html");
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = /* @__PURE__ */ __name((location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  }, "redirect");
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = /* @__PURE__ */ __name(() => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  }, "notFound");
};

// node_modules/hono/dist/router.js
var import_checked_fetch10 = __toESM(require_checked_fetch(), 1);
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
  static {
    __name(this, "UnsupportedPathError");
  }
};

// node_modules/hono/dist/utils/constants.js
var import_checked_fetch11 = __toESM(require_checked_fetch(), 1);
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = class _Hono {
  static {
    __name(this, "_Hono");
  }
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = /* @__PURE__ */ __name((handler) => {
    this.errorHandler = handler;
    return this;
  }, "onError");
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = /* @__PURE__ */ __name((handler) => {
    this.#notFoundHandler = handler;
    return this;
  }, "notFound");
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { basePath: this._basePath, path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} Env - env Object
   * @param {ExecutionContext} - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = /* @__PURE__ */ __name((request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  }, "fetch");
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = /* @__PURE__ */ __name((input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  }, "request");
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = /* @__PURE__ */ __name(() => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  }, "fire");
};

// node_modules/hono/dist/router/reg-exp-router/index.js
var import_checked_fetch18 = __toESM(require_checked_fetch(), 1);

// node_modules/hono/dist/router/reg-exp-router/router.js
var import_checked_fetch16 = __toESM(require_checked_fetch(), 1);

// node_modules/hono/dist/router/reg-exp-router/matcher.js
var import_checked_fetch13 = __toESM(require_checked_fetch(), 1);
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = /* @__PURE__ */ __name(((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }), "match2");
  this.match = match2;
  return match2(method, path);
}
__name(match, "match");

// node_modules/hono/dist/router/reg-exp-router/node.js
var import_checked_fetch14 = __toESM(require_checked_fetch(), 1);
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = class _Node {
  static {
    __name(this, "_Node");
  }
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new _Node();
        if (name !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new _Node();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
var import_checked_fetch15 = __toESM(require_checked_fetch(), 1);
var Trie = class {
  static {
    __name(this, "Trie");
  }
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware2, path) {
  if (!middleware2) {
    return void 0;
  }
  for (const k of Object.keys(middleware2).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware2[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = class {
  static {
    __name(this, "RegExpRouter");
  }
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware2 = this.#middleware;
    const routes = this.#routes;
    if (!middleware2 || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware2[method]) {
      ;
      [middleware2, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware2).forEach((m) => {
          middleware2[m][path] ||= findMiddleware(middleware2[m], path) || findMiddleware(middleware2[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware2[method][path] ||= findMiddleware(middleware2[method], path) || findMiddleware(middleware2[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware2).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware2[m]).forEach((p) => {
            re.test(p) && middleware2[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware2[m], path2) || findMiddleware(middleware2[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// node_modules/hono/dist/router/reg-exp-router/prepared-router.js
var import_checked_fetch17 = __toESM(require_checked_fetch(), 1);

// node_modules/hono/dist/router/smart-router/index.js
var import_checked_fetch20 = __toESM(require_checked_fetch(), 1);

// node_modules/hono/dist/router/smart-router/router.js
var import_checked_fetch19 = __toESM(require_checked_fetch(), 1);
var SmartRouter = class {
  static {
    __name(this, "SmartRouter");
  }
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router3 = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router3.add(...routes[i2]);
        }
        res = router3.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router3.match.bind(router3);
      this.#routers = [router3];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// node_modules/hono/dist/router/trie-router/index.js
var import_checked_fetch23 = __toESM(require_checked_fetch(), 1);

// node_modules/hono/dist/router/trie-router/router.js
var import_checked_fetch22 = __toESM(require_checked_fetch(), 1);

// node_modules/hono/dist/router/trie-router/node.js
var import_checked_fetch21 = __toESM(require_checked_fetch(), 1);
var emptyParams = /* @__PURE__ */ Object.create(null);
var hasChildren = /* @__PURE__ */ __name((children) => {
  for (const _ in children) {
    return true;
  }
  return false;
}, "hasChildren");
var Node2 = class _Node2 {
  static {
    __name(this, "_Node");
  }
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new _Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              this.#pushHandlerSets(handlerSets, astNode, method, node.#params);
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          if (matcher instanceof RegExp) {
            if (partOffsets === null) {
              partOffsets = new Array(len);
              let offset = path[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path.substring(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (hasChildren(child.#children)) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  static {
    __name(this, "TrieRouter");
  }
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  static {
    __name(this, "Hono");
  }
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// packages/api/src/routes/dishes.ts
var import_checked_fetch26 = __toESM(require_checked_fetch());

// packages/data/dishes/index.json
var dishes_default = [
  {
    id: "adobo",
    name: "Adobo",
    description: "A savory Filipino dish of meat braised in vinegar, soy sauce, garlic, and bay leaves. Considered the unofficial national dish of the Philippines.",
    type: [
      "main_dish"
    ],
    main_ingredients: [
      "pork",
      "vinegar",
      "soy sauce",
      "garlic",
      "bay leaves"
    ],
    occasion: [
      "everyday",
      "party",
      "potluck"
    ],
    flavor_profile: [
      "savory",
      "sour",
      "salty"
    ],
    cooking_method: [
      "stewed"
    ],
    tags: [
      "pork",
      "chicken",
      "classic",
      "national dish"
    ],
    image_url: "https://image.pollinations.ai/prompt/Adobo%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "adobong-pusit",
    name: "Adobong Pusit",
    description: "Squid cooked in its own ink with vinegar, soy sauce, and garlic. A darker, briny variation of the classic adobo using fresh squid.",
    type: [
      "main_dish"
    ],
    main_ingredients: [
      "squid",
      "squid ink",
      "vinegar",
      "soy sauce",
      "garlic"
    ],
    occasion: [
      "everyday"
    ],
    flavor_profile: [
      "savory",
      "salty",
      "sour"
    ],
    cooking_method: [
      "stewed"
    ],
    tags: [
      "squid",
      "seafood",
      "adobo",
      "ink"
    ],
    image_url: "https://image.pollinations.ai/prompt/Adobong%20Pusit%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "arroz-caldo",
    name: "Arroz Caldo",
    description: "A thick Filipino rice porridge with chicken and ginger, topped with fried garlic, scallions, and calamansi. A go-to comfort food when sick or during cold weather.",
    type: [
      "breakfast",
      "main_dish"
    ],
    main_ingredients: [
      "rice",
      "chicken",
      "ginger",
      "garlic"
    ],
    occasion: [
      "breakfast",
      "cold_weather",
      "everyday",
      "merienda"
    ],
    flavor_profile: [
      "savory",
      "umami"
    ],
    cooking_method: [
      "boiled"
    ],
    tags: [
      "porridge",
      "congee",
      "comfort food",
      "sick food"
    ],
    image_url: "https://image.pollinations.ai/prompt/Arroz%20Caldo%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "balut",
    name: "Balut",
    description: "A fertilized duck egg with a partially developed embryo, boiled and eaten from the shell. One of the most iconic and adventurous Filipino street foods, typically sold by vendors at night.",
    type: [
      "street_food",
      "snack"
    ],
    main_ingredients: [
      "duck egg"
    ],
    occasion: [
      "everyday",
      "pulutan"
    ],
    flavor_profile: [
      "savory",
      "umami"
    ],
    cooking_method: [
      "boiled"
    ],
    tags: [
      "street food",
      "duck egg",
      "exotic",
      "night food"
    ],
    image_url: "https://image.pollinations.ai/prompt/Balut%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "batchoy",
    name: "La Paz Batchoy",
    description: "A rich pork noodle soup from Iloilo topped with pork organs, crushed chicharon, and a raw egg. One of the most iconic noodle soups in the Visayas region.",
    type: [
      "soup",
      "noodle_dish"
    ],
    main_ingredients: [
      "egg noodles",
      "pork",
      "pork liver",
      "chicharon",
      "shrimp paste"
    ],
    occasion: [
      "everyday",
      "cold_weather"
    ],
    flavor_profile: [
      "savory",
      "umami",
      "salty"
    ],
    cooking_method: [
      "boiled"
    ],
    origin_region: "Iloilo",
    tags: [
      "noodles",
      "visayas",
      "iloilo",
      "pork soup"
    ],
    image_url: "https://image.pollinations.ai/prompt/La%20Paz%20Batchoy%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "bibingka",
    name: "Bibingka",
    description: "A soft baked rice cake made from rice flour and coconut milk, traditionally cooked in clay pots lined with banana leaves over charcoal. A staple during the Christmas season after Simbang Gabi.",
    type: [
      "kakanin",
      "dessert",
      "breakfast"
    ],
    main_ingredients: [
      "rice flour",
      "coconut milk",
      "salted egg",
      "cheese"
    ],
    occasion: [
      "christmas",
      "merienda",
      "fiesta"
    ],
    flavor_profile: [
      "sweet",
      "salty"
    ],
    cooking_method: [
      "baked"
    ],
    tags: [
      "christmas",
      "kakanin",
      "rice cake",
      "simbang gabi"
    ],
    image_url: "https://image.pollinations.ai/prompt/Bibingka%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "bibingkang-malagkit",
    name: "Bibingkang Malagkit",
    description: "A sticky rice cake cooked in coconut milk and topped with a rich coconut caramel sauce. A beloved kakanin commonly sold at markets and fiestas.",
    type: [
      "kakanin",
      "dessert"
    ],
    main_ingredients: [
      "glutinous rice",
      "coconut milk",
      "brown sugar"
    ],
    occasion: [
      "fiesta",
      "merienda",
      "everyday"
    ],
    flavor_profile: [
      "sweet"
    ],
    cooking_method: [
      "boiled",
      "baked"
    ],
    tags: [
      "sticky rice",
      "kakanin",
      "coconut",
      "caramel"
    ],
    image_url: "https://image.pollinations.ai/prompt/Bibingkang%20Malagkit%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "bicol-express",
    name: "Bicol Express",
    description: "A fiery Bicolano stew of pork cooked in coconut milk with lots of chili peppers and shrimp paste. One of the spiciest dishes in Filipino cuisine.",
    type: [
      "main_dish"
    ],
    main_ingredients: [
      "pork",
      "coconut milk",
      "chili peppers",
      "bagoong"
    ],
    occasion: [
      "everyday",
      "fiesta"
    ],
    flavor_profile: [
      "spicy",
      "savory",
      "umami"
    ],
    cooking_method: [
      "stewed"
    ],
    origin_region: "Bicol",
    tags: [
      "spicy",
      "coconut milk",
      "bicolano",
      "chili"
    ],
    image_url: "https://image.pollinations.ai/prompt/Bicol%20Express%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "bulalo",
    name: "Bulalo",
    description: "A rich beef bone marrow soup from Batangas made by slow-boiling beef shanks until the collagen and fat dissolve into a deeply flavorful broth. Best enjoyed during cold weather.",
    type: [
      "soup",
      "main_dish"
    ],
    main_ingredients: [
      "beef shank",
      "bone marrow",
      "cabbage",
      "corn"
    ],
    occasion: [
      "everyday",
      "cold_weather"
    ],
    flavor_profile: [
      "savory",
      "umami"
    ],
    cooking_method: [
      "boiled"
    ],
    origin_region: "Batangas",
    tags: [
      "beef",
      "bone marrow",
      "soup",
      "batangas"
    ],
    image_url: "https://image.pollinations.ai/prompt/Bulalo%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "champorado",
    name: "Champorado",
    description: "A sweet chocolate rice porridge made with sticky rice and tablea cacao. Traditionally served for breakfast paired with tuyo dried fish for a sweet and salty contrast.",
    type: [
      "breakfast",
      "dessert"
    ],
    main_ingredients: [
      "glutinous rice",
      "tablea",
      "sugar",
      "coconut milk"
    ],
    occasion: [
      "breakfast",
      "merienda",
      "everyday"
    ],
    flavor_profile: [
      "sweet"
    ],
    cooking_method: [
      "boiled"
    ],
    tags: [
      "chocolate",
      "porridge",
      "breakfast",
      "tablea"
    ],
    image_url: "https://image.pollinations.ai/prompt/Champorado%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "crispy-pata",
    name: "Crispy Pata",
    description: "Deep-fried pork leg with impossibly crispy skin and tender meat inside. A crowd favorite at parties and a classic pulutan dish.",
    type: [
      "main_dish",
      "appetizer"
    ],
    main_ingredients: [
      "pork leg",
      "garlic",
      "peppercorn",
      "bay leaves"
    ],
    occasion: [
      "party",
      "fiesta",
      "pulutan",
      "birthday"
    ],
    flavor_profile: [
      "savory",
      "salty"
    ],
    cooking_method: [
      "boiled",
      "fried"
    ],
    tags: [
      "pork",
      "crispy",
      "pulutan",
      "party food"
    ],
    image_url: "https://image.pollinations.ai/prompt/Crispy%20Pata%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "dinakdakan",
    name: "Dinakdakan",
    description: "An Ilocano dish of grilled pork parts including ears and face, chopped and mixed with calamansi, chili, and pig brain or mayonnaise. Similar to sisig but distinctly Ilocano.",
    type: [
      "main_dish",
      "appetizer"
    ],
    main_ingredients: [
      "pork ears",
      "pork face",
      "calamansi",
      "chili",
      "ginger"
    ],
    occasion: [
      "pulutan",
      "everyday"
    ],
    flavor_profile: [
      "sour",
      "savory",
      "spicy"
    ],
    cooking_method: [
      "grilled",
      "boiled"
    ],
    origin_region: "Ilocos",
    tags: [
      "ilocano",
      "pork",
      "pulutan",
      "grilled"
    ],
    image_url: "https://image.pollinations.ai/prompt/Dinakdakan%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "dinuguan",
    name: "Dinuguan",
    description: "A savory pork blood stew cooked with vinegar, garlic, and chili. Often called chocolate meat by those unfamiliar with the dish. Traditionally paired with puto.",
    type: [
      "main_dish"
    ],
    main_ingredients: [
      "pork",
      "pork blood",
      "vinegar",
      "garlic",
      "chili"
    ],
    occasion: [
      "everyday",
      "fiesta"
    ],
    flavor_profile: [
      "savory",
      "sour",
      "salty"
    ],
    cooking_method: [
      "stewed"
    ],
    tags: [
      "pork blood",
      "offal",
      "puto pairing"
    ],
    image_url: "https://image.pollinations.ai/prompt/Dinuguan%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "empanada",
    name: "Empanada",
    description: "A deep-fried or baked pastry filled with seasoned ground pork, vegetables, and egg. The Vigan empanada from Ilocos is particularly famous for its thin, crispy orange shell.",
    type: [
      "snack",
      "street_food",
      "appetizer"
    ],
    main_ingredients: [
      "flour",
      "ground pork",
      "egg",
      "vegetables"
    ],
    occasion: [
      "merienda",
      "everyday"
    ],
    flavor_profile: [
      "savory",
      "salty"
    ],
    cooking_method: [
      "fried",
      "baked"
    ],
    tags: [
      "pastry",
      "vigan",
      "ilocos",
      "street food"
    ],
    image_url: "https://image.pollinations.ai/prompt/Empanada%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "ginisang-monggo",
    name: "Ginisang Monggo",
    description: "Sauteed mung bean soup with pork, shrimp, and malunggay leaves. A nutritious everyday dish traditionally cooked every Friday in many Filipino households.",
    type: [
      "soup",
      "main_dish"
    ],
    main_ingredients: [
      "mung beans",
      "pork",
      "shrimp",
      "malunggay",
      "garlic"
    ],
    occasion: [
      "everyday"
    ],
    flavor_profile: [
      "savory",
      "umami"
    ],
    cooking_method: [
      "boiled",
      "sauteed"
    ],
    tags: [
      "mung beans",
      "monggo",
      "friday dish",
      "healthy"
    ],
    image_url: "https://image.pollinations.ai/prompt/Ginisang%20Monggo%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "goto",
    name: "Goto",
    description: "A Filipino rice porridge cooked with beef tripe and ginger, topped with fried garlic, scallions, and calamansi. A heartier cousin of arroz caldo popular as street food.",
    type: [
      "breakfast",
      "main_dish",
      "street_food"
    ],
    main_ingredients: [
      "rice",
      "beef tripe",
      "ginger",
      "garlic"
    ],
    occasion: [
      "breakfast",
      "everyday",
      "cold_weather"
    ],
    flavor_profile: [
      "savory",
      "umami"
    ],
    cooking_method: [
      "boiled"
    ],
    tags: [
      "porridge",
      "tripe",
      "street food",
      "congee"
    ],
    image_url: "https://image.pollinations.ai/prompt/Goto%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "halo-halo",
    name: "Halo-Halo",
    description: "A popular cold Filipino dessert of shaved ice, evaporated milk, and a colorful mix of sweet beans, jellies, fruits, ube halaya, and leche flan. The name means mix-mix in Filipino.",
    type: [
      "dessert",
      "beverage"
    ],
    main_ingredients: [
      "shaved ice",
      "evaporated milk",
      "ube",
      "leche flan",
      "sweetened beans"
    ],
    occasion: [
      "everyday",
      "party",
      "merienda"
    ],
    flavor_profile: [
      "sweet"
    ],
    cooking_method: [
      "raw"
    ],
    tags: [
      "cold dessert",
      "summer",
      "shaved ice",
      "ube"
    ],
    image_url: "https://image.pollinations.ai/prompt/Halo-Halo%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "isaw",
    name: "Isaw",
    description: "Grilled chicken or pork intestines on skewers, marinated in a sweet and savory sauce and cooked over charcoal. One of the most popular and beloved Filipino street foods.",
    type: [
      "street_food",
      "snack"
    ],
    main_ingredients: [
      "chicken intestines",
      "soy sauce",
      "vinegar",
      "garlic"
    ],
    occasion: [
      "everyday",
      "pulutan"
    ],
    flavor_profile: [
      "savory",
      "salty",
      "sweet"
    ],
    cooking_method: [
      "grilled"
    ],
    tags: [
      "offal",
      "skewer",
      "street food",
      "charcoal"
    ],
    image_url: "https://image.pollinations.ai/prompt/Isaw%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "kaldereta",
    name: "Kaldereta",
    description: "A rich tomato-based beef or goat stew with liver paste, olives, bell peppers, and potatoes. A Spanish-influenced dish commonly served at fiestas.",
    type: [
      "main_dish"
    ],
    main_ingredients: [
      "beef",
      "tomato sauce",
      "liver paste",
      "potatoes",
      "bell pepper"
    ],
    occasion: [
      "fiesta",
      "party",
      "everyday"
    ],
    flavor_profile: [
      "savory",
      "sour"
    ],
    cooking_method: [
      "stewed"
    ],
    tags: [
      "beef",
      "tomato",
      "spanish influence",
      "fiesta"
    ],
    image_url: "https://image.pollinations.ai/prompt/Kaldereta%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "kare-kare",
    name: "Kare-Kare",
    description: "A rich peanut-based stew made with oxtail, tripe, and vegetables, traditionally served with bagoong alamang on the side. A staple at fiestas and special occasions.",
    type: [
      "main_dish"
    ],
    main_ingredients: [
      "oxtail",
      "peanut sauce",
      "bagoong",
      "banana blossom",
      "eggplant"
    ],
    occasion: [
      "fiesta",
      "party",
      "birthday"
    ],
    flavor_profile: [
      "savory",
      "umami"
    ],
    cooking_method: [
      "stewed",
      "boiled"
    ],
    tags: [
      "peanut",
      "oxtail",
      "bagoong",
      "fiesta"
    ],
    image_url: "https://image.pollinations.ai/prompt/Kare-Kare%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "kinilaw",
    name: "Kinilaw",
    description: "A Filipino ceviche of raw fresh fish cured in vinegar or calamansi juice with ginger, onion, and chili. A light and refreshing dish common in coastal regions.",
    type: [
      "appetizer",
      "main_dish"
    ],
    main_ingredients: [
      "fresh fish",
      "vinegar",
      "ginger",
      "onion",
      "chili"
    ],
    occasion: [
      "everyday",
      "pulutan"
    ],
    flavor_profile: [
      "sour",
      "spicy",
      "savory"
    ],
    cooking_method: [
      "raw",
      "cured"
    ],
    tags: [
      "ceviche",
      "seafood",
      "raw",
      "coastal"
    ],
    image_url: "https://image.pollinations.ai/prompt/Kinilaw%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "kwek-kwek",
    name: "Kwek-Kwek",
    description: "Deep-fried quail eggs coated in an orange batter made with annatto. A popular Filipino street food served with spiced vinegar dipping sauce.",
    type: [
      "street_food",
      "snack"
    ],
    main_ingredients: [
      "quail eggs",
      "flour",
      "annatto",
      "cornstarch"
    ],
    occasion: [
      "everyday",
      "merienda"
    ],
    flavor_profile: [
      "savory",
      "salty"
    ],
    cooking_method: [
      "fried"
    ],
    tags: [
      "street food",
      "eggs",
      "annatto",
      "fried"
    ],
    image_url: "https://image.pollinations.ai/prompt/Kwek-Kwek%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "laing",
    name: "Laing",
    description: "Dried taro leaves slow-cooked in coconut milk with pork and chili. A signature Bicolano dish known for its creamy, spicy, and deeply savory flavor.",
    type: [
      "main_dish"
    ],
    main_ingredients: [
      "dried taro leaves",
      "coconut milk",
      "pork",
      "chili"
    ],
    occasion: [
      "everyday",
      "fiesta"
    ],
    flavor_profile: [
      "spicy",
      "savory",
      "umami"
    ],
    cooking_method: [
      "stewed"
    ],
    origin_region: "Bicol",
    tags: [
      "taro",
      "coconut milk",
      "bicolano",
      "spicy"
    ],
    image_url: "https://image.pollinations.ai/prompt/Laing%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "leche-flan",
    name: "Leche Flan",
    description: "A rich and creamy caramel custard made with egg yolks and condensed milk. A Spanish-influenced dessert and a staple at every Filipino celebration.",
    type: [
      "dessert"
    ],
    main_ingredients: [
      "egg yolks",
      "condensed milk",
      "evaporated milk",
      "sugar"
    ],
    occasion: [
      "fiesta",
      "christmas",
      "birthday",
      "party"
    ],
    flavor_profile: [
      "sweet"
    ],
    cooking_method: [
      "steamed"
    ],
    tags: [
      "custard",
      "caramel",
      "spanish influence",
      "celebration"
    ],
    image_url: "https://image.pollinations.ai/prompt/Leche%20Flan%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "lechon-kawali",
    name: "Lechon Kawali",
    description: "Deep-fried pork belly boiled until tender then fried until the skin is shatteringly crispy. A cheaper and more accessible everyday version of whole roasted lechon.",
    type: [
      "main_dish",
      "appetizer"
    ],
    main_ingredients: [
      "pork belly",
      "garlic",
      "bay leaves",
      "peppercorn"
    ],
    occasion: [
      "everyday",
      "party",
      "pulutan"
    ],
    flavor_profile: [
      "savory",
      "salty"
    ],
    cooking_method: [
      "boiled",
      "fried"
    ],
    tags: [
      "pork belly",
      "crispy",
      "fried",
      "pulutan"
    ],
    image_url: "https://image.pollinations.ai/prompt/Lechon%20Kawali%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "lechon",
    name: "Lechon",
    description: "A whole roasted pig slow-cooked over charcoal until the skin is crispy and the meat is tender. The centerpiece of Filipino celebrations and considered one of the best roasted pigs in the world.",
    type: [
      "main_dish"
    ],
    main_ingredients: [
      "whole pig",
      "lemongrass",
      "garlic",
      "onion"
    ],
    occasion: [
      "fiesta",
      "christmas",
      "birthday",
      "wedding",
      "party"
    ],
    flavor_profile: [
      "savory",
      "umami"
    ],
    cooking_method: [
      "roasted"
    ],
    tags: [
      "whole pig",
      "crispy skin",
      "celebration",
      "cebu"
    ],
    image_url: "https://image.pollinations.ai/prompt/Lechon%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "longganisa",
    name: "Longganisa",
    description: "Filipino cured sausage that varies by region \u2014 sweet Vigan longganisa, garlicky Lucban longganisa, and many more. A breakfast staple typically served with garlic rice and egg.",
    type: [
      "breakfast",
      "main_dish"
    ],
    main_ingredients: [
      "pork",
      "garlic",
      "vinegar",
      "sugar"
    ],
    occasion: [
      "breakfast",
      "everyday"
    ],
    flavor_profile: [
      "sweet",
      "savory",
      "salty"
    ],
    cooking_method: [
      "fried"
    ],
    tags: [
      "sausage",
      "breakfast",
      "silog",
      "regional"
    ],
    image_url: "https://image.pollinations.ai/prompt/Longganisa%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "lumpia-shanghai",
    name: "Lumpia Shanghai",
    description: "Crispy deep-fried spring rolls filled with seasoned ground pork, carrots, and onions. A staple at every Filipino party and celebration, served with sweet and sour dipping sauce.",
    type: [
      "appetizer",
      "snack",
      "main_dish"
    ],
    main_ingredients: [
      "ground pork",
      "carrots",
      "onion",
      "spring roll wrapper"
    ],
    occasion: [
      "party",
      "birthday",
      "christmas",
      "fiesta",
      "everyday"
    ],
    flavor_profile: [
      "savory",
      "salty"
    ],
    cooking_method: [
      "fried"
    ],
    tags: [
      "spring roll",
      "fried",
      "party food",
      "lumpia"
    ],
    image_url: "https://image.pollinations.ai/prompt/Lumpia%20Shanghai%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "mami",
    name: "Mami",
    description: "A Filipino-Chinese noodle soup with chicken or beef in a clear savory broth, topped with scallions and fried garlic. A comfort food staple in Filipino eateries and carinderia.",
    type: [
      "soup",
      "noodle_dish"
    ],
    main_ingredients: [
      "egg noodles",
      "chicken",
      "garlic",
      "scallions"
    ],
    occasion: [
      "everyday",
      "cold_weather",
      "breakfast"
    ],
    flavor_profile: [
      "savory",
      "umami"
    ],
    cooking_method: [
      "boiled"
    ],
    tags: [
      "noodles",
      "soup",
      "chinese influence",
      "carinderia"
    ],
    image_url: "https://image.pollinations.ai/prompt/Mami%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "menudo",
    name: "Menudo",
    description: "A tomato-based pork stew with liver, potatoes, carrots, and raisins. A sweet-savory dish often prepared for special occasions and fiestas.",
    type: [
      "main_dish"
    ],
    main_ingredients: [
      "pork",
      "pork liver",
      "tomato sauce",
      "potatoes",
      "carrots"
    ],
    occasion: [
      "fiesta",
      "party",
      "everyday"
    ],
    flavor_profile: [
      "savory",
      "sweet"
    ],
    cooking_method: [
      "stewed"
    ],
    tags: [
      "pork",
      "tomato",
      "liver",
      "fiesta"
    ],
    image_url: "https://image.pollinations.ai/prompt/Menudo%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "nilaga",
    name: "Nilaga",
    description: "A simple boiled beef or pork soup with potatoes, cabbage, and peppercorns. A no-fuss everyday Filipino comfort dish.",
    type: [
      "soup",
      "main_dish"
    ],
    main_ingredients: [
      "beef",
      "potatoes",
      "cabbage",
      "peppercorn"
    ],
    occasion: [
      "everyday",
      "cold_weather"
    ],
    flavor_profile: [
      "savory",
      "umami"
    ],
    cooking_method: [
      "boiled"
    ],
    tags: [
      "beef",
      "soup",
      "comfort food",
      "simple"
    ],
    image_url: "https://image.pollinations.ai/prompt/Nilaga%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "palabok",
    name: "Pancit Palabok",
    description: "Rice noodles topped with a rich shrimp-based orange sauce, crushed chicharon, hard boiled eggs, and calamansi. A festive noodle dish strongly associated with birthdays.",
    type: [
      "noodle_dish",
      "main_dish"
    ],
    main_ingredients: [
      "rice noodles",
      "shrimp",
      "chicharon",
      "tinapa",
      "eggs"
    ],
    occasion: [
      "birthday",
      "fiesta",
      "party"
    ],
    flavor_profile: [
      "savory",
      "umami",
      "salty"
    ],
    cooking_method: [
      "boiled",
      "sauteed"
    ],
    tags: [
      "noodles",
      "shrimp sauce",
      "birthday",
      "pancit"
    ],
    image_url: "https://image.pollinations.ai/prompt/Pancit%20Palabok%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "palitaw",
    name: "Palitaw",
    description: "Flat glutinous rice cakes boiled until they float, then rolled in grated coconut, sugar, and sesame seeds. The name comes from the Tagalog word litaw meaning to float.",
    type: [
      "kakanin",
      "snack"
    ],
    main_ingredients: [
      "glutinous rice flour",
      "grated coconut",
      "sugar",
      "sesame seeds"
    ],
    occasion: [
      "merienda",
      "everyday"
    ],
    flavor_profile: [
      "sweet"
    ],
    cooking_method: [
      "boiled"
    ],
    tags: [
      "rice cake",
      "kakanin",
      "coconut",
      "sesame"
    ],
    image_url: "https://image.pollinations.ai/prompt/Palitaw%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "pancit-bihon",
    name: "Pancit Bihon",
    description: "Stir-fried rice noodles with vegetables, chicken, and pork seasoned with soy sauce and calamansi. Traditionally served at birthdays as noodles symbolize long life.",
    type: [
      "noodle_dish",
      "main_dish"
    ],
    main_ingredients: [
      "rice noodles",
      "chicken",
      "cabbage",
      "carrots",
      "soy sauce"
    ],
    occasion: [
      "birthday",
      "fiesta",
      "party",
      "everyday"
    ],
    flavor_profile: [
      "savory",
      "salty"
    ],
    cooking_method: [
      "sauteed"
    ],
    tags: [
      "noodles",
      "birthday",
      "long life",
      "pancit"
    ],
    image_url: "https://image.pollinations.ai/prompt/Pancit%20Bihon%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "pancit-canton",
    name: "Pancit Canton",
    description: "Stir-fried egg noodles with pork, shrimp, and vegetables seasoned with soy sauce and oyster sauce. A heartier noodle dish compared to bihon.",
    type: [
      "noodle_dish",
      "main_dish"
    ],
    main_ingredients: [
      "egg noodles",
      "pork",
      "shrimp",
      "cabbage",
      "soy sauce"
    ],
    occasion: [
      "birthday",
      "party",
      "everyday"
    ],
    flavor_profile: [
      "savory",
      "salty",
      "umami"
    ],
    cooking_method: [
      "sauteed"
    ],
    tags: [
      "noodles",
      "egg noodles",
      "birthday",
      "pancit"
    ],
    image_url: "https://image.pollinations.ai/prompt/Pancit%20Canton%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "pinakbet",
    name: "Pinakbet",
    local_name: "Pakbet",
    description: "An Ilocano vegetable dish of bitter melon, eggplant, okra, and string beans cooked with bagoong and pork. Named from the Ilocano word pinakebbet meaning shriveled.",
    type: [
      "main_dish",
      "side_dish"
    ],
    main_ingredients: [
      "bitter melon",
      "eggplant",
      "bagoong",
      "okra",
      "pork"
    ],
    occasion: [
      "everyday"
    ],
    flavor_profile: [
      "savory",
      "bitter",
      "salty",
      "umami"
    ],
    cooking_method: [
      "stewed",
      "sauteed"
    ],
    origin_region: "Ilocos",
    tags: [
      "vegetables",
      "bagoong",
      "ilocano"
    ],
    image_url: "https://image.pollinations.ai/prompt/Pinakbet%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "pinangat",
    name: "Pinangat",
    description: "A Bicolano dish of fish or shrimp wrapped in taro leaves and cooked in coconut milk with chili and shrimp paste. Not to be confused with the Tagalog pinangat which is a sour fish soup.",
    type: [
      "main_dish"
    ],
    main_ingredients: [
      "fish",
      "taro leaves",
      "coconut milk",
      "chili",
      "bagoong"
    ],
    occasion: [
      "everyday",
      "fiesta"
    ],
    flavor_profile: [
      "spicy",
      "savory",
      "umami"
    ],
    cooking_method: [
      "stewed"
    ],
    origin_region: "Bicol",
    tags: [
      "bicolano",
      "coconut milk",
      "taro leaves",
      "spicy"
    ],
    image_url: "https://image.pollinations.ai/prompt/Pinangat%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "pinaputok",
    name: "Pinaputok na Tilapia",
    description: "Whole tilapia stuffed with tomatoes, onions, and ginger then grilled or baked until the skin bursts open. A simple and flavorful Filipino fish dish.",
    type: [
      "main_dish"
    ],
    main_ingredients: [
      "tilapia",
      "tomato",
      "onion",
      "ginger"
    ],
    occasion: [
      "everyday"
    ],
    flavor_profile: [
      "savory",
      "umami"
    ],
    cooking_method: [
      "grilled",
      "baked"
    ],
    tags: [
      "fish",
      "tilapia",
      "stuffed",
      "grilled"
    ],
    image_url: "https://image.pollinations.ai/prompt/Pinaputok%20na%20Tilapia%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "pochero",
    name: "Pochero",
    description: "A Spanish-influenced Filipino stew of beef or pork with chorizo, vegetables, and banana. A hearty dish commonly served at family gatherings and fiestas.",
    type: [
      "main_dish",
      "soup"
    ],
    main_ingredients: [
      "beef",
      "chorizo",
      "saging na saba",
      "cabbage",
      "tomato sauce"
    ],
    occasion: [
      "fiesta",
      "party",
      "everyday"
    ],
    flavor_profile: [
      "savory",
      "sweet"
    ],
    cooking_method: [
      "stewed",
      "boiled"
    ],
    tags: [
      "spanish influence",
      "beef",
      "chorizo",
      "fiesta"
    ],
    image_url: "https://image.pollinations.ai/prompt/Pochero%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "pork-bbq",
    name: "Pork BBQ",
    description: "Marinated pork slices on skewers grilled over charcoal. A Filipino street food staple with a distinctly sweet and savory marinade of soy sauce, banana ketchup, and calamansi.",
    type: [
      "street_food",
      "main_dish"
    ],
    main_ingredients: [
      "pork",
      "soy sauce",
      "banana ketchup",
      "calamansi",
      "garlic"
    ],
    occasion: [
      "everyday",
      "party",
      "pulutan",
      "street_food"
    ],
    flavor_profile: [
      "sweet",
      "savory",
      "salty"
    ],
    cooking_method: [
      "grilled"
    ],
    tags: [
      "skewer",
      "street food",
      "charcoal",
      "bbq"
    ],
    image_url: "https://image.pollinations.ai/prompt/Pork%20BBQ%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "puto",
    name: "Puto",
    description: "Soft steamed rice cakes made from rice flour, often topped with cheese or salted egg. A versatile kakanin eaten as a snack or paired with dinuguan.",
    type: [
      "kakanin",
      "snack",
      "breakfast"
    ],
    main_ingredients: [
      "rice flour",
      "sugar",
      "coconut milk",
      "baking powder"
    ],
    occasion: [
      "merienda",
      "fiesta",
      "everyday"
    ],
    flavor_profile: [
      "sweet",
      "salty"
    ],
    cooking_method: [
      "steamed"
    ],
    tags: [
      "rice cake",
      "kakanin",
      "dinuguan pairing",
      "steamed"
    ],
    image_url: "https://image.pollinations.ai/prompt/Puto%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "sinigang",
    name: "Sinigang",
    description: "A sour tamarind-based soup with pork, shrimp, or fish cooked with vegetables like kangkong, radish, and eggplant. One of the most beloved soups in Filipino cuisine.",
    type: [
      "soup",
      "main_dish"
    ],
    main_ingredients: [
      "pork",
      "tamarind",
      "kangkong",
      "radish",
      "eggplant"
    ],
    occasion: [
      "everyday",
      "cold_weather"
    ],
    flavor_profile: [
      "sour",
      "savory"
    ],
    cooking_method: [
      "boiled",
      "stewed"
    ],
    tags: [
      "tamarind",
      "soup",
      "comfort food"
    ],
    image_url: "https://image.pollinations.ai/prompt/Sinigang%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "sisig",
    name: "Sisig",
    description: "A sizzling Kapampangan dish of chopped pork parts seasoned with calamansi, onions, and chili peppers. Originally invented by Lucia Cunanan using pig heads from Clark Air Base in Angeles City.",
    type: [
      "main_dish",
      "appetizer"
    ],
    main_ingredients: [
      "pork",
      "calamansi",
      "onion",
      "chili",
      "chicken liver"
    ],
    occasion: [
      "pulutan",
      "everyday",
      "party"
    ],
    flavor_profile: [
      "savory",
      "sour",
      "spicy"
    ],
    cooking_method: [
      "boiled",
      "grilled"
    ],
    origin_region: "Pampanga",
    tags: [
      "kapampangan",
      "sizzling",
      "pulutan",
      "pork"
    ],
    image_url: "https://image.pollinations.ai/prompt/Sisig%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "suman",
    name: "Suman",
    description: "Sticky rice cooked in coconut milk and wrapped in banana leaves or palm leaves, then steamed. A classic kakanin enjoyed with ripe mango or sugar.",
    type: [
      "kakanin",
      "snack",
      "breakfast"
    ],
    main_ingredients: [
      "glutinous rice",
      "coconut milk",
      "banana leaves"
    ],
    occasion: [
      "merienda",
      "fiesta",
      "everyday"
    ],
    flavor_profile: [
      "sweet",
      "savory"
    ],
    cooking_method: [
      "steamed"
    ],
    tags: [
      "sticky rice",
      "banana leaf",
      "kakanin",
      "mango pairing"
    ],
    image_url: "https://image.pollinations.ai/prompt/Suman%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "taho",
    name: "Taho",
    description: "A warm street food snack of soft silken tofu, arnibal brown sugar syrup, and sago pearls. Sold by vendors called magtataho who carry it in large aluminum containers.",
    type: [
      "street_food",
      "snack",
      "breakfast"
    ],
    main_ingredients: [
      "silken tofu",
      "brown sugar syrup",
      "sago pearls"
    ],
    occasion: [
      "breakfast",
      "merienda",
      "everyday"
    ],
    flavor_profile: [
      "sweet"
    ],
    cooking_method: [
      "steamed"
    ],
    tags: [
      "tofu",
      "street food",
      "magtataho",
      "sago"
    ],
    image_url: "https://image.pollinations.ai/prompt/Taho%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "tapsilog",
    name: "Tapsilog",
    description: "A classic Filipino breakfast of cured beef tapa, garlic fried rice, and a fried egg. One of the most iconic silog meals in Filipino food culture.",
    type: [
      "breakfast",
      "main_dish"
    ],
    main_ingredients: [
      "beef tapa",
      "garlic rice",
      "egg"
    ],
    occasion: [
      "breakfast",
      "everyday"
    ],
    flavor_profile: [
      "savory",
      "salty",
      "sweet"
    ],
    cooking_method: [
      "fried"
    ],
    tags: [
      "silog",
      "breakfast",
      "tapa",
      "garlic rice"
    ],
    image_url: "https://image.pollinations.ai/prompt/Tapsilog%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "tinola",
    name: "Tinola",
    description: "A light ginger-based chicken soup with green papaya and chili leaves. A comforting everyday dish and one of the oldest recorded Filipino recipes.",
    type: [
      "soup",
      "main_dish"
    ],
    main_ingredients: [
      "chicken",
      "ginger",
      "green papaya",
      "chili leaves"
    ],
    occasion: [
      "everyday",
      "cold_weather"
    ],
    flavor_profile: [
      "savory",
      "umami"
    ],
    cooking_method: [
      "boiled",
      "stewed"
    ],
    tags: [
      "ginger",
      "soup",
      "chicken",
      "comfort food"
    ],
    image_url: "https://image.pollinations.ai/prompt/Tinola%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "tocino",
    name: "Tocino",
    description: "Sweet cured pork marinated in sugar, garlic, and annatto. A breakfast staple typically served as part of a silog meal with garlic rice and egg.",
    type: [
      "breakfast",
      "main_dish"
    ],
    main_ingredients: [
      "pork",
      "sugar",
      "garlic",
      "annatto"
    ],
    occasion: [
      "breakfast",
      "everyday"
    ],
    flavor_profile: [
      "sweet",
      "savory"
    ],
    cooking_method: [
      "fried"
    ],
    tags: [
      "cured",
      "sweet pork",
      "silog",
      "breakfast"
    ],
    image_url: "https://image.pollinations.ai/prompt/Tocino%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "tortang-talong",
    name: "Tortang Talong",
    description: "A Filipino omelette made with grilled eggplant dipped in egg and pan-fried until golden. A simple, budget-friendly everyday dish often served with rice and banana ketchup.",
    type: [
      "main_dish",
      "breakfast"
    ],
    main_ingredients: [
      "eggplant",
      "egg",
      "garlic",
      "onion"
    ],
    occasion: [
      "everyday",
      "breakfast"
    ],
    flavor_profile: [
      "savory"
    ],
    cooking_method: [
      "grilled",
      "fried"
    ],
    tags: [
      "eggplant",
      "omelette",
      "budget meal",
      "everyday"
    ],
    image_url: "https://image.pollinations.ai/prompt/Tortang%20Talong%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  },
  {
    id: "ukoy",
    name: "Ukoy",
    description: "Crispy Filipino fritters made with shrimp and shredded vegetables fried in a light batter. Served with spiced vinegar dipping sauce as a street food or appetizer.",
    type: [
      "street_food",
      "appetizer",
      "snack"
    ],
    main_ingredients: [
      "shrimp",
      "bean sprouts",
      "squash",
      "flour"
    ],
    occasion: [
      "merienda",
      "everyday"
    ],
    flavor_profile: [
      "savory",
      "salty"
    ],
    cooking_method: [
      "fried"
    ],
    tags: [
      "fritter",
      "shrimp",
      "street food",
      "crispy"
    ],
    image_url: "https://image.pollinations.ai/prompt/Ukoy%20Filipino%20food%20photography%20overhead%20shot%20natural%20lighting",
    image_credit: "AI Generated (prototype - Pollinations.ai)"
  }
];

// packages/api/src/routes/dishes.ts
var router = new Hono2();
router.get("/", (c) => {
  const page = Number(c.req.query("page") ?? 1);
  const limit = Number(c.req.query("limit") ?? 10);
  const type = c.req.query("type");
  const occasion = c.req.query("occasion");
  const region = c.req.query("region");
  let filtered = dishes_default;
  if (type) {
    filtered = filtered.filter((d) => d.type.includes(type));
  }
  if (occasion) {
    filtered = filtered.filter((d) => d.occasion.includes(occasion));
  }
  if (region) {
    filtered = filtered.filter(
      (d) => d.origin_region?.toLowerCase() === region.toLowerCase()
    );
  }
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);
  return c.json({
    data: paginated,
    meta: {
      total: filtered.length,
      page,
      limit,
      pages: Math.ceil(filtered.length / limit)
    }
  });
});
router.get("/search", (c) => {
  const q = c.req.query("q")?.toLowerCase();
  if (!q) {
    return c.json({ error: "Query parameter q is required" }, 400);
  }
  const results = dishes_default.filter((d) => {
    return d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q) || d.tags.some((t) => t.toLowerCase().includes(q)) || d.main_ingredients.some((i) => i.toLowerCase().includes(q));
  });
  return c.json({
    data: results,
    query: q,
    total: results.length
  });
});
router.get("/regions", (c) => {
  const regions = dishes_default.filter((d) => d.origin_region).reduce(
    (acc, d) => {
      const region = d.origin_region;
      acc[region] = (acc[region] ?? 0) + 1;
      return acc;
    },
    {}
  );
  const data = Object.entries(regions).map(([name, dish_count]) => ({
    name,
    dish_count
  }));
  return c.json({ data, total: data.length });
});
router.get("/:id", (c) => {
  const id = c.req.param("id");
  const dish = dishes_default.find((d) => d.id === id);
  if (!dish) {
    return c.json({ error: `Dish not found: ${id}` }, 404);
  }
  return c.json({ data: dish });
});
var dishes_default2 = router;

// packages/api/src/routes/docs.ts
var import_checked_fetch29 = __toESM(require_checked_fetch());

// node_modules/@hono/swagger-ui/dist/index.js
var import_checked_fetch28 = __toESM(require_checked_fetch(), 1);

// node_modules/hono/dist/helper/html/index.js
var import_checked_fetch27 = __toESM(require_checked_fetch(), 1);
var html = /* @__PURE__ */ __name((strings, ...values) => {
  const buffer = [""];
  for (let i = 0, len = strings.length - 1; i < len; i++) {
    buffer[0] += strings[i];
    const children = Array.isArray(values[i]) ? values[i].flat(Infinity) : [values[i]];
    for (let i2 = 0, len2 = children.length; i2 < len2; i2++) {
      const child = children[i2];
      if (typeof child === "string") {
        escapeToBuffer(child, buffer);
      } else if (typeof child === "number") {
        ;
        buffer[0] += child;
      } else if (typeof child === "boolean" || child === null || child === void 0) {
        continue;
      } else if (typeof child === "object" && child.isEscaped) {
        if (child.callbacks) {
          buffer.unshift("", child);
        } else {
          const tmp = child.toString();
          if (tmp instanceof Promise) {
            buffer.unshift("", tmp);
          } else {
            buffer[0] += tmp;
          }
        }
      } else if (child instanceof Promise) {
        buffer.unshift("", child);
      } else {
        escapeToBuffer(child.toString(), buffer);
      }
    }
  }
  buffer[0] += strings.at(-1);
  return buffer.length === 1 ? "callbacks" in buffer ? raw(resolveCallbackSync(raw(buffer[0], buffer.callbacks))) : raw(buffer[0]) : stringBufferToString(buffer, buffer.callbacks);
}, "html");

// node_modules/@hono/swagger-ui/dist/index.js
var RENDER_TYPE = {
  STRING_ARRAY: "string_array",
  STRING: "string",
  JSON_STRING: "json_string",
  RAW: "raw"
};
var RENDER_TYPE_MAP = {
  configUrl: RENDER_TYPE.STRING,
  deepLinking: RENDER_TYPE.RAW,
  presets: RENDER_TYPE.STRING_ARRAY,
  plugins: RENDER_TYPE.STRING_ARRAY,
  spec: RENDER_TYPE.JSON_STRING,
  url: RENDER_TYPE.STRING,
  urls: RENDER_TYPE.JSON_STRING,
  layout: RENDER_TYPE.STRING,
  docExpansion: RENDER_TYPE.STRING,
  maxDisplayedTags: RENDER_TYPE.RAW,
  operationsSorter: RENDER_TYPE.RAW,
  requestInterceptor: RENDER_TYPE.RAW,
  responseInterceptor: RENDER_TYPE.RAW,
  persistAuthorization: RENDER_TYPE.RAW,
  defaultModelsExpandDepth: RENDER_TYPE.RAW,
  defaultModelExpandDepth: RENDER_TYPE.RAW,
  defaultModelRendering: RENDER_TYPE.STRING,
  displayRequestDuration: RENDER_TYPE.RAW,
  filter: RENDER_TYPE.RAW,
  showExtensions: RENDER_TYPE.RAW,
  showCommonExtensions: RENDER_TYPE.RAW,
  queryConfigEnabled: RENDER_TYPE.RAW,
  displayOperationId: RENDER_TYPE.RAW,
  tagsSorter: RENDER_TYPE.RAW,
  onComplete: RENDER_TYPE.RAW,
  syntaxHighlight: RENDER_TYPE.JSON_STRING,
  tryItOutEnabled: RENDER_TYPE.RAW,
  requestSnippetsEnabled: RENDER_TYPE.RAW,
  requestSnippets: RENDER_TYPE.JSON_STRING,
  oauth2RedirectUrl: RENDER_TYPE.STRING,
  showMutabledRequest: RENDER_TYPE.RAW,
  request: RENDER_TYPE.JSON_STRING,
  supportedSubmitMethods: RENDER_TYPE.JSON_STRING,
  validatorUrl: RENDER_TYPE.STRING,
  withCredentials: RENDER_TYPE.RAW,
  modelPropertyMacro: RENDER_TYPE.RAW,
  parameterMacro: RENDER_TYPE.RAW
};
var renderSwaggerUIOptions = /* @__PURE__ */ __name((options) => {
  return Object.entries(options).map(([k, v]) => {
    const key = k;
    if (!RENDER_TYPE_MAP[key] || v === void 0) return "";
    switch (RENDER_TYPE_MAP[key]) {
      case RENDER_TYPE.STRING:
        return `${key}: '${v}'`;
      case RENDER_TYPE.STRING_ARRAY:
        if (!Array.isArray(v)) return "";
        return `${key}: [${v.map((ve) => `${ve}`).join(",")}]`;
      case RENDER_TYPE.JSON_STRING:
        return `${key}: ${JSON.stringify(v)}`;
      case RENDER_TYPE.RAW:
        return `${key}: ${v}`;
      default:
        return "";
    }
  }).filter((item) => item !== "").join(",");
}, "renderSwaggerUIOptions");
var DEFAULT_CDN_BASE = "https://cdn.jsdelivr.net/npm";
var remoteAssets = /* @__PURE__ */ __name(({ baseUrl = DEFAULT_CDN_BASE, version }) => {
  const url = `${baseUrl.replace(/\/$/, "")}/swagger-ui-dist${version !== void 0 ? `@${version}` : ""}`;
  return {
    css: [`${url}/swagger-ui.css`],
    js: [`${url}/swagger-ui-bundle.js`]
  };
}, "remoteAssets");
var SwaggerUI = /* @__PURE__ */ __name(({ baseUrl, version, ...options }) => {
  const asset = remoteAssets({
    baseUrl,
    version
  });
  if (options.manuallySwaggerUIHtml) return options.manuallySwaggerUIHtml(asset);
  const optionsStrings = renderSwaggerUIOptions(options);
  return `
    <div>
      <div id="swagger-ui"></div>
      ${asset.css.map((url) => html`<link rel="stylesheet" href="${url}" />`)}
      ${asset.js.map((url) => html`<script src="${url}" crossorigin="anonymous"><\/script>`)}
      <script>
        window.onload = () => {
          window.ui = SwaggerUIBundle({
            dom_id: '#swagger-ui',${optionsStrings},
          })
        }
      <\/script>
    </div>
  `;
}, "SwaggerUI");
var middleware = /* @__PURE__ */ __name((options) => async (c) => {
  const title = options?.title ?? "SwaggerUI";
  return c.html(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="SwaggerUI" />
          <title>${title}</title>
        </head>
        <body>
          ${SwaggerUI(options)}
        </body>
      </html>
    `);
}, "middleware");

// packages/api/src/routes/docs.ts
var router2 = new Hono2();
var spec = {
  openapi: "3.0.0",
  info: {
    title: "Filipino Food API",
    version: "0.2.0",
    description: "An open-source REST API for Filipino cuisine data."
  },
  paths: {
    "/": {
      get: {
        summary: "Health check",
        responses: {
          "200": { description: "API is running" }
        }
      }
    },
    "/dishes": {
      get: {
        summary: "List all dishes",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer" } },
          { name: "limit", in: "query", schema: { type: "integer" } },
          { name: "type", in: "query", schema: { type: "string" } },
          { name: "occasion", in: "query", schema: { type: "string" } },
          { name: "region", in: "query", schema: { type: "string" } }
        ],
        responses: {
          "200": { description: "Paginated list of dishes" }
        }
      }
    },
    "/dishes/search": {
      get: {
        summary: "Search dishes",
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { description: "Matching dishes" },
          "400": { description: "Missing query parameter" }
        }
      }
    },
    "/dishes/regions": {
      get: {
        summary: "List all regions with dish counts",
        responses: {
          "200": { description: "List of regions" }
        }
      }
    },
    "/dishes/{id}": {
      get: {
        summary: "Get a single dish by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { description: "Dish data" },
          "404": { description: "Dish not found" }
        }
      }
    }
  }
};
router2.get("/", middleware({ url: "/docs/spec" }));
router2.get("/spec", (c) => c.json(spec));
var docs_default = router2;

// packages/api/src/middleware/rateLimit.ts
var import_checked_fetch30 = __toESM(require_checked_fetch());
var WINDOW_MS = 60 * 1e3;
var MAX_REQUESTS = 60;
async function rateLimit(c, next) {
  const kv = c.env?.RATE_LIMIT;
  if (!kv) {
    await next();
    return;
  }
  const ip = c.req.header("cf-connecting-ip") ?? "unknown";
  const key = `rate:${ip}`;
  const now = Date.now();
  const raw2 = await kv.get(key);
  const data = raw2 ? JSON.parse(raw2) : { count: 0, start: now };
  if (now - data.start > WINDOW_MS) {
    data.count = 0;
    data.start = now;
  }
  if (data.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - data.start)) / 1e3);
    return c.json({ error: "Rate limit exceeded" }, 429, {
      "Retry-After": String(retryAfter)
    });
  }
  data.count++;
  await kv.put(key, JSON.stringify(data), { expirationTtl: 60 });
  await next();
}
__name(rateLimit, "rateLimit");

// packages/api/src/index.ts
var app = new Hono2();
app.use("*", rateLimit);
app.get("/", (c) => {
  return c.json({
    status: "ok",
    message: "Filipino Food API",
    version: "0.2.0",
    author: "ryodgie",
    repository: "https://github.com/eigdoyr/filipino-food-api",
    license: "MIT"
  });
});
app.route("/dishes", dishes_default2);
app.route("/docs", docs_default);
var src_default = app;

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var import_checked_fetch32 = __toESM(require_checked_fetch());
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
var import_checked_fetch33 = __toESM(require_checked_fetch());
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-NmcT8D/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var import_checked_fetch35 = __toESM(require_checked_fetch());
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-NmcT8D/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware2 of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware2);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware2 of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware2);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
