/*
 * Gnim JS library Plugin Demo
 * By Ming
 * http://www.gnim.net
 */
(function($) {
    /**
    * Static functions
    * this function use like "Gnim.myplugin.show();"
    */
    $.myplugin = {
        show: function() {
            alert('hi!');
        }
    };
    /**
     * Core functions
     * this function use like "Gnim(selector).show();"
     */
    $.inject($.core.prototype, {
        show: function() {
            for (var i = 0; i < this.length; i++) {
                alert(i + ':' + this[i].innerHTML);
            }
        }
    });
})(Gnim);