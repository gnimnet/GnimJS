/*
 * Gnim JS library URL parameter Plugin v0.1
 * By Ming
 * http://www.gnim.net
 */
(function(e,g){var c=location.href;var f=b(c);var d=a(f);function b(i){var h=i.indexOf("?");return(h>=0)?i.substr(h+1):null}function a(m){var k={};if(m!=null){var j=m.split("&");for(var h=0;h<j.length;h++){var l=j[h].split("=");k[decodeURIComponent(l[0])]=(l.length==1)?null:decodeURIComponent(l[1])}}return k}e.param=function(h){return d?d[h]:g}})(Gnim);