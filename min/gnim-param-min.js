/*
 * Gnim JS library URL parameter Plugin v0.1
 * By Ming
 * http://www.gnim.net
 */
(function(f,g){var e=function(a){var b={};if(a!=null){a=a.split("&");for(var c=0;c<a.length;c++){var d=a[c].split("=");b[decodeURIComponent(d[0])]=d.length==1?null:decodeURIComponent(d[1])}}return b}(function(a){var b=a.indexOf("?");return b>=0?a.substr(b+1):null}(location.href));f.param=function(a){return e?e[a]:g}})(Gnim);
