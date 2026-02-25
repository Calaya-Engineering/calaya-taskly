(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/calaya-taskly/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    assign: null,
    searchParamsToUrlQuery: null,
    urlQueryToSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    assign: function() {
        return assign;
    },
    searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
    },
    urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
    }
});
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    for (const [key, value] of searchParams.entries()){
        const existing = query[key];
        if (typeof existing === 'undefined') {
            query[key] = value;
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            query[key] = [
                existing,
                value
            ];
        }
    }
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === 'string') {
        return param;
    }
    if (typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
        return String(param);
    } else {
        return '';
    }
}
function urlQueryToSearchParams(query) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)){
        if (Array.isArray(value)) {
            for (const item of value){
                searchParams.append(key, stringifyUrlQueryParam(item));
            }
        } else {
            searchParams.set(key, stringifyUrlQueryParam(value));
        }
    }
    return searchParams;
}
function assign(target, ...searchParamsList) {
    for (const searchParams of searchParamsList){
        for (const key of searchParams.keys()){
            target.delete(key);
        }
        for (const [key, value] of searchParams.entries()){
            target.append(key, value);
        }
    }
    return target;
} //# sourceMappingURL=querystring.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatUrl: null,
    formatWithValidation: null,
    urlObjectKeys: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatUrl: function() {
        return formatUrl;
    },
    formatWithValidation: function() {
        return formatWithValidation;
    },
    urlObjectKeys: function() {
        return urlObjectKeys;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/Desktop/calaya-taskly/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _querystring = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/Desktop/calaya-taskly/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)"));
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth, hostname } = urlObj;
    let protocol = urlObj.protocol || '';
    let pathname = urlObj.pathname || '';
    let hash = urlObj.hash || '';
    let query = urlObj.query || '';
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);
        if (urlObj.port) {
            host += ':' + urlObj.port;
        }
    }
    if (query && typeof query === 'object') {
        query = String(_querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && `?${query}` || '';
    if (protocol && !protocol.endsWith(':')) protocol += ':';
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
    } else if (!host) {
        host = '';
    }
    if (hash && hash[0] !== '#') hash = '#' + hash;
    if (search && search[0] !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace('#', '%23');
    return `${protocol}${host}${pathname}${search}${hash}`;
}
const urlObjectKeys = [
    'auth',
    'hash',
    'host',
    'hostname',
    'href',
    'path',
    'pathname',
    'port',
    'protocol',
    'query',
    'search',
    'slashes'
];
function formatWithValidation(url) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (url !== null && typeof url === 'object') {
            Object.keys(url).forEach((key)=>{
                if (!urlObjectKeys.includes(key)) {
                    console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
                }
            });
        }
    }
    return formatUrl(url);
} //# sourceMappingURL=format-url.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMergedRef", {
    enumerable: true,
    get: function() {
        return useMergedRef;
    }
});
const _react = __turbopack_context__.r("[project]/Desktop/calaya-taskly/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(null);
    const cleanupB = (0, _react.useRef)(null);
    // NOTE: In theory, we could skip the wrapping if only one of the refs is non-null.
    // (this happens often if the user doesn't pass a ref to Link/Form/Image)
    // But this can cause us to leak a cleanup-ref into user code (previously via `<Link legacyBehavior>`),
    // and the user might pass that ref into ref-merging library that doesn't support cleanup refs
    // (because it hasn't been updated for React 19)
    // which can then cause things to blow up, because a cleanup-returning ref gets called with `null`.
    // So in practice, it's safer to be defensive and always wrap the ref, even on React 19.
    return (0, _react.useCallback)((current)=>{
        if (current === null) {
            const cleanupFnA = cleanupA.current;
            if (cleanupFnA) {
                cleanupA.current = null;
                cleanupFnA();
            }
            const cleanupFnB = cleanupB.current;
            if (cleanupFnB) {
                cleanupB.current = null;
                cleanupFnB();
            }
        } else {
            if (refA) {
                cleanupA.current = applyRef(refA, current);
            }
            if (refB) {
                cleanupB.current = applyRef(refB, current);
            }
        }
    }, [
        refA,
        refB
    ]);
}
function applyRef(refA, current) {
    if (typeof refA === 'function') {
        const cleanup = refA(current);
        if (typeof cleanup === 'function') {
            return cleanup;
        } else {
            return ()=>refA(null);
        }
    } else {
        refA.current = current;
        return ()=>{
            refA.current = null;
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-merged-ref.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DecodeError: null,
    MiddlewareNotFoundError: null,
    MissingStaticPage: null,
    NormalizeError: null,
    PageNotFoundError: null,
    SP: null,
    ST: null,
    WEB_VITALS: null,
    execOnce: null,
    getDisplayName: null,
    getLocationOrigin: null,
    getURL: null,
    isAbsoluteUrl: null,
    isResSent: null,
    loadGetInitialProps: null,
    normalizeRepeatedSlashes: null,
    stringifyError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DecodeError: function() {
        return DecodeError;
    },
    MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
    },
    MissingStaticPage: function() {
        return MissingStaticPage;
    },
    NormalizeError: function() {
        return NormalizeError;
    },
    PageNotFoundError: function() {
        return PageNotFoundError;
    },
    SP: function() {
        return SP;
    },
    ST: function() {
        return ST;
    },
    WEB_VITALS: function() {
        return WEB_VITALS;
    },
    execOnce: function() {
        return execOnce;
    },
    getDisplayName: function() {
        return getDisplayName;
    },
    getLocationOrigin: function() {
        return getLocationOrigin;
    },
    getURL: function() {
        return getURL;
    },
    isAbsoluteUrl: function() {
        return isAbsoluteUrl;
    },
    isResSent: function() {
        return isResSent;
    },
    loadGetInitialProps: function() {
        return loadGetInitialProps;
    },
    normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
    },
    stringifyError: function() {
        return stringifyError;
    }
});
const WEB_VITALS = [
    'CLS',
    'FCP',
    'FID',
    'INP',
    'LCP',
    'TTFB'
];
function execOnce(fn) {
    let used = false;
    let result;
    return (...args)=>{
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? `?${urlParts.slice(1).join('?')}` : '');
}
async function loadGetInitialProps(App, ctx) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (App.prototype?.getInitialProps) {
            const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
        }
    }
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = `Cannot find module for page: ${page}`;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = `Failed to load static file for page: ${page} ${message}`;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = `Cannot find the middleware module`;
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isLocalURL", {
    enumerable: true,
    get: function() {
        return isLocalURL;
    }
});
const _utils = __turbopack_context__.r("[project]/Desktop/calaya-taskly/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _hasbasepath = __turbopack_context__.r("[project]/Desktop/calaya-taskly/node_modules/next/dist/client/has-base-path.js [app-client] (ecmascript)");
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (!(0, _utils.isAbsoluteUrl)(url)) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils.getLocationOrigin)();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
    } catch (_) {
        return false;
    }
} //# sourceMappingURL=is-local-url.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "errorOnce", {
    enumerable: true,
    get: function() {
        return errorOnce;
    }
});
let errorOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const errors = new Set();
    errorOnce = (msg)=>{
        if (!errors.has(msg)) {
            console.error(msg);
        }
        errors.add(msg);
    };
} //# sourceMappingURL=error-once.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    useLinkStatus: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    /**
 * A React component that extends the HTML `<a>` element to provide
 * [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
 * and client-side navigation. This is the primary way to navigate between routes in Next.js.
 *
 * @remarks
 * - Prefetching is only enabled in production.
 *
 * @see https://nextjs.org/docs/app/api-reference/components/link
 */ default: function() {
        return LinkComponent;
    },
    useLinkStatus: function() {
        return useLinkStatus;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/Desktop/calaya-taskly/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/Desktop/calaya-taskly/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/Desktop/calaya-taskly/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _formaturl = __turbopack_context__.r("[project]/Desktop/calaya-taskly/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/Desktop/calaya-taskly/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _usemergedref = __turbopack_context__.r("[project]/Desktop/calaya-taskly/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/Desktop/calaya-taskly/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _addbasepath = __turbopack_context__.r("[project]/Desktop/calaya-taskly/node_modules/next/dist/client/add-base-path.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/Desktop/calaya-taskly/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _links = __turbopack_context__.r("[project]/Desktop/calaya-taskly/node_modules/next/dist/client/components/links.js [app-client] (ecmascript)");
const _islocalurl = __turbopack_context__.r("[project]/Desktop/calaya-taskly/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)");
const _types = __turbopack_context__.r("[project]/Desktop/calaya-taskly/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)");
const _erroronce = __turbopack_context__.r("[project]/Desktop/calaya-taskly/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)");
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute('target');
    return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate) {
    if (typeof window !== 'undefined') {
        const { nodeName } = e.currentTarget;
        // anchors inside an svg have a lowercase nodeName
        const isAnchorNodeName = nodeName.toUpperCase() === 'A';
        if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute('download')) {
            // ignore click for browser’s default behavior
            return;
        }
        if (!(0, _islocalurl.isLocalURL)(href)) {
            if (replace) {
                // browser default behavior does not replace the history state
                // so we need to do it manually
                e.preventDefault();
                location.replace(href);
            }
            // ignore click for browser’s default behavior
            return;
        }
        e.preventDefault();
        if (onNavigate) {
            let isDefaultPrevented = false;
            onNavigate({
                preventDefault: ()=>{
                    isDefaultPrevented = true;
                }
            });
            if (isDefaultPrevented) {
                return;
            }
        }
        const { dispatchNavigateAction } = __turbopack_context__.r("[project]/Desktop/calaya-taskly/node_modules/next/dist/client/components/app-router-instance.js [app-client] (ecmascript)");
        _react.default.startTransition(()=>{
            dispatchNavigateAction(as || href, replace ? 'replace' : 'push', scroll ?? true, linkInstanceRef.current);
        });
    }
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === 'string') {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
function LinkComponent(props) {
    const [linkStatus, setOptimisticLinkStatus] = (0, _react.useOptimistic)(_links.IDLE_LINK_STATUS);
    let children;
    const linkInstanceRef = (0, _react.useRef)(null);
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, onNavigate, ref: forwardedRef, unstable_dynamicOnHover, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === 'string' || typeof children === 'number')) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            children: children
        });
    }
    const router = _react.default.useContext(_approutercontextsharedruntime.AppRouterContext);
    const prefetchEnabled = prefetchProp !== false;
    const fetchStrategy = prefetchProp !== false ? getFetchStrategyFromPrefetchProp(prefetchProp) : _types.FetchStrategy.PPR;
    if ("TURBOPACK compile-time truthy", 1) {
        function createPropError(args) {
            return Object.defineProperty(new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (typeof window !== 'undefined' ? "\nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                value: "E319",
                enumerable: false,
                configurable: true
            });
        }
        // TypeScript trick for type-guarding:
        const requiredPropsGuard = {
            href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key)=>{
            if (key === 'href') {
                if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: props[key] === null ? 'null' : typeof props[key]
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
        // TypeScript trick for type-guarding:
        const optionalPropsGuard = {
            as: true,
            replace: true,
            scroll: true,
            shallow: true,
            passHref: true,
            prefetch: true,
            unstable_dynamicOnHover: true,
            onClick: true,
            onMouseEnter: true,
            onTouchStart: true,
            legacyBehavior: true,
            onNavigate: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key)=>{
            const valType = typeof props[key];
            if (key === 'as') {
                if (props[key] && valType !== 'string' && valType !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: valType
                    });
                }
            } else if (key === 'onClick' || key === 'onMouseEnter' || key === 'onTouchStart' || key === 'onNavigate') {
                if (props[key] && valType !== 'function') {
                    throw createPropError({
                        key,
                        expected: '`function`',
                        actual: valType
                    });
                }
            } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'legacyBehavior' || key === 'unstable_dynamicOnHover') {
                if (props[key] != null && valType !== 'boolean') {
                    throw createPropError({
                        key,
                        expected: '`boolean`',
                        actual: valType
                    });
                }
            } else if (key === 'prefetch') {
                if (props[key] != null && valType !== 'boolean' && props[key] !== 'auto') {
                    throw createPropError({
                        key,
                        expected: '`boolean | "auto"`',
                        actual: valType
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (props.locale) {
            (0, _warnonce.warnOnce)('The `locale` prop is not supported in `next/link` while using the `app` router. Read more about app router internalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization');
        }
        if (!asProp) {
            let href;
            if (typeof hrefProp === 'string') {
                href = hrefProp;
            } else if (typeof hrefProp === 'object' && typeof hrefProp.pathname === 'string') {
                href = hrefProp.pathname;
            }
            if (href) {
                const hasDynamicSegment = href.split('/').some((segment)=>segment.startsWith('[') && segment.endsWith(']'));
                if (hasDynamicSegment) {
                    throw Object.defineProperty(new Error(`Dynamic href \`${href}\` found in <Link> while using the \`/app\` router, this is not supported. Read more: https://nextjs.org/docs/messages/app-dir-dynamic-href`), "__NEXT_ERROR_CODE", {
                        value: "E267",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
    }
    const { href, as } = _react.default.useMemo({
        "LinkComponent.useMemo": ()=>{
            const resolvedHref = formatStringOrUrl(hrefProp);
            return {
                href: resolvedHref,
                as: asProp ? formatStringOrUrl(asProp) : resolvedHref
            };
        }
    }["LinkComponent.useMemo"], [
        hrefProp,
        asProp
    ]);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if (children?.$$typeof === Symbol.for('react.lazy')) {
            throw Object.defineProperty(new Error(`\`<Link legacyBehavior>\` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's \`<a>\` tag.`), "__NEXT_ERROR_CODE", {
                value: "E863",
                enumerable: false,
                configurable: true
            });
        }
        if ("TURBOPACK compile-time truthy", 1) {
            if (onClick) {
                console.warn(`"onClick" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link`);
            }
            if (onMouseEnterProp) {
                console.warn(`"onMouseEnter" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link`);
            }
            try {
                child = _react.default.Children.only(children);
            } catch (err) {
                if (!children) {
                    throw Object.defineProperty(new Error(`No children were passed to <Link> with \`href\` of \`${hrefProp}\` but one child is required https://nextjs.org/docs/messages/link-no-children`), "__NEXT_ERROR_CODE", {
                        value: "E320",
                        enumerable: false,
                        configurable: true
                    });
                }
                throw Object.defineProperty(new Error(`Multiple children were passed to <Link> with \`href\` of \`${hrefProp}\` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children` + (typeof window !== 'undefined' ? " \nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                    value: "E266",
                    enumerable: false,
                    configurable: true
                });
            }
        } else //TURBOPACK unreachable
        ;
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if (children?.type === 'a') {
                throw Object.defineProperty(new Error('Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor'), "__NEXT_ERROR_CODE", {
                    value: "E209",
                    enumerable: false,
                    configurable: true
                });
            }
        }
    }
    const childRef = legacyBehavior ? child && typeof child === 'object' && child.ref : forwardedRef;
    // Use a callback ref to attach an IntersectionObserver to the anchor tag on
    // mount. In the future we will also use this to keep track of all the
    // currently mounted <Link> instances, e.g. so we can re-prefetch them after
    // a revalidation or refresh.
    const observeLinkVisibilityOnMount = _react.default.useCallback({
        "LinkComponent.useCallback[observeLinkVisibilityOnMount]": (element)=>{
            if (router !== null) {
                linkInstanceRef.current = (0, _links.mountLinkInstance)(element, href, router, fetchStrategy, prefetchEnabled, setOptimisticLinkStatus);
            }
            return ({
                "LinkComponent.useCallback[observeLinkVisibilityOnMount]": ()=>{
                    if (linkInstanceRef.current) {
                        (0, _links.unmountLinkForCurrentNavigation)(linkInstanceRef.current);
                        linkInstanceRef.current = null;
                    }
                    (0, _links.unmountPrefetchableInstance)(element);
                }
            })["LinkComponent.useCallback[observeLinkVisibilityOnMount]"];
        }
    }["LinkComponent.useCallback[observeLinkVisibilityOnMount]"], [
        prefetchEnabled,
        href,
        router,
        fetchStrategy,
        setOptimisticLinkStatus
    ]);
    const mergedRef = (0, _usemergedref.useMergedRef)(observeLinkVisibilityOnMount, childRef);
    const childProps = {
        ref: mergedRef,
        onClick (e) {
            if ("TURBOPACK compile-time truthy", 1) {
                if (!e) {
                    throw Object.defineProperty(new Error(`Component rendered inside next/link has to pass click event to "onClick" prop.`), "__NEXT_ERROR_CODE", {
                        value: "E312",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            if (!legacyBehavior && typeof onClick === 'function') {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === 'function') {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === 'function') {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === 'function') {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ("TURBOPACK compile-time truthy", 1) {
                return;
            }
            //TURBOPACK unreachable
            ;
            const upgradeToDynamicPrefetch = undefined;
        },
        onTouchStart: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : function onTouchStart(e) {
            if (!legacyBehavior && typeof onTouchStartProp === 'function') {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === 'function') {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled) {
                return;
            }
            const upgradeToDynamicPrefetch = unstable_dynamicOnHover === true;
            (0, _links.onNavigationIntent)(e.currentTarget, upgradeToDynamicPrefetch);
        }
    };
    // If the url is absolute, we can bypass the logic to prepend the basePath.
    if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === 'a' && !('href' in child.props)) {
        childProps.href = (0, _addbasepath.addBasePath)(as);
    }
    let link;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            (0, _erroronce.errorOnce)('`legacyBehavior` is deprecated and will be removed in a future ' + 'release. A codemod is available to upgrade your components:\n\n' + 'npx @next/codemod@latest new-link .\n\n' + 'Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components');
        }
        link = /*#__PURE__*/ _react.default.cloneElement(child, childProps);
    } else {
        link = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            ...restProps,
            ...childProps,
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(LinkStatusContext.Provider, {
        value: linkStatus,
        children: link
    });
}
const LinkStatusContext = /*#__PURE__*/ (0, _react.createContext)(_links.IDLE_LINK_STATUS);
const useLinkStatus = ()=>{
    return (0, _react.useContext)(LinkStatusContext);
};
function getFetchStrategyFromPrefetchProp(prefetchProp) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return prefetchProp === null || prefetchProp === 'auto' ? _types.FetchStrategy.PPR : // (although invalid values should've been filtered out by prop validation in dev)
        _types.FetchStrategy.Full;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/react/dist/esm/HugeiconsIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HugeiconsIcon",
    ()=>HugeiconsIcon,
    "default",
    ()=>HugeiconsIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
const defaultAttributes = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none'
};
const HugeiconsIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(({ color = 'currentColor', size = 24, strokeWidth, absoluteStrokeWidth = false, className = '', altIcon, showAlt = false, icon, primaryColor, secondaryColor, disableSecondaryOpacity = false, ...rest }, ref)=>{
    const calculatedStrokeWidth = strokeWidth !== undefined ? absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth : undefined;
    const strokeProps = calculatedStrokeWidth !== undefined ? {
        strokeWidth: calculatedStrokeWidth,
        stroke: 'currentColor'
    } : {};
    const elementProps = {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        color: primaryColor || color,
        className,
        ...strokeProps,
        ...rest
    };
    const currentIcon = showAlt && altIcon ? altIcon : icon;
    // Create SVG children with color handling for two-tone icons
    const svgChildren = [
        ...currentIcon
    ].sort(([, a], [, b])=>{
        const hasOpacityA = a.opacity !== undefined;
        const hasOpacityB = b.opacity !== undefined;
        return hasOpacityB ? 1 : hasOpacityA ? -1 : 0;
    }).map(([tag, attrs])=>{
        const isSecondaryPath = attrs.opacity !== undefined;
        const pathOpacity = isSecondaryPath && !disableSecondaryOpacity ? attrs.opacity : undefined;
        // Handle both stroke and fill properties based on element type
        const fillProps = secondaryColor ? {
            ...attrs.stroke !== undefined ? {
                stroke: isSecondaryPath ? secondaryColor : primaryColor || color
            } : {
                fill: isSecondaryPath ? secondaryColor : primaryColor || color
            }
        } : {};
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(tag, {
            ...attrs,
            ...strokeProps,
            ...fillProps,
            opacity: pathOpacity,
            key: attrs.key
        });
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])('svg', elementProps, svgChildren);
});
HugeiconsIcon.displayName = 'HugeiconsIcon';
;
 //# sourceMappingURL=HugeiconsIcon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/react/dist/esm/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/react/dist/esm/HugeiconsIcon.js [app-client] (ecmascript)"); //# sourceMappingURL=index.js.map
;
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Add01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Add01Icon
]);
const Add01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M12.001 5.00003V19.002",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M19.002 12.002L4.99998 12.002",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ]
];
;
 //# sourceMappingURL=Add01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Add01Icon.js [app-client] (ecmascript) <export default as Add01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Add01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Add01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Add01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Add01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Archive01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Archive01Icon
]);
const Archive01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M10.0001 17V7C10.0001 5.11438 10.0001 4.17157 9.41427 3.58579C8.82849 3 7.88568 3 6.00005 3C4.11444 3 3.17163 3 2.58584 3.58578C2.00006 4.17157 2.00005 5.11437 2.00004 6.99998L2 17C1.99999 18.8856 1.99999 19.8284 2.58577 20.4142C3.17156 21 4.11438 21 6.00003 21C7.88567 21 8.82849 21 9.41427 20.4142C10.0001 19.8284 10.0001 18.8856 10.0001 17Z",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M21.4558 15.7091L19.0473 7.19224C18.572 5.51165 18.3343 4.67135 17.6838 4.2617C17.6312 4.22861 17.5772 4.19796 17.5218 4.16986C16.8358 3.82199 15.9877 4.04691 14.2916 4.49674C12.5529 4.95783 11.6836 5.18838 11.2632 5.84738C11.2293 5.90053 11.198 5.95524 11.1693 6.01134C10.8134 6.70684 11.057 7.5682 11.5442 9.2909L13.9527 17.8078C14.428 19.4884 14.6657 20.3287 15.3162 20.7383C15.3688 20.7714 15.4228 20.802 15.4782 20.8301C16.1642 21.178 17.0123 20.9531 18.7084 20.5033C20.4471 20.0422 21.3164 19.8116 21.7368 19.1526C21.7707 19.0995 21.802 19.0448 21.8307 18.9887C22.1866 18.2932 21.943 17.4318 21.4558 15.7091Z",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ],
    [
        "path",
        {
            d: "M6 17H6.00898",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            key: "2"
        }
    ],
    [
        "path",
        {
            d: "M2 7H10",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "3"
        }
    ],
    [
        "path",
        {
            d: "M17.9912 17.0034L17.9999 17.0011",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            key: "4"
        }
    ],
    [
        "path",
        {
            d: "M12 9.00019L19 7",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "5"
        }
    ]
];
;
 //# sourceMappingURL=Archive01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Archive01Icon.js [app-client] (ecmascript) <export default as Archive01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Archive01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Archive01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Archive01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Archive01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowDown01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ArrowDown01Icon
]);
const ArrowDown01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ]
];
;
 //# sourceMappingURL=ArrowDown01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowDown01Icon.js [app-client] (ecmascript) <export default as ArrowDown01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowDown01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowDown01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowDown01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowDown01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowRight01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ArrowRight01Icon
]);
const ArrowRight01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ]
];
;
 //# sourceMappingURL=ArrowRight01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowRight01Icon.js [app-client] (ecmascript) <export default as ArrowRight01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowRight01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowRight01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowRight01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowRight01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowUp01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ArrowUp01Icon
]);
const ArrowUp01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ]
];
;
 //# sourceMappingURL=ArrowUp01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowUp01Icon.js [app-client] (ecmascript) <export default as ArrowUp01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowUp01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowUp01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowUp01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowUp01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Attachment01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Attachment01Icon
]);
const Attachment01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M5.82338 12L4.27922 10.4558C2.57359 8.75022 2.57359 5.98485 4.27922 4.27922C5.98485 2.57359 8.75022 2.57359 10.4558 4.27922L19.7208 13.5442C21.4264 15.2498 21.4264 18.0152 19.7208 19.7208C18.0152 21.4264 15.2498 21.4264 13.5442 19.7208L10.0698 16.2464C9.00379 15.1804 9.00379 13.4521 10.0698 12.386C11.1358 11.32 12.8642 11.32 13.9302 12.386L15.8604 14.3162",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ]
];
;
 //# sourceMappingURL=Attachment01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Attachment01Icon.js [app-client] (ecmascript) <export default as Attachment01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Attachment01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Attachment01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Attachment01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Attachment01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Book01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Book01Icon
]);
const Book01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M20 22H6C4.89543 22 4 21.1046 4 20M4 20C4 18.8954 4.89543 18 6 18H18C19.1046 18 20 17.1046 20 16V2C20 3.10457 19.1046 4 18 4L10 4C7.17157 4 5.75736 4 4.87868 4.87868C4 5.75736 4 7.17157 4 10V20Z",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M18.5 18C18.5 18 17.5 18.7628 17.5 20C17.5 21.2372 18.5 22 18.5 22",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ],
    [
        "path",
        {
            d: "M9 4V8",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "2"
        }
    ]
];
;
 //# sourceMappingURL=Book01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Book01Icon.js [app-client] (ecmascript) <export default as Book01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Book01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Book01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Book01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Book01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Bookmark01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Bookmark01Icon
]);
const Bookmark01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M4 17.9808V9.70753C4 6.07416 4 4.25748 5.17157 3.12874C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.12874C20 4.25748 20 6.07416 20 9.70753V17.9808C20 20.2867 20 21.4396 19.2272 21.8523C17.7305 22.6514 14.9232 19.9852 13.59 19.1824C12.8168 18.7168 12.4302 18.484 12 18.484C11.5698 18.484 11.1832 18.7168 10.41 19.1824C9.0768 19.9852 6.26947 22.6514 4.77285 21.8523C4 21.4396 4 20.2867 4 17.9808Z",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M4 7H20",
            stroke: "currentColor",
            strokeWidth: "1.5",
            key: "1"
        }
    ]
];
;
 //# sourceMappingURL=Bookmark01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Bookmark01Icon.js [app-client] (ecmascript) <export default as Bookmark01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Bookmark01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Bookmark01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Bookmark01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Bookmark01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Building06Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Building06Icon
]);
const Building06Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M12 2H6C3.518 2 3 2.518 3 5V22H15V5C15 2.518 14.482 2 12 2Z",
            stroke: "currentColor",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M18 8H15V22H21V11C21 8.518 20.482 8 18 8Z",
            stroke: "currentColor",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ],
    [
        "path",
        {
            d: "M8 6L10 6M8 9L10 9M8 12L10 12",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "2"
        }
    ],
    [
        "path",
        {
            d: "M11.5 22V18C11.5 17.0572 11.5 16.5858 11.2071 16.2929C10.9142 16 10.4428 16 9.5 16H8.5C7.55719 16 7.08579 16 6.79289 16.2929C6.5 16.5858 6.5 17.0572 6.5 18V22",
            stroke: "currentColor",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "3"
        }
    ]
];
;
 //# sourceMappingURL=Building06Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Building06Icon.js [app-client] (ecmascript) <export default as Building06Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Building06Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Building06Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Building06Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Building06Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/BulbIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BulbIcon
]);
const BulbIcon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M5.14286 14C4.41735 12.8082 4 11.4118 4 9.91886C4 5.54539 7.58172 2 12 2C16.4183 2 20 5.54539 20 9.91886C20 11.4118 19.5827 12.8082 18.8571 14",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M14 10C13.3875 10.6432 12.7111 11 12 11C11.2889 11 10.6125 10.6432 10 10",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ],
    [
        "path",
        {
            d: "M7.38287 17.0982C7.291 16.8216 7.24507 16.6833 7.25042 16.5713C7.26174 16.3343 7.41114 16.1262 7.63157 16.0405C7.73579 16 7.88105 16 8.17157 16H15.8284C16.119 16 16.2642 16 16.3684 16.0405C16.5889 16.1262 16.7383 16.3343 16.7496 16.5713C16.7549 16.6833 16.709 16.8216 16.6171 17.0982C16.4473 17.6094 16.3624 17.8651 16.2315 18.072C15.9572 18.5056 15.5272 18.8167 15.0306 18.9408C14.7935 19 14.525 19 13.9881 19H10.0119C9.47495 19 9.2065 19 8.96944 18.9408C8.47283 18.8167 8.04281 18.5056 7.7685 18.072C7.63755 17.8651 7.55266 17.6094 7.38287 17.0982Z",
            stroke: "currentColor",
            strokeWidth: "1.5",
            key: "2"
        }
    ],
    [
        "path",
        {
            d: "M15 19L14.8707 19.6466C14.7293 20.3537 14.6586 20.7072 14.5001 20.9866C14.2552 21.4185 13.8582 21.7439 13.3866 21.8994C13.0816 22 12.7211 22 12 22C11.2789 22 10.9184 22 10.6134 21.8994C10.1418 21.7439 9.74484 21.4185 9.49987 20.9866C9.34144 20.7072 9.27073 20.3537 9.12932 19.6466L9 19",
            stroke: "currentColor",
            strokeWidth: "1.5",
            key: "3"
        }
    ],
    [
        "path",
        {
            d: "M12 15.5V11",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "4"
        }
    ]
];
;
 //# sourceMappingURL=BulbIcon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/BulbIcon.js [app-client] (ecmascript) <export default as BulbIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BulbIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$BulbIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$BulbIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/BulbIcon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Calendar01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Calendar01Icon
]);
const Calendar01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M16 2V6M8 2V6",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ],
    [
        "path",
        {
            d: "M3 10H21",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "2"
        }
    ],
    [
        "path",
        {
            d: "M10 18.5002L9.99999 13.8474C9.99999 13.6557 9.86325 13.5002 9.69458 13.5002H9M14 18.4983L15.4855 13.8923C15.4951 13.8626 15.5 13.8315 15.5 13.8002C15.5 13.6346 15.3657 13.5002 15.2 13.5002L13 13.5",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "3"
        }
    ]
];
;
 //# sourceMappingURL=Calendar01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Calendar01Icon.js [app-client] (ecmascript) <export default as Calendar01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Calendar01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Calendar01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Calendar01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Calendar01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Call02Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Call02Icon
]);
const Call02Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M9.1585 5.71217L8.75584 4.80619C8.49256 4.21382 8.36092 3.91762 8.16405 3.69095C7.91732 3.40688 7.59571 3.19788 7.23592 3.08779C6.94883 2.99994 6.6247 2.99994 5.97645 2.99994C5.02815 2.99994 4.554 2.99994 4.15597 3.18223C3.68711 3.39696 3.26368 3.86322 3.09497 4.35054C2.95175 4.76423 2.99278 5.18937 3.07482 6.03964C3.94815 15.0901 8.91006 20.052 17.9605 20.9254C18.8108 21.0074 19.236 21.0484 19.6496 20.9052C20.137 20.7365 20.6032 20.3131 20.818 19.8442C21.0002 19.4462 21.0002 18.972 21.0002 18.0237C21.0002 17.3755 21.0002 17.0514 20.9124 16.7643C20.8023 16.4045 20.5933 16.0829 20.3092 15.8361C20.0826 15.6393 19.7864 15.5076 19.194 15.2443L18.288 14.8417C17.6465 14.5566 17.3257 14.414 16.9998 14.383C16.6878 14.3533 16.3733 14.3971 16.0813 14.5108C15.7762 14.6296 15.5066 14.8543 14.9672 15.3038C14.4304 15.7511 14.162 15.9748 13.834 16.0946C13.5432 16.2009 13.1588 16.2402 12.8526 16.1951C12.5071 16.1442 12.2426 16.0028 11.7135 15.7201C10.0675 14.8404 9.15977 13.9327 8.28011 12.2867C7.99738 11.7576 7.85602 11.4931 7.80511 11.1476C7.75998 10.8414 7.79932 10.457 7.90554 10.1662C8.02536 9.83822 8.24905 9.5698 8.69643 9.03294C9.14586 8.49362 9.37058 8.22396 9.48939 7.91885C9.60309 7.62688 9.64686 7.31234 9.61719 7.00042C9.58618 6.67446 9.44362 6.3537 9.1585 5.71217Z",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ]
];
;
 //# sourceMappingURL=Call02Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Call02Icon.js [app-client] (ecmascript) <export default as Call02Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Call02Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Call02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Call02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Call02Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Cancel01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Cancel01Icon
]);
const Cancel01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M18 6L6.00081 17.9992M17.9992 18L6 6.00085",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ]
];
;
 //# sourceMappingURL=Cancel01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Cancel01Icon.js [app-client] (ecmascript) <export default as Cancel01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Cancel01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Cancel01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Cancel01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Cancel01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/CancelCircleIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CancelCircleIcon
]);
const CancelCircleIcon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M14.9994 15L9 9M9.00064 15L15 9",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ]
];
;
 //# sourceMappingURL=CancelCircleIcon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/CancelCircleIcon.js [app-client] (ecmascript) <export default as CancelCircleIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CancelCircleIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CancelCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CancelCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/CancelCircleIcon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/ChartHistogramIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChartHistogramIcon
]);
const ChartHistogramIcon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M21 21H10C6.70017 21 5.05025 21 4.02513 19.9749C3 18.9497 3 17.2998 3 14V3",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M13 10L13 21",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ],
    [
        "path",
        {
            d: "M18 13L18 21",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "2"
        }
    ],
    [
        "path",
        {
            d: "M8 13L8 20",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "3"
        }
    ],
    [
        "path",
        {
            d: "M21 7.98693C19.16 7.98693 17.1922 8.24252 15.8771 6.49346C14.3798 4.50218 11.6202 4.50218 10.1229 6.49346C8.80782 8.24252 6.84003 7.98693 5 7.98693H3",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "4"
        }
    ]
];
;
 //# sourceMappingURL=ChartHistogramIcon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/ChartHistogramIcon.js [app-client] (ecmascript) <export default as ChartHistogramIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChartHistogramIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ChartHistogramIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ChartHistogramIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/ChartHistogramIcon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/CheckmarkBadge01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CheckmarkBadge01Icon
]);
const CheckmarkBadge01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M18.9905 19H19M18.9905 19C18.3678 19.6175 17.2393 19.4637 16.4479 19.4637C15.4765 19.4637 15.0087 19.6537 14.3154 20.347C13.7251 20.9374 12.9337 22 12 22C11.0663 22 10.2749 20.9374 9.68457 20.347C8.99128 19.6537 8.52349 19.4637 7.55206 19.4637C6.76068 19.4637 5.63218 19.6175 5.00949 19C4.38181 18.3776 4.53628 17.2444 4.53628 16.4479C4.53628 15.4414 4.31616 14.9786 3.59938 14.2618C2.53314 13.1956 2.00002 12.6624 2 12C2.00001 11.3375 2.53312 10.8044 3.59935 9.73817C4.2392 9.09832 4.53628 8.46428 4.53628 7.55206C4.53628 6.76065 4.38249 5.63214 5 5.00944C5.62243 4.38178 6.7556 4.53626 7.55208 4.53626C8.46427 4.53626 9.09832 4.2392 9.73815 3.59937C10.8044 2.53312 11.3375 2 12 2C12.6625 2 13.1956 2.53312 14.2618 3.59937C14.9015 4.23907 15.5355 4.53626 16.4479 4.53626C17.2393 4.53626 18.3679 4.38247 18.9906 5C19.6182 5.62243 19.4637 6.75559 19.4637 7.55206C19.4637 8.55858 19.6839 9.02137 20.4006 9.73817C21.4669 10.8044 22 11.3375 22 12C22 12.6624 21.4669 13.1956 20.4006 14.2618C19.6838 14.9786 19.4637 15.4414 19.4637 16.4479C19.4637 17.2444 19.6182 18.3776 18.9905 19Z",
            stroke: "currentColor",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M9 12.8929C9 12.8929 10.2 13.5447 10.8 14.5C10.8 14.5 12.6 10.75 15 9.5",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ]
];
;
 //# sourceMappingURL=CheckmarkBadge01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/CheckmarkBadge01Icon.js [app-client] (ecmascript) <export default as CheckmarkBadge01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckmarkBadge01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CheckmarkBadge01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CheckmarkBadge01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/CheckmarkBadge01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/CheckmarkCircle02Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CheckmarkCircle02Icon
]);
const CheckmarkCircle02Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z",
            stroke: "currentColor",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M8 12.5L10.5 15L16 9",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ]
];
;
 //# sourceMappingURL=CheckmarkCircle02Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/CheckmarkCircle02Icon.js [app-client] (ecmascript) <export default as CheckmarkCircle02Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckmarkCircle02Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CheckmarkCircle02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CheckmarkCircle02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/CheckmarkCircle02Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/DashboardSquare02Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardSquare02Icon
]);
const DashboardSquare02Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M10.5 8.75V6.75C10.5 5.10626 10.5 4.28439 10.046 3.73121C9.96291 3.62995 9.87005 3.53709 9.76879 3.45398C9.21561 3 8.39374 3 6.75 3C5.10626 3 4.28439 3 3.73121 3.45398C3.62995 3.53709 3.53709 3.62995 3.45398 3.73121C3 4.28439 3 5.10626 3 6.75V8.75C3 10.3937 3 11.2156 3.45398 11.7688C3.53709 11.8701 3.62995 11.9629 3.73121 12.046C4.28439 12.5 5.10626 12.5 6.75 12.5C8.39374 12.5 9.21561 12.5 9.76879 12.046C9.87005 11.9629 9.96291 11.8701 10.046 11.7688C10.5 11.2156 10.5 10.3937 10.5 8.75Z",
            stroke: "currentColor",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M7.75 15.5H5.75C5.05222 15.5 4.70333 15.5 4.41943 15.5861C3.78023 15.78 3.28002 16.2802 3.08612 16.9194C3 17.2033 3 17.5522 3 18.25C3 18.9478 3 19.2967 3.08612 19.5806C3.28002 20.2198 3.78023 20.72 4.41943 20.9139C4.70333 21 5.05222 21 5.75 21H7.75C8.44778 21 8.79667 21 9.08057 20.9139C9.71977 20.72 10.22 20.2198 10.4139 19.5806C10.5 19.2967 10.5 18.9478 10.5 18.25C10.5 17.5522 10.5 17.2033 10.4139 16.9194C10.22 16.2802 9.71977 15.78 9.08057 15.5861C8.79667 15.5 8.44778 15.5 7.75 15.5Z",
            stroke: "currentColor",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ],
    [
        "path",
        {
            d: "M21 17.25V15.25C21 13.6063 21 12.7844 20.546 12.2312C20.4629 12.1299 20.3701 12.0371 20.2688 11.954C19.7156 11.5 18.8937 11.5 17.25 11.5C15.6063 11.5 14.7844 11.5 14.2312 11.954C14.1299 12.0371 14.0371 12.1299 13.954 12.2312C13.5 12.7844 13.5 13.6063 13.5 15.25V17.25C13.5 18.8937 13.5 19.7156 13.954 20.2688C14.0371 20.3701 14.1299 20.4629 14.2312 20.546C14.7844 21 15.6063 21 17.25 21C18.8937 21 19.7156 21 20.2688 20.546C20.3701 20.4629 20.4629 20.3701 20.546 20.2688C21 19.7156 21 18.8937 21 17.25Z",
            stroke: "currentColor",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "2"
        }
    ],
    [
        "path",
        {
            d: "M18.25 3H16.25C15.5522 3 15.2033 3 14.9194 3.08612C14.2802 3.28002 13.78 3.78023 13.5861 4.41943C13.5 4.70333 13.5 5.05222 13.5 5.75C13.5 6.44778 13.5 6.79667 13.5861 7.08057C13.78 7.71977 14.2802 8.21998 14.9194 8.41388C15.2033 8.5 15.5522 8.5 16.25 8.5H18.25C18.9478 8.5 19.2967 8.5 19.5806 8.41388C20.2198 8.21998 20.72 7.71977 20.9139 7.08057C21 6.79667 21 6.44778 21 5.75C21 5.05222 21 4.70333 20.9139 4.41943C20.72 3.78023 20.2198 3.28002 19.5806 3.08612C19.2967 3 18.9478 3 18.25 3Z",
            stroke: "currentColor",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "3"
        }
    ]
];
;
 //# sourceMappingURL=DashboardSquare02Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/DashboardSquare02Icon.js [app-client] (ecmascript) <export default as DashboardSquare02Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardSquare02Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$DashboardSquare02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$DashboardSquare02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/DashboardSquare02Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Delete02Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Delete02Icon
]);
const Delete02Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ],
    [
        "path",
        {
            d: "M9.5 16.5L9.5 10.5",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeWidth: "1.5",
            key: "2"
        }
    ],
    [
        "path",
        {
            d: "M14.5 16.5L14.5 10.5",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeWidth: "1.5",
            key: "3"
        }
    ]
];
;
 //# sourceMappingURL=Delete02Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Delete02Icon.js [app-client] (ecmascript) <export default as Delete02Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Delete02Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Delete02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Delete02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Delete02Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Download01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Download01Icon
]);
const Download01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M2.99969 17.0002C2.99969 17.9302 2.99969 18.3952 3.10192 18.7767C3.37932 19.8119 4.18796 20.6206 5.22324 20.898C5.60474 21.0002 6.06972 21.0002 6.99969 21.0002L16.9997 21.0002C17.9297 21.0002 18.3947 21.0002 18.7762 20.898C19.8114 20.6206 20.6201 19.8119 20.8975 18.7767C20.9997 18.3952 20.9997 17.9302 20.9997 17.0002",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M16.4998 11.5002C16.4998 11.5002 13.1856 16.0002 11.9997 16.0002C10.8139 16.0002 7.49976 11.5002 7.49976 11.5002M11.9997 15.0002V3.00016",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ]
];
;
 //# sourceMappingURL=Download01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Download01Icon.js [app-client] (ecmascript) <export default as Download01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Download01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Download01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Download01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Download01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/File02Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>File02Icon
]);
const File02Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M8 17H16",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M8 13H12",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ],
    [
        "path",
        {
            d: "M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "2"
        }
    ]
];
;
 //# sourceMappingURL=File02Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/File02Icon.js [app-client] (ecmascript) <export default as File02Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "File02Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$File02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$File02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/File02Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/FileUploadIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FileUploadIcon
]);
const FileUploadIcon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M4 12L4 14.5442C4 17.7892 4 19.4117 4.88607 20.5107C5.06508 20.7327 5.26731 20.9349 5.48933 21.1139C6.58831 22 8.21082 22 11.4558 22C12.1614 22 12.5141 22 12.8372 21.886C12.9044 21.8623 12.9702 21.835 13.0345 21.8043C13.3436 21.6564 13.593 21.407 14.0919 20.9081L18.8284 16.1716C19.4065 15.5935 19.6955 15.3045 19.8478 14.9369C20 14.5694 20 14.1606 20 13.3431V10C20 6.22876 20 4.34315 18.8284 3.17157C17.6569 2 15.7712 2 12 2M13 21.5V21C13 18.1716 13 16.7574 13.8787 15.8787C14.7574 15 16.1716 15 19 15H19.5",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M10 5C9.41016 4.39316 7.84027 2 7 2C6.15973 2 4.58984 4.39316 4 5M7 3L7 10",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ]
];
;
 //# sourceMappingURL=FileUploadIcon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/FileUploadIcon.js [app-client] (ecmascript) <export default as FileUploadIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FileUploadIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FileUploadIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FileUploadIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/FileUploadIcon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/FilterIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FilterIcon
]);
const FilterIcon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M8.85746 12.5061C6.36901 10.6456 4.59564 8.59915 3.62734 7.44867C3.3276 7.09253 3.22938 6.8319 3.17033 6.3728C2.96811 4.8008 2.86701 4.0148 3.32795 3.5074C3.7889 3 4.60404 3 6.23433 3H17.7657C19.396 3 20.2111 3 20.672 3.5074C21.133 4.0148 21.0319 4.8008 20.8297 6.37281C20.7706 6.83191 20.6724 7.09254 20.3726 7.44867C19.403 8.60062 17.6261 10.6507 15.1326 12.5135C14.907 12.6821 14.7583 12.9567 14.7307 13.2614C14.4837 15.992 14.2559 17.4876 14.1141 18.2442C13.8853 19.4657 12.1532 20.2006 11.226 20.8563C10.6741 21.2466 10.0043 20.782 9.93278 20.1778C9.79643 19.0261 9.53961 16.6864 9.25927 13.2614C9.23409 12.9539 9.08486 12.6761 8.85746 12.5061Z",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ]
];
;
 //# sourceMappingURL=FilterIcon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/FilterIcon.js [app-client] (ecmascript) <export default as FilterIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FilterIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FilterIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FilterIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/FilterIcon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Folder01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Folder01Icon
]);
const Folder01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C22 9.08996 22 10.1433 22 12.25C22 15.7612 22 17.5167 21.1573 18.7779C20.7926 19.3238 20.3238 19.7926 19.7779 20.1573C18.5167 21 16.7612 21 13.25 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ]
];
;
 //# sourceMappingURL=Folder01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Folder01Icon.js [app-client] (ecmascript) <export default as Folder01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Folder01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Folder01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Folder01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Folder01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Globe02Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Globe02Icon
]);
const Globe02Icon = /*#__PURE__*/ [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2C12 2 8 6 8 12Z",
            stroke: "currentColor",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ],
    [
        "path",
        {
            d: "M21 15H3",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "2"
        }
    ],
    [
        "path",
        {
            d: "M21 9H3",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "3"
        }
    ]
];
;
 //# sourceMappingURL=Globe02Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Globe02Icon.js [app-client] (ecmascript) <export default as Globe02Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Globe02Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Globe02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Globe02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Globe02Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Image01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Image01Icon
]);
const Image01Icon = /*#__PURE__*/ [
    [
        "circle",
        {
            cx: "7.5",
            cy: "7.5",
            r: "1.5",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",
            stroke: "currentColor",
            strokeWidth: "1.5",
            key: "1"
        }
    ],
    [
        "path",
        {
            d: "M5 21C9.37246 15.775 14.2741 8.88406 21.4975 13.5424",
            stroke: "currentColor",
            strokeWidth: "1.5",
            key: "2"
        }
    ]
];
;
 //# sourceMappingURL=Image01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Image01Icon.js [app-client] (ecmascript) <export default as Image01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Image01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Image01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Image01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Image01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/InformationCircleIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InformationCircleIcon
]);
const InformationCircleIcon = /*#__PURE__*/ [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M12 16V11.5",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ],
    [
        "path",
        {
            d: "M12 8.01172V8.00172",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.8",
            key: "2"
        }
    ]
];
;
 //# sourceMappingURL=InformationCircleIcon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/InformationCircleIcon.js [app-client] (ecmascript) <export default as InformationCircleIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InformationCircleIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$InformationCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$InformationCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/InformationCircleIcon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Link01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Link01Icon
]);
const Link01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M9.14339 10.691L9.35031 10.4841C11.329 8.50532 14.5372 8.50532 16.5159 10.4841C18.4947 12.4628 18.4947 15.671 16.5159 17.6497L13.6497 20.5159C11.671 22.4947 8.46279 22.4947 6.48405 20.5159C4.50532 18.5372 4.50532 15.329 6.48405 13.3503L6.9484 12.886",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M17.0516 11.114L17.5159 10.6497C19.4947 8.67095 19.4947 5.46279 17.5159 3.48405C15.5372 1.50532 12.329 1.50532 10.3503 3.48405L7.48405 6.35031C5.50532 8.32904 5.50532 11.5372 7.48405 13.5159C9.46279 15.4947 12.671 15.4947 14.6497 13.5159L14.8566 13.309",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ]
];
;
 //# sourceMappingURL=Link01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Link01Icon.js [app-client] (ecmascript) <export default as Link01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Link01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Link01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Link01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Link01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Location01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Location01Icon
]);
const Location01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z",
            stroke: "currentColor",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z",
            stroke: "currentColor",
            strokeWidth: "1.5",
            key: "1"
        }
    ]
];
;
 //# sourceMappingURL=Location01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Location01Icon.js [app-client] (ecmascript) <export default as Location01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Location01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Location01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Location01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Location01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Mail01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Mail01Icon
]);
const Mail01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6",
            stroke: "currentColor",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z",
            stroke: "currentColor",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ]
];
;
 //# sourceMappingURL=Mail01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Mail01Icon.js [app-client] (ecmascript) <export default as Mail01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Mail01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Mail01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Mail01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Mail01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Megaphone01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Megaphone01Icon
]);
const Megaphone01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M14.9263 2.91103L8.27352 6.10452C7.76151 6.35029 7.21443 6.41187 6.65675 6.28693C6.29177 6.20517 6.10926 6.16429 5.9623 6.14751C4.13743 5.93912 3 7.38342 3 9.04427V9.95573C3 11.6166 4.13743 13.0609 5.9623 12.8525C6.10926 12.8357 6.29178 12.7948 6.65675 12.7131C7.21443 12.5881 7.76151 12.6497 8.27352 12.8955L14.9263 16.089C16.4534 16.8221 17.217 17.1886 18.0684 16.9029C18.9197 16.6172 19.2119 16.0041 19.7964 14.778C21.4012 11.4112 21.4012 7.58885 19.7964 4.22196C19.2119 2.99586 18.9197 2.38281 18.0684 2.0971C17.217 1.8114 16.4534 2.17794 14.9263 2.91103Z",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M11.4581 20.7709L9.96674 22C6.60515 19.3339 7.01583 18.0625 7.01583 13H8.14966C8.60978 15.8609 9.69512 17.216 11.1927 18.197C12.1152 18.8012 12.3054 20.0725 11.4581 20.7709Z",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ],
    [
        "path",
        {
            d: "M7.5 12.5V6.5",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "2"
        }
    ]
];
;
 //# sourceMappingURL=Megaphone01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Megaphone01Icon.js [app-client] (ecmascript) <export default as Megaphone01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Megaphone01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Megaphone01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Megaphone01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Megaphone01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Menu01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Menu01Icon
]);
const Menu01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M4 5L20 5",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M4 12L20 12",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ],
    [
        "path",
        {
            d: "M4 19L20 19",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "2"
        }
    ]
];
;
 //# sourceMappingURL=Menu01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Menu01Icon.js [app-client] (ecmascript) <export default as Menu01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Menu01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Menu01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Menu01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Menu01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Message01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Message01Icon
]);
const Message01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M8.5 14.5H15.5M8.5 9.5H12",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z",
            stroke: "currentColor",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ]
];
;
 //# sourceMappingURL=Message01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Message01Icon.js [app-client] (ecmascript) <export default as Message01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Message01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Message01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Message01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Message01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/MoneyBag01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MoneyBag01Icon
]);
const MoneyBag01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M20.9427 16.8354C20.2864 12.8866 18.2432 9.94613 16.467 8.219C15.9501 7.71642 15.6917 7.46513 15.1208 7.23257C14.5499 7 14.0592 7 13.0778 7H10.9222C9.94081 7 9.4501 7 8.87922 7.23257C8.30834 7.46513 8.04991 7.71642 7.53304 8.219C5.75682 9.94613 3.71361 12.8866 3.05727 16.8354C2.56893 19.7734 5.27927 22 8.30832 22H15.6917C18.7207 22 21.4311 19.7734 20.9427 16.8354Z",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M7.25662 4.44287C7.05031 4.14258 6.75128 3.73499 7.36899 3.64205C8.00392 3.54651 8.66321 3.98114 9.30855 3.97221C9.89237 3.96413 10.1898 3.70519 10.5089 3.33548C10.8449 2.94617 11.3652 2 12 2C12.6348 2 13.1551 2.94617 13.4911 3.33548C13.8102 3.70519 14.1076 3.96413 14.6914 3.97221C15.3368 3.98114 15.9961 3.54651 16.631 3.64205C17.2487 3.73499 16.9497 4.14258 16.7434 4.44287L15.8105 5.80064C15.4115 6.38146 15.212 6.67187 14.7944 6.83594C14.3769 7 13.8373 7 12.7582 7H11.2418C10.1627 7 9.6231 7 9.20556 6.83594C8.78802 6.67187 8.5885 6.38146 8.18945 5.80064L7.25662 4.44287Z",
            stroke: "currentColor",
            strokeWidth: "1.5",
            key: "1"
        }
    ]
];
;
 //# sourceMappingURL=MoneyBag01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/MoneyBag01Icon.js [app-client] (ecmascript) <export default as MoneyBag01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MoneyBag01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$MoneyBag01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$MoneyBag01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/MoneyBag01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Notification02Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Notification02Icon
]);
const Notification02Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M19 18V9.5C19 5.63401 15.866 2.5 12 2.5C8.13401 2.5 5 5.63401 5 9.5V18",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M20.5 18H3.5",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ],
    [
        "path",
        {
            d: "M13.5 20C13.5 20.8284 12.8284 21.5 12 21.5M10.5 20C10.5 20.8284 11.1716 21.5 12 21.5M12 21.5V20",
            stroke: "currentColor",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "2"
        }
    ]
];
;
 //# sourceMappingURL=Notification02Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Notification02Icon.js [app-client] (ecmascript) <export default as Notification02Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Notification02Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Notification02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Notification02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Notification02Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/PencilEdit02Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PencilEdit02Icon
]);
const PencilEdit02Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506",
            stroke: "currentColor",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ]
];
;
 //# sourceMappingURL=PencilEdit02Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/PencilEdit02Icon.js [app-client] (ecmascript) <export default as PencilEdit02Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PencilEdit02Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PencilEdit02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PencilEdit02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/PencilEdit02Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Refresh01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Refresh01Icon
]);
const Refresh01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M20.4879 15C19.2524 18.4956 15.9187 21 12 21C7.02943 21 3 16.9706 3 12C3 7.02943 7.02943 3 12 3C15.7292 3 18.9286 5.26806 20.2941 8.5",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M15 9H18C19.4142 9 20.1213 9 20.5607 8.56066C21 8.12132 21 7.41421 21 6V3",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ]
];
;
 //# sourceMappingURL=Refresh01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Refresh01Icon.js [app-client] (ecmascript) <export default as Refresh01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Refresh01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Refresh01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Refresh01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Refresh01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Search01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Search01Icon
]);
const Search01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M17 17L21 21",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ]
];
;
 //# sourceMappingURL=Search01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Search01Icon.js [app-client] (ecmascript) <export default as Search01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Search01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Search01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Search01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Search01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Settings01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Settings01Icon
]);
const Settings01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z",
            stroke: "currentColor",
            strokeWidth: "1.5",
            key: "1"
        }
    ]
];
;
 //# sourceMappingURL=Settings01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Settings01Icon.js [app-client] (ecmascript) <export default as Settings01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Settings01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Settings01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Settings01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Settings01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Share01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Share01Icon
]);
const Share01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M9.39584 4.5H8.35417C5.40789 4.5 3.93475 4.5 3.01946 5.37868C2.10417 6.25736 2.10417 7.67157 2.10417 10.5V14.5C2.10417 17.3284 2.10417 18.7426 3.01946 19.6213C3.93475 20.5 5.40789 20.5 8.35417 20.5H12.5608C15.5071 20.5 16.9802 20.5 17.8955 19.6213C18.4885 19.052 18.6973 18.2579 18.7708 17",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M16.1667 7V3.85355C16.1667 3.65829 16.3316 3.5 16.535 3.5C16.6326 3.5 16.7263 3.53725 16.7954 3.60355L21.5275 8.14645C21.7634 8.37282 21.8958 8.67986 21.8958 9C21.8958 9.32014 21.7634 9.62718 21.5275 9.85355L16.7954 14.3964C16.7263 14.4628 16.6326 14.5 16.535 14.5C16.3316 14.5 16.1667 14.3417 16.1667 14.1464V11H13.1157C8.875 11 7.3125 14.5 7.3125 14.5V12C7.3125 9.23858 9.64435 7 12.5208 7H16.1667Z",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ]
];
;
 //# sourceMappingURL=Share01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Share01Icon.js [app-client] (ecmascript) <export default as Share01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Share01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Share01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Share01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Share01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/SquareLock02Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SquareLock02Icon
]);
const SquareLock02Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M12 16.5V14.5",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M4.2678 18.8447C4.49268 20.515 5.87612 21.8235 7.55965 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.8789 17.7547 20 16.6376 20 15.5C20 14.3624 19.8789 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55965 9.09909C5.87612 9.17649 4.49268 10.485 4.2678 12.1553C4.12104 13.2453 3.99999 14.3624 3.99999 15.5C3.99999 16.6376 4.12104 17.7547 4.2678 18.8447Z",
            stroke: "currentColor",
            strokeWidth: "1.5",
            key: "1"
        }
    ],
    [
        "path",
        {
            d: "M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "2"
        }
    ]
];
;
 //# sourceMappingURL=SquareLock02Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/SquareLock02Icon.js [app-client] (ecmascript) <export default as SquareLock02Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SquareLock02Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$SquareLock02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$SquareLock02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/SquareLock02Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Target01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Target01Icon
]);
const Target01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M15.1312 2.5C14.1462 2.17555 13.0936 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 10.9548 21.8396 9.94704 21.5422 9",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ],
    [
        "path",
        {
            d: "M19.5 4.5L12 12M19.5 4.5V2M19.5 4.5H22",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeWidth: "1.5",
            key: "2"
        }
    ]
];
;
 //# sourceMappingURL=Target01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Target01Icon.js [app-client] (ecmascript) <export default as Target01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Target01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Target01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Target01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Target01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/TaskDone01Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TaskDone01Icon
]);
const TaskDone01Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M13.498 2H8.49805C7.66962 2 6.99805 2.67157 6.99805 3.5C6.99805 4.32843 7.66962 5 8.49805 5H13.498C14.3265 5 14.998 4.32843 14.998 3.5C14.998 2.67157 14.3265 2 13.498 2Z",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M6.99805 15H10.4266M6.99805 11H14.998",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ],
    [
        "path",
        {
            d: "M18.9981 13.5V9.48263C18.9981 6.65424 18.9981 5.24004 18.1194 4.36137C17.4781 3.72007 16.5515 3.54681 14.9981 3.5M11.998 21.9995L8.99805 21.9995C6.16963 21.9995 4.75541 21.9995 3.87674 21.1208C2.99806 20.2421 2.99805 18.8279 2.99805 15.9995L2.99806 9.48269C2.99805 6.65425 2.99805 5.24004 3.87673 4.36136C4.51802 3.72007 5.44456 3.54681 6.99795 3.5",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "2"
        }
    ],
    [
        "path",
        {
            d: "M13.998 20C13.998 20 14.998 20 15.998 22C15.998 22 18.1745 17 20.998 16",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "3"
        }
    ]
];
;
 //# sourceMappingURL=TaskDone01Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/TaskDone01Icon.js [app-client] (ecmascript) <export default as TaskDone01Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TaskDone01Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$TaskDone01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$TaskDone01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/TaskDone01Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Time04Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Time04Icon
]);
const Time04Icon = /*#__PURE__*/ [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M9.5 9.5L12.9999 12.9996M16 8L11 13",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ]
];
;
 //# sourceMappingURL=Time04Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Time04Icon.js [app-client] (ecmascript) <export default as Time04Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Time04Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Time04Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Time04Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Time04Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/User02Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>User02Icon
]);
const User02Icon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M18.5 20V17.9704C18.5 16.7281 17.9407 15.5099 16.8103 14.9946C15.4315 14.3661 13.7779 14 12 14C10.2221 14 8.5685 14.3661 7.18968 14.9946C6.05927 15.5099 5.5 16.7281 5.5 17.9704V20",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "7.5",
            r: "3.5",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ]
];
;
 //# sourceMappingURL=User02Icon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/User02Icon.js [app-client] (ecmascript) <export default as User02Icon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "User02Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$User02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$User02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/User02Icon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/UserGroupIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UserGroupIcon
]);
const UserGroupIcon = /*#__PURE__*/ [
    [
        "path",
        {
            d: "M15.5 11C15.5 9.067 13.933 7.5 12 7.5C10.067 7.5 8.5 9.067 8.5 11C8.5 12.933 10.067 14.5 12 14.5C13.933 14.5 15.5 12.933 15.5 11Z",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "0"
        }
    ],
    [
        "path",
        {
            d: "M15.4827 11.3499C15.8047 11.4475 16.1462 11.5 16.5 11.5C18.433 11.5 20 9.933 20 8C20 6.067 18.433 4.5 16.5 4.5C14.6851 4.5 13.1928 5.8814 13.0173 7.65013",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "1"
        }
    ],
    [
        "path",
        {
            d: "M10.9827 7.65013C10.8072 5.8814 9.31492 4.5 7.5 4.5C5.567 4.5 4 6.067 4 8C4 9.933 5.567 11.5 7.5 11.5C7.85381 11.5 8.19535 11.4475 8.51727 11.3499",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "2"
        }
    ],
    [
        "path",
        {
            d: "M22 16.5C22 13.7386 19.5376 11.5 16.5 11.5",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "3"
        }
    ],
    [
        "path",
        {
            d: "M17.5 19.5C17.5 16.7386 15.0376 14.5 12 14.5C8.96243 14.5 6.5 16.7386 6.5 19.5",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "4"
        }
    ],
    [
        "path",
        {
            d: "M7.5 11.5C4.46243 11.5 2 13.7386 2 16.5",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.5",
            key: "5"
        }
    ]
];
;
 //# sourceMappingURL=UserGroupIcon.js.map
}),
"[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/UserGroupIcon.js [app-client] (ecmascript) <export default as UserGroupIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserGroupIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$UserGroupIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$UserGroupIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/UserGroupIcon.js [app-client] (ecmascript)");
}),
"[project]/Desktop/calaya-taskly/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clsx",
    ()=>clsx,
    "default",
    ()=>__TURBOPACK__default__export__
]);
function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
        var o = e.length;
        for(t = 0; t < o; t++)e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for(f in e)e[f] && (n && (n += " "), n += f);
    return n;
}
function clsx() {
    for(var e, t, f = 0, n = "", o = arguments.length; f < o; f++)(e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
}
const __TURBOPACK__default__export__ = clsx;
}),
"[project]/Desktop/calaya-taskly/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTailwindMerge",
    ()=>createTailwindMerge,
    "extendTailwindMerge",
    ()=>extendTailwindMerge,
    "fromTheme",
    ()=>fromTheme,
    "getDefaultConfig",
    ()=>getDefaultConfig,
    "mergeConfigs",
    ()=>mergeConfigs,
    "twJoin",
    ()=>twJoin,
    "twMerge",
    ()=>twMerge,
    "validators",
    ()=>validators
]);
/**
 * Concatenates two arrays faster than the array spread operator.
 */ const concatArrays = (array1, array2)=>{
    // Pre-allocate for better V8 optimization
    const combinedArray = new Array(array1.length + array2.length);
    for(let i = 0; i < array1.length; i++){
        combinedArray[i] = array1[i];
    }
    for(let i = 0; i < array2.length; i++){
        combinedArray[array1.length + i] = array2[i];
    }
    return combinedArray;
};
// Factory function ensures consistent object shapes
const createClassValidatorObject = (classGroupId, validator)=>({
        classGroupId,
        validator
    });
