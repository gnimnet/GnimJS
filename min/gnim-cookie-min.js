/*
 * Gnim JS library cookie plugin v0.1
 * By Ming
 * http://www.gnim.net
 */
(function(d){d.cookie=function(c,a,b){if(a!==undefined){b=b||{};if(a===null){a="";b.expires=-1}c=c+"="+encodeURIComponent(a);if(typeof b.expires=="number"){a=new Date;a.setTime(a.getTime()+b.expires*24*60*60*1E3);c+="; expires="+a.toUTCString()}c+=b.path?";path="+b.path:"";c+=b.domain?";domain="+domain:"";c+=b.secure?";secure":"";document.cookie=c}else{b=document.cookie;a=b.indexOf(c+"=");if(a!=-1){c=a+c.length;a=b.indexOf(";",c);if(a==-1)a=b.length;a=b.substring(c+1,a);return a=decodeURIComponent(a)}return null}}})(Gnim);
