/*
 * Gnim JS library cookie plugin v0.1
 * By Ming
 * http://www.gnim.net
 */
(function(d){d.cookie=function(b,a,c){if(void 0!==a)c=c||{},null===a&&(a="",c.expires=-1),b=b+"="+encodeURIComponent(a),"number"==typeof c.expires&&(a=new Date,a.setTime(a.getTime()+864E5*c.expires),b+="; expires="+a.toUTCString()),b+=c.path?";path="+c.path:"",b+=c.domain?";domain="+domain:"",b+=c.secure?";secure":"",document.cookie=b;else return c=document.cookie,a=c.indexOf(b+"="),-1!=a?(b=a+b.length,a=c.indexOf(";",b),-1==a&&(a=c.length),a=c.substring(b+1,a),a=decodeURIComponent(a)):null}})(Gnim);
