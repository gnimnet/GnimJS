/*
 * Gnim JS library Select Plugin v0.1
 * this plugin use to get input or textarea select text and move cursor
 * By Ming
 * http://www.gnim.net
 */
(function(b,c){function a(h,d,i){if(d==c&&i==c){if(document.selection){if(h.nodeName.toLowerCase()=="textarea"){var l=document.selection.createRange();var e=l.duplicate();e.moveToElementText(h);e.setEndPoint("EndToEnd",l);var o=e.text.length-l.text.length;var q=o+l.text.length;return{start:o,end:q,text:l.text}}else{var m=document.selection.createRange();var n=m.text;m.moveStart("character",-h.value.length);var r=m.text.length;var k=r-n.length;return{start:k,end:r,text:n}}}else{if(("selectionStart" in h)&&("selectionEnd" in h)){var j=h.selectionStart;var p=h.selectionEnd;return{start:j,end:p,text:h.value.substring(j,p)}}}return{start:0,end:0,text:""}}else{if(i==c){i=d}h.focus();if(h.createTextRange){var g=i-d;var f=h.createTextRange();f.collapse(true);f.moveStart("character",d);f.moveEnd("character",g);f.select()}else{if(h.setSelectionRange){h.setSelectionRange(d,i)}}}}b.sel=a;b.inject(b.core.prototype,{sel:function(g,d){for(var e=0;e<this.length;e++){var f=a(this[e],g,d);if(f!=c){return f}}}})})(Gnim);