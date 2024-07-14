/*
 * Gnim JS library cookie plugin v0.1
 * By Ming
 * http://www.gnim.net
 */
(function(a){function b(c,j,k){if(j!==undefined){k=k||{};if(j===null){j="";k.expires=-1}var e=c+"="+encodeURIComponent(j);if(typeof k.expires=="number"){var f=new Date();f.setTime(f.getTime()+(k.expires*24*60*60*1000));e+="; expires="+f.toUTCString()}e+=k.path?(";path="+k.path):"";e+=k.domain?(";domain="+domain):"";e+=k.secure?";secure":"";document.cookie=e}else{var h=document.cookie;var i=h.indexOf(c+"=");if(i!=-1){var d=i+c.length;var g=h.indexOf(";",d);if(g==-1){g=h.length}var j=h.substring(d+1,g);j=decodeURIComponent(j);return j}return null}}a.cookie=b})(Gnim);