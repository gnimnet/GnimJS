/*
 * Gnim JS library Select Plugin v0.1
 * this plugin use to get input or textarea select text and move cursor
 * By Ming
 * http://www.gnim.net
 */
(function(d,e){function f(a,c,b){if(c==e&&b==e){if(document.selection){if("textarea"==a.nodeName.toLowerCase())return c=document.selection.createRange(),b=c.duplicate(),b.moveToElementText(a),b.setEndPoint("EndToEnd",c),a=b.text.length-c.text.length,{start:a,end:a+c.text.length,text:c.text};b=document.selection.createRange();c=b.text;b.moveStart("character",-a.value.length);a=b.text.length;return{start:a-c.length,end:a,text:c}}return"selectionStart"in a&&"selectionEnd"in a?(c=a.selectionStart,b=a.selectionEnd,
{start:c,end:b,text:a.value.substring(c,b)}):{start:0,end:0,text:""}}b==e&&(b=c);a.focus();a.createTextRange?(b-=c,a=a.createTextRange(),a.collapse(!0),a.moveStart("character",c),a.moveEnd("character",b),a.select()):a.setSelectionRange&&a.setSelectionRange(c,b)}d.sel=f;d.inject(d.core.prototype,{sel:function(a,c){for(var b=0;b<this.length;b++){var d=f(this[b],a,c);if(d!=e)return d}}})})(Gnim);
