/*
 * Gnim JS library Copy Plugin v0.1
 * this plugin use to copy a string to clipboard
 * By Ming
 * http://www.gnim.net
 */
(function ($, doc) {
    var body = doc.getElementsByTagName('body')[0];

    function copy(str) {
        var textarea = doc.createElement('textarea');
        body.appendChild(textarea);
        textarea.style.display = 'block';
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '-9999px';
        textarea.setAttribute('readonly', '');
        textarea.value = str || '';
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        var success = doc.execCommand('copy');
        setTimeout(function () {
            textarea.parentNode.removeChild(textarea);
        }, 50);
        return success;
    }

    $.copy = copy;
})(Gnim, document);
