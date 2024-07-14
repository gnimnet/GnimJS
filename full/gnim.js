/**
 * Gnim JS library v1.0.8
 * Author : Ming
 * Date : 2024-01-31
 * WebSite : http://gnim.net
 */
(function (window, document, set$, NULL, UNDEFINED) {
    var LEN = 'length';

    function Gnim(selector, context) {
        return (selector && selector._gnim) ? selector : new _core(selector, context);
    }

    function _core(selector, context) {//constructor of Gnim core
        this._gnim = true; //mark object to be Gnim library core object
        if (selector !== NULL && selector !== UNDEFINED) {
            var elms;
            if (_isStr(selector)) {//selector or html string
                if (selector.charAt(0) == '<') {//is html string
                    elms = _build(selector);
                } else {//is selector string,use engine get match elements
                    elms = _engine(selector, context);
                }
            } else if (selector.nodeType === 1) {//html element
                elms = [selector];
            } else if (_isNum(selector[LEN])) {//array elements
                elms = selector;
            } else {//something else as element
                elms = [selector];
            }
            this[LEN] = elms[LEN]; //get length
            for (var i = 0; i < elms[LEN]; i++) {
                this[i] = elms[i]; //copy elements
            }
        } else {
            this[LEN] = 0;
        }
    }

    function _engine(selector, context) {//engine for select element
        context = context || document;
        if (_isStr(context)) {
            context = Gnim(context);
        } else if (_isNum(context[LEN])) {
            context = context;
        } else {
            context = [context];
        }
        if (!context) return [];
        var regex = /(#|\.|\s|^)(.*?)(#|\.|\s|$)/;
        var rtn = [];
        var selectors = selector.split(',');
        for (var i = 0; i < selectors[LEN]; i++) {
            var oldArr = [];
            var newArr = context;
            var oper;
            var name;
            var sStr = selectors[i].replace(/^\s+|\s+$/g, '');
            while (sStr != '') {
                oldArr = newArr;
                newArr = [];
                sStr = sStr.replace(regex, function ($0, $1, $2, $3) {
                    oper = $1;
                    name = $2;
                    return $3;
                }).replace(/^\s+|\s+$/g, '');
                for (var j = 0; j < oldArr[LEN]; j++) {
                    var elms = [];
                    switch (oper) {
                        case '#':
                            elms = _I(name);
                            break;
                        case '.':
                            elms = _C(name, oldArr[j]);
                            break;
                        case '':
                            elms = _T(name, oldArr[j]);
                            break;
                    }
                    for (var k = 0; k < elms[LEN]; k++) {
                        newArr.push(elms[k]);
                    }
                }
            }
            for (var c = 0; c < newArr[LEN]; c++) {
                rtn.push(newArr[c]);
            }
        }
        return rtn;
    }

    /* helper tool functions */
    function _I(id) {//get element by id,arguments will be string id or an element
        if (_isStr(id)) {
            var elm = document.getElementById(id);
            return (elm) ? [elm] : [];
        }
        return [id];
    }

    function _C(cname, context) {//get element by class name
        context = context || document;
        if (context.getElementsByClassName) {//for Mozilla & Opera & webkit
            return context.getElementsByClassName(cname);
        }
        var allTags = context.getElementsByTagName('*');
        var matchElms = [];
        var regex = new RegExp('(^|\\s)' + cname + '(\\s|$)');
        for (var i = 0; i < allTags[LEN]; i++) {
            if (regex.test(allTags[i].className)) {
                matchElms.push(allTags[i]);
            }
        }
        return matchElms;
    }

    function _T(tname, context) {//get element by tag name
        context = context || document;
        return context.getElementsByTagName(tname);
    }

    function _camelize(s) {//get camelize style string
        return s.replace(/-(\w)/g, function (strMatch, p1) {
            return p1.toUpperCase();
        });
    }

    function _isStr(obj) {
        return (typeof obj == 'string');
    }

    function _isNum(obj) {
        return (typeof obj == 'number');
    }

    function _isObj(obj) {
        return (typeof obj == 'object');
    }

    function _isFunc(obj) {
        return (typeof obj == 'function');
    }

    function _isArr(obj) {
        return obj && _isNum(obj[LEN]);
    }

    function _isArray(obj) {
        return Object.prototype.toString.apply(obj) === '[object Array]';
    }

    function _toStr(obj) {
        return '' + obj;
    }

    function _toInt(obj) {
        return parseInt(obj);
    }

    function _toFloat(obj) {
        return parseFloat(obj);
    }

    function _toHex(num, count) {
        var rtn = '';
        count = count || 0;
        num = _toInt(num);
        var nag = (num < 0);
        if (num == 0) {
            rtn = '0';
            count--;
        } else {
            num = nag ? (-num) : num;
            var val;
            while (num > 0) {
                val = num % 16;
                rtn = String.fromCharCode(val < 10 ? (48 + val) : (97 + val - 10)) + rtn;
                num = _toInt(num / 16);
                count--;
            }
        }
        while (count-- > 0) {
            rtn = '0' + rtn;
        }
        return nag ? ('-' + rtn) : rtn;
    }

    function _trim(str) {//delete space around string
        return str.replace(/^\s+|\s+$/g, '');
    }

    function _ltrim(str) {//delete left space of string
        return str.replace(/^\s+/g, '');
    }

    function _rtrim(str) {//delete left space of string
        return str.replace(/\s+$/g, '');
    }

    function _inject(obj1, obj2) {
        for (var elm in obj2) {
            obj1[elm] = obj2[elm];
        }
    }

    function _addEvent(node, type, listener) {//add event to node
        if (node.addEventListener) {//W3C way
            node.addEventListener(type, listener, false);
            return true;
        } else if (node.attachEvent) {//For MSIE
            node.attachEvent('on' + type, listener);
            return true;
        }
        return false;
    }

    function _removeEvent(node, type, listener) {//remove event form node
        if (node.removeEventListener) {//W3C way
            node.removeEventListener(type, listener, false);
            return true;
        } else if (node.detachEvent) {//For MSIE
            node.detachEvent('on' + type, listener);
            return true;
        }
        return false;
    }

    function _append(father, child) {//append element
        father.appendChild(child);
    }

    function _prepend(father, child) {//prepend element
        if (father.firstChild) {//has frist child
            father.insertBefore(child, father.firstChild);
        } else {
            father.appendChild(child);
        }
    }

    function _after(referNode, node) {
        var childs = referNode.parentNode.childNodes;
        for (var i = 0; i < childs[LEN]; i++) {//find referNode
            if (childs.item(i) === referNode && (i + 1 < childs[LEN])) {//got next after referNode
                _before(childs.item(i + 1), node);
                return;
            }
        }
        _append(referNode.parentNode, node);
    }

    function _before(referNode, node) {
        referNode.parentNode.insertBefore(node, referNode);
    }

    function _hasClass(node, className) {//test class on node
        var regex = new RegExp('(^|\\s)' + className + '(\\s|$)');
        if (regex.test(node.className)) {
            return true;
        }
        return false;
    }

    function _addClass(node, className) {//add class to node
        if (!_hasClass(node, className)) {
            node.className += ' ' + className;
        }
    }

    function _removeClass(node, className) {//remove class on node
        var regex = new RegExp('(^|\\s*)' + className + '(\\s*|$)');
        node.className = node.className.replace(regex, ' ');
    }

    function _remove(node) {//remove node from document
        node.parentNode.removeChild(node);
    }

    function _empty(node) {//empty node content
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    function _build(htmlStr) {//bulid html string to elements array
        var nodes = [];
        var div = document.createElement('div');
        div.innerHTML = htmlStr;
        while (div.firstChild) {
            nodes.push(div.firstChild);
            div.removeChild(div.firstChild);
        }
        return nodes;
    }

    function _css(node, style) {//set css style,parameter style is an object
        if (_isStr(style)) {
            if (style === 'opacity') {
                if (_ie8_) {
                    return node.style.filter && node.style.filter.indexOf("opacity=") >= 0 ? parseFloat(node.style.filter.match(/opacity=([^)]*)/)[1]) / 100 : 1;
                } else {
                    return node.style.opacity ? parseFloat(node.style.opacity) : 1;
                }
            }
            return node.style[_camelize(style)];
        } else {
            for (var name in style) {
                if (name == 'opacity') {
                    if (_ie8_) {
                        if (style[name] || typeof style[name] == 'number') {
                            node.style.filter = 'alpha(opacity=' + style[name] * 100 + ');';
                            node.style.zoom = 1; //fix for IE7 opacity
                        } else {
                            node.style.filter = '';
                            node.style.zoom = '';
                        }
                    } else {
                        node.style.opacity = (style[name] == 1 ? '' : style[name]);
                    }
                } else {
                    node.style[_camelize(name)] = style[name];
                }
            }
        }
    }

    function _noBubble(e) {//stop event propagation
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    }

    function _noDefault(e) {//stop default event
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    }

    function _now() {
        return (new Date()).getTime();
    }

    function _log(msg, selector) {
        if (selector === UNDEFINED) {
            if (console && console.log) {
                console.log(msg);
            }
        } else {
            $('<div class="log">' + msg + '</div>').appendTo(selector);
        }
        return msg;
    }

    /* broswer test */
    var _broswer = (function (ua) {
        var rchrome = /(chrome)[ \/]([\w.]+)/,
            rsafari = /(safari)[ \/]([\w.]+)/,
            rwebkit = /(webkit)[ \/]([\w.]+)/,
            ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
            rmsie = /(msie) ([\w.]+)/,
            rfirefox = /(firefox)[ \/]([\w.]+)/,
            rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;
        var match =
            rchrome.exec(ua) ||
            rsafari.exec(ua) ||
            rwebkit.exec(ua) ||
            ropera.exec(ua) ||
            rmsie.exec(ua) ||
            rfirefox.exec(ua) ||
            rmozilla.exec(ua) ||
            [];
        var rtn = {};
        rtn[match[1] || ''] = true;
        rtn.version = match[2] || 0;
        return rtn;
    })(window.navigator.userAgent.toLowerCase());
    var _ie8_ = _broswer.msie && _broswer.version < 9;//ie8-
    /* DOM ready solver */
    var isReady = false;
    var readyArray = []; //function array for ready()
    var DOMContentLoaded;

    function _runReady() {//run all functions in ready pool & clean ready pool
        isReady = true;
        while (readyArray[LEN] != 0) {
            readyArray.pop()(); //run function
        }
    }

    if (document.addEventListener) {//for Mozilla & Opera & webkit
        DOMContentLoaded = function () {
            document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
            _runReady();
        }
        document.addEventListener('DOMContentLoaded', DOMContentLoaded, false); //faster
        window.addEventListener('load', _runReady, false); //fallback to always work one
    } else if (document.attachEvent) {//for IE
        DOMContentLoaded = function () {
            if (document.readyState === "complete") {
                document.detachEvent("onreadystatechange", DOMContentLoaded);
                _runReady();
            }
        }
        document.attachEvent('onreadystatechange', DOMContentLoaded); //faster
        window.attachEvent('onload', _runReady); //fallback to always work one
    }

    function _ready(fn) {
        isReady ? fn() : readyArray.push(fn);
    }

    /* Ajax support */
    var _ajaxSetting = {
        url: location.href,
        type: 'GET',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'text'
    };

    function _newRequest() {
        try {
            return new XMLHttpRequest();
        } //try Most Browsers
        catch (err) {
        }
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } //try IE
        catch (err) {
        }
        try {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } //try IE(different lib)
        catch (err) {
        }
        return NULL; //failed to create XMLHttpRequest
    }

    function _ajax(setting) {
        var defaultSetting = _ajaxSetting;
        var _url = setting.url ? setting.url : defaultSetting.url; //get url
        var _type = setting.type ? setting.type.toUpperCase() : defaultSetting.type; //get request type
        var _contentType = setting.contentType ? setting.contentType : defaultSetting.contentType; //get content type
        var _dataType = setting.dataType ? setting.dataType : defaultSetting.dataType; //get data type
        var _success = setting.success;
        var _error = setting.error;
        var _timeout = setting.timeout;
        var _data = setting.data;
        var timer;
        //get XMLHttpRequest
        var xhr = _newRequest();
        if (!xhr) return xhr; //create failed,exit...
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {//response ok
                if (timer) clearTimeout(timer); //clear timer
                if (xhr.status == 200) {
                    if (_success) {//has sucess callback
                        var rdata = xhr.responseText;
                        if (_dataType == 'text') {
                            rdata = xhr.responseText;
                        } else if (_dataType == 'json') {
                            rdata = eval('(' + xhr.responseText + ')');
                        } else if (_dataType == 'xml') {
                            rdata = xhr.responseXML;
                        }
                        _success(rdata);
                    }
                } else if (xhr.status != 0) {//response ok,something wrong
                    if (_error) {
                        _error(xhr, xhr.status, 'error');
                    }
                }
            }
        }
        //check timeout
        if (_isNum(_timeout)) {//has time out
            timer = setTimeout(function () {
                xhr.abort();
                if (_error) {//do timeout error callback
                    _error(NULL, NULL, 'timeout'); //should not use xhr,may cause bug
                }
            }, _timeout);
        }
        //make request
        if (_type == 'POST') {//POST request
            xhr.open(_type, _url, true);
            if (_data) {
                xhr.setRequestHeader("Content-Type", _contentType);
            }
            xhr.send(_encodeFormData(_data) || NULL);
        } else {//GET request
            if (_data) {
                _url += (/\?/.test(_url) ? "&" : "?") + _encodeFormData(_data);
            }
            xhr.open(_type, _url, true);
            xhr.send();
        }
        return xhr;
    }

    function _encodeFormData(data) {
        var pairs = [];
        var regex = /%20/g;
        for (var name in data) {
            var value = (data[name] != NULL) ? data[name].toString() : NULL;
            if (value !== NULL && value !== UNDEFINED) {
                var pair = encodeURIComponent(name).replace(regex, '+') + '=' +
                    encodeURIComponent(value).replace(regex, '+');
                pairs.push(pair);
            }
        }
        return pairs.join('&');
    }

    function _post(_url, _data, _cb, _type) {
        return _ajax({
            type: 'POST',
            url: _url,
            data: _data,
            success: _cb,
            dataType: _type
        });
    }

    function _get(_url, _data, _cb) {
        return _ajax({
            type: 'GET',
            url: _url,
            data: _data,
            success: _cb
        });
    }

    /* set static elements */
    _inject(Gnim, {
        //static varibles
        broswer: _broswer,
        ajaxSetting: _ajaxSetting,
        //static functions
        core: _core,
        ready: _ready,
        isStr: _isStr,
        isNum: _isNum,
        isObj: _isObj,
        isFunc: _isFunc,
        isArr: _isArr,
        isArray: _isArray,
        toStr: _toStr,
        toInt: _toInt,
        toFloat: _toFloat,
        toHex: _toHex,
        trim: _trim,
        ltrim: _ltrim,
        rtrim: _rtrim,
        inject: _inject,
        build: _build,
        noBubble: _noBubble,
        noDefault: _noDefault,
        now: _now,
        log: _log,
        ajax: _ajax,
        post: _post,
        get: _get
    });
    _inject(_core.prototype, {
        each: function (fn) {//for each element do a function parameter to be the element
            var thisObj = this;
            for (var i = 0; i < thisObj[LEN]; i++) {
                fn(thisObj[i]);
            }
            return thisObj;
        },
        find: function (selector) {//find child nodes
            return $(selector, this);
        },
        html: function (val) {//set element html value
            var thisObj = this;
            if (val !== UNDEFINED) {
                for (var i = 0; i < thisObj[LEN]; i++) {
                    try {//try use innerHTML
                        thisObj[i].innerHTML = val;
                    } catch (e) {//fall back to simple way
                        _empty(thisObj[i]); //empty node
                        val = _build(val);
                        for (var j = 0; j < val[LEN]; j++) {
                            _append(thisObj[i], val[j]);
                        }
                    }
                }
                return thisObj;
            } else {
                return (thisObj[LEN] > 0) ? thisObj[0].innerHTML : NULL;
            }
        },
        text: function (val) {
            var thisObj = this;
            var innerText = 'innerText';
            var textContent = 'textContent';
            if (val !== UNDEFINED) {
                for (var i = 0; i < thisObj[LEN]; i++) {
                    if (innerText in thisObj[i]) {
                        thisObj[i][innerText] = val;
                    } else {
                        thisObj[i][textContent] = val;
                    }
                }
                return thisObj;
            } else {
                return (thisObj[LEN] > 0) ? ((innerText in thisObj[0]) ? thisObj[0][innerText] : thisObj[0][textContent]) : NULL;
            }
        },
        append: function (childElm) {//append element child
            var thisObj = this;
            if (thisObj[LEN] > 0) {
                var child = Gnim(childElm);
                for (var i = 0; i < child[LEN]; i++) {
                    _append(thisObj[thisObj[LEN] - 1], child[i]);
                }
            }
            return thisObj;
        },
        appendTo: function (fatherElm) {//append element to
            var thisObj = this;
            var father = Gnim(fatherElm);
            if (father[LEN] > 0) {
                for (var i = 0; i < thisObj[LEN]; i++) {
                    _append(father[father[LEN] - 1], thisObj[i]);
                }
            }
            return thisObj;
        },
        prepend: function (childElm) {//prepend element child
            var thisObj = this;
            if (thisObj[LEN] > 0) {
                var child = Gnim(childElm);
                for (var i = 0; i < child[LEN]; i++) {
                    _prepend(thisObj[thisObj[LEN] - 1], child[i]);
                }
            }
            return thisObj;
        },
        prependTo: function (fatherElm) {//prepend element to
            var thisObj = this;
            fatherElm = Gnim(fatherElm);
            if (fatherElm[LEN] > 0) {
                for (var i = 0; i < thisObj[LEN]; i++) {
                    _prepend(fatherElm[fatherElm[LEN] - 1], thisObj[i]);
                }
            }
            return thisObj;
        },
        after: function (content) {//insert content after last match element
            var thisObj = this;
            if (thisObj[LEN] > 0) {
                content = Gnim(content);
                for (var i = 0; i < content[LEN]; i++) {
                    _after(thisObj[thisObj[LEN] - 1], content[i]);
                }
            }
            return thisObj;
        },
        insertAfter: function (target) {//insert match elements after target
            var thisObj = this;
            target = Gnim(target);
            if (target[LEN] > 0) {
                for (var i = 0; i < thisObj[LEN]; i++) {
                    _after(target[target[LEN] - 1], thisObj[i]);
                }
            }
            return thisObj;
        },
        before: function (content) {//insert content before last match element
            var thisObj = this;
            if (thisObj[LEN] > 0) {
                content = Gnim(content);
                for (var i = 0; i < content[LEN]; i++) {
                    _before(thisObj[thisObj[LEN] - 1], content[i]);
                }
            }
            return thisObj;
        },
        insertBefore: function (target) {//insert match elements after target
            var thisObj = this;
            target = Gnim(target);
            if (target[LEN] > 0) {
                for (var i = 0; i < thisObj[LEN]; i++) {
                    _before(target[target[LEN] - 1], thisObj[i]);
                }
            }
            return thisObj;
        },
        remove: function () {//remove all elements
            var thisObj = this;
            for (var i = 0; i < thisObj[LEN]; i++) {
                _remove(thisObj[i]);
            }
            return thisObj;
        },
        empty: function () {//empty all elements
            var thisObj = this;
            for (var i = 0; i < thisObj[LEN]; i++) {
                _empty(thisObj[i]);
            }
            return thisObj;
        },
        css: function (style, val) {//elements css get(from first) & set(to all)
            var thisObj = this;
            var setStyle = {};
            if (val === UNDEFINED) {
                if (_isStr(style)) {//get style
                    return (thisObj[LEN] > 0) ? _css(thisObj[0], style) : NULL;
                } else {//set style
                    setStyle = style;
                }
            } else {//set style
                setStyle[style] = val;
            }
            for (var i = 0; i < thisObj[LEN]; i++) {
                _css(thisObj[i], setStyle);
            }
            return thisObj;
        },
        attr: function (attribute, val) {//set elements attribute
            var thisObj = this;
            var setAttr = {};
            if (val === UNDEFINED) {
                if (_isStr(attribute)) {//get attribute
                    return (thisObj[LEN] > 0) ? thisObj[0].getAttribute(attribute) : NULL;
                } else {//set attributes
                    setAttr = attribute;
                }
            } else {//set attribute
                setAttr[attribute] = val;
            }
            for (var i = 0; i < thisObj[LEN]; i++) {
                for (var aname in setAttr) {
                    thisObj[i].setAttribute(aname, setAttr[aname]);
                }
            }
            return thisObj;
        },
        removeAttr: function (aname) {//remove elements attribute
            var thisObj = this;
            for (var i = 0; i < thisObj[LEN]; i++) {
                thisObj[i].removeAttribute(aname);
            }
            return thisObj;
        },
        hasClass: function (className) {//check first elements class
            var thisObj = this;
            if (thisObj[LEN] > 0) {
                return _hasClass(thisObj[0], className);
            } else {
                return false;
            }
        },
        addClass: function (className) {//add class to elements
            var thisObj = this;
            for (var i = 0; i < thisObj[LEN]; i++) {
                _addClass(thisObj[i], className);
            }
            return thisObj;
        },
        removeClass: function (className) {//remove class on elements
            var thisObj = this;
            for (var i = 0; i < thisObj[LEN]; i++) {
                _removeClass(thisObj[i], className);
            }
            return thisObj;
        },
        toggleClass: function (className) {//toggle class on elements
            var thisObj = this;
            var attrName = 'className';
            for (var i = 0; i < thisObj[LEN]; i++) {
                if (_hasClass(thisObj[i], className)) {//need remove
                    var regex = new RegExp('(^|\\s)' + className + '(\\s|$)');
                    thisObj[i][attrName] = thisObj[i][attrName].replace(regex, '');
                } else {//need add
                    thisObj[i][attrName] += ' ' + className;
                }
            }
            return thisObj;
        },
        bind: function (type, fn) {//bind function to node(s)
            var thisObj = this;
            for (var i = 0; i < thisObj[LEN]; i++) {
                _addEvent(thisObj[i], type, fn);
            }
            return thisObj;
        },
        unbind: function (type, fn) {//unbind function to node(s)
            var thisObj = this;
            for (var i = 0; i < thisObj[LEN]; i++) {
                _removeEvent(thisObj[i], type, fn);
            }
            return thisObj;
        },
        hover: function (enterfn, leavefn) {//hover event
            return this.mouseover(enterfn).mouseout(leavefn || enterfn);
        }
    });
    var eventArr = ['blur', 'change', 'click', 'dblclick', 'error', 'focus', 'keydown', 'keypress', 'keyup', 'load',
        'mousedown', 'mouseenter', 'mousemove', 'mouseout', 'mouseover', 'mouseleave', 'mouseup', 'resize', 'scroll', 'select', 'submit', 'unload'];
    for (var i in eventArr) {
        (function (e) {
            _core.prototype[e] = (function (fn) {
                return this.bind(e, fn);
            });
        })(eventArr[i]);
    }
    /* set Gnim to window global */
    if (set$) window.$ = Gnim;
    window.Gnim = Gnim;
})(window, document, true, null);
