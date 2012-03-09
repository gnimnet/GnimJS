/*
 * Gnim JS library Select Plugin v0.1
 * this plugin use to get input or textarea select text and move cursor
 * By Ming
 * http://www.gnim.net
 */
(function(e,d){function f(a,c,b){if(c==d&&b==d){if(document.selection)if(a.nodeName.toLowerCase()=="textarea"){c=document.selection.createRange();b=c.duplicate();b.moveToElementText(a);b.setEndPoint("EndToEnd",c);a=b.text.length-c.text.length;return{start:a,end:a+c.text.length,text:c.text}}else{b=document.selection.createRange();c=b.text;b.moveStart("character",-a.value.length);a=b.text.length;return{start:a-c.length,end:a,text:c}}else if("selectionStart"in a&&"selectionEnd"in a){c=a.selectionStart;
b=a.selectionEnd;return{start:c,end:b,text:a.value.substring(c,b)}}return{start:0,end:0,text:""}}else{if(b==d)b=c;a.focus();if(a.createTextRange){b=b-c;a=a.createTextRange();a.collapse(true);a.moveStart("character",c);a.moveEnd("character",b);a.select()}else a.setSelectionRange&&a.setSelectionRange(c,b)}}e.sel=f;e.inject(e.core.prototype,{sel:function(a,c){for(var b=0;b<this.length;b++){var g=f(this[b],a,c);if(g!=d)return g}}})})(Gnim);