// Factory ensures consistent ClassPartObject shape
const createClassPartObject = (nextPart = new Map(), validators = null, classGroupId)=>({
        nextPart,
        validators,
        classGroupId
    });
const CLASS_PART_SEPARATOR = '-';
const EMPTY_CONFLICTS = [];
// I use two dots here because one dot is used as prefix for class groups in plugins
const ARBITRARY_PROPERTY_PREFIX = 'arbitrary..';
const createClassGroupUtils = (config)=>{
    const classMap = createClassMap(config);
    const { conflictingClassGroups, conflictingClassGroupModifiers } = config;
    const getClassGroupId = (className)=>{
        if (className.startsWith('[') && className.endsWith(']')) {
            return getGroupIdForArbitraryProperty(className);
        }
        const classParts = className.split(CLASS_PART_SEPARATOR);
        // Classes like `-inset-1` produce an empty string as first classPart. We assume that classes for negative values are used correctly and skip it.
        const startIndex = classParts[0] === '' && classParts.length > 1 ? 1 : 0;
        return getGroupRecursive(classParts, startIndex, classMap);
    };
    const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier)=>{
        if (hasPostfixModifier) {
            const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
            const baseConflicts = conflictingClassGroups[classGroupId];
            if (modifierConflicts) {
                if (baseConflicts) {
                    // Merge base conflicts with modifier conflicts
                    return concatArrays(baseConflicts, modifierConflicts);
                }
                // Only modifier conflicts
                return modifierConflicts;
            }
            // Fall back to without postfix if no modifier conflicts
            return baseConflicts || EMPTY_CONFLICTS;
        }
        return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
    };
    return {
        getClassGroupId,
        getConflictingClassGroupIds
    };
};
const getGroupRecursive = (classParts, startIndex, classPartObject)=>{
    const classPathsLength = classParts.length - startIndex;
    if (classPathsLength === 0) {
        return classPartObject.classGroupId;
    }
    const currentClassPart = classParts[startIndex];
    const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
    if (nextClassPartObject) {
        const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
        if (result) return result;
    }
    const validators = classPartObject.validators;
    if (validators === null) {
        return undefined;
    }
    // Build classRest string efficiently by joining from startIndex onwards
    const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
    const validatorsLength = validators.length;
    for(let i = 0; i < validatorsLength; i++){
        const validatorObj = validators[i];
        if (validatorObj.validator(classRest)) {
            return validatorObj.classGroupId;
        }
    }
    return undefined;
};
/**
 * Get the class group ID for an arbitrary property.
 *
 * @param className - The class name to get the group ID for. Is expected to be string starting with `[` and ending with `]`.
 */ const getGroupIdForArbitraryProperty = (className)=>className.slice(1, -1).indexOf(':') === -1 ? undefined : (()=>{
        const content = className.slice(1, -1);
        const colonIndex = content.indexOf(':');
        const property = content.slice(0, colonIndex);
        return property ? ARBITRARY_PROPERTY_PREFIX + property : undefined;
    })();
