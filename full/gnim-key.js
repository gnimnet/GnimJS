/*
 * Gnim JS library key event helper v0.1
 * By Ming
 * http://www.gnim.net
 */
(function($) {
    /******************** private variable of key event helper plugin ********************/
    var eventArr = []; //array for all key event
    var keyMap = {
        'left': 37,
        'up': 38,
        'right': 39,
        'down': 40,
        '-': 189,
        '=': 187,
        '[': 219,
        ']': 221,
        '\\': 220,
        ';': 186,
        '\'': 222,
        ',': 188,
        '.': 190,
        '/': 191,
        '`': 192,
        'insert': 45,
        'delete': 46,
        'home': 36,
        'end': 35,
        'pageup': 33,
        'pagedown': 34,
        'pause': 19,
        'backspace': 8,
        'tab': 9,
        'enter': 13,
        'esc': 27,
        'space': 32
    };
    //register for F1 -- F12
    for (var i = 1; i <= 12; i++) {
        keyMap['f' + i] = 111 + i;
    }
    //register for A -- Z
    for (var j = 0; j < 26; j++) {
        keyMap[String.fromCharCode('a'.charCodeAt(0) + j)] = 65 + j;
    }
    //register for 0 -- 9
    for (var k = 0; k <= 9; k++) {
        keyMap[String.fromCharCode('0'.charCodeAt(0) + k)] = 48 + k;
    }
    /******************** private functions of key event helper plugin ********************/
    /* this function use to map key string to key code */
    function _keyMap(keyStr) {
        return keyMap[keyStr] || 0;
    }
    /* this function use to register key shortcut from a shortcut string */
    function _shortcut(shortcut, callback, node) {
        var keys = shortcut.toLowerCase().split('+');
        var sc = {
            cb: callback,
            ctrl: false,
            alt: false,
            shift: false,
            key: null
        };
        var i;
        for (i = 0; i < keys.length - 1; i++) {//check all system keys
            var key = $.trim(keys[i]);
            if (key == 'ctrl') {
                sc.ctrl = true; //get a ctrl key
            } else if (key == 'alt') {
                sc.alt = true; //get a alt key
            } else if (key == 'shift') {
                sc.shift = true; //get a shift key
            } else {
                return false; //register failed
            }
        }
        sc.key = _keyMap($.trim(keys[i]));
        if (sc.key) {
            if (node) {//shortcut for node
                $(node).keydown(function(event) {
                    if (sc.ctrl !== event.ctrlKey || sc.alt !== event.altKey || sc.shift !== event.shiftKey ||
                    (sc.key !== event.keyCode && !(sc.key == 13 && event.keyCode == 10))) {
                        return; //shortcut not right
                    }
                    //prevent browser default action
                    $.noDefault(event);
                    sc.cb.apply(node, [event]); //do call back
                });
            }
            else {//shortcut for all document
                eventArr.push(sc);
            }
        }
        else {
            return false;
        }
    }
    /******************** Init code for shortcut plugin ********************/
    //register for shortcut global event listener 
    $(document).keydown(function(event) {
        for (var i = 0; i < eventArr.length; i++) {
            var sc = eventArr[i];
            if (sc.ctrl !== event.ctrlKey || sc.alt !== event.altKey ||
            sc.shift !== event.shiftKey ||
            (sc.key !== event.keyCode &&
            !(sc.key == 13 && event.keyCode == 10))) {
                continue; //shortcut not right
            }
            //prevent browser default action
            $.noDefault(event);
            sc.cb.apply(document, [event]); //do call back
        }
    });
    /******************** Make it into Gnim ********************/
    $.shortcut = _shortcut;
    $.inject($.core.prototype, {
        shortcut: function(shortcut, callback) {//register short key for all nodes
            for (var i = 0; i < this.length; i++) {
                _shortcut(shortcut, callback, this[i]);
            }
        }
    });
})(Gnim);
