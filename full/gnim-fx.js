/*
 * Gnim JS library FX v0.3
 * By Ming
 * http://www.gnim.net
 */
(function($,undefined) {
    /******************** private variable of FX plugin ********************/
    /*
    * animQueue[] array contain all running animation
    * every object in animQueue is a struct of each anim() function param
    * the struct define like this:
    *   animate{
    *       b, //begin timestamp(ms)
    *       d, //duration time(ms)
    *       n, //this is the DOM node to operate
    *       p[]{ //this is an array of parameter for the node
    *           s{
    *               b, //style begin value(int/float)
    *               e, //style end value(int/float)
    *               u, //val unit(string)
    *           }, //style parameter (or a style value string)
    *           n, //style name of the object
    *       },
    *       t, //animate type(liner/sine/inertia/default)
    *       s, //the object of done style,set when animation finish
    *       c, //callback function,it will run when animation finish
    *   }
    *   the current style use pNow to compute by animation type
    *   each time run make pNow+=pInc,when pNow>=1,set the finish style and do callback
    *   after animation finished,the animation will remove form animQueue[]
    */
    var animQueue = []; //make an empty animate queue
    /*
    * animTimer is the global timer for all animation
    * it will trigger each 20 ms
    * it will stop when animQueue is empty
    */
    var animTimer = null; //the global timer for all animate
    var frameSpeed = 20;
    var toInt=$.toInt;
    var toFloat=$.toFloat;
    var toHex=$.toHex;
    var LRTB=['Left','Right','Top','Bottom'];
    /******************** private functions of FX plugin ********************/
    function _camelize(s) {//get camelize style string
        return s.replace(/-(\w)/g, function(strMatch, p1) {
            return p1.toUpperCase();
        });
    }
    function _fixBorder(styles,type){
        var border=null;
        for(var style in styles){
            var name=_camelize(style);
            if(name=='border'+type){
                border=styles[style];
                delete styles[style];
            }
        }
        if(border){
            for(var i in LRTB){
                styles['border'+LRTB[i]+type]=border;
            }
        }
    }
    function _fixStyles(styles){
        _fixBorder(styles,'Color');
        _fixBorder(styles,'Width');
    }
    function _isColorStyle(style){
        style=_camelize(style);
        return style=='color' || style=='backgroundColor' || style=='borderColor'
            || style=='borderLeftColor'|| style=='borderRightColor'
            || style=='borderTopColor'|| style=='borderBottomColor';
    }
    var rrgb=/^rgb\(\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
    var rrbg3=/^#([0-9a-f])([0-9a-f])([0-9a-f])$/;
    var rrbg6=/^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])$/;
    var hexMap={'a':10,'b':11,'c':12,'d':13,'e':14,'f':15};
    for(var num=0;num<=9;num++){
        hexMap[num]=num;
    }
    function _solveColor(value){
        value=value.toLowerCase();
        var match=rrgb.exec(value);
        if(match) return [toInt(match[1]),toInt(match[2]),toInt(match[3])];
        match=rrbg3.exec(value)||rrbg6.exec(value);
        if(match){
            var rtn=[];
            for(var i=1;i<=3;i++){
                var val=(match.length==4)?
                    (hexMap[match[i]]*16+hexMap[match[i]]):
                    (hexMap[match[2*i-1]]*16+hexMap[match[2*i]]);
                rtn.push(val);
            }
            return rtn;
        }
        return '';
    }
    function _defaultVal(begin, end, percent) {//the default animation compute support
        return begin + (end - begin) * (-2*percent*percent+percent*4)/2;
    }
    function _linerVal(begin, end, percent) {//the liner animation compute support
        return (begin + (end - begin) * percent);
    }
    function _sineVal(begin, end, percent) {//the sine animation compute support
        return (begin + (end - begin) * (1 - Math.sin(Math.PI * (0.5 + percent / 2))));
    }
    function _inertiaVal(begin, end, percent) {//the inertia animation compute support
        return (begin + (end - begin) * 1.1 * Math.sin(percent * 2));
    }
    function _computeCurVal(param,type,percent){
        var valFunc;
        if($.isStr(param.s)){
            return param.s;
        }
        if (type == 'liner') {//liner way
            valFunc = _linerVal;
        } else if (type == 'sine') {//sine in out way
            valFunc = _sineVal;
        } else if (type == 'inertia') {//inertia way
            valFunc = _inertiaVal;
        } else {//default way
            valFunc = _defaultVal;
        }
        if(_isColorStyle(param.n)){
            var r=toInt(valFunc(param.s.b[0],param.s.e[0],percent));
            var g=toInt(valFunc(param.s.b[1],param.s.e[1],percent));
            var b=toInt(valFunc(param.s.b[2],param.s.e[2],percent));
            return '#'+toHex(r*256*256+g*256+b,6);
        }else if(param.s.u == 'px'){
            return toInt(valFunc(param.s.b,param.s.e,percent))+'px';
        } else {
            return valFunc(param.s.b,param.s.e,percent)+param.s.u;
        }
    }
    function _runAnim() {//each time the timer trigger,will run this function once
        if (animQueue.length == 0) {
            clearInterval(animTimer);
            animTimer = null;
        } else {
            var curTime = $.now();
            for (var i = 0; i < animQueue.length; i++) {
                var animate = animQueue[i];
                var passTime=curTime-animate.b;
                if (passTime >= animate.d) {//animate end
                    animate.n.css(animate.s); //set style for done
                    if (animate.c) animate.c.apply(animate.n[0]);
                    animQueue[i] = null;
                    animQueue.splice(i, 1); //delete animate
                    i--;
                } else {
                    var percent=toFloat(passTime)/animate.d;
                    var curStyle = {};
                    for (var j = 0; j < animate.p.length; j++) {
                        var param = animate.p[j];
                        curStyle[param.n]=_computeCurVal(param,animate.t,percent);
                    }
                    animate.n.css(curStyle); //set for current style
                }
            }
        }
    }
    function _startAnim() {//start timer if it stopped
        if (animTimer == null) {//animate not running,start!
            animTimer = setInterval(function() {
                _runAnim();
            }, frameSpeed);
        }
    }
    function _currentStyle(node, style) {//this function use to get node current style
        if (style == 'width') {
            return node.offsetWidth + 'px';
        }
        if (style == 'height') {
            return node.offsetHeight + 'px';
        }
        if (style == 'left') {
            return node.offsetLeft + 'px';
        }
        if (style == 'right') {
            return (node.offsetLeft + node.offsetWidth) + 'px';
        }
        if (style == 'top') {
            return node.offsetTop + 'px';
        }
        if (style == 'bottom') {
            return (node.offsetTop + node.offsetHeight) + 'px';
        }
        if (window.getComputedStyle) {//for W3C way
            return window.getComputedStyle(node, null)[style];
        }
        if (style == 'opacity' && $.broswer.msie) {//IE opacity
            return node.style.filter && node.style.filter.indexOf("opacity=") >= 0 ? parseFloat(node.style.filter.match(/opacity=([^)]*)/)[1]) / 100 : 1;
        }
        return node.currentStyle[_camelize(style)];
    }
    function _computeStartEnd(style, valStart, valEnd) {//get the start & end style information
        var val = {};
        if(style == 'opacity'){
            val.b = parseFloat(valStart);
            val.e = parseFloat(valEnd);
            val.u = ''; //no unit
            return val;
        }else if(style == 'display'){
            if (valStart != 'none')
                return valStart;
            if (valEnd != 'none')
                return valEnd;
            return valStart;
        }else if(_isColorStyle(style)){
            val.b = _solveColor(valStart);
            val.e = _solveColor(valEnd);
            val.u = ''; //no unit
            return (val.b && val.e) ? val:valEnd;
        }else{
            var regex = /^(\d*)([a-zA-Z]*)$/;
            if (valStart)
                var start = valStart.match(regex);
            if (valEnd)
                var end = valEnd.match(regex);
            if (start && end && start[2] == end[2]) {//match ok,and unit are the same
                val.b = parseInt(start[1]);
                val.e = parseInt(end[1]);
                val.u = end[2];
                return val;
            }
            return valEnd;
        }
    }
    function _anim(node, styles, duration, callback, type) {//element animate support
        _fixStyles(styles);
        var animate = {
            b:$.now(), //begin timestamp
            d:duration, //duration time
            n:$(node), //element node
            p:[], //animate param array
            s:styles, //end style
            c:callback, //callback function
            t:type //animate type
        };
        for (var name in styles) {//get all current styles
            var sAnim = {};
            sAnim.n = name;
            sAnim.s = _computeStartEnd(name, _currentStyle(node, name), styles[name]);
            animate.p.push(sAnim);
        }
        if (duration === undefined) {//for default speed 500ms
            animate.d = 500;
        } else if (duration === 'fast') {//for fast speed 200ms
            animate.d = 200;
        } else if (duration === 'slow') {//for slow speed 1000ms
            animate.d = 1000;
        }
        animQueue.push(animate);
        _startAnim();
    }
    function _getLeft(node) {
        var offset = node.offsetLeft;
        if (node.offsetParent != null)
            offset += _getLeft(node.offsetParent);
        return offset;
    }
    function _getTop(node) {
        var offset = node.offsetTop;
        if (node.offsetParent != null)
            offset += _getTop(node.offsetParent);
        return offset;
    }
    function _getWidth(node) {
        return node.offsetWidth;
    }
    function _getHeight(node) {
        return node.offsetHeight;
    }
    /******************** Create plugin for Gnim object ********************/
    var fx = {};
    fx.currentStyle = function(node, style) {
        var elms = $(node);
        if (elms.length > 0)
            return _currentStyle(elms[0], style);
        return null;
    };
    fx.anim = function(node, styles, duration, callback, type) {
        var elms = $(node);
        if (elms.length > 0) {
            _anim(elms[i], styles, duration, callback, type);
            return true;
        }
        return false;
    };
    fx.left = _getLeft;
    fx.top = _getTop;
    fx.width = _getWidth;
    fx.height = _getHeight;
    /******************** Create plugin for Gnim core ********************/
    var core = {};
    core.currentStyle = function(style) {
        if (this.length > 0)
            return _currentStyle(this[0],style);
        return null;
    }
    core.anim = function(styles, duration, callback, type) {
        for (var i = 0; i < this.length; i++) {
            _anim(this[i], styles, duration, callback, type);
        }
        return this;
    }
    core.left = function() {
        if (this.length > 0)
            return _getLeft(this[0]);
        return null;
    }
    core.top = function() {
        if (this.length > 0)
            return _getTop(this[0]);
        return null;
    }
    core.width = function() {
        if (this.length > 0)
            return _getWidth(this[0]);
        return null;
    }
    core.height = function() {
        if (this.length > 0)
            return _getHeight(this[0]);
        return null;
    }
    /******************** Make it into Gnim ********************/
    $.fx = fx;
    $.inject($.core.prototype, core);
})(Gnim);