/**
 * Exported for testing only
 */ const createClassMap = (config)=>{
    const { theme, classGroups } = config;
    return processClassGroups(classGroups, theme);
};
// Split into separate functions to maintain monomorphic call sites
const processClassGroups = (classGroups, theme)=>{
    const classMap = createClassPartObject();
    for(const classGroupId in classGroups){
        const group = classGroups[classGroupId];
        processClassesRecursively(group, classMap, classGroupId, theme);
    }
    return classMap;
};
const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme)=>{
    const len = classGroup.length;
    for(let i = 0; i < len; i++){
        const classDefinition = classGroup[i];
        processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
    }
};
// Split into separate functions for each type to maintain monomorphic call sites
const processClassDefinition = (classDefinition, classPartObject, classGroupId, theme)=>{
    if (typeof classDefinition === 'string') {
        processStringDefinition(classDefinition, classPartObject, classGroupId);
        return;
    }
    if (typeof classDefinition === 'function') {
        processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
        return;
    }
    processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
};
const processStringDefinition = (classDefinition, classPartObject, classGroupId)=>{
    const classPartObjectToEdit = classDefinition === '' ? classPartObject : getPart(classPartObject, classDefinition);
    classPartObjectToEdit.classGroupId = classGroupId;
};
const processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme)=>{
    if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
    }
    if (classPartObject.validators === null) {
        classPartObject.validators = [];
    }
    classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
const processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme)=>{
    const entries = Object.entries(classDefinition);
    const len = entries.length;
    for(let i = 0; i < len; i++){
        const [key, value] = entries[i];
        processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
    }
};
const getPart = (classPartObject, path)=>{
    let current = classPartObject;
    const parts = path.split(CLASS_PART_SEPARATOR);
    const len = parts.length;
    for(let i = 0; i < len; i++){
        const part = parts[i];
        let next = current.nextPart.get(part);
        if (!next) {
            next = createClassPartObject();
            current.nextPart.set(part, next);
        }
        current = next;
    }
    return current;
};
// Type guard maintains monomorphic check
const isThemeGetter = (func)=>'isThemeGetter' in func && func.isThemeGetter === true;
// LRU cache implementation using plain objects for simplicity
const createLruCache = (maxCacheSize)=>{
    if (maxCacheSize < 1) {
        return {
            get: ()=>undefined,
            set: ()=>{}
        };
    }
    let cacheSize = 0;
    let cache = Object.create(null);
    let previousCache = Object.create(null);
    const update = (key, value)=>{
        cache[key] = value;
        cacheSize++;
        if (cacheSize > maxCacheSize) {
            cacheSize = 0;
            previousCache = cache;
            cache = Object.create(null);
        }
    };
    return {
        get (key) {
            let value = cache[key];
            if (value !== undefined) {
                return value;
            }
            if ((value = previousCache[key]) !== undefined) {
                update(key, value);
                return value;
            }
        },
        set (key, value) {
            if (key in cache) {
                cache[key] = value;
            } else {
                update(key, value);
            }
        }
    };
};
const IMPORTANT_MODIFIER = '!';
const MODIFIER_SEPARATOR = ':';
const EMPTY_MODIFIERS = [];
// Pre-allocated result object shape for consistency
const createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal)=>({
        modifiers,
        hasImportantModifier,
        baseClassName,
        maybePostfixModifierPosition,
        isExternal
    });
