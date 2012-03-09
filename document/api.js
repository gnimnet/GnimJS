/*
 * This javascript file for GnimJS demo
 * Author:  Ming
 * Date:    2011.08.04
 * Site:    http://gnim.net
 */
(function($) {
    //Selector
    function selector() {
        var str = 'Find Result:';
        str += '\nFind ' + $('div').length + ' div';
        str += '\nFind ' + $('.content').length + ' .content';
        str += '\nFind ' + $('#logo').length + ' #logo';
        str += '\nFind ' + $('.content button,#logo').length + ' .content button & #logo block';
        alert(str);
    }
    //Element Warp
    function warpElm() {
        var con = document.getElementById('warp_elm');
        var warpCon = $(con);
        var warpElms = $(con.getElementsByTagName('div'));
        alert('Con.text():\n' + warpCon.text());
        alert('Elms.text():\n' + warpElms.text());
    }
    //Create HTML
    function warpHTML() {
        var htmlStr = '<p style="color:yellow">This is a demo...</p>';
        $(htmlStr).appendTo('#warp_html');
    }
    //DOM Ready
    $.ready(function() {
        $('#ready').html('DOM is ready');
    });
    //Broswer Test
    function broswer() {
        var str = 'Broswer Info:';
        for (var elm in $.broswer) {
            str += '\n' + elm + ' - ' + $.broswer[elm];
        }
        alert(str);
    }
    //Element Test
    function test() {
        var resultStr = 'Result:';
        var funcs = ['isStr', 'isNum', 'isArr'];
        var paramStr = ['\'123\'', '123', '[]', '{}'];
        var params = ['123', 123, [], {}];
        for (var i = 0; i < funcs.length; i++) {
            for (var j = 0; j < params.length; j++) {
                resultStr += '\n$.' + funcs[i] + '(' + paramStr[j] + ') : ' + $[funcs[i]](params[j]);
            }
            resultStr += '\n';
        }
        alert(resultStr);
    }
    //Element convert
    function parse() {
        var resultStr = 'Result:';
        resultStr += '\n$.toInt(\'123.12\') : ' + $.toInt('123.12');
        resultStr += '\n$.toFloat(\'123.12\') : ' + $.toFloat('123.12');
        resultStr += '\n$.toStr(123.12) : \'' + $.toStr(123.12) + '\'';
        resultStr += '\n$.toHex(123) : \'' + $.toHex(123) + '\'';
        resultStr += '\n$.toHex(123,6) : \'' + $.toHex(123,6) + '\'';
        alert(resultStr);
    }
    //Trim Space
    function trim() {
        var resultStr = 'Result:';
        resultStr += '\n$.trim(\'  a string   \') : \'' + $.trim('  a string   ') + '\'';
        resultStr += '\n$.ltrim(\'  a string   \') : \'' + $.ltrim('  a string   ') + '\'';
        resultStr += '\n$.rtrim(\'  a string   \') : \'' + $.rtrim('  a string   ') + '\'';
        alert(resultStr);
    }
    //Object Inject
    function inject() {
        var obj1 = { a: 1, b: 2, c: 3 };
        var obj2 = { x: 4, y: 5, z: 6 };
        $.inject(obj1, obj2);
        var str = 'obj1:';
        for (var elm in obj1) {
            str += '\n' + elm + ' : ' + obj1[elm];
        }
        alert(str);
    }
    //DOM Element create
    function build() {
        var htmlStr = '<p>this is line - 1...</p>'
            + '<p>this is line - 2...</p>';
        var nodes = $.build(htmlStr);
        $(nodes).appendTo('#build');
    }
    //current time
    function now() {
        alert($.now());
    }
    //Ajax
    function _get() {
        var sendPack = { a: 1, b: 'str' };
        $.get('data.txt?test=1', sendPack, function(data) { alert('Get Data:\n' + data); });
    }
    function _post() {
        var sendPack = { a: 1, b: 'str' };
        $.post('data.txt', sendPack, function(data) { alert('Get Data:\n' + data); });
    }
    function _ajax() {
        var sendPack = { a: 1, b: 'str' };
        $.ajax({
            url: 'data.txt',
            data: sendPack,
            success: function(data) { alert('Get Data:\n' + data); }
        });
    }

    window.Demo = {
        selector: selector,
        warpElm: warpElm,
        warpHTML: warpHTML,
        broswer: broswer,
        test: test,
        parse: parse,
        trim: trim,
        inject: inject,
        build: build,
        now: now,
        get: _get,
        post: _post,
        ajax: _ajax
    };
})(Gnim);