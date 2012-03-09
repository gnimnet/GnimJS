/*
 * Gnim JS library URL parameter Plugin v0.1
 * By Ming
 * http://www.gnim.net
 */
(function($,undefined) {
    var url=location.href;
    var paramsStr=_paramsStr(url);
    var value=_paramsVal(paramsStr);
    function _paramsStr(url){
        var index=url.indexOf('?');
        return (index>=0)?url.substr(index+1):null;
    }
    function _paramsVal(paramsStr){
        var rtn={};
        if(paramsStr!=null){
            var paramStr=paramsStr.split('&');
            for(var i=0;i<paramStr.length;i++){
                var param=paramStr[i].split('=');
                rtn[decodeURIComponent(param[0])]=(param.length==1)?null:decodeURIComponent(param[1]);
            }
        }
        return rtn;
    }
    $.param = function(name){
        return value?value[name]:undefined;
    }
})(Gnim);