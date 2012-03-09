/*
 * Gnim JS library key event helper v0.1
 * By Ming
 * http://www.gnim.net
 */
(function(f){function l(a){return h[a]||0}function k(a,d,b){a=a.toLowerCase().split("+");var e={cb:d,ctrl:false,alt:false,shift:false,key:null};for(d=0;d<a.length-1;d++){var i=f.trim(a[d]);if(i=="ctrl")e.ctrl=true;else if(i=="alt")e.alt=true;else if(i=="shift")e.shift=true;else return false}e.key=l(f.trim(a[d]));if(e.key)b?f(b).keydown(function(g){if(!(e.ctrl!==g.ctrlKey||e.alt!==g.altKey||e.shift!==g.shiftKey||e.key!==g.keyCode&&!(e.key==13&&g.keyCode==10))){f.noDefault(g);e.cb.apply(b,[g])}}):j.push(e);
else return false}for(var j=[],h={left:37,up:38,right:39,down:40,"-":189,"=":187,"[":219,"]":221,"\\":220,";":186,"'":222,",":188,".":190,"/":191,"`":192,insert:45,"delete":46,home:36,end:35,pageup:33,pagedown:34,pause:19,backspace:8,tab:9,enter:13,esc:27,space:32},c=1;c<=12;c++)h["f"+c]=111+c;for(c=0;c<26;c++)h[String.fromCharCode("a".charCodeAt(0)+c)]=65+c;for(c=0;c<=9;c++)h[String.fromCharCode("0".charCodeAt(0)+c)]=48+c;f(document).keydown(function(a){for(var d=0;d<j.length;d++){var b=j[d];if(!(b.ctrl!==
a.ctrlKey||b.alt!==a.altKey||b.shift!==a.shiftKey||b.key!==a.keyCode&&!(b.key==13&&a.keyCode==10))){f.noDefault(a);b.cb.apply(document,[a])}}});f.shortcut=k;f.inject(f.core.prototype,{shortcut:function(a,d){for(var b=0;b<this.length;b++)k(a,d,this[b])}})})(Gnim);