const createParseClassName = (config)=>{
    const { prefix, experimentalParseClassName } = config;
    /**
   * Parse class name into parts.
   *
   * Inspired by `splitAtTopLevelOnly` used in Tailwind CSS
   * @see https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
   */ let parseClassName = (className)=>{
        // Use simple array with push for better performance
        const modifiers = [];
        let bracketDepth = 0;
        let parenDepth = 0;
        let modifierStart = 0;
        let postfixModifierPosition;
        const len = className.length;
        for(let index = 0; index < len; index++){
            const currentCharacter = className[index];
            if (bracketDepth === 0 && parenDepth === 0) {
                if (currentCharacter === MODIFIER_SEPARATOR) {
                    modifiers.push(className.slice(modifierStart, index));
                    modifierStart = index + 1;
                    continue;
                }
                if (currentCharacter === '/') {
                    postfixModifierPosition = index;
                    continue;
                }
            }
            if (currentCharacter === '[') bracketDepth++;
            else if (currentCharacter === ']') bracketDepth--;
            else if (currentCharacter === '(') parenDepth++;
            else if (currentCharacter === ')') parenDepth--;
        }
        const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
        // Inline important modifier check
        let baseClassName = baseClassNameWithImportantModifier;
        let hasImportantModifier = false;
        if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
            baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
            hasImportantModifier = true;
        } else if (/**
     * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
     * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
     */ baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)) {
            baseClassName = baseClassNameWithImportantModifier.slice(1);
            hasImportantModifier = true;
        }
        const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : undefined;
        return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
    };
    if (prefix) {
        const fullPrefix = prefix + MODIFIER_SEPARATOR;
        const parseClassNameOriginal = parseClassName;
        parseClassName = (className)=>className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, undefined, true);
    }
    if (experimentalParseClassName) {
        const parseClassNameOriginal = parseClassName;
        parseClassName = (className)=>experimentalParseClassName({
                className,
                parseClassName: parseClassNameOriginal
            });
    }
    return parseClassName;
};
/**
 * Sorts modifiers according to following schema:
 * - Predefined modifiers are sorted alphabetically
 * - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
 */ const createSortModifiers = (config)=>{
    // Pre-compute weights for all known modifiers for O(1) comparison
    const modifierWeights = new Map();
    // Assign weights to sensitive modifiers (highest priority, but preserve order)
    config.orderSensitiveModifiers.forEach((mod, index)=>{
        modifierWeights.set(mod, 1000000 + index); // High weights for sensitive mods
    });
    return (modifiers)=>{
        const result = [];
        let currentSegment = [];
        // Process modifiers in one pass
        for(let i = 0; i < modifiers.length; i++){
            const modifier = modifiers[i];
            // Check if modifier is sensitive (starts with '[' or in orderSensitiveModifiers)
            const isArbitrary = modifier[0] === '[';
            const isOrderSensitive = modifierWeights.has(modifier);
            if (isArbitrary || isOrderSensitive) {
                // Sort and flush current segment alphabetically
                if (currentSegment.length > 0) {
                    currentSegment.sort();
                    result.push(...currentSegment);
                    currentSegment = [];
                }
                result.push(modifier);
            } else {
                // Regular modifier - add to current segment for batch sorting
                currentSegment.push(modifier);
            }
        }
        // Sort and add any remaining segment items
        if (currentSegment.length > 0) {
            currentSegment.sort();
            result.push(...currentSegment);
        }
        return result;
    };
};
const createConfigUtils = (config)=>({
        cache: createLruCache(config.cacheSize),
        parseClassName: createParseClassName(config),
        sortModifiers: createSortModifiers(config),
        ...createClassGroupUtils(config)
    });
const SPLIT_CLASSES_REGEX = /\s+/;
const mergeClassList = (classList, configUtils)=>{
    const { parseClassName, getClassGroupId, getConflictingClassGroupIds, sortModifiers } = configUtils;
    /**
   * Set of classGroupIds in following format:
   * `{importantModifier}{variantModifiers}{classGroupId}`
   * @example 'float'
   * @example 'hover:focus:bg-color'
   * @example 'md:!pr'
   */ const classGroupsInConflict = [];
    const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
    let result = '';
    for(let index = classNames.length - 1; index >= 0; index -= 1){
        const originalClassName = classNames[index];
        const { isExternal, modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition } = parseClassName(originalClassName);
        if (isExternal) {
            result = originalClassName + (result.length > 0 ? ' ' + result : result);
            continue;
        }
        let hasPostfixModifier = !!maybePostfixModifierPosition;
        let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
        if (!classGroupId) {
            if (!hasPostfixModifier) {
                // Not a Tailwind class
                result = originalClassName + (result.length > 0 ? ' ' + result : result);
                continue;
            }
            classGroupId = getClassGroupId(baseClassName);
            if (!classGroupId) {
                // Not a Tailwind class
                result = originalClassName + (result.length > 0 ? ' ' + result : result);
                continue;
            }
            hasPostfixModifier = false;
        }
        // Fast path: skip sorting for empty or single modifier
        const variantModifier = modifiers.length === 0 ? '' : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(':');
        const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
        const classId = modifierId + classGroupId;
        if (classGroupsInConflict.indexOf(classId) > -1) {
            continue;
        }
        classGroupsInConflict.push(classId);
        const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
        for(let i = 0; i < conflictGroups.length; ++i){
            const group = conflictGroups[i];
            classGroupsInConflict.push(modifierId + group);
        }
        // Tailwind class not in conflict
        result = originalClassName + (result.length > 0 ? ' ' + result : result);
    }
    return result;
};
/**
 * The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
 *
 * Specifically:
 * - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
 * - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
 *
 * Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
 */ const twJoin = (...classLists)=>{
    let index = 0;
    let argument;
    let resolvedValue;
    let string = '';
    while(index < classLists.length){
        if (argument = classLists[index++]) {
            if (resolvedValue = toValue(argument)) {
                string && (string += ' ');
                string += resolvedValue;
            }
        }
    }
    return string;
};
const toValue = (mix)=>{
    // Fast path for strings
    if (typeof mix === 'string') {
        return mix;
    }
    let resolvedValue;
    let string = '';
    for(let k = 0; k < mix.length; k++){
        if (mix[k]) {
            if (resolvedValue = toValue(mix[k])) {
                string && (string += ' ');
                string += resolvedValue;
            }
        }
    }
    return string;
};
const createTailwindMerge = (createConfigFirst, ...createConfigRest)=>{
    let configUtils;
    let cacheGet;
    let cacheSet;
    let functionToCall;
    const initTailwindMerge = (classList)=>{
        const config = createConfigRest.reduce((previousConfig, createConfigCurrent)=>createConfigCurrent(previousConfig), createConfigFirst());
        configUtils = createConfigUtils(config);
        cacheGet = configUtils.cache.get;
        cacheSet = configUtils.cache.set;
        functionToCall = tailwindMerge;
        return tailwindMerge(classList);
    };
    const tailwindMerge = (classList)=>{
        const cachedResult = cacheGet(classList);
        if (cachedResult) {
            return cachedResult;
        }
        const result = mergeClassList(classList, configUtils);
        cacheSet(classList, result);
        return result;
    };
    functionToCall = initTailwindMerge;
    return (...args)=>functionToCall(twJoin(...args));
};
const fallbackThemeArr = [];
const fromTheme = (key)=>{
    const themeGetter = (theme)=>theme[key] || fallbackThemeArr;
    themeGetter.isThemeGetter = true;
    return themeGetter;
};
const arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
const arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
const fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
// Shadow always begins with x and y offset separated by underscore optionally prepended by inset
const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
const isFraction = (value)=>fractionRegex.test(value);
const isNumber = (value)=>!!value && !Number.isNaN(Number(value));
const isInteger = (value)=>!!value && Number.isInteger(Number(value));
const isPercent = (value)=>value.endsWith('%') && isNumber(value.slice(0, -1));
const isTshirtSize = (value)=>tshirtUnitRegex.test(value);
const isAny = ()=>true;
const isLengthOnly = (value)=>// `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
    // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
    // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
    lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
