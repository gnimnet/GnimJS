/*
 * Gnim JS library URL parameter Plugin v0.1
 * By Ming
 * http://www.gnim.net
 */
(function(f,g){var e=function(a){var b={};if(null!=a)for(var a=a.split("&"),c=0;c<a.length;c++){var d=a[c].split("=");b[decodeURIComponent(d[0])]=1==d.length?null:decodeURIComponent(d[1])}return b}(function(a){var b=a.indexOf("?");return 0<=b?a.substr(b+1):null}(location.href));f.param=function(a){return e?e[a]:g}})(Gnim);
