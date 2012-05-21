/*
 * Gnim JS library key event helper v0.1
 * By Ming
 * http://www.gnim.net
 */
(function(e){function i(f){return b[f]||0}function h(f,a,c){for(var f=f.toLowerCase().split("+"),d={cb:a,ctrl:!1,alt:!1,shift:!1,key:null},a=0;a<f.length-1;a++){var b=e.trim(f[a]);if("ctrl"==b)d.ctrl=!0;else if("alt"==b)d.alt=!0;else if("shift"==b)d.shift=!0;else return!1}d.key=i(e.trim(f[a]));if(d.key)c?e(c).keydown(function(a){d.ctrl!==a.ctrlKey||d.alt!==a.altKey||d.shift!==a.shiftKey||d.key!==a.keyCode&&!(13==d.key&&10==a.keyCode)||(e.noDefault(a),d.cb.apply(c,[a]))}):g.push(d);else return!1}for(var g=
[],b={left:37,up:38,right:39,down:40,"-":189,"=":187,"[":219,"]":221,"\\":220,";":186,"'":222,",":188,".":190,"/":191,"`":192,insert:45,"delete":46,home:36,end:35,pageup:33,pagedown:34,pause:19,backspace:8,tab:9,enter:13,esc:27,space:32},a=1;12>=a;a++)b["f"+a]=111+a;for(a=0;26>a;a++)b[String.fromCharCode(97+a)]=65+a;for(a=0;9>=a;a++)b[String.fromCharCode(48+a)]=48+a;e(document).keydown(function(a){for(var b=0;b<g.length;b++){var c=g[b];c.ctrl!==a.ctrlKey||c.alt!==a.altKey||c.shift!==a.shiftKey||c.key!==
a.keyCode&&!(13==c.key&&10==a.keyCode)||(e.noDefault(a),c.cb.apply(document,[a]))}});e.shortcut=h;e.inject(e.core.prototype,{shortcut:function(a,b){for(var c=0;c<this.length;c++)h(a,b,this[c])}})})(Gnim);
