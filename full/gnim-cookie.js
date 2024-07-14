/*
 * Gnim JS library cookie plugin v0.1
 * By Ming
 * http://www.gnim.net
 */
(function ($) {
    /******************** private functions ********************/
    function _cookie(name, value, options) {
        if (value !== undefined) {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var cookiestr = name + "=" + encodeURIComponent(value);

            if (typeof options.expires == 'number') {
                var date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                cookiestr += '; expires=' + date.toUTCString();
            }
            cookiestr += options.path ? (';path=' + options.path) : '';
            cookiestr += options.domain ? (';domain=' + domain) : '';
            cookiestr += options.secure ? ';secure' : '';
            document.cookie = cookiestr;
        } else {
            var allcookie = document.cookie;
            var pos = allcookie.indexOf(name + "=");
            if (pos != -1) {
                var start = pos + name.length;
                var end = allcookie.indexOf(";", start);
                if (end == -1)
                    end = allcookie.length;
                var value = allcookie.substring(start + 1, end);
                value = decodeURIComponent(value);
                return value;
            }
            return null;
        }
    }

    /******************** Make it into Gnim ********************/
    $.cookie = _cookie;
})(Gnim);
