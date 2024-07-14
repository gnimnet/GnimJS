/*
 * Gnim JS library Copy Plugin v0.1
 * this plugin use to copy a string to clipboard
 * By Ming
 * http://www.gnim.net
 */
(function(b,c){var a=c.getElementsByTagName("body")[0];function d(g){var e=c.createElement("textarea");a.appendChild(e);e.style.display="block";e.style.position="fixed";e.style.left="-9999px";e.style.top="-9999px";e.setAttribute("readonly","");e.value=g||"";e.select();e.setSelectionRange(0,e.value.length);var f=c.execCommand("copy");setTimeout(function(){e.parentNode.removeChild(e)},50);return f}b.copy=d})(Gnim,document);