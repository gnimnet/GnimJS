/*
 * Gnim JS library Select Plugin v0.1
 * this plugin use to get input or textarea select text and move cursor
 * By Ming
 * http://www.gnim.net
 */
(function ($, undefined) {
    function sel(node, start, end) {
        if (start == undefined && end == undefined) {
            if (document.selection) {
                if (node.nodeName.toLowerCase() == 'textarea') {
                    var range = document.selection.createRange();
                    var stored_range = range.duplicate();
                    stored_range.moveToElementText(node);
                    stored_range.setEndPoint('EndToEnd', range);
                    var selectionStart = stored_range.text.length - range.text.length;
                    var selectionEnd = selectionStart + range.text.length;
                    return {
                        start: selectionStart,
                        end: selectionEnd,
                        text: range.text
                    };
                } else {
                    //for input to solve
                    var selRange = document.selection.createRange();
                    var curSelText = selRange.text;
                    selRange.moveStart('character', -node.value.length);
                    var selectionEnd2 = selRange.text.length;
                    var selectionStart2 = selectionEnd2 - curSelText.length;
                    return {
                        start: selectionStart2,
                        end: selectionEnd2,
                        text: curSelText
                    };
                }
            } else if (('selectionStart' in node) && ('selectionEnd' in node)) {
                var selectionStart3 = node.selectionStart;
                var selectionEnd3 = node.selectionEnd;
                return {
                    start: selectionStart3,
                    end: selectionEnd3,
                    text: node.value.substring(selectionStart3, selectionEnd3)
                };
            }
            return {start: 0, end: 0, text: ''};
        } else {
            if (end == undefined) end = start;
            node.focus();
            if (node.createTextRange) {
                var newend = end - start;
                var selRange2 = node.createTextRange();
                selRange2.collapse(true);
                selRange2.moveStart('character', start);
                selRange2.moveEnd('character', newend);
                selRange2.select();
            } else if (node.setSelectionRange) {
                node.setSelectionRange(start, end);
            }
        }
    }

    $.sel = sel;
    $.inject($.core.prototype, {
        sel: function (start, end) {
            for (var i = 0; i < this.length; i++) {
                var val = sel(this[i], start, end);
                if (val != undefined) return val;
            }
        }
    });
})(Gnim);