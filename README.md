Gnim Javascript Library v1.0.8

### 什么是GnimJS?
GnimJS是一个精简的JavaScript库，包含基本的Dom操作、事件处理、Ajax支持。

### 非注入模式
如果不希望将Gnim对象替换为$，可以删去库主匿名函数第三个参数，或者传false。

### Gnim函数
GnimJS的核心函数，该函数也可以使用$来替代作为短命名。
Gnim 函数可以接受4种参数：选择器、HTML元素(或数组)、HTML代码、Gnim对象。
1. 选择器：查找元素，返回Gnim对象。
2. HTML元素(或数组)：包装元素为Gnim对象。
3. HTML代码：创建HTML元素，返回Gnim对象。
4. Gnim对象：直接返回。

### CSS选择器查找DOM
GnimJS支持最基本的ID查找、标签查找以及类查找，可以混合是搭配使用，并且可以使用逗号分隔多个选择器。
查找得到的元素可以当做数组来使用获取查找到的结果。

    var str = '查找结果：';
    str += '\n共有 ' + $('div').length + ' 个 div 块';
    str += '\n共有 ' + $('.content').length + ' 个 .content 块';
    str += '\n共有 ' + $('#logo').length + ' 个 #logo 块';
    str += '\n共有 ' + $('.content button,#logo').length + ' 个 .content button与#logo 块';
    alert(str);

### 包装HTML元素
将元素数组或元素传给 Gnim 函数可以将其包装为Gnim对象。

    var con = document.getElementById('warp_elm');
    var warpCon = $(con);
    var warpElms = $(con.getElementsByTagName('div'));
    alert('Con.text():\n' + warpCon.text());
    alert('Elms.text():\n' + warpElms.text());

### 创建HTML
将HTML代码传给 Gnim 函数可以创建页面DOM元素，并包装为Gnim对象。(注：HTML代码必须为'<'开头)

    var htmlStr = '<p style="color:yellow">This is a demo...</p>';
    $(htmlStr).appendTo('#warp_html');

### 核心函数
Gnim对象包含对Dom操作、时间绑定等函数。

    $(selector).each(fn); //遍历Gnim对象中每个元素的函数，回调为function(elm){}

    $(selector).find(selector); //在当前获取元素中查找子元素

    $(selector).html(); //获取第一个元素的内部HTML代码，没有元素返回null
    $(selector).html(val); //设定每个元素的内部HTML代码，没有元素返回null

    $(selector).text(); //获取第一个元素的内部文本，没有元素返回null
    $(selector).text(val); //设定每个元素的内部文本，没有元素返回null

    $(selector).append(childElm); //添加子元素childElm到最后(childElm参数会被Gnim函数包装)
    $(selector).appendTo(fatherElm); //添加为fatherElm最后的子元素(fatherElm参数会被Gnim函数包装)
    $(selector).prepend(childElm); //添加子元素childElm到最前(childElm参数会被Gnim函数包装)
    $(selector).prependTo(fatherElm); //添加为fatherElm最前的子元素(fatherElm参数会被Gnim函数包装)

    $(selector).after(content); //将content添加到最后一个元素之后(childElm参数会被Gnim函数包装)
    $(selector).insertAfter(target); //将所有元素添加到target之后(fatherElm参数会被Gnim函数包装)
    $(selector).before(content); //将content添加到最后一个元素之前(content参数会被Gnim函数包装)
    $(selector).insertBefore(target); //将所有元素添加到target之前(target参数会被Gnim函数包装)

    $(selector).remove(); //删除每个元素
    $(selector).empty(); //清空每个元素内部

    $(selector).css(name); //获取第一个元素的样式值
    $(selector).css(name,value); //设置元素指定样式值(单值)
    $(selector).css(style); //设置元素样式值(多值)

    $(selector).attr(name); //获取第一个元素的属性值
    $(selector).attr(name,value); //设置元素指定属性值(单值)
    $(selector).attr(attribute); //设置元素属性值(多值)
    $(selector).removeAttr(name); //移除元素属性值

    $(selector).hasClass(className); //获取第一个元素的样式值
    $(selector).addClass(className); //获取第一个元素的样式值
    $(selector).removeClass(className); //获取第一个元素的样式值
    $(selector).toggleClass(className); //获取第一个元素的样式值

    $(selector).bind(type,fn); //在元素上绑定某事件回调函数
    $(selector).unbind(type,fn); //在元素上移除某事件回调函数

    $(selector).blur(fn); //在元素上绑定失去焦点事件回调函数
    $(selector).change(fn); //在元素上绑定值改变事件回调函数
    $(selector).click(fn); //在元素上绑定点击事件回调函数
    $(selector).dblclick(fn); //在元素上绑定双击事件回调函数
    $(selector).error(fn); //在元素上绑定错误事件回调函数
    $(selector).focus(fn); //在元素上绑定获得焦点事件回调函数
    $(selector).keydown(fn); //在元素上绑定按键按下事件回调函数
    $(selector).keypress(fn); //在元素上绑定按键点击事件回调函数
    $(selector).keyup(fn); //在元素上绑定按键松开事件回调函数
    $(selector).load(fn); //在元素上绑定加载事件回调函数
    $(selector).mousedown(fn); //在元素上绑定鼠标点击按下事件回调函数
    $(selector).mousemove(fn); //在元素上绑定鼠标移动事件回调函数
    $(selector).mouseout(fn); //在元素上绑定鼠标离开事件回调函数
    $(selector).mouseover(fn); //在元素上绑定鼠标进入事件回调函数
    $(selector).mouseup(fn); //在元素上绑定鼠标点击松开事件回调函数
    $(selector).resize(fn); //在元素上绑定改变大小事件回调函数
    $(selector).scroll(fn); //在元素上绑定滚动事件回调函数
    $(selector).select(fn); //在元素上绑定选择事件回调函数
    $(selector).submit(fn); //在元素上绑定提交事件回调函数
    $(selector).unload(fn); //在元素上绑定卸载事件回调函数
    $(selector).hover(overfn, outfn); //在元素上绑定进入及离开事件回调函数

