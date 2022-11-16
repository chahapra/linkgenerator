var D9FP = function(a) {
    var b, c;
    b = Array.prototype.forEach;
    c = Array.prototype.map;
    this.each = function(j, h, g) {
        if (j === null) {
            return
        }
        if (b && j.forEach === b) {
            j.forEach(h, g)
        } else {
            if (j.length === +j.length) {
                for (var f = 0, d = j.length; f < d; f++) {
                    if (h.call(g, j[f], f, j) === {}) {
                        return
                    }
                }
            } else {
                for (var e in j) {
                    if (j.hasOwnProperty(e)) {
                        if (h.call(g, j[e], e, j) === {}) {
                            return
                        }
                    }
                }
            }
        }
    }
    ;
    this.map = function(g, f, e) {
        var d = [];
        if (g == null) {
            return d
        }
        if (c && g.map === c) {
            return g.map(f, e)
        }
        this.each(g, function(j, h, i) {
            d[d.length] = f.call(e, j, h, i)
        });
        return d
    }
    ;
    if (typeof a == "object") {
        this.hasher = a.hasher;
        this.indexProperties = a.indexProperties
    } else {
        if (typeof a == "function") {
            this.hasher = a
        }
    }
};
D9FP.prototype = {
    get: function() {
        var a = navigator.userAgent.toLowerCase();
        var d = [];
        var c = navigator.language || navigator.browserLanguage;
        var b = c.split("-");
        if (typeof b[0] == "undefined") {
            c = c
        } else {
            c = b[0]
        }
        d.push((this.indexProperties ? "a:" : "") + c);
        d.push((this.indexProperties ? "b:" : "") + screen.colorDepth);
        d.push((this.indexProperties ? "c:" : "") + new Date().getTimezoneOffset());
        d.push((this.indexProperties ? "d:" : "") + this.hasSessionStorage());
        if (a.indexOf("android") == -1) {
            d.push((this.indexProperties ? "e:" : "") + this.hasLocalStorage())
        }
        if (navigator.platform != "iPhone" && navigator.platform != "iPad") {
            var g;
            try {
                g = !!window.indexedDB
            } catch (f) {
                g = true
            }
            d.push((this.indexProperties ? "f:" : "") + g)
        }
        if (document.body) {
            d.push((this.indexProperties ? "g:" : "") + typeof (document.body.addBehavior))
        } else {
            d.push((this.indexProperties ? "g:" : "") + typeof undefined)
        }
        if (a.indexOf("android") == -1) {
            d.push((this.indexProperties ? "h:" : "") + typeof (window.openDatabase))
        }
        d.push((this.indexProperties ? "i:" : "") + navigator.cpuClass);
        d.push((this.indexProperties ? "j:" : "") + navigator.platform);
        if (this.hasher) {
            return this.hasher(d.join("###"), 31)
        } else {
            return this.murmurhash3_32_gc(d.join("###"), 31)
        }
    },
    murmurhash3_32_gc: function(h, e) {
        var j, k, g, a, d, b, f, c;
        j = h.length & 3;
        k = h.length - j;
        g = e;
        d = 3432918353;
        b = 461845907;
        c = 0;
        while (c < k) {
            f = ((h.charCodeAt(c) & 255)) | ((h.charCodeAt(++c) & 255) << 8) | ((h.charCodeAt(++c) & 255) << 16) | ((h.charCodeAt(++c) & 255) << 24);
            ++c;
            f = ((((f & 65535) * d) + ((((f >>> 16) * d) & 65535) << 16))) & 4294967295;
            f = (f << 15) | (f >>> 17);
            f = ((((f & 65535) * b) + ((((f >>> 16) * b) & 65535) << 16))) & 4294967295;
            g ^= f;
            g = (g << 13) | (g >>> 19);
            a = ((((g & 65535) * 5) + ((((g >>> 16) * 5) & 65535) << 16))) & 4294967295;
            g = (((a & 65535) + 27492) + ((((a >>> 16) + 58964) & 65535) << 16))
        }
        f = 0;
        switch (j) {
        case 3:
            f ^= (h.charCodeAt(c + 2) & 255) << 16;
        case 2:
            f ^= (h.charCodeAt(c + 1) & 255) << 8;
        case 1:
            f ^= (h.charCodeAt(c) & 255);
            f = (((f & 65535) * d) + ((((f >>> 16) * d) & 65535) << 16)) & 4294967295;
            f = (f << 15) | (f >>> 17);
            f = (((f & 65535) * b) + ((((f >>> 16) * b) & 65535) << 16)) & 4294967295;
            g ^= f
        }
        g ^= h.length;
        g ^= g >>> 16;
        g = (((g & 65535) * 2246822507) + ((((g >>> 16) * 2246822507) & 65535) << 16)) & 4294967295;
        g ^= g >>> 13;
        g = ((((g & 65535) * 3266489909) + ((((g >>> 16) * 3266489909) & 65535) << 16))) & 4294967295;
        g ^= g >>> 16;
        return g >>> 0
    },
    hasLocalStorage: function() {
        try {
            return !!window.localStorage
        } catch (a) {
            return true
        }
    },
    hasSessionStorage: function() {
        try {
            return !!window.sessionStorage
        } catch (a) {
            return true
        }
    }
};
var times = [];
var calculateAverage = function() {
    var a = times.reduce(function(c, b) {
        return c += b
    }, 0);
    return a / times.length
};
function D9(D9v, D9r, tagHost) {
    D9r = D9r || {};
    function D9callback(c) {
        if (D9r && D9r.callback) {
            var response = {};
            response.DeviceID = Array(c);
            D9r.callback(response)
        }
    }
    function D9callbackNew(c, h) {
        if (D9r && D9r.cb) {
            var response = {};
            response.DeviceID = Array(c);
            response.Key = h;
            D9r.cb(response)
        }
    }
    function D9request(D9_device) {
        var json = encodeURIComponent(JSON.stringify(D9_device));
        send = "&tbx=" + encodeURIComponent(json);
        ajax(getLgcUrl(), send)
    }
    function getLgcUrl() {
        var httpProto = "";
        var lgcUrl = tagHost + "/";
        return httpProto + lgcUrl
    }
    function getConnectUrl() {
        var httpProto = "";
        var lgcUrl = tagHost + "/img/signal.png?cnx=" + (device && device.D9_61 ? device.D9_61 : "");
        return httpProto + lgcUrl
    }
    function ajax(url, send) {
        if (window.d9PendingXDR != undefined) {
            return
        }
        var ar = null;
        function corsSupported() {
            try {
                return typeof XMLHttpRequest !== "undefined" && ("withCredentials"in new XMLHttpRequest())
            } catch (e) {
                return false
            }
        }
        if (typeof window.XDomainRequest !== "undefined" && !corsSupported()) {
            ar = new XDomainRequest();
            ar.open("POST", url)
        } else {
            try {
                ar = new XMLHttpRequest()
            } catch (e) {
                if (window.ActiveXObject) {
                    var ax = ["Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP.4.0", "Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
                    var i = ax.length;
                    while (--i) {
                        try {
                            ar = new ActiveXObject(ax[i]);
                            break
                        } catch (e) {}
                    }
                }
            }
            ar.open("POST", url, true);
            ar.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            ar.withCredentials = true
        }
        ar.onreadystatechange = function() {
            if (D9r && D9r.L > 0) {
                return
            }
            if (D9r && D9r.callback && ar.readyState == 4) {
                if (ar.status == 200 || ar.status == 304) {
                    var r = ar.responseText;
                    var response;
                    if (r && r.length > 0) {
                        try {
                            response = JSON.parse(r)
                        } catch (e) {}
                    }
                    if (response) {
                        if (response.cnx) {
                            (new Image()).src = getConnectUrl();
                            delete response.cnx
                        }
                        D9r.callback(response)
                    } else {
                        D9r.callback(null)
                    }
                }
            }
        }
        ;
        if (typeof window.XDomainRequest !== "undefined" && !corsSupported()) {
            ar.ontimeout = ar.onerror = function(e) {
                ar.status = 400;
                ar.readyState = 4;
                ar.onreadystatechange()
            }
            ;
            ar.onload = function() {
                ar.status = 200;
                ar.readyState = 4;
                ar.onreadystatechange()
            }
            ;
            ar.onprogress = function() {}
        }
        ar.send(send);
        window.d9PendingXDR = ar
    }
    function getProperty(prop) {
        try {
            return eval(prop)
        } catch (e) {
            return null
        }
    }
    function setResultObject(key, val) {
        if (key != undefined && device != undefined) {
            device["D9_".concat(key.toString())] = val
        }
        if (D9r && D9r.L > 0 && key == 61) {
            D9callback(val)
        }
        if (D9r && D9r.L > 0 && key == 67) {
            D9callbackNew(device.D9_61, val)
        }
        if (D9r && D9r.L == 2) {
            window.d9PendingXDR = 1
        }
    }
    function getAllAttributes(object) {
        var attr = {};
        for (var index in object) {
            switch (typeof object[index]) {
            case "function":
            case "null":
                break;
            case "object":
                if (index === "enabledPlugin" || index === "__proto__") {
                    continue
                }
                attr[index] = getAllAttributes(object[index]);
                break;
            default:
                attr[index] = object[index];
                break
            }
        }
        return attr
    }
    function getDPI() {
        var dpi = new Array(2);
        try {
            var div = document.createElement("div");
            div.style.position = "absolute";
            div.style.left = "-100%";
            div.style.top = "-100%";
            div.style.width = "1in";
            div.style.height = "1in";
            div.id = "dpi";
            document.getElementsByTagName("body")[0].appendChild(div)
        } catch (e) {
            document.write('<div id="dpi" style="position:absolute; left:-100%; top:-100%; width:1in; height:1in"></div>')
        }
        try {
            dpi[0] = document.getElementById("dpi").offsetWidth;
            dpi[1] = document.getElementById("dpi").offsetHeight;
            return dpi
        } catch (e) {
            return Array(0, 0)
        }
    }
    function getFlashVersion() {
        try {
            setResultObject(61, "43b9053558886fb19db33228d1d9170");
            try {
                var obj = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                try {
                    obj.AllowScriptAccess = "always"
                } catch (e) {
                    return "6.0.0"
                }
            } catch (e) {}
            return new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ".").match(/^.?(.+),?$/)[1]
        } catch (e) {
            try {
                if (navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {
                    return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ".").match(/^.?(.+),?$/)[1]
                }
            } catch (e) {}
        }
        return null
    }
    function getAdobeAcrobatVersion() {
        setResultObject(67, "d10e54cb41fb43c5945b4d01b9bde1da");
        if (window.ActiveXObject) {
            var obj = null;
            try {
                obj = new ActiveXObject("AcroPDF.PDF")
            } catch (e) {}
            if (!obj) {
                try {
                    obj = new ActiveXObject("PDF.PdfCtrl")
                } catch (e) {
                    return null
                }
            }
            if (obj) {
                var version = obj.GetVersions().split(",");
                version = version[0].split("=");
                version = parseFloat(version[1]);
                return version
            } else {
                return null
            }
        } else {
            for (var i = 0; i < navigator.plugins.length; i++) {
                if (navigator.plugins[i].name.indexOf("Adobe Acrobat") != -1) {
                    return navigator.plugins[i].description.replace(/\D+/g, ".").match(/^.?(.+),?$/)[1]
                }
            }
            return null
        }
    }
    function getSilverlightVersion() {
        var parts = Array("", "", "", "");
        var nav = navigator.plugins["Silverlight Plug-In"];
        if (nav) {
            for (var i = 0; i < 4; i++) {
                parts[i] = parseInt(nav.description.split(".")[i]).toString()
            }
        } else {
            try {
                var control = new ActiveXObject("AgControl.AgControl");
                var vers = Array(1, 0, 0, 0);
                loopMatch(control, vers, 0, 1);
                loopMatch(control, vers, 1, 1);
                loopMatch(control, vers, 2, 10000);
                loopMatch(control, vers, 2, 1000);
                loopMatch(control, vers, 2, 100);
                loopMatch(control, vers, 2, 10);
                loopMatch(control, vers, 2, 1);
                loopMatch(control, vers, 3, 1);
                for (var i = 0; i < 4; i++) {
                    parts[i] = vers[i].toString()
                }
            } catch (e) {
                return null
            }
        }
        return parts.join(".");
        function loopMatch(control, vers, idx, inc) {
            while (IsSupported(control, vers)) {
                vers[idx] += inc
            }
            vers[idx] -= inc
        }
        function IsSupported(control, ver) {
            return control.isVersionSupported(ver[0] + "." + ver[1] + "." + ver[2] + "." + ver[3])
        }
    }
    function getPlugins() {
        var a = [];
        try {
            for (var i = 0; i < navigator.plugins.length; i++) {
                a.push(navigator.plugins[i].name + ": " + navigator.plugins[i].description + " (" + navigator.plugins[i].filename + ")")
            }
            return a
        } catch (e) {
            return null
        }
    }
    function getMimeTypes() {
        var a = [];
        try {
            for (var i = 0; i < navigator.mimeTypes.length; i++) {
                a.push(navigator.mimeTypes[i].type + ": " + navigator.mimeTypes[i].description)
            }
            return a
        } catch (e) {
            return null
        }
    }
    function removeEmptyElem(ary) {
        for (var i = ary.length; i >= 0; i--) {
            if (ary[i] == undefined) {
                ary.splice(i, 1)
            }
        }
        return ary
    }
    function getD9WebGL() {
        var _webgl = null;
        try {
            var canvas = document.createElement("canvas");
            if (canvas && canvas.getContext) {
                var idents = ["webgl2", "experimental-webgl2", "webgl", "experimental-webgl"];
                for (var i = 0; i < idents.length; i++) {
                    var ctxName = idents[i];
                    var webgl = canvas.getContext(ctxName);
                    if (webgl) {
                        _webgl = Object();
                        _webgl.CONTEXT = ctxName;
                        _webgl.WEBGL_VERSION = webgl.getParameter(webgl.VERSION);
                        _webgl.WEBGL_VENDOR = webgl.getParameter(webgl.VENDOR);
                        _webgl.WEBGL_SL_VERSION = webgl.getParameter(webgl.SHADING_LANGUAGE_VERSION);
                        _webgl.MAX_TEXTURE_SIZE = webgl.getParameter(webgl.MAX_TEXTURE_SIZE).toString();
                        var info = webgl.getExtension("WEBGL_debug_renderer_info");
                        if (info) {
                            _webgl.WEBGL_VENDOR = webgl.getParameter(info.UNMASKED_VENDOR_WEBGL);
                            _webgl.WEBGL_RENDERER = webgl.getParameter(info.UNMASKED_RENDERER_WEBGL)
                        }
                        break
                    }
                }
            }
        } catch (err) {
            _webgl = null
        }
        return _webgl
    }
    var D9ref = "";
    D9ref = document.referrer;
    var device = {};
    device.D9_1 = new Date().getTime();
    device.D9_6 = getFlashVersion();
    device.D9_7 = getAdobeAcrobatVersion();
    device.D9_8 = getSilverlightVersion();
    device.D9_9 = getMimeTypes();
    device.D9_10 = getPlugins();
    device.D9_18 = {};
    device.D9_16 = new Date().getTimezoneOffset();
    if (window.screen) {
        device.D9_3 = getDPI();
        device.D9_4 = getAllAttributes(window.screen)
    }
    if (window.crypto) {
        device.D9_5 = getAllAttributes(window.crypto)
    }
    if (window.navigator) {
        device.D9_13 = getProperty("navigator.userAgent");
        device.D9_14 = getProperty("navigator.platform");
        device.D9_15 = getProperty("navigator.language || navigator.browserLanguage");
        device.D9_19 = getProperty("navigator.appCodeName");
        device.D9_20 = getProperty("navigator.appName");
        device.D9_21 = getProperty("navigator.appVersion");
        device.D9_25 = navigator.doNotTrack;
        device.D9_22 = (getProperty("navigator.javaEnabled()") == true ? 1 : 0)
    }
    device.D9_33 = new D9FP({
        indexProperties: true,
        hasher: function(s) {
            return btoa(s)
        }
    }).get();
    device.D9_34 = (new D9FP().get());
    device.D9_30 = [];
    device.D9_52 = {};
    device.D9_53 = (getProperty("navigator.oscpu") + "," + getProperty("navigator.cpuClass"));
    device.D9_57 = typeof D9r.callback === "function";
    device.D9_58 = D9r;
    device.D9_59 = D9v;
    device.D9_63 = encodeURIComponent(window.location.href);
    device.D9_64 = window.devicePixelRatio;
    device.D9_66 = encodeURIComponent(D9ref);
    device.D9_69 = getD9WebGL();
    if ((device.D9_13 && !device.D9_13.match(/bot/)) && !(device.D9_69 && device.D9_69.WEBGL_RENDERER)) {
        device.D9_35 = fastD9Ranger(50).getOps()
    }
    D9request(device)
}
var fastD9Ranger = function(a) {
    var b = function() {
        var d = new Date();
        var c = 0;
        var e = 0;
        while (c < a) {
            Math.sqrt(Math.random());
            c = new Date() - d;
            e++
        }
        return e / c
    };
    return {
        getOps: b
    }
};
D9(window.D9v, window.D9r, '127.0.0.1:50462');