const isNever = ()=>false;
const isShadow = (value)=>shadowRegex.test(value);
const isImage = (value)=>imageRegex.test(value);
const isAnyNonArbitrary = (value)=>!isArbitraryValue(value) && !isArbitraryVariable(value);
const isArbitrarySize = (value)=>getIsArbitraryValue(value, isLabelSize, isNever);
const isArbitraryValue = (value)=>arbitraryValueRegex.test(value);
const isArbitraryLength = (value)=>getIsArbitraryValue(value, isLabelLength, isLengthOnly);
const isArbitraryNumber = (value)=>getIsArbitraryValue(value, isLabelNumber, isNumber);
const isArbitraryWeight = (value)=>getIsArbitraryValue(value, isLabelWeight, isAny);
const isArbitraryFamilyName = (value)=>getIsArbitraryValue(value, isLabelFamilyName, isNever);
const isArbitraryPosition = (value)=>getIsArbitraryValue(value, isLabelPosition, isNever);
const isArbitraryImage = (value)=>getIsArbitraryValue(value, isLabelImage, isImage);
const isArbitraryShadow = (value)=>getIsArbitraryValue(value, isLabelShadow, isShadow);
const isArbitraryVariable = (value)=>arbitraryVariableRegex.test(value);
const isArbitraryVariableLength = (value)=>getIsArbitraryVariable(value, isLabelLength);
const isArbitraryVariableFamilyName = (value)=>getIsArbitraryVariable(value, isLabelFamilyName);
const isArbitraryVariablePosition = (value)=>getIsArbitraryVariable(value, isLabelPosition);
const isArbitraryVariableSize = (value)=>getIsArbitraryVariable(value, isLabelSize);
const isArbitraryVariableImage = (value)=>getIsArbitraryVariable(value, isLabelImage);
const isArbitraryVariableShadow = (value)=>getIsArbitraryVariable(value, isLabelShadow, true);
const isArbitraryVariableWeight = (value)=>getIsArbitraryVariable(value, isLabelWeight, true);
// Helpers
const getIsArbitraryValue = (value, testLabel, testValue)=>{
    const result = arbitraryValueRegex.exec(value);
    if (result) {
        if (result[1]) {
            return testLabel(result[1]);
        }
        return testValue(result[2]);
    }
    return false;
};
const getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false)=>{
    const result = arbitraryVariableRegex.exec(value);
    if (result) {
        if (result[1]) {
            return testLabel(result[1]);
        }
        return shouldMatchNoLabel;
    }
    return false;
};
// Labels
const isLabelPosition = (label)=>label === 'position' || label === 'percentage';
const isLabelImage = (label)=>label === 'image' || label === 'url';
const isLabelSize = (label)=>label === 'length' || label === 'size' || label === 'bg-size';
const isLabelLength = (label)=>label === 'length';
const isLabelNumber = (label)=>label === 'number';
const isLabelFamilyName = (label)=>label === 'family-name';
const isLabelWeight = (label)=>label === 'number' || label === 'weight';
const isLabelShadow = (label)=>label === 'shadow';
const validators = /*#__PURE__*/ Object.defineProperty({
    __proto__: null,
    isAny,
    isAnyNonArbitrary,
    isArbitraryFamilyName,
    isArbitraryImage,
    isArbitraryLength,
    isArbitraryNumber,
    isArbitraryPosition,
    isArbitraryShadow,
    isArbitrarySize,
    isArbitraryValue,
    isArbitraryVariable,
    isArbitraryVariableFamilyName,
    isArbitraryVariableImage,
    isArbitraryVariableLength,
    isArbitraryVariablePosition,
    isArbitraryVariableShadow,
    isArbitraryVariableSize,
    isArbitraryVariableWeight,
    isArbitraryWeight,
    isFraction,
    isInteger,
    isNumber,
    isPercent,
    isTshirtSize
}, Symbol.toStringTag, {
    value: 'Module'
});
const getDefaultConfig = ()=>{
    /**
   * Theme getters for theme variable namespaces
   * @see https://tailwindcss.com/docs/theme#theme-variable-namespaces
   */ /***/ const themeColor = fromTheme('color');
    const themeFont = fromTheme('font');
    const themeText = fromTheme('text');
    const themeFontWeight = fromTheme('font-weight');
    const themeTracking = fromTheme('tracking');
    const themeLeading = fromTheme('leading');
    const themeBreakpoint = fromTheme('breakpoint');
    const themeContainer = fromTheme('container');
    const themeSpacing = fromTheme('spacing');
    const themeRadius = fromTheme('radius');
    const themeShadow = fromTheme('shadow');
    const themeInsetShadow = fromTheme('inset-shadow');
    const themeTextShadow = fromTheme('text-shadow');
    const themeDropShadow = fromTheme('drop-shadow');
    const themeBlur = fromTheme('blur');
    const themePerspective = fromTheme('perspective');
    const themeAspect = fromTheme('aspect');
    const themeEase = fromTheme('ease');
    const themeAnimate = fromTheme('animate');
    /**
   * Helpers to avoid repeating the same scales
   *
   * We use functions that create a new array every time they're called instead of static arrays.
   * This ensures that users who modify any scale by mutating the array (e.g. with `array.push(element)`) don't accidentally mutate arrays in other parts of the config.
   */ /***/ const scaleBreak = ()=>[
            'auto',
            'avoid',
            'all',
            'avoid-page',
            'page',
            'left',
            'right',
            'column'
        ];
    const scalePosition = ()=>[
            'center',
            'top',
            'bottom',
            'left',
            'right',
            'top-left',
            // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
            'left-top',
            'top-right',
            // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
            'right-top',
            'bottom-right',
            // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
            'right-bottom',
            'bottom-left',
            // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
            'left-bottom'
        ];
    const scalePositionWithArbitrary = ()=>[
            ...scalePosition(),
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleOverflow = ()=>[
            'auto',
            'hidden',
            'clip',
            'visible',
            'scroll'
        ];
    const scaleOverscroll = ()=>[
            'auto',
            'contain',
            'none'
        ];
    const scaleUnambiguousSpacing = ()=>[
            isArbitraryVariable,
            isArbitraryValue,
            themeSpacing
        ];
    const scaleInset = ()=>[
            isFraction,
            'full',
            'auto',
            ...scaleUnambiguousSpacing()
        ];
    const scaleGridTemplateColsRows = ()=>[
            isInteger,
            'none',
            'subgrid',
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleGridColRowStartAndEnd = ()=>[
            'auto',
            {
                span: [
                    'full',
                    isInteger,
                    isArbitraryVariable,
                    isArbitraryValue
                ]
            },
            isInteger,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleGridColRowStartOrEnd = ()=>[
            isInteger,
            'auto',
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleGridAutoColsRows = ()=>[
            'auto',
            'min',
            'max',
            'fr',
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleAlignPrimaryAxis = ()=>[
            'start',
            'end',
            'center',
            'between',
            'around',
            'evenly',
            'stretch',
            'baseline',
            'center-safe',
            'end-safe'
        ];
    const scaleAlignSecondaryAxis = ()=>[
            'start',
            'end',
            'center',
            'stretch',
            'center-safe',
            'end-safe'
        ];
    const scaleMargin = ()=>[
            'auto',
            ...scaleUnambiguousSpacing()
        ];
    const scaleSizing = ()=>[
            isFraction,
            'auto',
            'full',
            'dvw',
            'dvh',
            'lvw',
            'lvh',
            'svw',
            'svh',
            'min',
            'max',
            'fit',
            ...scaleUnambiguousSpacing()
        ];
    const scaleSizingInline = ()=>[
            isFraction,
            'screen',
            'full',
            'dvw',
            'lvw',
            'svw',
            'min',
            'max',
            'fit',
            ...scaleUnambiguousSpacing()
        ];
    const scaleSizingBlock = ()=>[
            isFraction,
            'screen',
            'full',
            'lh',
            'dvh',
            'lvh',
            'svh',
            'min',
            'max',
            'fit',
            ...scaleUnambiguousSpacing()
        ];
    const scaleColor = ()=>[
            themeColor,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleBgPosition = ()=>[
            ...scalePosition(),
            isArbitraryVariablePosition,
            isArbitraryPosition,
            {
                position: [
                    isArbitraryVariable,
                    isArbitraryValue
                ]
            }
        ];
    const scaleBgRepeat = ()=>[
            'no-repeat',
            {
                repeat: [
                    '',
                    'x',
                    'y',
                    'space',
                    'round'
                ]
            }
        ];
    const scaleBgSize = ()=>[
            'auto',
            'cover',
            'contain',
            isArbitraryVariableSize,
            isArbitrarySize,
            {
                size: [
                    isArbitraryVariable,
                    isArbitraryValue
                ]
            }
        ];
    const scaleGradientStopPosition = ()=>[
            isPercent,
            isArbitraryVariableLength,
            isArbitraryLength
        ];
    const scaleRadius = ()=>[
            // Deprecated since Tailwind CSS v4.0.0
            '',
            'none',
            'full',
            themeRadius,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleBorderWidth = ()=>[
            '',
            isNumber,
            isArbitraryVariableLength,
            isArbitraryLength
        ];
    const scaleLineStyle = ()=>[
            'solid',
            'dashed',
            'dotted',
            'double'
        ];
    const scaleBlendMode = ()=>[
            'normal',
            'multiply',
            'screen',
            'overlay',
            'darken',
            'lighten',
            'color-dodge',
            'color-burn',
            'hard-light',
            'soft-light',
            'difference',
            'exclusion',
            'hue',
            'saturation',
            'color',
            'luminosity'
        ];
    const scaleMaskImagePosition = ()=>[
            isNumber,
            isPercent,
            isArbitraryVariablePosition,
            isArbitraryPosition
        ];
    const scaleBlur = ()=>[
            // Deprecated since Tailwind CSS v4.0.0
            '',
            'none',
            themeBlur,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleRotate = ()=>[
            'none',
            isNumber,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleScale = ()=>[
            'none',
            isNumber,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleSkew = ()=>[
            isNumber,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleTranslate = ()=>[
            isFraction,
            'full',
            ...scaleUnambiguousSpacing()
        ];
    return {
        cacheSize: 500,
        theme: {
            animate: [
                'spin',
                'ping',
                'pulse',
                'bounce'
            ],
            aspect: [
                'video'
            ],
            blur: [
                isTshirtSize
            ],
            breakpoint: [
                isTshirtSize
            ],
            color: [
                isAny
            ],
            container: [
                isTshirtSize
            ],
            'drop-shadow': [
                isTshirtSize
            ],
            ease: [
                'in',
                'out',
                'in-out'
            ],
            font: [
                isAnyNonArbitrary
            ],
            'font-weight': [
                'thin',
                'extralight',
                'light',
                'normal',
                'medium',
                'semibold',
                'bold',
                'extrabold',
                'black'
            ],
            'inset-shadow': [
                isTshirtSize
            ],
            leading: [
                'none',
                'tight',
                'snug',
                'normal',
                'relaxed',
                'loose'
            ],
            perspective: [
                'dramatic',
                'near',
                'normal',
                'midrange',
                'distant',
                'none'
            ],
            radius: [
                isTshirtSize
            ],
            shadow: [
                isTshirtSize
            ],
            spacing: [
                'px',
                isNumber
            ],
            text: [
                isTshirtSize
            ],
            'text-shadow': [
                isTshirtSize
            ],
            tracking: [
                'tighter',
                'tight',
                'normal',
                'wide',
                'wider',
                'widest'
            ]
        },
        classGroups: {
            // --------------
            // --- Layout ---
            // --------------
            /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */ aspect: [
                {
                    aspect: [
                        'auto',
                        'square',
                        isFraction,
                        isArbitraryValue,
                        isArbitraryVariable,
                        themeAspect
                    ]
                }
            ],
            /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */ container: [
                'container'
            ],
            /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */ columns: [
                {
                    columns: [
                        isNumber,
                        isArbitraryValue,
                        isArbitraryVariable,
                        themeContainer
                    ]
                }
            ],
            /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */ 'break-after': [
                {
                    'break-after': scaleBreak()
                }
            ],
            /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */ 'break-before': [
                {
                    'break-before': scaleBreak()
                }
            ],
            /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */ 'break-inside': [
                {
                    'break-inside': [
                        'auto',
                        'avoid',
                        'avoid-page',
                        'avoid-column'
                    ]
                }
            ],
            /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */ 'box-decoration': [
                {
                    'box-decoration': [
                        'slice',
                        'clone'
                    ]
                }
            ],
            /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */ box: [
                {
                    box: [
                        'border',
                        'content'
                    ]
                }
            ],
            /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */ display: [
                'block',
                'inline-block',
                'inline',
                'flex',
                'inline-flex',
                'table',
                'inline-table',
                'table-caption',
                'table-cell',
                'table-column',
                'table-column-group',
                'table-footer-group',
                'table-header-group',
                'table-row-group',
                'table-row',
                'flow-root',
                'grid',
                'inline-grid',
                'contents',
                'list-item',
                'hidden'
            ],
            /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */ sr: [
                'sr-only',
                'not-sr-only'
            ],
            /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */ float: [
                {
                    float: [
                        'right',
                        'left',
                        'none',
                        'start',
                        'end'
                    ]
                }
            ],
            /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */ clear: [
                {
                    clear: [
                        'left',
                        'right',
                        'both',
                        'none',
                        'start',
                        'end'
                    ]
                }
            ],
            /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */ isolation: [
                'isolate',
                'isolation-auto'
            ],
            /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */ 'object-fit': [
                {
                    object: [
                        'contain',
                        'cover',
                        'fill',
                        'none',
                        'scale-down'
                    ]
                }
            ],
            /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */ 'object-position': [
                {
                    object: scalePositionWithArbitrary()
                }
            ],
            /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */ overflow: [
                {
                    overflow: scaleOverflow()
                }
            ],
            /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */ 'overflow-x': [
                {
                    'overflow-x': scaleOverflow()
                }
            ],
            /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */ 'overflow-y': [
                {
                    'overflow-y': scaleOverflow()
                }
            ],
            /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */ overscroll: [
                {
                    overscroll: scaleOverscroll()
                }
            ],
            /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */ 'overscroll-x': [
                {
                    'overscroll-x': scaleOverscroll()
                }
            ],
            /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */ 'overscroll-y': [
                {
                    'overscroll-y': scaleOverscroll()
                }
            ],
            /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */ position: [
                'static',
                'fixed',
                'absolute',
                'relative',
                'sticky'
            ],
            /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ inset: [
                {
                    inset: scaleInset()
                }
            ],
            /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ 'inset-x': [
                {
                    'inset-x': scaleInset()
                }
            ],
            /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ 'inset-y': [
                {
                    'inset-y': scaleInset()
                }
            ],
            /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */ start: [
                {
                    'inset-s': scaleInset(),
                    /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */ start: scaleInset()
                }
            ],
            /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */ end: [
                {
                    'inset-e': scaleInset(),
                    /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */ end: scaleInset()
                }
            ],
            /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ 'inset-bs': [
                {
                    'inset-bs': scaleInset()
                }
            ],
            /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ 'inset-be': [
                {
                    'inset-be': scaleInset()
                }
            ],
            /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ top: [
                {
                    top: scaleInset()
                }
            ],
            /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ right: [
                {
                    right: scaleInset()
                }
            ],
            /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ bottom: [
                {
                    bottom: scaleInset()
                }
            ],
            /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ left: [
                {
                    left: scaleInset()
                }
            ],
            /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */ visibility: [
                'visible',
                'invisible',
                'collapse'
            ],
            /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */ z: [
                {
                    z: [
                        isInteger,
                        'auto',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            // ------------------------
            // --- Flexbox and Grid ---
            // ------------------------
            /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */ basis: [
                {
                    basis: [
                        isFraction,
                        'full',
                        'auto',
                        themeContainer,
                        ...scaleUnambiguousSpacing()
                    ]
                }
            ],
            /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */ 'flex-direction': [
                {
                    flex: [
                        'row',
                        'row-reverse',
                        'col',
                        'col-reverse'
                    ]
                }
            ],
            /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */ 'flex-wrap': [
                {
                    flex: [
                        'nowrap',
                        'wrap',
                        'wrap-reverse'
                    ]
                }
            ],
            /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */ flex: [
                {
                    flex: [
                        isNumber,
                        isFraction,
                        'auto',
                        'initial',
                        'none',
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */ grow: [
                {
                    grow: [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */ shrink: [
                {
                    shrink: [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */ order: [
                {
                    order: [
                        isInteger,
                        'first',
                        'last',
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */ 'grid-cols': [
                {
                    'grid-cols': scaleGridTemplateColsRows()
                }
            ],
            /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */ 'col-start-end': [
                {
                    col: scaleGridColRowStartAndEnd()
                }
            ],
            /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */ 'col-start': [
                {
                    'col-start': scaleGridColRowStartOrEnd()
                }
            ],
            /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */ 'col-end': [
                {
                    'col-end': scaleGridColRowStartOrEnd()
                }
            ],
            /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */ 'grid-rows': [
                {
                    'grid-rows': scaleGridTemplateColsRows()
                }
            ],
            /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */ 'row-start-end': [
                {
                    row: scaleGridColRowStartAndEnd()
                }
            ],
            /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */ 'row-start': [
                {
                    'row-start': scaleGridColRowStartOrEnd()
                }
            ],
            /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */ 'row-end': [
                {
                    'row-end': scaleGridColRowStartOrEnd()
                }
            ],
            /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */ 'grid-flow': [
                {
                    'grid-flow': [
                        'row',
                        'col',
                        'dense',
                        'row-dense',
                        'col-dense'
                    ]
                }
            ],
            /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */ 'auto-cols': [
                {
                    'auto-cols': scaleGridAutoColsRows()
                }
            ],
            /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */ 'auto-rows': [
                {
                    'auto-rows': scaleGridAutoColsRows()
                }
            ],
            /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */ gap: [
                {
                    gap: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */ 'gap-x': [
                {
                    'gap-x': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */ 'gap-y': [
                {
                    'gap-y': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */ 'justify-content': [
                {
                    justify: [
                        ...scaleAlignPrimaryAxis(),
                        'normal'
                    ]
                }
            ],
            /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */ 'justify-items': [
                {
                    'justify-items': [
                        ...scaleAlignSecondaryAxis(),
                        'normal'
                    ]
                }
            ],
            /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */ 'justify-self': [
                {
                    'justify-self': [
                        'auto',
                        ...scaleAlignSecondaryAxis()
                    ]
                }
            ],
            /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */ 'align-content': [
                {
                    content: [
                        'normal',
                        ...scaleAlignPrimaryAxis()
                    ]
                }
            ],
            /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */ 'align-items': [
                {
                    items: [
                        ...scaleAlignSecondaryAxis(),
                        {
                            baseline: [
                                '',
                                'last'
                            ]
                        }
                    ]
                }
            ],
            /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */ 'align-self': [
                {
                    self: [
                        'auto',
                        ...scaleAlignSecondaryAxis(),
                        {
                            baseline: [
                                '',
                                'last'
                            ]
                        }
                    ]
                }
            ],
            /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */ 'place-content': [
                {
                    'place-content': scaleAlignPrimaryAxis()
                }
            ],
            /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */ 'place-items': [
                {
                    'place-items': [
                        ...scaleAlignSecondaryAxis(),
                        'baseline'
                    ]
                }
            ],
            /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */ 'place-self': [
                {
                    'place-self': [
                        'auto',
                        ...scaleAlignSecondaryAxis()
                    ]
                }
            ],
            // Spacing
            /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */ p: [
                {
                    p: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */ px: [
                {
                    px: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */ py: [
                {
                    py: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */ ps: [
                {
                    ps: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */ pe: [
                {
                    pe: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */ pbs: [
                {
                    pbs: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */ pbe: [
                {
                    pbe: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */ pt: [
                {
                    pt: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */ pr: [
                {
                    pr: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */ pb: [
                {
                    pb: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */ pl: [
                {
                    pl: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */ m: [
                {
                    m: scaleMargin()
                }
            ],
            /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */ mx: [
                {
                    mx: scaleMargin()
                }
            ],
            /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */ my: [
                {
                    my: scaleMargin()
                }
            ],
            /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */ ms: [
                {
                    ms: scaleMargin()
                }
            ],
            /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */ me: [
                {
                    me: scaleMargin()
                }
            ],
            /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */ mbs: [
                {
                    mbs: scaleMargin()
                }
            ],
            /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */ mbe: [
                {
                    mbe: scaleMargin()
                }
            ],
            /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */ mt: [
                {
                    mt: scaleMargin()
                }
            ],
            /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */ mr: [
                {
                    mr: scaleMargin()
                }
            ],
            /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */ mb: [
                {
                    mb: scaleMargin()
                }
            ],
            /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */ ml: [
                {
                    ml: scaleMargin()
                }
            ],
            /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */ 'space-x': [
                {
                    'space-x': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */ 'space-x-reverse': [
                'space-x-reverse'
            ],
            /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */ 'space-y': [
                {
                    'space-y': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */ 'space-y-reverse': [
                'space-y-reverse'
            ],
            // --------------
            // --- Sizing ---
            // --------------
            /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */ size: [
                {
                    size: scaleSizing()
                }
            ],
            /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */ 'inline-size': [
                {
                    inline: [
                        'auto',
                        ...scaleSizingInline()
                    ]
                }
            ],
            /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */ 'min-inline-size': [
                {
                    'min-inline': [
                        'auto',
                        ...scaleSizingInline()
                    ]
                }
            ],
            /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */ 'max-inline-size': [
                {
                    'max-inline': [
                        'none',
                        ...scaleSizingInline()
                    ]
                }
            ],
            /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */ 'block-size': [
                {
                    block: [
                        'auto',
                        ...scaleSizingBlock()
                    ]
                }
            ],
            /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */ 'min-block-size': [
                {
                    'min-block': [
                        'auto',
                        ...scaleSizingBlock()
                    ]
                }
            ],
            /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */ 'max-block-size': [
                {
                    'max-block': [
                        'none',
                        ...scaleSizingBlock()
                    ]
                }
            ],
            /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */ w: [
                {
                    w: [
                        themeContainer,
                        'screen',
                        ...scaleSizing()
                    ]
                }
            ],
            /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */ 'min-w': [
                {
                    'min-w': [
                        themeContainer,
                        'screen',
                        /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */ 'none',
                        ...scaleSizing()
                    ]
                }
            ],
            /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */ 'max-w': [
                {
                    'max-w': [
                        themeContainer,
                        'screen',
                        'none',
                        /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */ 'prose',
                        /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */ {
                            screen: [
                                themeBreakpoint
                            ]
                        },
                        ...scaleSizing()
                    ]
                }
            ],
            /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */ h: [
                {
                    h: [
                        'screen',
                        'lh',
                        ...scaleSizing()
                    ]
                }
            ],
            /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */ 'min-h': [
                {
                    'min-h': [
                        'screen',
                        'lh',
                        'none',
                        ...scaleSizing()
                    ]
                }
            ],
            /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */ 'max-h': [
                {
                    'max-h': [
                        'screen',
                        'lh',
                        ...scaleSizing()
                    ]
                }
            ],
            // ------------------
            // --- Typography ---
            // ------------------
            /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */ 'font-size': [
                {
                    text: [
                        'base',
                        themeText,
                        isArbitraryVariableLength,
                        isArbitraryLength
                    ]
                }
            ],
            /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */ 'font-smoothing': [
                'antialiased',
                'subpixel-antialiased'
            ],
            /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */ 'font-style': [
                'italic',
                'not-italic'
            ],
            /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */ 'font-weight': [
                {
                    font: [
                        themeFontWeight,
                        isArbitraryVariableWeight,
                        isArbitraryWeight
                    ]
                }
            ],
            /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */ 'font-stretch': [
                {
                    'font-stretch': [
                        'ultra-condensed',
                        'extra-condensed',
                        'condensed',
                        'semi-condensed',
                        'normal',
                        'semi-expanded',
                        'expanded',
                        'extra-expanded',
                        'ultra-expanded',
                        isPercent,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */ 'font-family': [
                {
                    font: [
                        isArbitraryVariableFamilyName,
                        isArbitraryFamilyName,
                        themeFont
                    ]
                }
            ],
            /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */ 'font-features': [
                {
                    'font-features': [
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ 'fvn-normal': [
                'normal-nums'
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ 'fvn-ordinal': [
                'ordinal'
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ 'fvn-slashed-zero': [
                'slashed-zero'
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ 'fvn-figure': [
                'lining-nums',
                'oldstyle-nums'
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ 'fvn-spacing': [
                'proportional-nums',
                'tabular-nums'
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ 'fvn-fraction': [
                'diagonal-fractions',
                'stacked-fractions'
            ],
            /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */ tracking: [
                {
                    tracking: [
                        themeTracking,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */ 'line-clamp': [
                {
                    'line-clamp': [
                        isNumber,
                        'none',
                        isArbitraryVariable,
                        isArbitraryNumber
                    ]
                }
            ],
            /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */ leading: [
                {
                    leading: [
                        /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */ themeLeading,
                        ...scaleUnambiguousSpacing()
                    ]
                }
            ],
            /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */ 'list-image': [
                {
                    'list-image': [
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */ 'list-style-position': [
                {
                    list: [
                        'inside',
                        'outside'
                    ]
                }
            ],
            /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */ 'list-style-type': [
                {
                    list: [
                        'disc',
                        'decimal',
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */ 'text-alignment': [
                {
                    text: [
                        'left',
                        'center',
                        'right',
                        'justify',
                        'start',
                        'end'
                    ]
                }
            ],
            /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */ 'placeholder-color': [
                {
                    placeholder: scaleColor()
                }
            ],
            /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */ 'text-color': [
                {
                    text: scaleColor()
                }
            ],
            /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */ 'text-decoration': [
                'underline',
                'overline',
                'line-through',
                'no-underline'
            ],
            /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */ 'text-decoration-style': [
                {
                    decoration: [
                        ...scaleLineStyle(),
                        'wavy'
                    ]
                }
            ],
            /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */ 'text-decoration-thickness': [
                {
                    decoration: [
                        isNumber,
                        'from-font',
                        'auto',
                        isArbitraryVariable,
                        isArbitraryLength
                    ]
                }
            ],
            /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */ 'text-decoration-color': [
                {
                    decoration: scaleColor()
                }
            ],
            /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */ 'underline-offset': [
                {
                    'underline-offset': [
                        isNumber,
                        'auto',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */ 'text-transform': [
                'uppercase',
                'lowercase',
                'capitalize',
                'normal-case'
            ],
            /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */ 'text-overflow': [
                'truncate',
                'text-ellipsis',
                'text-clip'
            ],
            /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */ 'text-wrap': [
                {
                    text: [
                        'wrap',
                        'nowrap',
                        'balance',
                        'pretty'
                    ]
                }
            ],
            /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */ indent: [
                {
                    indent: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */ 'vertical-align': [
                {
                    align: [
                        'baseline',
                        'top',
                        'middle',
                        'bottom',
                        'text-top',
                        'text-bottom',
                        'sub',
                        'super',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */ whitespace: [
                {
                    whitespace: [
                        'normal',
                        'nowrap',
                        'pre',
                        'pre-line',
                        'pre-wrap',
                        'break-spaces'
                    ]
                }
            ],
            /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */ break: [
                {
                    break: [
                        'normal',
                        'words',
                        'all',
                        'keep'
                    ]
                }
            ],
            /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */ wrap: [
                {
                    wrap: [
                        'break-word',
                        'anywhere',
                        'normal'
                    ]
                }
            ],
            /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */ hyphens: [
                {
                    hyphens: [
                        'none',
                        'manual',
                        'auto'
                    ]
                }
            ],
            /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */ content: [
                {
                    content: [
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            // -------------------
            // --- Backgrounds ---
            // -------------------
            /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */ 'bg-attachment': [
                {
                    bg: [
                        'fixed',
                        'local',
                        'scroll'
                    ]
                }
            ],
            /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */ 'bg-clip': [
                {
                    'bg-clip': [
                        'border',
                        'padding',
                        'content',
                        'text'
                    ]
                }
            ],
            /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */ 'bg-origin': [
                {
                    'bg-origin': [
                        'border',
                        'padding',
                        'content'
                    ]
                }
            ],
            /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */ 'bg-position': [
                {
                    bg: scaleBgPosition()
                }
            ],
            /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */ 'bg-repeat': [
                {
                    bg: scaleBgRepeat()
                }
            ],
            /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */ 'bg-size': [
                {
                    bg: scaleBgSize()
                }
            ],
            /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */ 'bg-image': [
                {
                    bg: [
                        'none',
                        {
                            linear: [
                                {
                                    to: [
                                        't',
                                        'tr',
                                        'r',
                                        'br',
                                        'b',
                                        'bl',
                                        'l',
                                        'tl'
                                    ]
                                },
                                isInteger,
                                isArbitraryVariable,
                                isArbitraryValue
                            ],
                            radial: [
                                '',
                                isArbitraryVariable,
                                isArbitraryValue
                            ],
                            conic: [
                                isInteger,
                                isArbitraryVariable,
                                isArbitraryValue
                            ]
                        },
                        isArbitraryVariableImage,
                        isArbitraryImage
                    ]
                }
            ],
            /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */ 'bg-color': [
                {
                    bg: scaleColor()
                }
            ],
            /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ 'gradient-from-pos': [
                {
                    from: scaleGradientStopPosition()
                }
            ],
            /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ 'gradient-via-pos': [
                {
                    via: scaleGradientStopPosition()
                }
            ],
            /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ 'gradient-to-pos': [
                {
                    to: scaleGradientStopPosition()
                }
            ],
            /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ 'gradient-from': [
                {
                    from: scaleColor()
                }
            ],
            /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ 'gradient-via': [
                {
                    via: scaleColor()
                }
            ],
            /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ 'gradient-to': [
                {
                    to: scaleColor()
                }
            ],
            // ---------------
            // --- Borders ---
            // ---------------
            /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */ rounded: [
                {
                    rounded: scaleRadius()
                }
            ],
            /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-s': [
                {
                    'rounded-s': scaleRadius()
                }
            ],
            /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-e': [
                {
                    'rounded-e': scaleRadius()
                }
            ],
            /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-t': [
                {
                    'rounded-t': scaleRadius()
                }
            ],
            /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-r': [
                {
                    'rounded-r': scaleRadius()
                }
            ],
            /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-b': [
                {
                    'rounded-b': scaleRadius()
                }
            ],
            /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-l': [
                {
                    'rounded-l': scaleRadius()
                }
            ],
            /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-ss': [
                {
                    'rounded-ss': scaleRadius()
                }
            ],
            /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-se': [
                {
                    'rounded-se': scaleRadius()
                }
            ],
            /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-ee': [
                {
                    'rounded-ee': scaleRadius()
                }
            ],
            /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-es': [
                {
                    'rounded-es': scaleRadius()
                }
            ],
            /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-tl': [
                {
                    'rounded-tl': scaleRadius()
                }
            ],
            /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-tr': [
                {
                    'rounded-tr': scaleRadius()
                }
            ],
            /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-br': [
                {
                    'rounded-br': scaleRadius()
                }
            ],
            /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-bl': [
                {
                    'rounded-bl': scaleRadius()
                }
            ],
            /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w': [
                {
                    border: scaleBorderWidth()
                }
            ],
            /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-x': [
                {
                    'border-x': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-y': [
                {
                    'border-y': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-s': [
                {
                    'border-s': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-e': [
                {
                    'border-e': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-bs': [
                {
                    'border-bs': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-be': [
                {
                    'border-be': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-t': [
                {
                    'border-t': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-r': [
                {
                    'border-r': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-b': [
                {
                    'border-b': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-l': [
                {
                    'border-l': scaleBorderWidth()
                }
            ],
            /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */ 'divide-x': [
                {
                    'divide-x': scaleBorderWidth()
                }
            ],
            /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */ 'divide-x-reverse': [
                'divide-x-reverse'
            ],
            /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */ 'divide-y': [
                {
                    'divide-y': scaleBorderWidth()
                }
            ],
            /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */ 'divide-y-reverse': [
                'divide-y-reverse'
            ],
            /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */ 'border-style': [
                {
                    border: [
                        ...scaleLineStyle(),
                        'hidden',
                        'none'
                    ]
                }
            ],
            /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */ 'divide-style': [
                {
                    divide: [
                        ...scaleLineStyle(),
                        'hidden',
                        'none'
                    ]
                }
            ],
            /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color': [
                {
                    border: scaleColor()
                }
            ],
            /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-x': [
                {
                    'border-x': scaleColor()
                }
            ],
            /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-y': [
                {
                    'border-y': scaleColor()
                }
            ],
            /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-s': [
                {
                    'border-s': scaleColor()
                }
            ],
            /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-e': [
                {
                    'border-e': scaleColor()
                }
            ],
            /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-bs': [
                {
                    'border-bs': scaleColor()
                }
            ],
            /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-be': [
                {
                    'border-be': scaleColor()
                }
            ],
            /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-t': [
                {
                    'border-t': scaleColor()
                }
            ],
            /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-r': [
                {
                    'border-r': scaleColor()
                }
            ],
            /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-b': [
                {
                    'border-b': scaleColor()
                }
            ],
            /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-l': [
                {
                    'border-l': scaleColor()
                }
            ],
            /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */ 'divide-color': [
                {
                    divide: scaleColor()
                }
            ],
            /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */ 'outline-style': [
                {
                    outline: [
                        ...scaleLineStyle(),
                        'none',
                        'hidden'
                    ]
                }
            ],
            /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */ 'outline-offset': [
                {
                    'outline-offset': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */ 'outline-w': [
                {
                    outline: [
                        '',
                        isNumber,
                        isArbitraryVariableLength,
                        isArbitraryLength
                    ]
                }
            ],
            /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */ 'outline-color': [
                {
                    outline: scaleColor()
                }
            ],
            // ---------------
            // --- Effects ---
            // ---------------
            /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */ shadow: [
                {
                    shadow: [
                        // Deprecated since Tailwind CSS v4.0.0
                        '',
                        'none',
                        themeShadow,
                        isArbitraryVariableShadow,
                        isArbitraryShadow
                    ]
                }
            ],
            /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */ 'shadow-color': [
                {
                    shadow: scaleColor()
                }
            ],
            /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */ 'inset-shadow': [
                {
                    'inset-shadow': [
                        'none',
                        themeInsetShadow,
                        isArbitraryVariableShadow,
                        isArbitraryShadow
                    ]
                }
            ],
            /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */ 'inset-shadow-color': [
                {
                    'inset-shadow': scaleColor()
                }
            ],
            /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */ 'ring-w': [
                {
                    ring: scaleBorderWidth()
                }
            ],
            /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */ 'ring-w-inset': [
                'ring-inset'
            ],
            /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */ 'ring-color': [
                {
                    ring: scaleColor()
                }
            ],
            /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */ 'ring-offset-w': [
                {
                    'ring-offset': [
                        isNumber,
                        isArbitraryLength
                    ]
                }
            ],
            /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */ 'ring-offset-color': [
                {
                    'ring-offset': scaleColor()
                }
            ],
            /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */ 'inset-ring-w': [
                {
                    'inset-ring': scaleBorderWidth()
                }
            ],
            /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */ 'inset-ring-color': [
                {
                    'inset-ring': scaleColor()
                }
            ],
            /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */ 'text-shadow': [
                {
                    'text-shadow': [
                        'none',
                        themeTextShadow,
                        isArbitraryVariableShadow,
                        isArbitraryShadow
                    ]
                }
            ],
            /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */ 'text-shadow-color': [
                {
                    'text-shadow': scaleColor()
                }
            ],
            /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */ opacity: [
                {
                    opacity: [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */ 'mix-blend': [
                {
                    'mix-blend': [
                        ...scaleBlendMode(),
                        'plus-darker',
                        'plus-lighter'
                    ]
                }
            ],
            /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */ 'bg-blend': [
                {
                    'bg-blend': scaleBlendMode()
                }
            ],
            /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */ 'mask-clip': [
                {
                    'mask-clip': [
                        'border',
                        'padding',
                        'content',
                        'fill',
                        'stroke',
                        'view'
                    ]
                },
                'mask-no-clip'
            ],
            /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */ 'mask-composite': [
                {
                    mask: [
                        'add',
                        'subtract',
                        'intersect',
                        'exclude'
                    ]
                }
            ],
            /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */ 'mask-image-linear-pos': [
                {
                    'mask-linear': [
                        isNumber
                    ]
                }
            ],
            'mask-image-linear-from-pos': [
                {
                    'mask-linear-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-linear-to-pos': [
                {
                    'mask-linear-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-linear-from-color': [
                {
                    'mask-linear-from': scaleColor()
                }
            ],
            'mask-image-linear-to-color': [
                {
                    'mask-linear-to': scaleColor()
                }
            ],
            'mask-image-t-from-pos': [
                {
                    'mask-t-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-t-to-pos': [
                {
                    'mask-t-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-t-from-color': [
                {
                    'mask-t-from': scaleColor()
                }
            ],
            'mask-image-t-to-color': [
                {
                    'mask-t-to': scaleColor()
                }
            ],
            'mask-image-r-from-pos': [
                {
                    'mask-r-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-r-to-pos': [
                {
                    'mask-r-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-r-from-color': [
                {
                    'mask-r-from': scaleColor()
                }
            ],
            'mask-image-r-to-color': [
                {
                    'mask-r-to': scaleColor()
                }
            ],
            'mask-image-b-from-pos': [
                {
                    'mask-b-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-b-to-pos': [
                {
                    'mask-b-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-b-from-color': [
                {
                    'mask-b-from': scaleColor()
                }
            ],
            'mask-image-b-to-color': [
                {
                    'mask-b-to': scaleColor()
                }
            ],
            'mask-image-l-from-pos': [
                {
                    'mask-l-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-l-to-pos': [
                {
                    'mask-l-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-l-from-color': [
                {
                    'mask-l-from': scaleColor()
                }
            ],
            'mask-image-l-to-color': [
                {
                    'mask-l-to': scaleColor()
                }
            ],
            'mask-image-x-from-pos': [
                {
                    'mask-x-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-x-to-pos': [
                {
                    'mask-x-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-x-from-color': [
                {
                    'mask-x-from': scaleColor()
                }
            ],
            'mask-image-x-to-color': [
                {
                    'mask-x-to': scaleColor()
                }
            ],
            'mask-image-y-from-pos': [
                {
                    'mask-y-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-y-to-pos': [
                {
                    'mask-y-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-y-from-color': [
                {
                    'mask-y-from': scaleColor()
                }
            ],
            'mask-image-y-to-color': [
                {
                    'mask-y-to': scaleColor()
                }
            ],
            'mask-image-radial': [
                {
                    'mask-radial': [
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            'mask-image-radial-from-pos': [
                {
                    'mask-radial-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-radial-to-pos': [
                {
                    'mask-radial-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-radial-from-color': [
                {
                    'mask-radial-from': scaleColor()
                }
            ],
            'mask-image-radial-to-color': [
                {
                    'mask-radial-to': scaleColor()
                }
            ],
            'mask-image-radial-shape': [
                {
                    'mask-radial': [
                        'circle',
                        'ellipse'
                    ]
                }
            ],
            'mask-image-radial-size': [
                {
                    'mask-radial': [
                        {
                            closest: [
                                'side',
                                'corner'
                            ],
                            farthest: [
                                'side',
                                'corner'
                            ]
                        }
                    ]
                }
            ],
            'mask-image-radial-pos': [
                {
                    'mask-radial-at': scalePosition()
                }
            ],
            'mask-image-conic-pos': [
                {
                    'mask-conic': [
                        isNumber
                    ]
                }
            ],
            'mask-image-conic-from-pos': [
                {
                    'mask-conic-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-conic-to-pos': [
                {
                    'mask-conic-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-conic-from-color': [
                {
                    'mask-conic-from': scaleColor()
                }
            ],
            'mask-image-conic-to-color': [
                {
                    'mask-conic-to': scaleColor()
                }
            ],
            /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */ 'mask-mode': [
                {
                    mask: [
                        'alpha',
                        'luminance',
                        'match'
                    ]
                }
            ],
            /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */ 'mask-origin': [
                {
                    'mask-origin': [
                        'border',
                        'padding',
                        'content',
                        'fill',
                        'stroke',
                        'view'
                    ]
                }
            ],
            /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */ 'mask-position': [
                {
                    mask: scaleBgPosition()
                }
            ],
            /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */ 'mask-repeat': [
                {
                    mask: scaleBgRepeat()
                }
            ],
            /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */ 'mask-size': [
                {
                    mask: scaleBgSize()
                }
            ],
            /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */ 'mask-type': [
                {
                    'mask-type': [
                        'alpha',
                        'luminance'
                    ]
                }
            ],
            /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */ 'mask-image': [
                {
                    mask: [
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            // ---------------
            // --- Filters ---
            // ---------------
            /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */ filter: [
                {
                    filter: [
                        // Deprecated since Tailwind CSS v3.0.0
                        '',
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */ blur: [
                {
                    blur: scaleBlur()
                }
            ],
            /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */ brightness: [
                {
                    brightness: [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */ contrast: [
                {
                    contrast: [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */ 'drop-shadow': [
                {
                    'drop-shadow': [
                        // Deprecated since Tailwind CSS v4.0.0
                        '',
                        'none',
                        themeDropShadow,
                        isArbitraryVariableShadow,
                        isArbitraryShadow
                    ]
                }
            ],
            /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */ 'drop-shadow-color': [
                {
                    'drop-shadow': scaleColor()
                }
            ],
            /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */ grayscale: [
                {
                    grayscale: [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */ 'hue-rotate': [
                {
                    'hue-rotate': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */ invert: [
                {
                    invert: [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */ saturate: [
                {
                    saturate: [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */ sepia: [
                {
                    sepia: [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */ 'backdrop-filter': [
                {
                    'backdrop-filter': [
                        // Deprecated since Tailwind CSS v3.0.0
                        '',
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */ 'backdrop-blur': [
                {
                    'backdrop-blur': scaleBlur()
                }
            ],
            /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */ 'backdrop-brightness': [
                {
                    'backdrop-brightness': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */ 'backdrop-contrast': [
                {
                    'backdrop-contrast': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */ 'backdrop-grayscale': [
                {
                    'backdrop-grayscale': [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */ 'backdrop-hue-rotate': [
                {
                    'backdrop-hue-rotate': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */ 'backdrop-invert': [
                {
                    'backdrop-invert': [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */ 'backdrop-opacity': [
                {
                    'backdrop-opacity': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */ 'backdrop-saturate': [
                {
                    'backdrop-saturate': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */ 'backdrop-sepia': [
                {
                    'backdrop-sepia': [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            // --------------
            // --- Tables ---
            // --------------
            /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */ 'border-collapse': [
                {
                    border: [
                        'collapse',
                        'separate'
                    ]
                }
            ],
            /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */ 'border-spacing': [
                {
                    'border-spacing': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */ 'border-spacing-x': [
                {
                    'border-spacing-x': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */ 'border-spacing-y': [
                {
                    'border-spacing-y': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */ 'table-layout': [
                {
                    table: [
                        'auto',
                        'fixed'
                    ]
                }
            ],
            /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */ caption: [
                {
                    caption: [
                        'top',
                        'bottom'
                    ]
                }
            ],
            // ---------------------------------
            // --- Transitions and Animation ---
            // ---------------------------------
            /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */ transition: [
                {
                    transition: [
                        '',
                        'all',
                        'colors',
                        'opacity',
                        'shadow',
                        'transform',
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */ 'transition-behavior': [
                {
                    transition: [
                        'normal',
                        'discrete'
                    ]
                }
            ],
            /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */ duration: [
                {
                    duration: [
                        isNumber,
                        'initial',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */ ease: [
                {
                    ease: [
                        'linear',
                        'initial',
                        themeEase,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */ delay: [
                {
                    delay: [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */ animate: [
                {
                    animate: [
                        'none',
                        themeAnimate,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            // ------------------
            // --- Transforms ---
            // ------------------
            /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */ backface: [
                {
                    backface: [
                        'hidden',
                        'visible'
                    ]
                }
            ],
            /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */ perspective: [
                {
                    perspective: [
                        themePerspective,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */ 'perspective-origin': [
                {
                    'perspective-origin': scalePositionWithArbitrary()
                }
            ],
            /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */ rotate: [
                {
                    rotate: scaleRotate()
                }
            ],
            /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */ 'rotate-x': [
                {
                    'rotate-x': scaleRotate()
                }
            ],
            /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */ 'rotate-y': [
                {
                    'rotate-y': scaleRotate()
                }
            ],
            /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */ 'rotate-z': [
                {
                    'rotate-z': scaleRotate()
                }
            ],
            /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */ scale: [
                {
                    scale: scaleScale()
                }
            ],
            /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */ 'scale-x': [
                {
                    'scale-x': scaleScale()
                }
            ],
            /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */ 'scale-y': [
                {
                    'scale-y': scaleScale()
                }
            ],
            /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */ 'scale-z': [
                {
                    'scale-z': scaleScale()
                }
            ],
            /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */ 'scale-3d': [
                'scale-3d'
            ],
            /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */ skew: [
                {
                    skew: scaleSkew()
                }
            ],
            /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */ 'skew-x': [
                {
                    'skew-x': scaleSkew()
                }
            ],
            /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */ 'skew-y': [
                {
                    'skew-y': scaleSkew()
                }
            ],
            /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */ transform: [
                {
                    transform: [
                        isArbitraryVariable,
                        isArbitraryValue,
                        '',
                        'none',
                        'gpu',
                        'cpu'
                    ]
                }
            ],
            /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */ 'transform-origin': [
                {
                    origin: scalePositionWithArbitrary()
                }
            ],
            /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */ 'transform-style': [
                {
                    transform: [
                        '3d',
                        'flat'
                    ]
                }
            ],
            /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */ translate: [
                {
                    translate: scaleTranslate()
                }
            ],
            /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */ 'translate-x': [
                {
                    'translate-x': scaleTranslate()
                }
            ],
            /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */ 'translate-y': [
                {
                    'translate-y': scaleTranslate()
                }
            ],
            /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */ 'translate-z': [
                {
                    'translate-z': scaleTranslate()
                }
            ],
            /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */ 'translate-none': [
                'translate-none'
            ],
            // ---------------------
            // --- Interactivity ---
            // ---------------------
            /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */ accent: [
                {
                    accent: scaleColor()
                }
            ],
            /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */ appearance: [
                {
                    appearance: [
                        'none',
                        'auto'
                    ]
                }
            ],
            /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */ 'caret-color': [
                {
                    caret: scaleColor()
                }
            ],
            /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */ 'color-scheme': [
                {
                    scheme: [
                        'normal',
                        'dark',
                        'light',
                        'light-dark',
                        'only-dark',
                        'only-light'
                    ]
                }
            ],
            /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */ cursor: [
                {
                    cursor: [
                        'auto',
                        'default',
                        'pointer',
                        'wait',
                        'text',
                        'move',
                        'help',
                        'not-allowed',
                        'none',
                        'context-menu',
                        'progress',
                        'cell',
                        'crosshair',
                        'vertical-text',
                        'alias',
                        'copy',
                        'no-drop',
                        'grab',
                        'grabbing',
                        'all-scroll',
                        'col-resize',
                        'row-resize',
                        'n-resize',
                        'e-resize',
                        's-resize',
                        'w-resize',
                        'ne-resize',
                        'nw-resize',
                        'se-resize',
                        'sw-resize',
                        'ew-resize',
                        'ns-resize',
                        'nesw-resize',
                        'nwse-resize',
                        'zoom-in',
                        'zoom-out',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */ 'field-sizing': [
                {
                    'field-sizing': [
                        'fixed',
                        'content'
                    ]
                }
            ],
            /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */ 'pointer-events': [
                {
                    'pointer-events': [
                        'auto',
                        'none'
                    ]
                }
            ],
            /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */ resize: [
                {
                    resize: [
                        'none',
                        '',
                        'y',
                        'x'
                    ]
                }
            ],
            /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */ 'scroll-behavior': [
                {
                    scroll: [
                        'auto',
                        'smooth'
                    ]
                }
            ],
            /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-m': [
                {
                    'scroll-m': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-mx': [
                {
                    'scroll-mx': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-my': [
                {
                    'scroll-my': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-ms': [
                {
                    'scroll-ms': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-me': [
                {
                    'scroll-me': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-mbs': [
                {
                    'scroll-mbs': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-mbe': [
                {
                    'scroll-mbe': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-mt': [
                {
                    'scroll-mt': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-mr': [
                {
                    'scroll-mr': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-mb': [
                {
                    'scroll-mb': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-ml': [
                {
                    'scroll-ml': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-p': [
                {
                    'scroll-p': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-px': [
                {
                    'scroll-px': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-py': [
                {
                    'scroll-py': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-ps': [
                {
                    'scroll-ps': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-pe': [
                {
                    'scroll-pe': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-pbs': [
                {
                    'scroll-pbs': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-pbe': [
                {
                    'scroll-pbe': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-pt': [
                {
                    'scroll-pt': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-pr': [
                {
                    'scroll-pr': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-pb': [
                {
                    'scroll-pb': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-pl': [
                {
                    'scroll-pl': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */ 'snap-align': [
                {
                    snap: [
                        'start',
                        'end',
                        'center',
                        'align-none'
                    ]
                }
            ],
            /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */ 'snap-stop': [
                {
                    snap: [
                        'normal',
                        'always'
                    ]
                }
            ],
            /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */ 'snap-type': [
                {
                    snap: [
                        'none',
                        'x',
                        'y',
                        'both'
                    ]
                }
            ],
            /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */ 'snap-strictness': [
                {
                    snap: [
                        'mandatory',
                        'proximity'
                    ]
                }
            ],
            /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */ touch: [
                {
                    touch: [
                        'auto',
                        'none',
                        'manipulation'
                    ]
                }
            ],
            /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */ 'touch-x': [
                {
                    'touch-pan': [
                        'x',
                        'left',
                        'right'
                    ]
                }
            ],
            /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */ 'touch-y': [
                {
                    'touch-pan': [
                        'y',
                        'up',
                        'down'
                    ]
                }
            ],
            /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */ 'touch-pz': [
                'touch-pinch-zoom'
            ],
            /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */ select: [
                {
                    select: [
                        'none',
                        'text',
                        'all',
                        'auto'
                    ]
                }
            ],
            /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */ 'will-change': [
                {
                    'will-change': [
                        'auto',
                        'scroll',
                        'contents',
                        'transform',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            // -----------
            // --- SVG ---
            // -----------
            /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */ fill: [
                {
                    fill: [
                        'none',
                        ...scaleColor()
                    ]
                }
            ],
            /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */ 'stroke-w': [
                {
                    stroke: [
                        isNumber,
                        isArbitraryVariableLength,
                        isArbitraryLength,
                        isArbitraryNumber
                    ]
                }
            ],
            /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */ stroke: [
                {
                    stroke: [
                        'none',
                        ...scaleColor()
                    ]
                }
            ],
            // ---------------------
            // --- Accessibility ---
            // ---------------------
            /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */ 'forced-color-adjust': [
                {
                    'forced-color-adjust': [
                        'auto',
                        'none'
                    ]
                }
            ]
        },
        conflictingClassGroups: {
            overflow: [
                'overflow-x',
                'overflow-y'
            ],
            overscroll: [
                'overscroll-x',
                'overscroll-y'
            ],
            inset: [
                'inset-x',
                'inset-y',
                'inset-bs',
                'inset-be',
                'start',
                'end',
                'top',
                'right',
                'bottom',
                'left'
            ],
            'inset-x': [
                'right',
                'left'
            ],
            'inset-y': [
                'top',
                'bottom'
            ],
            flex: [
                'basis',
                'grow',
                'shrink'
            ],
            gap: [
                'gap-x',
                'gap-y'
            ],
            p: [
                'px',
                'py',
                'ps',
                'pe',
                'pbs',
                'pbe',
                'pt',
                'pr',
                'pb',
                'pl'
            ],
            px: [
                'pr',
                'pl'
            ],
            py: [
                'pt',
                'pb'
            ],
            m: [
                'mx',
                'my',
                'ms',
                'me',
                'mbs',
                'mbe',
                'mt',
                'mr',
                'mb',
                'ml'
            ],
            mx: [
                'mr',
                'ml'
            ],
            my: [
                'mt',
                'mb'
            ],
            size: [
                'w',
                'h'
            ],
            'font-size': [
                'leading'
            ],
            'fvn-normal': [
                'fvn-ordinal',
                'fvn-slashed-zero',
                'fvn-figure',
                'fvn-spacing',
                'fvn-fraction'
            ],
            'fvn-ordinal': [
                'fvn-normal'
            ],
            'fvn-slashed-zero': [
                'fvn-normal'
            ],
            'fvn-figure': [
                'fvn-normal'
            ],
            'fvn-spacing': [
                'fvn-normal'
            ],
            'fvn-fraction': [
                'fvn-normal'
            ],
            'line-clamp': [
                'display',
                'overflow'
            ],
            rounded: [
                'rounded-s',
                'rounded-e',
                'rounded-t',
                'rounded-r',
                'rounded-b',
                'rounded-l',
                'rounded-ss',
                'rounded-se',
                'rounded-ee',
                'rounded-es',
                'rounded-tl',
                'rounded-tr',
                'rounded-br',
                'rounded-bl'
            ],
            'rounded-s': [
                'rounded-ss',
                'rounded-es'
            ],
            'rounded-e': [
                'rounded-se',
                'rounded-ee'
            ],
            'rounded-t': [
                'rounded-tl',
                'rounded-tr'
            ],
            'rounded-r': [
                'rounded-tr',
                'rounded-br'
            ],
            'rounded-b': [
                'rounded-br',
                'rounded-bl'
            ],
            'rounded-l': [
                'rounded-tl',
                'rounded-bl'
            ],
            'border-spacing': [
                'border-spacing-x',
                'border-spacing-y'
            ],
            'border-w': [
                'border-w-x',
                'border-w-y',
                'border-w-s',
                'border-w-e',
                'border-w-bs',
                'border-w-be',
                'border-w-t',
                'border-w-r',
                'border-w-b',
                'border-w-l'
            ],
            'border-w-x': [
                'border-w-r',
                'border-w-l'
            ],
            'border-w-y': [
                'border-w-t',
                'border-w-b'
            ],
            'border-color': [
                'border-color-x',
                'border-color-y',
                'border-color-s',
                'border-color-e',
                'border-color-bs',
                'border-color-be',
                'border-color-t',
                'border-color-r',
                'border-color-b',
                'border-color-l'
            ],
            'border-color-x': [
                'border-color-r',
                'border-color-l'
            ],
            'border-color-y': [
                'border-color-t',
                'border-color-b'
            ],
            translate: [
                'translate-x',
                'translate-y',
                'translate-none'
            ],
            'translate-none': [
                'translate',
                'translate-x',
                'translate-y',
                'translate-z'
            ],
            'scroll-m': [
                'scroll-mx',
                'scroll-my',
                'scroll-ms',
                'scroll-me',
                'scroll-mbs',
                'scroll-mbe',
                'scroll-mt',
                'scroll-mr',
                'scroll-mb',
                'scroll-ml'
            ],
            'scroll-mx': [
                'scroll-mr',
                'scroll-ml'
            ],
            'scroll-my': [
                'scroll-mt',
                'scroll-mb'
            ],
            'scroll-p': [
                'scroll-px',
                'scroll-py',
                'scroll-ps',
                'scroll-pe',
                'scroll-pbs',
                'scroll-pbe',
                'scroll-pt',
                'scroll-pr',
                'scroll-pb',
                'scroll-pl'
            ],
            'scroll-px': [
                'scroll-pr',
                'scroll-pl'
            ],
            'scroll-py': [
                'scroll-pt',
                'scroll-pb'
            ],
            touch: [
                'touch-x',
                'touch-y',
                'touch-pz'
            ],
            'touch-x': [
                'touch'
            ],
            'touch-y': [
                'touch'
            ],
            'touch-pz': [
                'touch'
            ]
        },
        conflictingClassGroupModifiers: {
            'font-size': [
                'leading'
            ]
        },
        orderSensitiveModifiers: [
            '*',
            '**',
            'after',
            'backdrop',
            'before',
            'details-content',
            'file',
            'first-letter',
            'first-line',
            'marker',
            'placeholder',
            'selection'
        ]
    };
};
/**
 * @param baseConfig Config where other config will be merged into. This object will be mutated.
 * @param configExtension Partial config to merge into the `baseConfig`.
 */ const mergeConfigs = (baseConfig, { cacheSize, prefix, experimentalParseClassName, extend = {}, override = {} })=>{
    overrideProperty(baseConfig, 'cacheSize', cacheSize);
    overrideProperty(baseConfig, 'prefix', prefix);
    overrideProperty(baseConfig, 'experimentalParseClassName', experimentalParseClassName);
    overrideConfigProperties(baseConfig.theme, override.theme);
    overrideConfigProperties(baseConfig.classGroups, override.classGroups);
    overrideConfigProperties(baseConfig.conflictingClassGroups, override.conflictingClassGroups);
    overrideConfigProperties(baseConfig.conflictingClassGroupModifiers, override.conflictingClassGroupModifiers);
    overrideProperty(baseConfig, 'orderSensitiveModifiers', override.orderSensitiveModifiers);
    mergeConfigProperties(baseConfig.theme, extend.theme);
    mergeConfigProperties(baseConfig.classGroups, extend.classGroups);
    mergeConfigProperties(baseConfig.conflictingClassGroups, extend.conflictingClassGroups);
    mergeConfigProperties(baseConfig.conflictingClassGroupModifiers, extend.conflictingClassGroupModifiers);
    mergeArrayProperties(baseConfig, extend, 'orderSensitiveModifiers');
    return baseConfig;
};
const overrideProperty = (baseObject, overrideKey, overrideValue)=>{
    if (overrideValue !== undefined) {
        baseObject[overrideKey] = overrideValue;
    }
};
const overrideConfigProperties = (baseObject, overrideObject)=>{
    if (overrideObject) {
        for(const key in overrideObject){
            overrideProperty(baseObject, key, overrideObject[key]);
        }
    }
};
const mergeConfigProperties = (baseObject, mergeObject)=>{
    if (mergeObject) {
        for(const key in mergeObject){
            mergeArrayProperties(baseObject, mergeObject, key);
        }
    }
};
const mergeArrayProperties = (baseObject, mergeObject, key)=>{
    const mergeValue = mergeObject[key];
    if (mergeValue !== undefined) {
        baseObject[key] = baseObject[key] ? baseObject[key].concat(mergeValue) : mergeValue;
    }
};
const extendTailwindMerge = (configExtension, ...createConfig)=>typeof configExtension === 'function' ? createTailwindMerge(getDefaultConfig, configExtension, ...createConfig) : createTailwindMerge(()=>mergeConfigs(getDefaultConfig(), configExtension), ...createConfig);
const twMerge = /*#__PURE__*/ createTailwindMerge(getDefaultConfig);
;
 //# sourceMappingURL=bundle-mjs.mjs.map
}),
]);

//# sourceMappingURL=a96cc_808c1912._.js.map