### 浏览器检测
很多时候我们需要根据执行环境的浏览器来运行不同的代码，在 $.broswer 下放置了浏览器特性。
$.broswer 可以判断 chrome、safari 、webkit 、opera 、msie 、firefox及mozilla 。
$.broswer.version 中获取浏览器版本。

    var str = '浏览器信息：';
    for (var elm in $.broswer) {
        str += '\n' + elm + ' - ' + $.broswer[elm];
    }
    alert(str);

### DOM就绪
当我们需要在网页加载完成运行JS，可以使用 $.ready(fn) 来包裹执行代码。(注意，这个用法与jQuery不同)

    $.ready(function(){//DOM就绪回调
        $('#ready').html('DOM已经就绪');
    });

### 对象检测
GnimJS有一些用于检测对象的常用函数 $.isStr 、 $.isNum 、 $.isObj 、 $.isFunc 、 $.isArr、 $.isArray。
isArr与isArray的不同在于isArr判断对象length属性是否为数字，而isArray判断对象的原型是否为Array（更准确为数组）。

    var resultStr = '结果：';
    var funcs = ['isStr', 'isNum', 'isArr'];//执行函数
    var paramStr = ['\'123\'', '123', '[]', '{}'];//参数字符串
    var params = ['123', 123, [], {}];//测试参数
    for (var i = 0; i < funcs.length; i++) {
        for (var j = 0; j < params.length; j++) {
            resultStr += '\n$.' + funcs[i] + '(' + paramStr[j] + ') : ' + $[funcs[i]](params[j]);
        }
        resultStr += '\n';
    }
    alert(resultStr);

### 对象转换
GnimJS有一些用于转换对象的常用函数 $.toInt 、 $.toFloat 、 $.toStr、 $.toHex。

    var resultStr = '结果：';
    resultStr += '\n$.toInt(\'123.12\') : ' + $.toInt('123.12');
    resultStr += '\n$.toFloat(\'123.12\') : ' + $.toFloat('123.12');
    resultStr += '\n$.toStr(123.12) : \'' + $.toStr(123.12)+'\'';
    resultStr += '\n$.toHex(123) : \'' + $.toHex(123)+'\'';
    resultStr += '\n$.toHex(123,6) : \'' + $.toHex(123,6)+'\'';
    alert(resultStr);

### 字符串去前后空格
GnimJS含有字符串左右空格出去函数 $.trim 、 $.ltrim 、 $.rtrim。

    var resultStr = '结果：';
    resultStr += '\n$.trim(\'  a string   \') : \'' + $.trim('  a string   ')+'\'';
    resultStr += '\n$.ltrim(\'  a string   \') : \'' + $.ltrim('  a string   ')+'\'';
    resultStr += '\n$.rtrim(\'  a string   \') : \'' + $.rtrim('  a string   ')+'\'';
    alert(resultStr);

### 对象注入
GnimJS的对象注入函数 $.inject 用于将一个对象注入另一个对象。

    var obj1 = { a: 1, b: 2, c: 3 };
    var obj2 = { x: 4, y: 5, z: 6 };
    $.inject(obj1, obj2);
    var str = 'obj1:';
    for (var elm in obj1) {
        str += '\n' + elm + ' : ' + obj1[elm];
    }
    alert(str);

### DOM元素创建
GnimJS的函数 $.build 用于将字符串构建为DOM元素数组。

    var htmlStr = '<p>this is line - 1...</p>'
        + '<p>this is line - 2...</p>';
    var nodes = $.build(htmlStr);
    $(nodes).appendTo('#build');

### 事件冒泡与默认行为
GnimJS的函数 $.noBubble(e) 和 $.noDefault(e) 用于停止事件冒泡和阻止浏览器默认行为。
这两个函数接收参数均为事件Event。

### 当前UTC时间戳
GnimJS的函数 $.now() 用来获取从当前的UTC时间戳(毫秒)。

    alert($.now());

### Ajax
GnimJS的函数 $.get 、 $.post 和 $.ajax 用于Ajax请求。
$.ajax 函数的参数对象可有属性为 url / type / contentType / dataType / success / error / data / timeout

    function _get() {
        var sendPack = { a: 1, b: 'str' };
        $.get('Data.txt?test=1', sendPack, function(data) { alert('Get Data:\n' + data); });
    }
    function _post() {
        var sendPack = { a: 1, b: 'str' };
        $.post('Data.txt', sendPack, function(data) { alert('Get Data:\n' + data); });
    }
    function _ajax() {
        var sendPack = { a: 1, b: 'str' };
        $.ajax({
            url: 'Data.txt',
            data: sendPack,
            success: function(data) { alert('Get Data:\n' + data); }
        });
    }

插件API参考这里：
[https://github.com/GnimNet/GnimJS/wiki/Plugins](https://github.com/GnimNet/GnimJS/wiki/Plugins)